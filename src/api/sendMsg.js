import axios from "axios";
import { useUserStore } from "@/store/user";

async function send(msg, to) {
    const token = useUserStore().getToken()

    try {
        const response = await axios.post(
            'https://aie-2024.scauaie.cn/DemoAPI/sendMessage.php',
            {
                msg: msg,
                token: token
            }
        )

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

export default send;