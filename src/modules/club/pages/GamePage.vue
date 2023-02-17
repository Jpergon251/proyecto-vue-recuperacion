<template>
  <div class="container">
    <img class="portada" :src="juego.image" :alt="juego.nombre" />
    <h1 class="titulo">{{ juego.nombre }}</h1>
    <p class="descripcion">{{ juego.descripcion }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: {
    game:{
      type: String,
      required: true,
    }
  },
  data() {
    return {
      juego: {},
    };
  },
  mounted() {
    axios.get(`http://localhost:3001/v1/api/juegos/${this.game}`)
      .then(response => {
        this.juego = response.data;
      })
      .catch(error => {
        this.$router.replace('/404')
        console.log(error);
      });
  },
};
</script>

<style scoped>
img{
  width: 1400px;
}
.container {
  border-radius: 15px;
  width: fit-content;
  padding: 20px;
  margin: auto;
  background-color: #666;
  text-align: center;
}

.portada {
  border-radius: 15px;
  width: 100%;
  max-width: 800px;
  display: block;
  margin: 0 auto;
}

.titulo {
  font-weight: bold;
  font-size: 3em;
  color: white;
  margin-top: 20px;
}

.descripcion {
  font-size: 1.2em;
  color: white;
  line-height: 1.5;
  margin-top: 20px;
  max-width: 800px;
  margin: 20px auto;
}

</style>