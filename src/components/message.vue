<template>
  <v-container>
    <v-row>
      <!-- 如果消息是用户自己发的，头像在右，气泡在左 -->
      <v-col cols="12" class="d-flex" :class="{ 'justify-end': isSelf }">
        <!-- 他人发的消息，头像在左 -->
        <v-avatar v-if="!isSelf" size="40" class="mr-2">
          <img v-if="avatar" :src="avatar" alt="avatar" style="object-fit: cover; width: 100%; height: 100%; margin-top:3px;margin-bottom :3px" />
          <v-avatar v-else color="primary" class="white--text" >{{ nameInitial }}</v-avatar>
        </v-avatar>

        <!-- 消息气泡 -->
        <v-card :class="{
          'ml-2': isSelf,
          'mr-2': !isSelf,
          'pa-3': true,
          'align-self-end': true
        }" :color="isSelf ? 'blue lighten-4' : 'grey lighten-3'" :style="{ maxWidth: '75%', wordBreak: 'break-word' }">
          <v-card-text class="py-1 px-3">
            <template v-if="type === 'text'">
              <p class="mb-1" style="white-space: pre-line">{{ message }}</p>
            </template>
            <template v-else-if="type === 'image'">
              <v-img :src="message" max-width="100%" size="200px"></v-img>
            </template>
            <template v-else-if="type === 'location'">
              <a :href="message">Location click to open</a><br>
              <!-- <iframe :src="message" max-width="100%" height="200" frameborder="0" allowfullscreen style="transform: scale(1)"></iframe><br> -->
            </template>
            <!-- Time -->
            <small class="grey--text">{{ time }}</small>
          </v-card-text>
        </v-card>

        <!-- 自己发的消息，头像在右 -->
        <v-avatar v-if="isSelf" size="40" class="ml-2">
          <v-img :src="avatar" />
        </v-avatar>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import {ref} from 'vue'
import { getSelectedUserName } from '@/api/getSelectedUserName';


let  name = ref()
export default {
  name: "ChatMessage",
  props: {
    message: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    isSelf: {
      type: Boolean,
      required: true,
    },
    avatar: {
      type: String,
      required: true,
    },
    type: {

      // text , location , file , image
      type: String,
      default: 'text'
    },
    userId:{
      
    }
  },
  computed: {
    nameInitial() {

      name = getSelectedUserName(this.userId)
      return name ? name.charAt(0).toUpperCase() : '';
    }
  },
};
</script>

<style scoped></style>