<template>
  <nav class="navbar">
    <div class="navbar-brand">
      <img class="logo" src="https://seeklogo.com/images/E/esport-logo-B80AF9936C-seeklogo.com.png" alt="Logo">
    </div>

    <div class="navbar-menu">
      <div class="navbar-end">
        <router-link to="/" class="navbar-item">Partidas</router-link>
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
    width: 100%;
    background: linear-gradient(135deg,#868686,#1a1a1a) ;
    margin-bottom: 20px;
  }
  .logo {
    margin: 0 50%;
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
  