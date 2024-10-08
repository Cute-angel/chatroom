import { createRouter, createWebHistory } from 'vue-router';
import loginPage from '@/views/loginPage.vue';
import chatroom from '@/views/chatroom.vue';
import { useUserStore } from '@/store/user';




const routes = [
  {
    path: '/',
    name: 'loginPage',
    alias: ['/login'],
    component: loginPage
  },
  {
    path: '/chatroom',
    name: 'chatroom',
    component: chatroom,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});


//路由守卫
router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();
  const token = userStore.token;

  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!token) {
      next({
        path: '/login',
        // query: { redirect: to.fullPath },
      });
    } else {
      next();
    }
  } else {
    next();
  }
});


export default router;