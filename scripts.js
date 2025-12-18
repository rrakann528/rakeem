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
// استيراد Firebase SDK
import { initializeApp } from "firebase/app";
import { getDatabase, ref, set, onValue } from "firebase/database";

// إعدادات Firebase الخاصة بمشروعك
const firebaseConfig = {
  apiKey: "AIzaSyDjHcdLBf5ATDVTUogoxQT8NLBrWSaTygQ", // استبدل هذه بالقيمة من Firebase Console
  authDomain: "rakeem-4cd7a.firebaseapp.com", // استبدل هذه بالقيمة
  databaseURL: "https://rakeem-4cd7a-default-rtdb.firebaseio.com", // استبدل هذه بالقيمة
  projectId: "rakeem-4cd7a", // استبدل هذه بالقيمة
  storageBucket: "rakeem-4cd7a.firebasestorage.app", // استبدل هذه بالقيمة
  messagingSenderId: "327589069784", // استبدل هذه بالقيمة
  appId: "1:327589069784:web:42bdefdee35772132f28ad", // استبدل هذه بالقيمة
  measurementId: "G-Z5ZWM8NMQB" // استبدل هذه بالقيمة
};

// تهيئة Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

// إرسال رسالة إلى Firebase
function sendMessage(message) {
  set(ref(database, 'messages/' + Date.now()), {
    text: message,
    timestamp: Date.now()
  });
}

// استلام الرسائل في الوقت الفعلي
const messagesRef = ref(database, 'messages');
onValue(messagesRef, (snapshot) => {
  const data = snapshot.val();
  displayMessages(data);
});

// عرض الرسائل على الصفحة
function displayMessages(messages) {
  const messagesContainer = document.getElementById('messages');
  messagesContainer.innerHTML = '';  // مسح الرسائل القديمة
  for (const key in messages) {
    const message = messages[key];
    const messageElement = document.createElement('div');
    messageElement.textContent = message.text;
    messagesContainer.appendChild(messageElement);
  }
}

// ربط زر إرسال الرسالة
document.getElementById("send-message").addEventListener("click", () => {
  const message = document.getElementById("message-input").value;
  if (message) {
    sendMessage(message);  // إرسال الرسالة إلى Firebase
    document.getElementById("message-input").value = '';  // مسح حقل الإدخال بعد إرسال الرسالة
  }
});

// مزامنة وقت الفيديو مع Firebase
const videoPlayer = document.getElementById('video-player');
function syncVideo() {
  const currentTime = videoPlayer.currentTime;
  set(ref(database, 'videoSync'), {
    currentTime: currentTime
  });
}

// تحديث وقت الفيديو كل ثانية
setInterval(syncVideo, 1000);

// استلام وقت الفيديو من Firebase
const videoSyncRef = ref(database, 'videoSync');
onValue(videoSyncRef, (snapshot) => {
  const syncData = snapshot.val();
  if (syncData) {
    videoPlayer.currentTime = syncData.currentTime;  // تحديث وقت الفيديو
  }
});

// Toggle chat box visibility
const chatBox = document.getElementById('chat-box');
const chatToggle = document.getElementById('chat-toggle');

chatToggle.addEventListener('click', () => {
  chatBox.style.display = (chatBox.style.display === 'none') ? 'block' : 'none';
});
