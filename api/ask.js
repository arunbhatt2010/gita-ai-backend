export default function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  let body = '';

  req.on('data', chunk => {
    body += chunk;
  });

  req.on('end', () => {
    const { message } = JSON.parse(body || '{}');

    res.status(200).json({
      reply: "You said: " + message
    });
  });
}
