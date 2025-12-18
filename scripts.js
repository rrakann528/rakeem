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
// وظيفة تحميل الفيديو بناءً على الرابط المدخل
const loadVideoButton = document.getElementById('load-video');
const videoUrlInput = document.getElementById('video-url-input');
const videoPlayer = document.getElementById('video-player');

// وظيفة لتحميل الفيديو بناءً على الرابط
loadVideoButton.addEventListener('click', () => {
  const videoUrl = videoUrlInput.value;
  
  // تحقق من نوع الرابط (YouTube أو MP4 أو M3U8)
  if (videoUrl.includes("youtube.com")) {
    // إذا كان الرابط من YouTube
    const videoId = videoUrl.split("v=")[1];
    videoPlayer.src = `https://www.youtube.com/embed/${videoId}`;
  } else if (videoUrl.endsWith(".mp4") || videoUrl.endsWith(".m3u8")) {
    // إذا كان الرابط MP4 أو M3U8
    videoPlayer.src = videoUrl;
  } else {
    alert("يرجى إدخال رابط صالح من YouTube أو MP4 أو M3U8.");
  }
});
// وظائف إنشاء والانضمام إلى الغرفة
const createRoomButton = document.getElementById('create-room');
const joinRoomButton = document.getElementById('join-room');
const roomIdInput = document.getElementById('room-id-input');

// إنشاء غرفة جديدة
createRoomButton.addEventListener('click', () => {
  const roomId = roomIdInput.value;
  if (roomId) {
    // إنشاء غرفة جديدة في Firebase
    set(ref(database, 'rooms/' + roomId), {
      videoUrl: videoPlayer.src,
      messages: []
    }).then(() => {
      alert("تم إنشاء الغرفة بنجاح!");
    });
  } else {
    alert("يرجى إدخال رقم غرفة.");
  }
});

// الانضمام إلى غرفة موجودة
joinRoomButton.addEventListener('click', () => {
  const roomId = roomIdInput.value;
  if (roomId) {
    // تحميل معلومات الغرفة من Firebase
    const roomRef = ref(database, 'rooms/' + roomId);
    onValue(roomRef, (snapshot) => {
      const roomData = snapshot.val();
      if (roomData) {
        videoPlayer.src = roomData.videoUrl; // تحميل الفيديو من الغرفة
        alert("تم الانضمام إلى الغرفة بنجاح!");
      } else {
        alert("الغرفة غير موجودة.");
      }
    });
  } else {
    alert("يرجى إدخال رقم غرفة.");
  }
});
const loadVideoButton = document.getElementById('load-video');
const videoUrlInput = document.getElementById('video-url-input');
const videoPlayer = document.getElementById('video-player');
const videoContainer = document.getElementById('video-container'); // حاوية الفيديو

loadVideoButton.addEventListener('click', () => {
  const videoUrl = videoUrlInput.value;
  
  // تحقق من نوع الرابط (YouTube أو MP4 أو M3U8)
  if (videoUrl.includes("youtube.com")) {
    // إذا كان الرابط من YouTube
    const videoId = videoUrl.split("v=")[1];
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=1`; // إضافة ?autoplay=1 لتشغيل الفيديو مباشرة
    iframe.frameBorder = '0';
    iframe.allow = 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture';
    iframe.allowFullscreen = true;
    
    // حذف فيديو MP4 أو M3U8 القديم وإضافة iframe
    videoContainer.innerHTML = ''; // مسح الفيديو السابق
    videoContainer.appendChild(iframe); // إضافة iframe
  } else if (videoUrl.endsWith(".mp4") || videoUrl.endsWith(".m3u8")) {
    // إذا كان الرابط MP4 أو M3U8
    videoPlayer.src = videoUrl;
    videoContainer.innerHTML = ''; // مسح iframe السابق
    videoContainer.appendChild(videoPlayer); // إعادة الفيديو إلى الحاوية
  } else {
    alert("يرجى إدخال رابط صالح من YouTube أو MP4 أو M3U8.");
  }
});
