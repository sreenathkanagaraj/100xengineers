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
  
    socket.on('chat message', (msg) => {
      const messageElement = document.createElement('div');
      messageElement.className = 'message';
      messageElement.textContent = msg;
      chatMessages.appendChild(messageElement);
      // Scroll to the bottom to show the latest message
      chatMessages.scrollTop = chatMessages.scrollHeight;
    });
  });
  