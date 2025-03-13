import doctorModel from '../models/doctorModel.js';
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import appointmentModel from '../models/appointmentModel.js';
import userModel from '../models/userModel.js';


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

        let earnings = 0
        appointments.map((item) => {

            if (item.isCompleted) {
                earnings += item.amount
            }
        })

        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userId)) {
                patients.push(item.userId)
            }
        })

        const dashData = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestAppointments: appointments.reverse().slice(0, 5)
        }

        res.json({ success: true, dashData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to see doc profile for doctor

const doctorProfile = async (req, res) => {
    try {

        const { docId } = req.body
        const profileData = await doctorModel.findById(docId).select('-password')

        res.json({ success: true, profileData })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// API to update docProfile for doctor
const updateDoctorProfile = async (req, res) => {

    const { docId, fees, address, available } = req.body

    await doctorModel.findByIdAndUpdate(docId, { fees, address, available })

    res.json({ success: true, message: 'profile updated' })
}

// api to add medical history
const addMedicalHistory = async (req, res) => {
    try {
        const { userId, condition, diagnosisDate } = req.body;
        const doctorId = req.body.docId;

        // Check if the user has an appointment with this doctor
        const appointmentExists = await appointmentModel.findOne({ userId, docId: doctorId });

        if (!appointmentExists) {
            return res.status(403).json({ success: false, message: "Unauthorized action: You are not this patient's doctor" });
        }

        const user = await userModel.findById(userId);
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found" });
        }

        // Add medical history
        user.medicalHistory.push({ condition, diagnosisDate });
        await user.save();

        res.json({ success: true, message: "Medical history updated successfully", medicalHistory: user.medicalHistory });
    } catch (error) {
        console.error(error);
        res.status(500).json({ success: false, message: "Server error" });
    }
};

// api to get user data in doc panel
const viewUserData = async (req, res) => {
    try {
        const { userId } = req.query; // ✅ Get userId from query params
        if (!userId) {
            return res.json({ success: false, message: "User ID is required" });
        }

        const user = await userModel.findById(userId).select('-password');

        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        res.json({ success: true, user });

    } catch (error) {
        console.error(error);
        res.json({ success: false, message: "Failed to fetch user details" });
    }
};




export { changeAvailability, doctorList, loginDoctor, appointmentsDoctor, appointmentCancel, appointmentCompleted, doctorDashboard, updateDoctorProfile, doctorProfile, addMedicalHistory, viewUserData }