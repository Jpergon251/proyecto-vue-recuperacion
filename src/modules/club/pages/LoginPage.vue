<template>
    <div class="login-page">
      <h1>Iniciar sesión</h1>
  
      <form>
        <div class="form-group">
          <label for="email">Correo electrónico:</label><br>
          <input type="email" id="email" v-model="email" required>
        </div>
  
        <div class="form-group">
          <label for="password">Contraseña:</label><br>
          <input type="password" id="password" v-model="password" required>
        </div>
  
        <button type="submit" @click.prevent="login">Iniciar sesión</button>
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
  .login-page {
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    max-width: 400px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 1rem;
  }
  
  form {
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
  
  input[type="email"],
  input[type="password"] {
    font-size: 1.2rem;
    padding: 0.5rem;
    border: 1px solid #ddd;
    border-radius: 4px;
  }
  
  button[type="submit"] {
    background-color: #2c3e50;
    color: #fff;
    font-size: 1.2rem;
    padding: 0.5rem 1rem;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  button[type="submit"]:hover {
    background-color: #34495e;
  }
  .account-btn {
    color:#34495e;
    background: none;
    margin: 10 0;
    padding: 5px;
    border: none;
    cursor: pointer;
  }
  </style>
  