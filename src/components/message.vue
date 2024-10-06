<template>
  <v-container>
    <v-row>
      <!-- 如果消息是用户自己发的，头像在右，气泡在左 -->
      <v-col cols="12" class="d-flex" :class="{ 'justify-end': isSelf }">
        <!-- 他人发的消息，头像在左 -->
        <v-avatar v-if="!isSelf" size="40" class="mr-2">
          <v-img :src="avatar" />
        </v-avatar>

        <!-- 消息气泡 -->
        <v-card :class="{
          'ml-2': isSelf,
          'mr-2': !isSelf,
          'pa-3': true,
          'align-self-end': true
        }" :color="isSelf ? 'blue lighten-4' : 'grey lighten-3'"
          :style="{ maxWidth: '75%', wordBreak: 'break-word' }">
          <v-card-text class="py-1 px-3">
            <p class="mb-1" style="white-space: pre-line">{{ message }}</p>
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
  },
};
</script>

<style scoped></style>