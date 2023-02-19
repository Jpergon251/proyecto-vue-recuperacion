<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img class="logo" src="https://seeklogo.com/images/E/esport-logo-B80AF9936C-seeklogo.com.png" alt="Logo">
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link v-if="user.loggedIn" to="/" class="navbar-item">Partidas</router-link>
        <router-link v-if="user.loggedIn" to="/equipo" class="navbar-item">Tu equipo</router-link>

        <router-link v-if="!user.loggedIn" to="/login" class="navbar-item">Iniciar sesión</router-link>
      </div>
      <button v-if="user.loggedIn" @click.prevent="signOut" class="btn-session">Log Out</button>
    </div>
  </nav>
</template>
  
  <script>
  import { useStore} from "vuex";
  import { useRouter } from "vue-router";
  import {computed} from "vue";
  import { auth } from "@/firebaseConfig";

  export default {
    setup() {

    const store = useStore()
    const router = useRouter()

    auth.onAuthStateChanged(user => {
      store.dispatch("fetchUser", user);
    });

    const user = computed(() => {
      return store.getters.user;
    });

    const signOut = async () => {
          await store.dispatch('logOut')
          router.push('/login')
    }

      return {user,signOut}
    },
  }
  </script>
  
  <style>
  .btn-session {
    font-weight: bold;
    font-size: 15px;
    margin-top: 20px;
    margin-left: 20px;
    background-color: #000000;
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.btn-session:hover {
    background-color: #212121;
}
  .navbar {
    width: 100%;
    background: linear-gradient(135deg,#868686,#1a1a1a) ;
    margin-bottom: 20px;
  }
  .logo {
    margin: 0 40%;
  }
  .navbar-menu {
    font-size: 30px;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    padding: 1rem;
  }
  .navbar-item {
    color: #fff;
    margin: 0 1rem;
    text-decoration: none;
  }
  .navbar-item:hover {
    color: #ccc;
  }
.router-link-active{
    text-decoration: underline;
}
  </style>
  