<template>

    <div class="jugador-list">
      <h1 class="title">Jugadores</h1>
  
      <div class="jugador-cards">
        <div v-for="jugador in jugadores" :key="jugador.nombre" class="jugador-card">
          <h2 class="jugador-name">{{ jugador.nombre }}</h2>
          <p class="jugador-age">
            Edad: {{ jugador.edad }} años.
          </p>
          <p class="jugador-hours">
            Horas jugadas: {{ jugador.horasJugadas }}
          </p>
          <button class="eliminar-btn" @click="deleteJugador(jugador.nombre)">Eliminar</button>

        </div>
      </div>
    </div>

    <div class="formulario-jugador">
      <h2>Añadir jugador</h2>
      <form @submit.prevent="agregarJugador">
        <div class="form-group">
          <label for="nombre">Nombre:</label>
          <input type="text" id="nombre" v-model="nuevoJugador.nombre" required>
        </div>
        <div class="form-group">
          <label for="edad">Edad:</label>
          <input type="number" id="edad" v-model="nuevoJugador.edad" required>
        </div>
        <div class="form-group">
          <label for="horasJugadas">Horas jugadas:</label>
          <input type="number" id="horasJugadas" v-model="nuevoJugador.horasJugadas" required>
        </div>
        <button type="submit">Añadir jugador</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        nuevoJugador: {
            nombre: '',
            edad: null,
            horasJugadas: null,
        },
        jugadores: [],
    
      };
    },
    mounted() {
      axios
        .get('https://api-hlc.herokuapp.com/v1/api/jugadores')
        .then(response => {
          this.jugadores = Object.values(response.data);
        })
        .catch(error => {
          console.log(error);
        });
      },
        
    methods: {
        async agregarJugador() {
        try {
            await axios.post('https://api-hlc.herokuapp.com/v1/api/jugadores', this.nuevoJugador);
            this.jugadores.push(this.nuevoJugador);
        } catch (error) {
            console.error(error);
        }
        },
        async deleteJugador(nombre) {
            try {
                
                for (let i = 0; i < this.jugadores.length; i++) {
                  if (this.jugadores[i].nombre === nombre) {
                    this.jugadores.splice(i, 1);
                    await axios.delete(`https://api-hlc.herokuapp.com/v1/api/jugadores/${nombre}`);
                    break;
                  }
                }
            } catch (error) {
                console.error(error);
            }
        },
    }
}
  </script>

<style scoped>

.eliminar-btn {
    font-weight: bold;
    background-color: #ff5234;
    color: #fff;
    border: none;
    padding: 0.5rem;
    border-radius: 5px;
    cursor: pointer;
}

.eliminar-btn:hover {
    background-color: #e21f01;    
}
.jugador-list {
    width: 80%;
    border-radius: 10px;
    margin: 20px auto;
    background-color: #767676;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px;
}

.title {
    color: #fff;
    font-size: 2em;
    margin-bottom: 20px;
}

.jugador-cards {
    margin: 0 20px;
    color: #fff;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 20px;
}

.jugador-card {
    display: flex;
    flex-direction: column;
    background-color: #4b4b4b;
    border-radius: 10px;
    box-shadow: 0px 2px 6px rgba(0, 0, 0, 0.1);
    padding: 20px;
    width: 250px;
    transition: transform 0.2s;
}

.jugador-card:hover {
    background-color: #333333;

    transform: translateY(-10px);
}

.jugador-name {
    font-size: 2em;
    margin-bottom: 10px;
}

.jugador-age,
.jugador-hours {
    font-size: 1em;
    margin-bottom: 5px;
}

.formulario-jugador {
    border-radius: 10px;
    padding: 20px;
    background-color: #767676;
    max-width: 500px;
    margin: 20px auto;
    text-align: center;
}

.formulario-jugador h2 {
    color: #fff;
    margin-bottom: 20px;
}

.form-group {
    border-radius: 10px;
    padding: 10px;
    background-color: #4b4b4b;
    color: #fff;
    margin: 20px 0;
    text-align: left;
}

.form-group label {
    display: block;
    margin-bottom: 5px;
}

.form-group input[type="text"],
.form-group input[type="number"] {
    width: 100%;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
    font-size: 16px;
    margin-top: 5px;
}

button[type="submit"] {
    background-color: #4CAF50;
    color: white;
    padding: 12px 20px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
}

button[type="submit"]:hover {
    background-color: #45a049;
}
</style>