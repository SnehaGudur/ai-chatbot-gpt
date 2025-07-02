// src/App.js
import { useState, useRef, useEffect } from "react";

function App() {
  const [messages, setMessages] = useState([]);
  const [userInput, setUserInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const chatEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const typeText = (text, callback) => {
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        callback((prev) => prev + text.charAt(index));
        index++;
      } else {
        clearInterval(interval);
      }
    }, 20); // typing speed
  };

 const sendMessage = async () => {
  if (!userInput.trim()) return;

  const userMessage = { role: "user", content: userInput, time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  setMessages((prev) => [...prev, userMessage]);
  setUserInput("");
  setIsLoading(true);

  // Mock GPT reply immediately
  let botMessage = { role: "bot", content: "", time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) };
  setMessages((prev) => [...prev, botMessage]);

  const mockReply = `🤖 [Mock GPT]: You said - "${userInput}"`;

  // Typing animation
  let index = 0;
  const interval = setInterval(() => {
    if (index < mockReply.length) {
      botMessage.content += mockReply[index];
      index++;
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = { ...botMessage };
        return updated;
      });
    } else {
      clearInterval(interval);
      setIsLoading(false);
    }
  }, 20);
};


  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-100 flex flex-col items-center justify-center p-4">
    <div className="w-full max-w-xl bg-white/80 backdrop-blur-lg shadow-2xl rounded-2xl p-6 flex flex-col gap-4 border border-white/30">
      <h1 className="text-2xl font-bold text-center text-gray-700 mb-2">💬 Custom AI Chatbot</h1>

      <div className="h-96 overflow-y-auto space-y-2 p-3 border border-gray-300 rounded-lg bg-white/60">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-3 rounded-xl max-w-xs break-words ${
              msg.role === "user"
                ? "bg-blue-200 self-end text-right"
                : "bg-gray-200 self-start text-left"
            }`}
          >
            <div>{msg.content}</div>
            <div className="text-xs text-gray-500 mt-1">{msg.time}</div>
          </div>
        ))}
        <div ref={chatEndRef} />
      </div>

      {isLoading && (
        <div className="flex items-center gap-2 text-sm text-gray-600 italic">
          <div className="w-4 h-4 border-2 border-t-2 border-gray-400 animate-spin rounded-full" />
          GPT is typing...
        </div>
      )}

      <div className="flex gap-2">
        <input
          ref={inputRef}
          type="text"
          className="flex-grow border border-gray-300 p-3 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
          placeholder="Type a message..."
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-blue-500 text-white px-5 py-3 rounded-xl hover:bg-blue-600 active:scale-95 transition"
        >
          Send
        </button>
      </div>

      <div className="flex justify-end">
        <button
          onClick={() => setMessages([])}
          className="text-red-500 hover:underline text-sm mt-2"
        >
          Clear Chat
        </button>
      </div>
    </div>
  </div>
);

}

export default App;
