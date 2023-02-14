<template>
    <div>
      <img :src="game.image" :alt="game.nombre" />
      <h1>{{ game.nombre }}</h1>
      <p>{{ game.descripcion }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  export default {
    data() {
      return {
        games: {}
      }
    },
    created() {
        axios.get(`http://localhost:3001/v1/api/juegos`)
            .then(response => {
        this.games = response.data;
        })
            .catch(error => {
            console.error(error);
        });
        for (var i = 0; i < this.games.length; i){
            
        }

        axios.get(`http://localhost:3001/v1/juego/`)
}
  }
  </script>

<style scoped>

</style>