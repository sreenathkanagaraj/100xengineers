socket.on("disconnect", () => {
  console.log("A user disconnected");
});

socket.on("chat message", (message) => {
  // Other event listeners as needed
  io.emit("chat message", message); // Broadcast the message to all connected clients
});

// Add event listener for receiving chat messages
socket.on('chat message', (msg) => {
  const replacedMsg = replaceKeywordsWithEmojis(msg);
  displayMessage(replacedMsg);
});

// Function to replace keywords with emojis
function replaceKeywordsWithEmojis(message) {
  const keywordReplacements = {
    'hey': '👋',  
    'react': "⚛️",
    'woah': "😲",
    'hey': "👋",
    'lol': "😂",
    'like': "🤍",
    'congratulations': "🎉",
  };

  // Loop through keywords and replace them with emojis
  for (const keyword in keywordReplacements) {
    if (message.includes(keyword)) {
      message = message.replace(keyword, keywordReplacements[keyword]);
    }
  }

  return message;
}

// Function to display messages
function displayMessage(msg) {
  const messageElement = document.createElement('div');
  messageElement.className = 'message';
  messageElement.textContent = msg;
  chatMessages.appendChild(messageElement);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}


document.addEventListener('DOMContentLoaded', () => {
  const messageInput = document.getElementById('message-input');
  const sendButton = document.getElementById('send-button');
  const chatMessages = document.getElementById('chat-messages');

  const socket = io(); // Establish a connection to the Socket.IO server

  sendButton.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
      socket.emit('chat message', message); // Send the message to the server
      messageInput.value = '';
    }
  });

  socket.on('chat message', (message) => {
    const messageElement = document.createElement('div');
    messageElement.className = 'chat message';
    messageElement.textContent = message;
    chatMessages.appendChild(messageElement);
    // Scroll to the bottom to show the latest message
    chatMessages.scrollTop = chatMessages.scrollHeight;
  });
});