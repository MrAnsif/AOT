// import express from "express";
// import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();

// const router = express.Router();

// // const GEMINI_API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
// // const GEMINI_URL = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + API_KEY;

// router.post("/", async (req, res) => {
//     try {
//         const userMessage = req.body.message;
//         if (!userMessage) {
//             return res.status(400).json({ error: "Message is required" });
//         }

//         const API_KEY = process.env.GOOGLE_GEMINI_API_KEY;
//         if (!API_KEY) {
//             return res.status(500).json({ error: "API Key is missing." });
//         }

//         const response = await axios.post(
//             "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-pro:generateContent?key=" + API_KEY, // 🔹 UPDATED URL
//             {
//                 contents: [{ parts: [{ text: userMessage }] }] // 🔹 REMOVED "role: user"
//             },
//             { headers: { "Content-Type": "application/json" } }
//         );

//         res.json({ reply: response.data.candidates[0].content.parts[0].text });
//     } catch (error) {
//         console.error("Chatbot Error:", error.response?.data || error.message);
//         res.status(500).json({ error: "Something went wrong with the chatbot." });
//     }
// });

// export default router;


import express from "express";
import { chatbotResponse } from "../controllers/chatbotController.js";

const router = express.Router();

router.post("/", chatbotResponse);

export default router;
