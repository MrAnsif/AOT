import mongoose from "mongoose";


const appointmentSchema = new mongoose.Schema({
    userId: { type: String, requered: true },
    docId: { type: String, requered: true },
    slotDate: { type: String, requered: true },
    slotTime: { type: String, requered: true },
    userData: { type: Object, requered: true },
    docData: { type: Object, requered: true },
    amount: { type: Number, requered: true },
    date: { type: Number, requered: true },
    cancelled: { type: Boolean, default: false },
    payment: { type: Boolean, default: false },
    isCompleted: { type: Boolean, default: false },
})


const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentSchema)

export default appointmentModel