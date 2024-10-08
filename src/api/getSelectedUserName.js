import { getActivePinia, createPinia } from "pinia";
import { useUserStore } from "@/store/user";

const PiniaInstance = getActivePinia() || createPinia()
const userStore = useUserStore(PiniaInstance)

export function getSelectedUserName(id) {
    userStore.getFriendSelected
    for (var i in userStore.userInfo['friendLst']) {
        var friend = userStore.userInfo['friendLst'][i]
        if (friend['userId'] == id) {
            return friend['name']
        }
    }
    return 'null'
}