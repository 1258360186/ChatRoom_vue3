<template>
  <div class="chatroom-container">
    <div class="messages">
      <div
          v-for="message in messages"
          :key="message.id"
          :class="{'my-message': message.isMine, 'other-message': !message.isMine}"
      >
        <!-- 消息块显示头像、用户名和消息 -->
        <div class="message-block">
          <!-- 如果不是自己的消息，显示用户头像 -->
          <img :src="message.avatar" class="avatar" >
          <div class="message-with-username">
            <!-- 如果不是自己的消息，显示用户名 -->
            <div class="message-username">{{ message.username }}</div>
            <div class="message-content">{{ message.content }}</div>
          </div>
        </div>
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
import {nextTick, onMounted, ref} from 'vue';
import {useStore} from "vuex";
import {useRouter} from "vue-router";


// 消息数组
const messages = ref([]);

const ws = ref({})

const name = ref('')
const headimg =ref('')
const token =ref('')
const router = useRouter();
const store = useStore()

// 新消息
const newMessage = ref('');

onMounted(() => {
  token.value=store.state.userinfo.token
  if(!token.value.trim()){
    router.push('/')
    return
  }
  initWebSocket()
  name.value=store.state.userinfo.nickName
  console.log(name)
  headimg.value=store.state.userinfo.headImg
  console.log(headimg)
})

// 设置消息元素的引用
const scrollToBottom = () => {
  nextTick(() => {
    const messagesContainer = document.querySelector(".messages");
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  });
};

// 发送消息方法 (这里你需要集成后端的消息发送逻辑)
function sendMessage() {
  if (newMessage.value.trim()) {
    const message = {
      id: Date.now(),
      content: newMessage.value,
      username: name.value, // 暂时标识为'You'——在实际应用中，你会根据用户数据来设置
      isMine: true,
      avatar:headimg.value //require("C:\\Users\\Administrator\\Pictures\\Saved Pictures\\teat.jpg")
    };
    let text_data = JSON.stringify(message)
    ws.value.send(text_data)
    // messages.value.push(message);
    newMessage.value = ''; // 清空输入框
  }
}

function initWebSocket(){
  ws.value = new WebSocket(`ws://127.0.0.1:8000/chat/room_name/`)
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
    const message = JSON.parse(event.data).message
    messages.value.push(message);
    scrollToBottom();
  }
  //连接关闭的回调方法
  ws.value.onclose = function () {
    console.log("ws连接关闭");
  }
}




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

.messages::-webkit-scrollbar{
  width: 0;
  height: 0;
}



.message-block {
  display: flex;
  margin-bottom: 10px;
  justify-content: flex-end;  /* This ensures the entire message block is aligned to the end (right) for 'my-message' */
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  margin-bottom: 5px;
  /* Move the margin to the other side for .my-message */
  margin-left: 10px;
}

.my-message .message-block {
  justify-content: flex-end;
  align-items: flex-end;
}

.my-message .avatar {
  order: 2; /* 把头像放在最右边 */
  margin-left: 10px; /* 和其他元素保持一定间距 */
  align-self: auto; /* 重置对齐，由容器的align-items属性决定 */
}

.my-message .message-with-username {
  order: 1; /* 使用户名和消息内容在头像的左边 */
  align-items: flex-end; /* 右对齐用户名和消息 */
}

.other-message .message-block {
  justify-content: flex-start;
  align-items: flex-end;
}

.other-message .avatar {
  order: 1; /* 把头像放在最左边 */
  margin-right: 10px; /* 和其他元素保持一定间距 */
  align-self: auto; /* 重置对齐，由容器的align-items属性决定 */
}

.other-message .message-with-username {
  order: 2; /* 使用户名和消息内容在头像的左边 */
  align-items: flex-start; /* 右对齐用户名和消息 */
}

.message-content {
  max-width: 70%;
  padding: 10px 15px;
  border-radius: 18px;
  margin: 5px;
}

.my-message .message-content {
  background-color: #7cb342; /* 微信主题绿色 */
  color: white;
  align-self: flex-end;
}

.other-message .message-content {
  background-color: #ffffff; /* 白色背景 */
  color: black;
  align-self: flex-start;
}

.my-message .message-username {
  font-size: 12px;
  color: black;
  margin-left: 30px;
  margin-bottom: 2px;

}

.other-message .message-username {
  font-size: 12px;
  color: black;
  margin-left: -30px;
  margin-bottom: 2px;

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