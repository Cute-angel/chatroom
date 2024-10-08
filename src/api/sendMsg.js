import axios from "axios";
import { useUserStore } from "@/store/user";
import { getActivePinia, createPinia } from "pinia";
async function sendMsg(msg, to) {
    // 检查是否有活跃的 Pinia 实例
    const piniaInstance = getActivePinia() || createPinia();
    const token = useUserStore(piniaInstance).getToken()

    try {
        const response = await axios.post(
            'https://aie-2024.scauaie.cn/DemoAPI/sendMessage.php',
            {
                msg: msg,
                token: token
            }
        )
        // //debuger
        // console.log(response.data)
        if (response.data == 'success') {
            return true
        }
        else {
            return false;
        }
    } catch (error) {
        console.error('send error:', error);
    }
}

export default sendMsg;