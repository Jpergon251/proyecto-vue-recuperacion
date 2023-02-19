import {createRouter,createWebHashHistory} from 'vue-router'

const routes = [
    // otras rutas
    {
      path: '/equipo',
      component: () => import('@/modules/club/pages/TeamPage.vue'),
    },
    {
        path: '/register',
        name: 'register',
        component: () => import('@/modules/club/pages/RegisterPage.vue')
      },
      
    {
        path: '/login',
        name: 'Login',
        component: () => import('@/modules/club/pages/LoginPage.vue')
    },
    {
      path: '/:game', 
      component: () => import('@/modules/club/pages/GamePage.vue'),
      props: (route) => {
        const game = String(route.params.game)
        return {game}
      },
 
    },
    {
      path: '/', component: ()=> import('@/modules/club/pages/PartidasPage.vue'),
    
    },
    {
      path: '/partidas/:idPartida', component: ()=> import('@/modules/club/pages/OnePartidaPage.vue'),
      props: (route) =>{
        const idPartida = String(route.params.idPartida)
        return {idPartida}
      },
      
    },
    { 
      path: '/404', component: () => import('@/modules/shared/NoPageFound.vue') 
    },
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