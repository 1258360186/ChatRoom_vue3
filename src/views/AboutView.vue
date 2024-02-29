<template>
  <div class="about">
    <h1>This is an about page</h1>
    <h2>{{teststring}}</h2>
  </div>
</template>


<script setup>
import {ref} from "vue";
import { onMounted } from 'vue'
import axios from "axios";

const teststring = ref('')



function foo() {
  axios({
    method:'GET',
    url:'http://localhost:8000/api/'
  }).then((res)=>{
    teststring.value=res.data.message
  })
}

onMounted(() => {
  foo()
})

</script>
