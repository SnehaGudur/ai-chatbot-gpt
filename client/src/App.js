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
    <div className="min-h-screen bg-gray-100 flex flex-col items-center p-4">
      <div className="w-full max-w-xl bg-white shadow-md rounded-lg p-4 flex flex-col gap-4">
        <div className="h-96 overflow-y-auto space-y-2 p-2 border rounded">
          {messages.map((msg, index) => {
            const now = new Date();
            const time = now.toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            });
            return (
              <div
                key={index}
                className={`p-2 rounded-md max-w-xs ${
                  msg.role === "user"
                    ? "bg-blue-200 ml-auto text-right"
                    : "bg-gray-200 mr-auto text-left"
                }`}
              >
                <div>{msg.content}</div>
                <div className="text-xs text-gray-500">{time}</div>
              </div>
            );
          })}
          <div ref={chatEndRef} />
        </div>

        {isLoading && (
          <div className="flex items-center gap-2 text-sm text-gray-500 italic">
            <div className="w-4 h-4 border-2 border-t-2 border-gray-400 animate-spin rounded-full" />
            GPT is typing...
          </div>
        )}

        <div className="flex gap-2">
          <input
            ref={inputRef}
            type="text"
            className="flex-grow border p-2 rounded"
            placeholder="Type a message..."
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>

        <div className="flex justify-end">
          <button
            onClick={() => setMessages([])}
            className="text-red-500 underline text-sm"
          >
            Clear Chat
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
