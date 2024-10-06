<template>
  <v-card class="pa-3 d-flex align-center" flat>
    <!-- 左侧头像部分 -->
    <v-avatar size="56" class="mr-4">
      <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" style="object-fit: cover; width: 100%; height: 100%;" />
      <v-avatar v-else color="primary" class="white--text">{{ nameInitial }}</v-avatar>
    </v-avatar>


    <!-- 右侧联系人信息部分 -->
    <div>
      <div class="font-weight-bold">{{ name }}</div>
      <div class="text-body-2 text--secondary">{{ latestMessage }}</div>
    </div>
  </v-card>
</template>
  <script>
  export default {
    name: 'ContactCard',
    props: {
      name: {
        type: String,
        required: true
      },
      avatarUrl: {
        type: String,
        default: ''
      },
      latestMessage: {
        type: String,
        default: 'No messages yet.'
      }
    },
    computed: {
      nameInitial() {
        return this.name ? this.name.charAt(0).toUpperCase() : '';
      }
    }
  };
  </script>
  
  <style scoped>
  .v-card {
    width: 100%;
    max-width: 400px;
  }
  </style>