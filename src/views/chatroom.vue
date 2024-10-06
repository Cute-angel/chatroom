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
        height="128"
        width="100%"
      ></v-sheet>

      <v-list>
        <v-list-item
          v-for="n in 5"
          :key="n"
          :title="`Item ${ n }`"
          link
        ></v-list-item>
      </v-list>
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
      <chatFlow></chatFlow>

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
import  chatFlow from '@/components/messageFlow.vue'
import { ref } from 'vue';
import EventBus from "@/EventBus.js";

const router = useRouter();
const userStore = useUserStore();
const messageContent = ref('');




function Logout() {
  userStore.clearAll()
  router.push({
    name: 'loginPage',
  });
  
}


function send() {


  //get message content
  //send message to server

  EventBus.emit('addMessage',messageContent.value);
  
  messageContent.value = '';

}

</script>

<style  scoped>

.v-icon {
  color: rgb(202, 184, 184);
  display: flex;
  visibility: visible;
  font-size: 24px;
}



</style>