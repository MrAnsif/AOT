import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';

const changeAvailability = async (req, res) => {
    try {
        const { docId } = req.body;
        const docData = await doctorModel.findById(docId);
        await doctorModel.findByIdAndUpdate(docId, { available: !docData.available });
        res.json({ success: true, message: 'Availability changed successfully' });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

const doctorList = async (req, res) => {
    try {
        const doctors = await doctorModel.find({}).select(['-password', '-email'])
        res.json({ success: true, doctors })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api fo doctor login
const loginDoctor = async (req, res) => {

    try {

        const { email, password } = req.body
        const doctor = await doctorModel.findOne({ email })

        if (!doctor) {
            return res.json({ success: false, message: "invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, doctor.password)

        if (isMatch) {

            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })

        } else {
            return res.json({ success: false, message: "invalid credentials" })

        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api to get appointment for doctor panel
// const appointmentsDoctor = async (req, res) => {
//     try {

//         const { docId } = req.body
//         const appointments = await appointmentModel.find({ docId })

//         res.json({success:true, appointments})

//     } catch (error) {
//         console.log(error);
//         res.json({ success: false, message: error.message });
//     }
// }
const appointmentsDoctor = async (req, res) => {
    try {
        const { docId } = req.body;

        // Ensure that appointments include the latest user medical history
        const appointments = await appointmentModel.find({ docId })
            .populate('userId', 'name dob medicalHistory'); //  Get the latest medical history


        res.json({ success: true, appointments });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// api to mark appointment completed docPanel

const appointmentCompleted = async (req, res) => {

    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { isCompleted: true })
            return res.json({ success: true, message: 'Appointment completed' })

        } else {
            return res.json({ success: false, message: 'Mark failed' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


// api to cancel appointment for docPanel
const appointmentCancel = async (req, res) => {

    try {

        const { docId, appointmentId } = req.body

        const appointmentData = await appointmentModel.findById(appointmentId)

        if (appointmentData && appointmentData.docId === docId) {

            await appointmentModel.findByIdAndUpdate(appointmentId, { cancelled: true })
            return res.json({ success: true, message: 'Appointment cancelled' })

        } else {
            return res.json({ success: false, message: 'cancellation failed' })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}



// api to get dashbosrd data for docPanel

const doctorDashboard = async (req, res) => {

    try {

        const { docId } = req.body

        const appointments = await appointmentModel.find({ docId })

        let earning = 0
        appointments.map((item) => {

            // if (item.isCompleted) {
            //     earning += item.amount
            // }

        })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}


export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentCompleted }