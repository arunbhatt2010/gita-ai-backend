export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { message } = req.body;

    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`,
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [
          { role: "user", content: message }
        ]
      }),
    });

    const data = await response.json();

    // 🔥 DEBUG RETURN (important)
    if (!data.choices) {
      return res.status(500).json({
        error: "OpenAI error",
        full_response: data
      });
    }

    return res.status(200).json({
    reply: JSON.stringify(data)
    });

  } catch (error) {
    return res.status(500).json({
      error: "Something went wrong",
      details: error.message
    });
  }
}
