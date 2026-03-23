export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {

    let body = req.body;

    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const { message, history = [], step = 0, category = "general" } = body;

    // 🔥 AI CALL
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          {
            role: "system",
            content: `
You are a Bhagavad Gita guide.

User conversation:
${JSON.stringify(history)}

Current step: ${step}
Category: ${category}

Instructions:

Step 0:
- Understand problem
- Create curiosity

Step 1:
- Reveal hidden pattern

Step 2:
- Give deep emotional clarity

Step 3:
- Tease deeper truth

Always:
- Start with:
"In Bhagavad Gita, Chapter X, Verse Y, it is said..."

- Then:
English (short)
Hindi (short)

- End with 1 deep question

Rules:
- No generic advice
- No motivational tone
- Feel personal and specific
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
      data?.choices?.[0]?.message?.content || "No response";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({
      error: "Server error",
      details: err.message
    });
  }
}
