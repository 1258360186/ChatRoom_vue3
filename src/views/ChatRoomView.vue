<template>
  <div class="chatroom-container">
    <div class="messages">
      <div
          v-for="message in messages"
          :key="message.id"
          :class="{'my-message': message.isMine, 'other-message': !message.isMine}"
      >
        <span class="username">{{ message.username }}:</span>
        <div class="message-content">{{ message.content }}</div>
      </div>
    </div>
    <div class="input-area">
      <input
          v-model="newMessage"
          @keyup.enter="sendMessage"
          placeholder="Type a message..."
          type="text"
          class="message-input"
      >
      <button @click="sendMessage" class="send-button">Send</button>
    </div>
  </div>
</template>

<script setup>
import { ref} from 'vue';


// 消息数组
const messages = ref([]);

const ws = ref({})

// 新消息
const newMessage = ref('');

// 发送消息方法 (这里你需要集成后端的消息发送逻辑)
function sendMessage() {
  if (newMessage.value.trim()) {
    const message = {
      id: Date.now(),
      content: newMessage.value,
      username: 'You', // 暂时标识为'You'——在实际应用中，你会根据用户数据来设置
      isMine: true
    };
    let text_data = JSON.stringify(message)
    ws.value.send(text_data)
    // messages.value.push(message);
    newMessage.value = ''; // 清空输入框
  }
}

function initWebSocket(){
  ws.value = new WebSocket(`ws://127.0.0.1:8000/chat/`)
  //  //连接发生错误的回调方法
  ws.value.onerror = function () {
    console.log("ws连接发生错误");
  };
  //连接成功建立的回调方法
  ws.value.onopen = function () {
    console.log("ws连接成功");
  }
  //接收到消息的回调方法
  ws.value.onmessage = function (event) {
    const message = JSON.parse(event.data)
    messages.value.push(message);
  }
  //连接关闭的回调方法
  ws.value.onclose = function () {
    console.log("ws连接关闭");
  }
}

initWebSocket()


</script>

<style scoped>
.chatroom-container {
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  height: 90vh;
  width: 70%;
  background-color: #f0f0f0;
  border-radius: 8px;
  overflow: hidden;
}

.messages {
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
  background-image: url('https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/57533d91-6d1c-4fe8-4506-8924a686cd00/original=true/147597.jpeg'); /* 选择一张云朵图片作为背景 */
}

.message-content {
  display: inline-block;
  padding: 10px 15px;
  border-radius: 18px;
  margin: 5px;
  max-width: 70%;
}

.my-message {
  text-align: right;
}

.my-message .message-content {
  background-color: #9ad3bc; /* 清新的湖水蓝 */
  color: white;
}

.other-message .message-content {
  background-color: #ffffff; /* 朦胧的云朵白 */
  color: #333;
}

.username {
  font-weight: bold;
  margin-right: 6px;
}

.input-area {
  display: flex;
  padding: 10px;
  border-top: solid 1px #ccc;
}

.message-input {
  flex-grow: 1;
  border: none;
  padding: 10px 15px;
  border-radius: 18px;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  background-color: #30bced; /* 夏日午后的天空蓝 */
  border: none;
  border-radius: 18px;
  color: white;
  cursor: pointer;
}

.send-button:hover {
  background-color: #1aa6b7;
}

input:focus, button:focus {
  outline: none;
}

/* 额外：滚动条样式 */
.messages::-webkit-scrollbar {
  width: 8px;
}

.messages::-webkit-scrollbar-thumb {
  background-color: #9ad3bc;
  border-radius: 10px;
}

.messages::-webkit-scrollbar-track {
  background-color: #e0e0e0;
}
</style>