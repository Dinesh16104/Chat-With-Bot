const chatBox = document.getElementById("chat-box");
const userInput = document.getElementById("user-input");
const sendBtn = document.getElementById("send-btn");

sendBtn.addEventListener("click", () => {
  const message = userInput.value.trim();
  if (message) {
    appendMessage("user", message);
    sendMessageToBackend(message);
    userInput.value = "";
  } else {
    alert("Please enter a message.");
  }
});

userInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    sendBtn.click();
  }
});

function appendMessage(sender, message) {
  const messageDiv = document.createElement("div");
  messageDiv.className = sender === "user" ? "user-message" : "bot-message";
  messageDiv.textContent = message;
  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

function sendMessageToBackend(message) {
  fetch("http://127.0.0.1:5000/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message })
  })
    .then(response => response.json())
    .then(data => {
      if (data.response) {
        appendMessage("bot", data.response);
      } else if (data.error) {
        appendMessage("bot", "An error occurred.");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      appendMessage("bot", "Failed to connect to the server.");
    });
}