export default async function handler(req, res) {

  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { message, history = [] } = req.body;

    const systemPrompt = `
You are a practical life guide inspired by Bhagavad Gita.

You MUST think before answering.

Process:
1. Understand the real problem (not surface words)
2. Identify hidden pattern or mistake
3. Use a relevant idea from Bhagavad Gita
4. Answer in this structure:

WHAT: what the user should do  
WHY: why it matters (psychological + logical)  
HOW: 2–3 practical steps  
REFLECTION: 1 deep question  

Rules:
- Do not give generic advice
- Do not repeat same answers
- Make answer specific to user input
- Keep it short but powerful
`;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages: [
          { role: "system", content: systemPrompt },
          ...history,
          { role: "user", content: message }
        ]
      })
    });

    const data = await response.json();

    const reply =
      data?.choices?.[0]?.message?.content || "No response";

    return res.status(200).json({ reply });

  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
}
