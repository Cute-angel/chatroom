<template>
    <v-container>
        <ContactCard v-for="(contact,index) in contacts"
        :name="contact.name"
        :avatarUrl="contact.avatar"/>

    </v-container>
</template>

<script>
    import ContactCard from './contactCard.vue';
    import { ref,onMounted } from "vue"
    import { useUserStore } from '@/store/user';
    import { createPinia ,getActivePinia } from 'pinia';
    export default {
        name:"ContactCardList",
        components:{ContactCard},


        setup (){
            const contacts = ref([]);

            onMounted (() => {
                const PiniaInstance = getActivePinia() || createPinia()
                const userStore = useUserStore(PiniaInstance);

                contacts.value = userStore.getUserInfo()['friendLst']
            })
            return {contacts};
        }
    }


</script>

<style scoped>

</style>