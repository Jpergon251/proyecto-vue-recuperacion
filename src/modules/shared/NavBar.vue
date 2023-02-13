<template>
    <nav class="navbar">
      <div class="navbar-brand">
          <h1>Navbar</h1>
      </div>
  
      <div class="navbar-menu">
        <div class="navbar-end">
          <router-link to="/" class="navbar-item">Inicio</router-link>
          <router-link to="/about" class="navbar-item">Acerca de</router-link>
          <router-link to="/contact" class="navbar-item">Contacto</router-link>
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
    font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
    background-color: #2c3e50;
    color: #fff;
    margin-bottom: 20px;
  }
  
  .navbar-brand h1 {
    font-size: 1.5rem;
    font-weight: bold;
    margin: 10px;
    padding: 20px;
  }
  
  .navbar-item {
    font-weight: bold;
    font-size: 1.2rem;
    padding: 1rem;
    color: #fff;
    text-decoration: none;
  }
  
  .navbar-item:hover {
    background-color: #34495e;
    cursor: pointer;
  }

  .router-link-active{
    text-decoration: underline;
}
  </style>
  