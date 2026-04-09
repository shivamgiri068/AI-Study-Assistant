const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.static("public"));

app.post("/ask", async (req, res) => {
  const question = req.body.question;

  try {
    const response = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": "Bearer API_KEY"
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: `You are a helpful AI study assistant for students.\n\nQuestion: ${question}`
      })
    });

    const data = await response.json();

    console.log(data);

    if (!response.ok) {
      return res.status(500).json({
        answer: data.error?.message || "API request failed"
      });
    }

    res.json({
      answer: data.output[0].content[0].text
    });

  } catch (error) {
    console.error(error);

    res.status(500).json({
      answer: "Server error"
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
