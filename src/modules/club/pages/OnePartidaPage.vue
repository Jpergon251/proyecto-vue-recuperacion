<template>
  <div class="container">
    <div class="partida-header">
      <h1>Partida :</h1>
      <h3>#{{ partida.idPartida }}</h3>
      <div class="partida-juego">
        <div class="juego-info">
        </div>
      </div>
    </div>
    <div class="partida-body">
      <div class="partida-datos">
        <div class="partida-fecha">
          <h3>Fecha</h3>
          <p>{{ partida.fecha }}</p>
        </div>
        <div class="partida-duracion">
          <h3>Duración</h3>
          <p>{{ formatearDuracion(partida.duracion) }}</p>
        </div>
        <div class="partida-estado">
          <h3>Estado</h3>
          <p>{{ partida.finalizada ? 'Finalizada' : 'En curso' }}</p>
        </div>
      </div>
      <div class="partida-jugadores">
        <h2>Jugadores</h2>
        <ul>
          <li v-for="jugador in partida.jugadoresPartida" :key="jugador.nombre">
            <h3>{{ jugador.nombre }}</h3>
            <p>Edad: {{ jugador.edad }}</p>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: {
      idPartida: {
        type: String,
        required: true,
      },
    },
    data() {
      return {
      partida: {},
      tiempoTranscurrido: 0
      };
    },
    methods: {
      formatearDuracion(duracion) {
        const minutos = Math.floor((duracion % 3600) / 60);
        const segundos = duracion % 60;
        return `${minutos}:${segundos}`;
      },
      async cargarPartida() {
        try {
          const response = await fetch(`http://localhost:3001/v1/api/partidas/${this.idPartida}`)
          if (response.ok) {
            this.partida = await response.json()
          }
        } catch (error) {
          console.error(error)
        }
      },
     
    },
    mounted() {
    this.cargarPartida()
    },
  };
  </script>
  <style>
.container {
  max-width: 800px;
  margin: auto;
  padding: 20px;
  background-color: #2a0b36;
  color: #fff;
  border-radius: 10px;
}

.partida-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
}

.partida-juego {
  display: flex;
  align-items: center;
}

.juego-imagen {
  width: 150px;
  margin-right: 20px;
}

.partida-body {
  display: flex;
  flex-wrap: wrap;
}

.partida-datos {
  flex-basis: 300px;
  margin-right: 30px;
  margin-bottom: 30px;
}

.partida-datos h3 {
  font-size: 1.2rem;
  margin-bottom: 10px;
}

.partida-datos p {
  margin: 0;
}

.partida-jugadores {
  flex: 1;
}

.partida-jugadores h2 {
  font-size: 1.4rem;
  margin-bottom: 20px;
}

.partida-jugadores ul {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.partida-jugadores li {
  flex-basis: 30%;
  margin-bottom: 20px;
}

.partida-jugadores li h3 {
  margin-bottom: 5px;
}

.partida-jugadores li p {
  margin: 0;
  font-size: 0.9rem;
}

.partida-jugadores li{
  background-color:  #325ea1;
  border-radius: 5px;
  padding: 5px;
}

</style>