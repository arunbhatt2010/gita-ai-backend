module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { message } = req.body;

  return res.status(200).json({
    reply: "You said: " + message,
  });
};
