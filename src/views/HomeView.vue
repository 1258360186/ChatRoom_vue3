<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png">
<!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
    <LoginBox v-if="state == 'login'" @switch-state="switchState"/>
    <RegisterBox v-else-if="state == 'register'" @switch-state="switchState"/>
  </div>
</template>

<script setup>
// @ is an alias to /src
import LoginBox from "@/components/LoginBox.vue";
import RegisterBox from "@/components/RegisterBox.vue";
import {ref} from "vue";

const state = ref('login');
const switchState = (lstate) => {
  state.value = lstate
}

</script>
