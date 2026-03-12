import { createRouter, createWebHistory } from 'vue-router';

import { createApp } from 'vue';
import App from './App.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            name: "Home",
            path: "/",
            component: () => import('@/App.vue'),
        },
        {
            name: "/Registration",
            path: "/Registration",
            component: () => import('@/components/Registration.vue'),
        },
        {
            name: "/Entrance",
            path: "/Entrance",
            component: () => import('@/components/Entrance.vue'),
        },
    ]
});

createApp(App).use(router).mount('#app');
