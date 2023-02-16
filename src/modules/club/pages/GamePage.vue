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
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  width: 80%;
  margin: 0 auto;
}

.portada {
  display: block;
  max-width: 100%;
  height: auto;
  margin: 0 auto;
  border-radius: 10px;
}

.titulo {
  font-size: 2.5rem;
  margin-top: 1.5rem;
  text-align: center;
}

.descripcion {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  text-align: justify;
  line-height: 1.5;
}

</style>