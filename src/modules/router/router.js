import {createRouter,createWebHashHistory} from 'vue-router'
import store from '../../store';

const routes = [
    // otras rutas
    {
      path: '/equipo',
      component: () => import('@/modules/club/pages/TeamPage.vue'),
      meta: {
        requiresAuth: true
      },
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
      meta: {
        requiresAuth: true
      },
 
    },
    {
      path: '/', component: ()=> import('@/modules/club/pages/PartidasPage.vue'),
      meta: {
        requiresAuth: true
      },
    
    },
    {
      path: '/partidas/:idPartida', component: ()=> import('@/modules/club/pages/OnePartidaPage.vue'),
      props: (route) =>{
        const idPartida = String(route.params.idPartida)
        return {idPartida}
      },
      meta: {
        requiresAuth: true
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


router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    if (store.state.user.loggedIn) {
      next();
    } else {
      next({ name: "Login" });
    }
  } else {
    next();
  }
});


export default router