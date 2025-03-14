import { useEffect, useRef, useContext, useState } from "react";
import axios from "axios";
import { AppContext } from "@/context/AppContext";
import { assets } from "@/assets/assets";
import { RxCross2 } from "react-icons/rx";
import { IoSend } from "react-icons/io5";
import ReactMarkdown from "react-markdown";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isChatOpen, setIsChatOpen] = useState(false);

  const { backendurl } = useContext(AppContext);

  // 🔥 Step 1: Create a ref for the last message
  const lastMessageRef = useRef(null);

  const sendMessage = async (message) => {
    const newMessages = [...messages, { sender: "user", text: message }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await axios.post(backendurl + "/api/chatbot", { message });
      setMessages([...newMessages, { sender: "bot", text: res.data.reply }]);
    } catch (error) {
      setMessages([...newMessages, { sender: "bot", text: "Error reaching chatbot" }]);
    }
  };

  // 🔥 Step 2: Scroll to last message
  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [messages, isChatOpen]);

  return (
    <div className=" md:max-w-md max-w-[90.5vw] mx-auto p-3 border rounded-lg shadow-md backdrop-blur-md bg-[#a7a7a732] md:right-3 right-5 fixed z-50 bottom-5 px-2">
      <div className="flex justify-between text-xl text-gray-700 rounded-full">
        <img className="cursor-pointer h-12 w-12 object-cover" src={assets.chatbot_icon} onClick={() => setIsChatOpen(true)} alt="" />
        {isChatOpen && (<RxCross2 className="cursor-pointer" onClick={() => setIsChatOpen(false)} />)}
      </div>

      {isChatOpen && (
        <>
          <div className="h-80 overflow-y-auto p-1 border-b">
            {messages.map((msg, index) => (
              <div
                key={index}
                ref={index === messages.length - 1 ? lastMessageRef : null} // Attach ref to last message
                className={`flex ${msg.sender === "user" ? 'justify-end' : 'justify-start w-[90%]'}`}
              >
                <div className={`my-2 p-2  ${msg.sender === "user" ? "text-right bg-blue-100" : "text-left bg-gray-200"} rounded-md`}>
                  {msg.text.split("\n").map((line, i) => (
                    <ReactMarkdown key={i}>{line}</ReactMarkdown>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="flex mt-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
              className="flex-grow p-2 border focus:outline-none rounded-full"
              placeholder="Ask me..."
            />
            <button onClick={() => sendMessage(input)} className="ml-2 p-2 bg-blue-900 text-white rounded-full w-9 h-9 flex items-center justify-center"><IoSend /></button>
          </div>

          <div className="flex mt-2 space-x-2 text-white">
            <button onClick={() => sendMessage("available doctors")} className="p-2 bg-blue-900 rounded-md">Available Doctors</button>
            <button onClick={() => sendMessage("Give me simple healthcare tips")} className="p-2 bg-blue-900 rounded-md">Give me simple healthcare tips</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chatbot;
