<template>
    <div class="login-page">
      <h1>Iniciar sesión</h1>
      <div v-if="error" class="alert alert-danger">{{error}}</div>
      <form @submit.prevent="Login">
        <div class="form-group">
          <label for="email">Correo electrónico:</label><br>
          <input type="email" id="email" v-model="email" required>
        </div>
  
        <div class="form-group">
          <label for="password">Contraseña:</label><br>
          <input type="password" id="password" v-model="password" required>
        </div>
  
        <button type="submit">Iniciar sesión</button>
        <button class="account-btn" @click="goToRegister">¿No tienes cuenta?</button>
      </form>
      
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  export default {
    
    // ... otros datos del componente ...
    setup() {
      const email = ref('')
      const password = ref('')
      const error = ref(null)

      const store = useStore()
      const router = useRouter()

      const Login = async () => {
        try {
          await store.dispatch('logIn', {
            email: email.value,
            password: password.value
          })
          router.push('/')
        }
        catch (err) {
          if(err.message === "Firebase: Error (auth/wrong-password)."){
            error.value = 'Contraseña incorrecra'
          }else if(err.message === "Firebase: Error (auth/user-not-found)."){
            error.value = 'Email no registrado'
          }
        }
      }
      return { Login, email, password, error }
    },
    methods: {
      goToRegister() {
        this.$router.push('/register');
      }
    }
  }
  </script>
  
  <style scoped>
   
   .alert{
    margin: 10px 0;
    padding: 10px;
    border-radius: 5px;
    background-color: #ddd;
  }

  .alert-danger {
    font-weight: bold;
    color: #f94a4a;
  }

   .login-page {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #6c6e74;
    border-radius: 5px;
  }
  h1 {
    color: #fff;
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  form {
    color: #fff;
    display: flex;
    flex-direction: column;
  }
  
  .form-group {
    
    margin-bottom: 1rem;
  }
  
  label {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }
  
  input {
    background-color: #ddd;
    font-size: 1.2rem;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
  }
  input:focus{
    background-color: #96a1ac;
  }
  button[type="submit"] {
    background-color: #42505c;
    color: #fff;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    margin-bottom: 10px;
  }
  
  button[type="submit"]:hover {
    background-color: #63798b;
  }
  .account-btn {
    color:#fff;
    background: none;
    margin: 10 0;
    border: none;
    cursor: pointer;
  }
  </style>
  