<template>
    <nav class="navbar">
      <div class="navbar-brand">
          <img class="logo" src="https://i.imgur.com/FY7HK2d.png" alt="Logo">
      </div>
  
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link to="/" class="navbar-item">Inicio</router-link>
          <router-link to="/partidas" class="navbar-item">Partidas</router-link>
          <router-link to="/login" class="navbar-item">Iniciar sesión</router-link>
        </div>
      </div>
    </nav>
  </template>
  
  <script>
  export default {
  }
  </script>
  
  <style>
  .navbar {
    margin-bottom: 30px;
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    font-weight: bold;
    background: linear-gradient(135deg, #A31A1F, #71161B, #4A0F28, #320A40, #1D064C);
    display: flex;
    padding: 10px;
    align-items: center;
    flex-direction: column;
  }

.navbar-item {
  color: #fff;
  margin: 0 10px;
  font-size: 16px;
  text-transform: uppercase;
  text-decoration: none;
  transition: color 0.3s;
}

.navbar-item:hover {
  color: #fff;
  text-decoration: none;
}
.logo{
  width: 100%;
  margin: 20px 0;
}
.router-link-active{
  text-decoration: underline;
}
  </style>
  