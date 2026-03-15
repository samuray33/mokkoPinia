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
            component: () => import('@/components/Registration.vue'),
        },
        {
            name: "Entrance",
            path: "/Entrance",
            component: () => import('@/components/Entrance.vue'),
        },
        {
            name: "Dashboard",
            path: "/Dashboard",
            component: () => import('@/components/Dashboard.vue'),
        },
        {
            name: "AddPost",
            path: "/AddPost",
            component: () => import('@/components/AddPost.vue'),
        },
        {
            name: "Posts",
            path: "/Posts",
            component: () => import('@/components/Posts.vue'),
        }
    ]
});

createApp(App).use(pinia).use(router).mount('#app');
