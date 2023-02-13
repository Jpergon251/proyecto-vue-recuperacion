<template>
    <div class="register-page">
      <h1>Registro</h1>
  
      <form @submit.prevent="register">
        <div class="form-group">
          <label for="username">Nombre de ususario:</label><br>
          <input type="text" id="username" v-model="username" required>
        </div>
        <div class="form-group">
          <label for="email">Correo electrónico:</label><br>
          <input type="email" id="email" v-model="email" required>
        </div>
  
        <div class="form-group">
          <label for="password">Contraseña:</label><br>
          <input type="password" id="password" v-model="password" required>
        </div>
        
        <button type="submit">Registrarse</button>
        <button class="account-btn" @click="goToLogin">¿Ya tienes cuenta?</button>
      </form>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        username: '',
        email: '',
        password: ''
      };
    },
  
    methods: {
        goToLogin() {
        this.$router.push('/login');
        },
        register() {
            // Aquí puedes enviar los datos del formulario al servidor
            console.log({
            username: this.username,
            email: this.email,
            password: this.password
            });
        }
    }
  };
  </script>
  
  <style>
  /* ... estilos específicos del componente ... */
  .register-page {
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
    border: none;
    cursor: pointer;
  }
  </style>
  