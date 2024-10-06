<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" md="6">
        <loginCard></loginCard>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
;
import loginCard from '@/components/loginCard.vue';

export default {

  components: { loginCard },
  setup() {


  },
};
</script>


<style scoped>
.v-container {
  margin-top: 10%;
}
</style>