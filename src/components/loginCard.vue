<template>
    <!-- // 这里是登录页面的布局 -->


    <div class="box">

        <v-card>
            <v-card-title class="text-h5">
                登录
            </v-card-title>
            <v-card-text>
                <v-form @submit.prevent="submitLogin">
                    <v-text-field v-model="username" label="用户名" required></v-text-field>
                    <v-text-field v-model="password" label="密码" type="password" required></v-text-field>
                    <v-btn type="submit" color="primary" block>
                        登录
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
        <!-- 错误提示 -->
        <v-alert closable=ture close-delay="200" v-model="showError" type="error" dismissible class="mt-4">
            {{ errorMessage }}
        </v-alert>
        <v-alert  closable=true v-model="showSucces" type="sucess" dismissible class="mt-4">
            {{ successMesage }}
        </v-alert>
    </div>


</template>

<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import login from '@/api/login';

export default {
    name: "loginCard",



    setup() {
        // 使用 ref 创建响应式变量
        const username = ref('');
        const password = ref('');
        const router = useRouter();
        const showError = ref(false);
        const errorMessage = ref();
        const showSucces = ref(false);
        const successMesage = ref();

        const submitLogin = async () => {
            if (await login(username.value, password.value)) {
                successMesage.value = '登录成功'
                showSucces.value = true

                for (let i=0;i<=3;i++){
                    
                }
                
                router.push({name: 'chatroom'})
            } else {
                errorMessage.value = '登录失败，请检查用户名或密码'
                showError.value = true

            }
        }



        return {
            username,
            password,
            submitLogin,
            showError,
            errorMessage,
            successMesage,
            showSucces
        };
    }
};



</script>

<style scoped>

.box {
    display: grid;
    
    
}


</style>