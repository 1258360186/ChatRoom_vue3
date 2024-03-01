<template>
  <div class="auth-container">
    <h2>注册</h2>
    <form @submit.prevent="submitRegister">
      <div class="input-group">
        <label for="register-name">用户名:</label>
        <input id="register-name" type="text" v-model="registerInfo.email" required>
      </div>
      <div class="input-group">
        <label for="register-password">密码:</label>
        <input id="register-password" type="password" v-model="registerInfo.password" required>
      </div>
      <div class="input-group">
        <label for="register-repassword">确认密码:</label>
        <input id="register-repassword" type="password" v-model="registerInfo.repassword" required>
      </div>
      <button type="submit" class="auth-button">注册</button>
    </form>
    <p>已有账号？<a href="#" @click="switchToLogin">登录</a></p>
  </div>
</template>

<script setup>
import {reactive, defineEmits, computed} from 'vue';
import Swal from 'sweetalert2'

const registerInfo = reactive({
  email: '',
  password: '',
  repassword: '',
});
const emit = defineEmits(['switchState'])

const showPasswordMismatch = computed(() => {
  return registerInfo.repassword && registerInfo.password !== registerInfo.repassword;
});

const submitRegister = () => {
  // 这里添加注册逻辑
  if(!showPasswordMismatch.value){
    console.log('注册信息', registerInfo);
    // 假设注册成功后，导航至登录页面
    emit('switchState','login')
    return
  }
  Swal.fire({
    icon: "error",
    title: "注册失败",
    text: "密码不一致",
  });
};

const switchToLogin = () => {
  emit('switchState','login')
};
</script>

<!-- 注册界面的样式和登录界面相似，你可以根据你的设计标准来修改 -->
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