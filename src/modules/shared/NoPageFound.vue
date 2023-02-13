<template>
    <div class="not-found">
      <h1>404 Página no encontrada</h1>
      <p>Lo siento, la página que estás buscando no existe.</p>
      <p>Por favor, regresa a la <router-link to="/">página de inicio</router-link>.</p>
      <div class="emoji">😢</div>
    </div>
</template>
  
<style>
/* Estilos generales */
body {
  font-family: Arial, sans-serif;
  background-color: #f7f7f7;
  color: #333;
}

.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

h1 {
  font-size: 3em;
  margin-bottom: 20px;
}

p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

a {
  color: #333;
  text-decoration: underline;
}

/* Estilos específicos para la página de error 404 */
.not-found {
  padding-top: 50px;
}

.not-found .emoji {
  font-size: 5em;
}

.not-found h1 {
  font-size: 2.5em;
  margin-bottom: 10px;
}

.not-found p {
  font-size: 1.2em;
  margin-bottom: 20px;
}

.not-found a {
  font-weight: bold;
}
</style>