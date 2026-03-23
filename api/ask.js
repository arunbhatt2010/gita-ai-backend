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

    // ✅ simple test response
    return res.status(200).json({
      reply: "Krishna says: " + message
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
