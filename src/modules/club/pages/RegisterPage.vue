<template>
    <div class="register-page">
      <h1>Registro</h1>
      <div v-if="error" class="alert alert-danger">{{error}}</div>
      <form @submit.prevent="Register">
        <div class="form-group">
          <label for="name">Nombre de ususario:</label><br>
          <input
            id="name"
            type="name"
            class="form-control"
            name="name"
            value
            required
            autofocus
            v-model="name"
          />
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label><br>
          <input
            id="email"
            type="email"
            class="form-control"
            name="email"
            value
            required
            autofocus
            v-model="email"
          />
        </div>
  
        <div class="form-group">
          <label for="password">Contraseña:</label><br>
          <input
            id="password"
            type="password"
            class="form-control"
            name="password"
            required
            v-model="password"
          />
        </div>
        
        <button type="submit">Registrarse</button>
        <button class="account-btn" @click="goToLogin">¿Ya tienes cuenta?</button>
      </form>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRouter } from 'vue-router'
  export default {
    setup() {
      const name = ref('')
      const email = ref('')
      const password = ref('')
      const error = ref(null)

      const store = useStore()
      const router = useRouter()

      const Register = async () => {
        try {
          // console.log(store)
          console.log(name,email, password)
          await store.dispatch('register', {
            email: email.value,
            password: password.value,
            name: name.value
          })
          router.push('/')

        }
        catch (err) {
          if (err.message === "Firebase: Error (auth/invalid-email)." ){
            error.value = "Email invalido"
          }else if (err.message === "Firebase: Error (auth/email-already-in-use)."){
            error.value = "Usuario ya registrado"
          }
        }
      }

      return { Register, name,email, password, error }
    },
    methods: {
      goToLogin() {
        this.$router.push('/login');
      },
    }
  };
  </script>
  
  <style>
  /* ... estilos específicos del componente ... */
  .register-page {
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

  input {
    background-color: #ddd;
    font-size: 1.2rem;
    padding: 0.5rem;
    border: none;
    border-radius: 4px;
  }
  input:focus-visible{
    border: none;
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
  