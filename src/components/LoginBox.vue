<template>
  <div class="auth-container">
    <h2>登录</h2>
    <form @submit.prevent="submitLogin">
      <div class="input-group">
        <label for="login-name">用户名:</label>
        <input id="login-name" type="text" v-model="loginInfo.name" required>
      </div>
      <div class="input-group">
        <label for="login-password">密码:</label>
        <input id="login-password" type="password" v-model="loginInfo.password" required>
      </div>
      <button type="submit" class="auth-button">登录</button>
    </form>
    <p>没有账号？<a href="#" @click="switchToRegister">注册一个</a></p>
  </div>
</template>

<script setup>
import {reactive, defineEmits,} from 'vue';
import { useRouter } from 'vue-router';
import axios from "axios";

const router = useRouter();

const loginInfo = reactive({
  name: '',
  password: ''
});

const emit = defineEmits(['switchState'])


const submitLogin = () => {
  // 这里添加登录逻辑
  console.log('登录信息', loginInfo);
  axios({
    method:'POST',
    url:'http://localhost:8000/api/login'
  }).then((res)=>{
    console.log(res)
    if(res.data.state){
      router.push('/chatroom')
    }
  })
};

const switchToRegister = () => {
  emit('switchState','register')
};
</script>

<style scoped>
.auth-container {
  max-width: 300px;
  margin: 50px auto;
  padding: 20px;
  text-align: center;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  margin-bottom: 5px;
}

.input-group input {
  width: 100%;
  padding: 10px;
}

.auth-button {
  width: 100%;
  padding: 10px 0;
  margin-top: 20px;
  background-color: #30bced;
  border: none;
  color: white;
  cursor: pointer;
}

.auth-button:hover {
  background-color: #1aa6b7;
}
</style>