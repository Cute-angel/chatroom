<template>

  <v-app id="inspire">
    <v-system-bar>
      <v-spacer></v-spacer>
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
              <ChatComponent :messages="messages" v-if="isUserInfoLoaded"></ChatComponent>
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
      <p>this will add a contactDetailCard(todo)</p>
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
import { ref ,onMounted , watch} from 'vue';
import getUserinfo from '@/api/getUserInfo';
import { createPinia,getActivePinia } from 'pinia';
import { getCurrentTime } from '@/utils';
import ContactCardList from '@/components/ContactCardList.vue';
import toolbar from '@/components/toolbar.vue';
import { getMsglist } from '@/api/getMsg';
import sendMsg from '@/api/sendMsg';


const router = useRouter();
const PiniaInstance = getActivePinia() || createPinia()
const userStore = useUserStore(PiniaInstance);
const messageContent = ref('');
const isUserInfoLoaded = ref(false);
let selfAvatarPath = ref('');
let messages = ref([]);
let messagesDict = ref({});

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
    type:'text',
    message: text,
    time: getCurrentTime(),
    isSelf: true,
    avatar: selfAvatarPath,
  }

    //send msg2server
  


  const selectedUser = userStore.getFriendSelected()
  if(selectedUser){
    if(sendMsg(text, selectedUser)){
    
    console.log(messages.value)

    userStore.msgsDict[selectedUser].push(msg)
    messageContent.value = '';
    } 
  } else{
    console.warn('you need to choose a friend')
  }
  



}


onMounted(()=> {
  //loadUserInfo
  const userInfo = getUserinfo(true)
  userStore.setUserInfo(userInfo)
  console.log(userInfo)
  //load Avatar
  selfAvatarPath = userStore.getUserInfo()['avatar']
  //getHistoryMsgs
  for (var contactKey in userInfo['friendLst']) {
    const contact = userInfo['friendLst'][contactKey]

    const userId = contact['userId']
    const msglist = getMsglist(userId,true)
    // console.log(msglist)
    messagesDict.value[userId.toString()] = msglist
  }

  // saveMsgsDict to localStorage
  userStore.setMsgDict(messagesDict.value)
  console.log(userStore.getMsgsDict())

  // 确保在用户信息加载完后才渲染ContactCardList
  isUserInfoLoaded.value = true;

  
});


watch(() => userStore.getFriendSelected(), 
      () => {
        // do something
      },)
</script>

<style  scoped>

.v-icon {
  color: rgb(202, 184, 184);
  display: flex;
  visibility: visible;
  font-size: 24px;
}
/* 
.chat_container {
  display: flex;
  flex-direction: column;

} */


</style>