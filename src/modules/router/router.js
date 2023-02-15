import {createRouter,createWebHashHistory} from 'vue-router'


const routes = [
    // otras rutas
    {
      path: '/', component: () => import('@/modules/club/pages/InicioPage.vue')
    },
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
    {
      path: '/:game', 
      component: () => import('@/modules/club/pages/GamePage.vue'),
      props: (route) => {
        const game = String(route.params.game)
        return {game}
      }
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