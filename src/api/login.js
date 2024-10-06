import { SHA512 } from 'crypto-js'
import { useUserStore } from '@/store/user';
import axios from 'axios';
import { getActivePinia,createPinia } from 'pinia';

async function login(username, password) {


    try {
        const response = await axios.post('https://aie-2024.scauaie.cn/DemoAPI/login.php',
            {
                username: username,
                password: SHA512(password).toString()
            }
        )
        if (response.data.msg === "loginSuccess") {
            // 登录成功
            const token = response.data.token;
            console.log("login success, token: " + token);


            // 检查是否有活跃的 Pinia 实例
            const piniaInstance = getActivePinia() || createPinia();

            // 保存 token 到 store
            const userStore = useUserStore(piniaInstance);
            userStore.setToken(token);


            // userStore.setUserInfo(username.value);

            // 跳转到聊天房间
            return true;
        } else {
            return false;
        }
    } catch (error) {

        console.error('登录错误:', error);

    }
}

export default login;