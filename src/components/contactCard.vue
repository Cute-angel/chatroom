<template>
  <div class="">

    <v-card class="d-flex align-center Contact" flat :class="{ focused: isFocused }" @click="toggleFocus">
    <!-- 左侧头像部分 -->
    <v-avatar size="56" class="mr-4">
      <img v-if="avatarUrl" :src="avatarUrl" alt="avatar" style="object-fit: cover; width: 100%; height: 100%; margin-top:3px;margin-bottom :3px" />
      <v-avatar v-else color="primary" class="white--text" >{{ nameInitial }}</v-avatar>
    </v-avatar>


    <!-- 右侧联系人信息部分 -->
    <div>
      <div class="font-weight-bold">{{ name }}</div>
      <div class="text-body-2 text--secondary">{{ latestMessage }}</div>
    </div>
  </v-card>
  </div>
  
</template>
<script>
import { ref ,watch} from'vue';
import { createPinia ,getActivePinia } from 'pinia';
import { useUserStore } from '@/store/user';

export default {
  name: 'ContactCard',
  props: {
    name: {
      type: String,
      required: true
    },

    userId:{
      required:true
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
  },
  setup(props) {
    let isFocused = ref(false);

    const PiniaInstance = getActivePinia()||createPinia();
    const userStore = useUserStore(PiniaInstance)
    const useId =  userStore.getFriendSelected()
    

    const  changeStyle= () => {

      if (props.userId.toString() == userStore.getFriendSelected()){

          isFocused.value = true
      } else{

        isFocused.value = false
      }

    };


    const toggleFocus = () =>{
      userStore.setFriendSelected(props.userId)

    }

    
    watch(
      () => userStore.getFriendSelected(), 
      () => {
        changeStyle();
      },
    );

    return {
      isFocused,
      toggleFocus,
    };
  }
};
</script>

<style scoped>
v-card {
  width: 100%;
  max-width: 400px;
  padding: 0px;
}


.focused {
/* 
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1); */
  background-color: #f0f0f0;
  color: rgb(71, 131, 221);
}

.Contact {

  
  margin-top: 3px;
  margin-bottom: 3px;
}


</style>