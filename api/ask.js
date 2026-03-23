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

    // 💥 Fix: अगर string आया तो parse करो
    if (typeof body === "string") {
      body = JSON.parse(body);
    }

    const message = body.message || "No message";

    return res.status(200).json({
      reply: "Krishna says: Calm down 🙏 — " + message
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
