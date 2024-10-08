<template>
  <v-container class="d-flex flex-column">
    <v-row class="flex-frow-1">
      <v-col>
        <div ref="chatContainer" class="chat-box">
          <transition-group name="msg-fade" tag="div" @after-enter="handleAfterEnter">
            <ChatMessage v-for="(msg, index) in messages" :key="index" :message="msg.message" :time="msg.time"
              :isSelf="msg.isSelf" :avatar="msg.avatar" :type="msg.type" :user-id="msg.userId" :class="message - bubble"
              elevation="2" />
          </transition-group>
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ref, onMounted, watch, onBeforeUnmount, nextTick } from "vue";
import ChatMessage from '@/components/Message.vue'
import { getActivePinia, createPinia, storeToRefs } from "pinia";
import { useUserStore } from "@/store/user";

export default {
  components: { ChatMessage },
  name: "ChatComponent",



  setup(props) {
    const chatContainer = ref(null);
    const messages = ref([]);
    const PiniaInstance = getActivePinia() || createPinia();
    const userStore = useUserStore(PiniaInstance)
    const { friendSelected, msgsDict } = storeToRefs(userStore);


    const scrollToBottom = () => {
      if (chatContainer.value) {
        chatContainer.value.scrollTop = chatContainer.value.scrollHeight;
      }
    };

    const adjustHeight = () => {
      if (chatContainer.value) {
        chatContainer.value.style.maxHeight = `${window.innerHeight - 72 - 72 - 56}px`
      }
    }

    const handleAfterEnter = () => {
      nextTick(() => {
        scrollToBottom()
      })
    }

    onMounted(() => {
      window.addEventListener('resize', adjustHeight);
      adjustHeight();

      // scrollToBottom(); // 初次挂载时滚动到底部
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', adjustHeight)
    })

    // watch(
    //   () => props.messages, // 正确解构 props 的 messages
    //   () => {
    //     scrollToBottom();
    //   },
    //   { deep: true }

    // );


    watch([friendSelected, msgsDict], ([newFriendId, newmsgsDict]) => {
      console.log(msgsDict.value[newFriendId])
      if (msgsDict.value[newFriendId]) {
        messages.value = msgsDict.value[newFriendId];
      } else {
        messages.value = []; // 如果没有消息，则显示空列表
      }
    }, { immediate: true, deep: true }
    );

    return { chatContainer, handleAfterEnter, messages };
  }
};
</script>

<style scoped>
.chat-box {
  /* height: 75vh; */
  overflow-y: auto;
  /* /* padding: 16px; */
  background-color: #f5f5f5;
  /* border-radius: 8px;  */
  flex-grow: 1;
}
.msg-fadet-move,
.msg-fade-enter,
.msg-fade-leave-active {
  transition: all 0.25s;
  transform: 0.2s;
}

.msg-fade-enter,
.msg-fade-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

.msg-fade-active {
  position: absolute;
}


</style>