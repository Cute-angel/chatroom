<template>
    <v-container>
      <v-row>
        <v-col> 
          <div ref="chatContainer" class="chat-box">


            <ChatMessage v-for="(msg, index) in messages" 
            :key="index" 
            :message="msg.message" 
            :time="msg.time"
            :isSelf="msg.isSelf" 
            :avatar="msg.avatar"
            class="message-bubble"
            elevation="2" />
           
          </div>
        </v-col>
      </v-row>
    </v-container>
  </template>
  
  <script>
  import { ref, onMounted, watch } from "vue";
  import ChatMessage from "./message.vue";
  
  

  export default {
    components : {ChatMessage},
    name: "ChatComponent",
    props:{
        messages:{
            type: Array,
            required: true,
        },
    },


    setup(props) {
      const chatContainer = ref(null);

  
      const scrollToBottom = () => {
        if (chatContainer.value) {
          chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
        }
      };
  
      onMounted(() => {
        scrollToBottom(); // 初次挂载时滚动到底部
      });
  
      watch(
      () => props.messages, // 正确解构 props 的 messages
      () => {
        scrollToBottom();
      },
      { deep: true }
    );
      return { chatContainer};
    }
  };
  </script>
  
  <style scoped>
  .chat-box {
    height: 75vh;
    overflow-y: auto;
    /* /* padding: 16px; */
    background-color: #f5f5f5;
    /* border-radius: 8px;  */
  }
  

  </style>