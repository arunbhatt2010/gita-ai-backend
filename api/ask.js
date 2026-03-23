async function sendMessage() {
  const inputBox = document.getElementById("input");
  const chat = document.getElementById("chat");

  const text = inputBox.value.trim();
  if (!text) return;

  chat.innerHTML += `<div><b>You:</b> ${text}</div>`;
  inputBox.value = "";

  const botDiv = document.createElement("div");
  botDiv.innerText = "Thinking...";
  chat.appendChild(botDiv);

  try {
    const res = await fetch("https://gita-ai-backend.vercel.app/api/ask", { {
      method: "POST", // ⚠️ MOST IMPORTANT
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: text
      })
    });

    const data = await res.json();

    botDiv.innerHTML = `<b>Krishna:</b><br>${data.reply}`;
    
  } catch (err) {
    botDiv.innerText = "Error connecting...";
    console.error(err);
  }
}
