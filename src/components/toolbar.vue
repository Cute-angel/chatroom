<template>
    <v-card class="more-icon" @click.stop="toggleToolbar" flat>

      <v-menu v-model="showToolbar" offset-y class="menu" flat>
        <template #activator="{ props }">
          <v-btn v-bind="props" icon flat class="btn"  elevation="2">
            <v-icon>mdi-dots-vertical</v-icon>
          </v-btn>
        </template>


        <v-list>
          <v-list-item @click="selectImage">
            <v-list-item-icon>
              <v-icon>mdi-image</v-icon>
            </v-list-item-icon>
          </v-list-item>

          <v-list-item @click="selectFile">
            <v-list-item-icon>
              <v-icon>mdi-file</v-icon>
            </v-list-item-icon>
          </v-list-item>
        </v-list>

      </v-menu>
    </v-card>
  </template>
  

  
  <style scoped>
  .more-icon {
    cursor: pointer;
    margin-right: 2px;
    margin-bottom: 2px;
    
  }

  /* .menu {
    margin: 20px;

  } */



  .btn {
    margin: 2px;
    margin-right:4px;
  }
  </style>  
  <script setup>
  import { ref } from 'vue';
  
  const showToolbar = ref(false);
  
  const toggleToolbar = () => {
    showToolbar.value = !showToolbar.value;
  };
  
  const selectImage = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = 'image/*';
    input.onchange = (event) => {
      const file = event.target.files[0];
      // 处理选中的图像文件
      console.log(file);
    };
    input.click();
  };
  
  const selectFile = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (event) => {
      const file = event.target.files[0];
      // 处理选中的文件
      console.log(file);
    };
    input.click();
  };
  </script>