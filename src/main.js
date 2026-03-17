import { createRouter, createWebHistory } from 'vue-router';
import { createPinia } from 'pinia';

import { createApp } from 'vue';
import App from './App.vue';

// тут наша пиниа
const pinia = createPinia()

// тут наш роутер
const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/', //это начальный роут
            redirect: '/Entrance'
        },
        {
            name: "Registration",
            path: "/Registration",
            component: () => import('@/Pages/Registration.vue'),
        },
        {
            name: "Entrance",
            path: "/Entrance",
            component: () => import('@/Pages/Entrance.vue'),
        },
        {
            name: "Dashboard",
            path: "/Dashboard",
            component: () => import('@/Pages/Dashboard.vue'),
        },
        {
            name: "AddPost",
            path: "/AddPost",
            component: () => import('@/Pages/AddPost.vue'),
        },
        {
            name: "Posts",
            path: "/Posts",
            component: () => import('@/Pages/Posts.vue'),
        }
    ]
});

createApp(App).use(pinia).use(router).mount('#app');
