import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

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
    const { message } = req.body;

    const completion = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: `
You are a Bhagavad Gita guide.

Answer like this:
"जैसे गीता में श्रीकृष्ण ने अध्याय X के Y श्लोक में कहा है..."

Then give:
- English advice (short)
- Hindi advice (short)
- 1 deep follow-up question

Do NOT say "Krishna says".
Make it philosophical and human-like.
`
        },
        {
          role: "user",
          content: message
        }
      ],
    });

    return res.status(200).json({
      reply: completion.choices[0].message.content
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
