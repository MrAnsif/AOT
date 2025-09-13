import axios from "axios";
import dotenv from "dotenv";
import doctorModel from "../models/doctorModel.js";
import appointmentModel from "../models/appointmentModel.js";

dotenv.config();

const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;



// Fetch available doctors
const getAvailableDoctors = async () => {
    try {
        const doctors = await doctorModel.find({ available: true });
        return doctors.length > 0
            ? doctors.map(doc => `${doc.name} - ${doc.speciality}`).join("\n")
            : "No available doctors currently.";
    } catch (error) {
        console.error("Error fetching doctors:", error);
        return "Error fetching doctor list.";
    }
};

// Book an appointment
const bookAppointment = async (userName, doctorName, date, time) => {
    try {
        const doctor = await doctorModel.findOne({ name: doctorName });
        if (!doctor) return `Doctor ${doctorName} not found.`;

        const appointment = new appointmentModel({
            userName,
            doctorName,
            date,
            time,
            status: "pending",
        });
        await appointment.save();
        return `Your appointment with Dr. ${doctorName} on ${date} at ${time} has been booked successfully!`;
    } catch (error) {
        console.error("Error booking appointment:", error);
        return "Failed to book appointment.";
    }
};

// Chatbot response handler
export const chatbotResponse = async (req, res) => {
    try {
        const userMessageRow = req.body.message.toLowerCase();
        const userMessage =  "You are a chatbot for a doctor appointment booking system. Only respond to medical or anything related to healthcare/medical tips or any related queries or appointment-related queries.\n Message is "+ userMessageRow

        // Check if user asks for available doctors
        if (userMessage.includes("available doctors") || userMessage.includes("doctor list")) {
            const doctorList = await getAvailableDoctors();
            return res.json({ reply: `Here are the available doctors:\n${doctorList}` });
            // return res.json({ reply: `Here are the available doctors:\n${doctorList.replace(/\n/g, "<br>")}` });
        }

        // Check if user wants to book an appointment
        const match = userMessage.match(/book appointment with (.+) on (.+) at (.+)/);
        if (match) {
            const [, doctorName, date, time] = match;
            const bookingResponse = await bookAppointment("User", doctorName, date, time);
            return res.json({ reply: bookingResponse });
        }


        // Default AI response via Gemini API
        const response = await axios.post(GEMINI_URL, {
            contents: [{ role: "user", parts: [{ text: userMessage }] }]
        });

        const botReply = response.data.candidates[0]?.content?.parts[0]?.text || "I couldn't understand that.";
        res.json({ reply: botReply });
    } catch (error) {
        console.error("Chatbot error:", error);
        res.status(500).json({ error: "Chatbot service unavailable" });
    }
};
