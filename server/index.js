const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const axios = require("axios"); // ✅ moved up

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("🟢 Backend is up and running!");
});

app.post("/chat", async (req, res) => {
  const { message } = req.body;
   console.log("📩 Received message from frontend:", message);

  // ✨ Mock reply logic
  try {
    const mockReply = `🤖 [Mock GPT]: You said - "${message}"`;
    console.log("📤 Sending mock reply:", mockReply);

    // Simulate typing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    res.json({ reply: mockReply });
  } catch (error) {
    console.error("Mock Error:", error.message);
    res.status(500).json({ error: "Mock backend error." });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on ${PORT}`));
