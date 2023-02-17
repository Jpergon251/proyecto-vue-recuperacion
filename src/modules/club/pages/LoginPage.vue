<template>
    <div class="login-page">
      <h1>Iniciar sesión</h1>
  
      <form @submit.prevent="login">
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

  export default {
    // ... otros datos del componente ...

  methods: {
    goToRegister() {
      this.$router.push('/register');
    }
  }
  }
  </script>
  
  <style>
   /* ... estilos específicos del componente ... */
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
  