export default async function handler(req, res) {
  res.setHeader("Access-Control-Allow-Origin", "*");

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Only POST allowed" });
  }

  try {
    const { message } = req.body;

    return res.status(200).json({
      reply: "✅ Backend working: " + message
    });

  } catch (err) {
    return res.status(500).json({
      error: err.message
    });
  }
}
