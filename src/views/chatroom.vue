<template>

  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>

      <!-- <v-icon>mdi-square</v-icon>

      <v-icon>mdi-circle</v-icon>

      <v-icon>mdi-triangle</v-icon> -->
    </v-system-bar>

    <v-navigation-drawer
      color="grey-lighten-3"
      rail
    >
      <v-avatar
        class="d-block text-center mx-auto mt-4"
        color="grey-darken-1"
        size="36"
        :image="selfAvatarPath"
      ></v-avatar>

      <v-divider class="mx-3 my-5"></v-divider>

      <v-avatar
        v-for="n in 6"
        :key="n"
        class="d-block text-center mx-auto mb-9"
        color="grey-lighten-1"
        size="28"
      ></v-avatar>
    </v-navigation-drawer>

    <v-navigation-drawer width="244">
      <v-sheet
        color="grey-lighten-5"
        height="72"
        width="100%"
      ></v-sheet>
      <ContactCardList v-if="isUserInfoLoaded"></ContactCardList>

    </v-navigation-drawer>

    <v-app-bar
      class="px-3"
      color="grey-lighten-4"
      height="72"
      flat
    >
      <v-spacer></v-spacer>

      <v-responsive max-width="156">

        <v-btn id="logoutBtn"
         rounded="pill"
         prepend-icon="mdi-logout"
         @click = "Logout"
         >Logout</v-btn>
        <!-- <v-text-field
          bg-color="grey-lighten-1"
          density="compact"
          rounded="pill"
          variant="solo-filled"
          flat
          hide-details
        ></v-text-field> -->
      </v-responsive>
    </v-app-bar>

      <v-main>
              <ChatComponent :messages="messages"></ChatComponent>
      </v-main>

    <v-navigation-drawer location="right">
      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`Item ${ n }`"
          link
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-footer
      height="72"
      app
    >
    <toolbar></toolbar>
    <v-text-field
      v-model="messageContent"
      bg-color="grey-lighten-2"
      class="overflow-hidden"
      density="compact"
      rounded="pill"
      variant="solo-filled"
      flat
      hide-details
      placeholder="Type a message"
      @keydown.enter="send"
    >
      <template v-slot:append>
        <v-btn flat @click="send" icon>
          <v-icon >mdi-send</v-icon>
        </v-btn>
      </template>
    </v-text-field>

  
    </v-footer>
  </v-app>
</template>



<script setup>


import { useUserStore } from '@/store/user';
import { useRouter } from 'vue-router';
import ChatComponent from '@/components/Chatcompnents.vue'
import { ref ,onMounted} from 'vue';
import EventBus from "@/EventBus.js";
import getUserinfo from '@/api/getUserInfo';
import { createPinia,getActivePinia } from 'pinia';
import { getCurrentTime } from '@/utils';
import ContactCardList from '@/components/ContactCardList.vue';
import toolbar from '@/components/toolbar.vue';


const router = useRouter();
const PiniaInstance = getActivePinia() || createPinia()
const userStore = useUserStore(PiniaInstance);
const messageContent = ref('');
const isUserInfoLoaded = ref(false);
let selfAvatarPath = ref('');
let messages = ref([]);

// components = {ChatComponent}

function Logout() {
  userStore.clearAll()
  router.push({
    name: 'loginPage',
  });
  
}


function send() {
  const text = messageContent.value
  //build a msg 
  const msg = {
    message: text,
    time: getCurrentTime(),
    isSelf: true,
    avatar: selfAvatarPath,
  }
  //send message to server

  // if(sendMsg(text, 2)){


  
  if(true){
    // console.log(msg)  //  msg , useid
    messages.value.push(msg)
    console.log(messages.value)
  } 


  EventBus.emit('addMessage', messageContent.value);

  messageContent.value = '';

}


onMounted(()=> {
  const userInfo = getUserinfo(true)
  userStore.setUserInfo(userInfo)
  console.log(userInfo)
  //load Avatar
  selfAvatarPath = userStore.getUserInfo()['avatar']

  // 确保在用户信息加载完后才渲染ContactCardList
  isUserInfoLoaded.value = true;

  
});
</script>

<style  scoped>

.v-icon {
  color: rgb(202, 184, 184);
  display: flex;
  visibility: visible;
  font-size: 24px;
}

.chat_container {
  display: flex;
  flex-direction: column;

}


</style>