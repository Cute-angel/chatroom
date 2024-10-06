<template>
    <v-container>
        <v-row>
            <v-col cols="12" ref="chatContainer">
                <ChatMessage v-for="(msg, index) in messages" :key="index" :message="msg.message" :time="msg.time"
                    :isSelf="msg.isSelf" :avatar="msg.avatar" />
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import ChatMessage from "@/components/message.vue"
import {  onUnmounted,nextTick,ref, onMounted,  watch } from "vue";
import EventBus from "@/EventBus.js";
import { useUserStore } from "@/store/user";
import { createPinia,getActivePinia } from 'pinia';

export default {
    name: "MessageFlow",
    components: {ChatMessage},
    setup() {
        const messages = ref([
            {
                message: "Hello, how are you?",
                time: getCurrentTime(),
                isSelf: true,
                avatar: "https://example.com/avatar2.jpg",
            }


        ]);

        const chatContainer = ref();
        function scrollToBottom() {
        if (chatContainer.value) {
            chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
           }      
        }
        function getCurrentTime() {
        const date = new Date();
        let hours = date.getHours();
        let  minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // 将小时转换为12小时制
        hours = hours % 12;
        hours = hours ? hours : 12; // 小时为0时显示为12
        const strMinutes = minutes < 10 ? '0' + minutes : minutes; // 确保分钟是两位数
        
        return `${hours}:${strMinutes} ${ampm}`; // 返回格式化的时间字符串
        };

        function addMessage(text)  {
            const message = 
                {
                message: text,
                time: getCurrentTime(),
                isSelf: true,
                avatar: "https://example.com/avatar2.jpg",
            };
            messages.value.push(message);
             scrollToBottom();
        };

        onMounted(() => {
           
            nextTick(() => {
              scrollToBottom();
            });
            EventBus.on("addMessage", addMessage);
        });

        onUnmounted(() => {
            EventBus.off("addMessage", addMessage); // 记得解绑事件
        });

        return { messages, chatContainer,scrollToBottom};
    }
};



</script>

<style scoped></style>