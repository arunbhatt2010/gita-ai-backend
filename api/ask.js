export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a Bhagavad Gita guide.

RULES:
- Do NOT say "Krishna says"
- Start like: "Gita me Shree Krishna ne adhyaya X ke shlok Y me kaha hai..."
- Give:
  1. Short English advice
  2. Short Hindi advice
  3. 1 deep follow-up question

Keep answer clean and human-like.
            `
          },
          {
            role: "user",
            content: message
          }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data.choices?.[0]?.message?.content || "No response";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
