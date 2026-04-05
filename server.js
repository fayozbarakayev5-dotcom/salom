const express = require("express");
const fetch = require("node-fetch");
const cors = require("cors");


const app = express();
app.use(express.json());
app.use(cors());

const API_KEY = "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";

app.post("/ask", async (req, res) => {
  const question = req.body.question;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: "You are a helpful Uzbek tutor. Explain simply." },
          { role: "user", content: question }
        ]
      })
    });

    const data = await response.json();
    res.json({ answer: data.choices[0].message.content });

  } catch (err) {
    res.json({ answer: "Xatolik bo‘ldi 😢" });
  }
});

app.listen(3000, () => console.log("Server running on 3000"));
