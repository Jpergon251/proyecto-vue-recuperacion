import {createRouter,createWebHashHistory} from 'vue-router'


const routes = [
    // otras rutas
    {
        path: '/register',
        name: 'register',
        component: () => import('@/modules/club/pages/RegisterPage.vue')
      },
      
    {
        path: '/login',
        name: 'login',
        component: () => import('@/modules/club/pages/LoginPage.vue')
    },
    { path: '/404', component: () => import('@/modules/shared/NoPageFound.vue') },
    {   
        path: '/:pathMatch(.*)*',component: () => import('@/modules/shared/NoPageFound.vue'),
        redirect: '/404' 
    }
  ]

const router = createRouter({

    history: createWebHashHistory(),

    routes,
})

export default router