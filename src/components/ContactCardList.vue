<template>
    <v-container>
        <template v-for="(contact, index) in contacts">
            <ContactCard :name="contact.name" :avatarUrl="contact.avatar" :userId="contact.userId" />
            <v-divider class="mx-3" :class="divider"></v-divider>
        </template>
    </v-container>
</template>

<script>
import ContactCard from '@/components/ContactCard.vue';
import { ref, onMounted } from "vue"
import { useUserStore } from '@/store/user';
import { createPinia, getActivePinia } from 'pinia';
export default {
    name: "ContactCardList",
    components: { ContactCard },


    setup() {
        const contacts = ref([]);

        onMounted(() => {
            const PiniaInstance = getActivePinia() || createPinia()
            const userStore = useUserStore(PiniaInstance);

            contacts.value = userStore.getUserInfo()['friendLst']
        })
        return { contacts };
    }
}


</script>

<style scoped>
#diver1 {
    margin: 0px;
}

ContactCard {
    padding-top: 20px;
}
</style>