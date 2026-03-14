import { createRouter, createWebHistory } from 'vue-router';

import { createApp } from 'vue';
import App from './App.vue';

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
    ]
});

createApp(App).use(router).mount('#app');
