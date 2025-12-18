const videoPlayer = document.getElementById('video-player');
const chatBox = document.getElementById('chat-box');
const chatToggle = document.getElementById('chat-toggle');
const messageInput = document.getElementById('message-input');
const sendMessageBtn = document.getElementById('send-message');
const messagesContainer = document.getElementById('messages');

// Toggle chat box visibility
chatToggle.addEventListener('click', () => {
    chatBox.style.display = chatBox.style.display === 'none' ? 'block' : 'none';
});

// Send message functionality
sendMessageBtn.addEventListener('click', () => {
    const message = messageInput.value;
    if (message) {
        const messageElement = document.createElement('div');
        messageElement.textContent = message;
        messagesContainer.appendChild(messageElement);
        messageInput.value = '';
    }
});

// Example of synchronizing video play (this part is a simple placeholder)
videoPlayer.addEventListener('play', () => {
    console.log("Video is playing");
});
