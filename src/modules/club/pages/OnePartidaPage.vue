<template>
  <div class="partida">
    <div>
      <h1 class="partida-id">Partida: </h1>
      <h2 class="partida-id">#{{ partida.idPartida }}</h2>
    </div>
    <p :class="partida.victoria ? 'partida-victoria victoria' : 'partida-victoria derrota'">
          {{ partida.victoria ? 'Victoria' : 'Derrota' }}
    </p><br>
    <img :src="juego.image" alt="partida.juego.nombre" class="partida-imagen-juego">
    
    <div class="partida-info">
      
      <div class="partida-datos">
        <p class="partida-nombre-juego">Juego: {{ juego.nombre }}</p>
        <p class="partida-fecha">Fecha: {{ partida.fecha }}</p>
        <p class="partida-duracion">Duración: {{ formatearDuracion(partida) }}</p>
              
      </div>
    </div>
    <h2 class="partida-subtitulo">Jugadores</h2>
    <ul class="partida-lista-jugadores">
      <li v-for="jugador in this.partida.jugadoresPartida" class="partida-item-jugador">
        <p class="partida-nombre-jugador">Nombre: {{ jugador.nombre }}</p>
        <p class="partida-edad-jugador">Edad: {{ jugador.edad }}</p>
        <p class="partida-horas-jugadas">Horas jugadas: {{ jugador.horasJugadas }}</p>
      </li>
    </ul>
    
  </div>
  
</template>

<script>
import axios from 'axios'

export default {
  props:{
    idPartida:{
      type: String,
      required: true,
    }
  },
  data() {
    return {
      partida: {},
      juego: {},
    }
  },
  async created() {
    await this.getPartida()
  },
  methods: {
    formatearDuracion(partida) {
            let duracion = partida.duracion;
            const minutos = Math.floor((duracion % 3600) / 60);
            const segundos = duracion % 60;
            return `${minutos}:${segundos}`;
    },
    async getPartida() {
      try {
        const response = await axios.get(`http://localhost:3001/v1/api/partidas/${this.idPartida}`)
        this.partida = response.data
        this.juego = response.data.juego
      } catch (error) {
        console.error(error)
      }
    }
  }
}
</script>
<style scoped>
.partida {
  border-radius: 15px;
  margin: auto;
  width: fit-content;
  background-color: #666;
  border: none;
  padding: 20px;
}

.partida-id {
  color: #fff;
  font-size: 24px;
  margin: 0 0 10px;
}
h2.partida-id{
  opacity: 60%;
}

.partida-info {
  
  color: #fff;
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.partida-imagen-juego {
  border-radius: 15px;
  width: 800px;
  margin:5px auto;
}

.partida-datos {
  border-radius: 15px;
  padding: 0 20px;
  background-color: #535353;
  font-size: 1.5rem;
  color: #fff;
  flex: 1;
}

.partida-nombre-jugador {
  font-size: 20px;
  margin: 0 0 5px;
}

.partida-fecha,
.partida-duracion {
  margin: 0 0 5px;
}

@keyframes victoria {
  0% {
    font-size: 4rem;
    color: #4fff4f;
  }
  50% {
    font-size: 4rem;
    color: #4fff4f;
    text-shadow: 0 0 20px #4fff4f;
  }
  100% {
    font-size: 4rem;
    color: #4fff4f;
  }
}

@keyframes derrota {
  0% {
    font-size: 4rem;
    color: #fc4848;
  }
  50% {
    font-size: 4rem;
    color: #fc4848;
    text-shadow: 0 0 20px #fc4848;
  }
  100% {
    font-size: 4rem;
    color: #fc4848;
  }
}

.partida-victoria {
  margin: 0 40%;
  font-family: Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  animation-duration: 2s;
  animation-iteration-count: 300000;
  animation-timing-function: ease-in-out;
}

.partida-victoria.victoria {
  animation-name: victoria;
}

.partida-victoria.derrota {
  animation-name: derrota;
}

.partida-subtitulo {
  border-radius: 15px;
  padding: 10px;
  background-color: #535353;
  color: #fff;
  font-size: 2rem;
  margin: 20px 0 10px;
}

.partida-lista-jugadores {
  border-radius: 15px;
  padding: 10px;
  color: #fff;
  list-style: none;
  padding: 0;
  margin: 0;
}

.partida-item-jugador {
  border-radius: 15px;
  padding: 10px;
  background-color: #35374b;
  color: #fff;
  margin: 0 0 10px;
}

.partida-edad-jugador,
.partida-horas-jugadas {
  margin: 0 0 5px;
}
</style>