<template>
    <div class="container">
      <div class="table-container">

        <label for="filtroJuego">Filtrar por juego:</label>
        <select id="filtroJuego" v-model="filtro">
          <option value="">Todos</option>
          <option v-for="juego in juegos" :value="juego.nombre">{{ juego.nombre }}</option>
        </select>

        <label for="filtroEstado">Filtrar por estado:</label>
        <select id="filtroEstado" v-model="estado">
          <option value="">Todos</option>
          <option value="victorias">Victorias</option>
          <option value="derrotas">Derrotas</option>
        </select>

        <label for="ordenarPor">Ordenar por:</label>
        <select id="ordenarPor" v-model="orden">
          <option value="fecha">Fecha</option>
          <option value="duracion">Duración</option>
        </select>
      
      <button @click="crearPartida()">Nueva Partida</button>
      
        <h2>Partidas mostradas/totales: {{ partidasFiltradas.length }}/{{ partidas.length }} </h2>
        

      <table>
        <thead>
          <tr>
            <th>Juego</th>
            <th>Fecha</th>
            <th>Duración</th>
            <th>Estado</th>
          </tr>
        </thead>
        <tbody>
          <tr class='partida' v-for="partida in partidasFiltradas" :key="partida.idPartida">
            
            <td class="nombre-partida" >
              <router-link :to="'/'+partida.juego.nombre.replace(/\s+/g, '')">{{ partida.juego.nombre }}</router-link><br>
              <router-link :to="'/partidas/'+partida.idPartida"><p class="id-partida">{{ partida.idPartida }}</p></router-link></td>
            <td>{{ partida.fecha }}</td>
            <td>{{ formatearDuracion(partida) }}</td>
            <td class="estado" v-bind:class="{ verde: partida.victoria, rojo: !partida.victoria }">
              {{ partida.victoria ? 'Victoria' : 'Derrota' }}
            </td>
            <td><button @click="eliminarPartida(partida.idPartida)">Eliminar</button></td>
          </tr>
          
        </tbody>
      </table>
      <button class="cargar-mas" v-if="cantidadAMostrar < partidas.length" @click="cargarMasPartidas">Cargar más</button>

    </div>
    </div>
  </template>
  
  <script>
  import {v4 as uuidv4} from 'uuid';
  import axios from 'axios';
  
  export default {
    
    data() {
      return {
        cantidadAMostrar: 10,
        nuevaPartida: {
          idPartida: '',
          juego: '',
          fecha: '',
          victoria: false,
          duracion: 0,
          jugadoresPartida: []
        },
        partidas: [],
        filtro: '',
        orden: 'fecha',
        estado: '',
        allJuegos: {},
        allJugadores: {}
      };
    },
    computed: {
      partidasFiltradas() {
        return this.partidas.slice(0,this.cantidadAMostrar)
          .filter(partida => partida.juego.nombre.toLowerCase().includes(this.filtro.toLowerCase()))
          .filter(partida => {
            if (this.estado === 'victorias') {
              return partida.victoria;
            } else if (this.estado === 'derrotas') {
              return !partida.victoria;
            } else {
              return true;
            }
          })
          .sort((a, b) => {
            if (this.orden === 'fecha') {
              return new Date(b.fecha) - new Date(a.fecha);
            } else if (this.orden === 'duracion') {
              return b.duracion - a.duracion;
            } else {
              return 0;
            }
          });
      },
      juegos() {
            const juegos = [];
            this.partidas.forEach(partida => {
                if (!juegos.some(juego => juego.nombre === partida.juego.nombre)) {
                juegos.push(partida.juego);
                }
            });
            return juegos;
            },
    },
    methods: {
        formatearDuracion(partida) {
            let duracion = partida.duracion;
            const minutos = Math.floor((duracion % 3600) / 60);
            const segundos = duracion % 60;
            return `${minutos}:${segundos}`;
        },   
        async crearPartida() {
        try {
          const tiempoTranscurrido = Date.now();
          const hoy = new Date(tiempoTranscurrido);

          let variableAleatoria = null;
          if (Math.random() < 0.5) {
            variableAleatoria = true;
          } else {
            variableAleatoria = false;
          }
          const arrayJugadores = Object.values(this.allJugadores);

          const shuffledJugadores = arrayJugadores.sort(() => 0.5 - Math.random());

          
          // Convertir los objetos JSON en un array de objetos utilizando Object.values
          const arrayJuegos = Object.values(this.allJuegos);

          // Generar un número aleatorio entre 0 y la longitud del array
          const randomIndex = Math.floor(Math.random() * (arrayJuegos.length));

          // Seleccionar el objeto aleatorio del array utilizando el índice generado
          const randomJuego = arrayJuegos[randomIndex];

          // Convertir el objeto JavaScript en una cadena JSON utilizando JSON.stringify
          const jsonJuego = JSON.stringify(randomJuego);
          this.nuevaPartida = {
          idPartida: uuidv4(),
          juego: randomJuego,
          fecha: hoy.toLocaleDateString(),
          victoria: variableAleatoria,
          duracion: Math.floor(Math.random() * (3600 - 480 + 1)) + 480,
          jugadoresPartida: shuffledJugadores.slice(0, 5)
          }
          
          this.partidas.push(this.nuevaPartida)
          await axios.post('https://api-hlc.herokuapp.com/v1/api/partidas',this.nuevaPartida)

        } catch (error) {
            console.error(error);
        }
        },
        async eliminarPartida(idPartida){
        try {
          
          for (let i = 0; i < this.partidas.length; i++) {
            if (this.partidas[i].idPartida === idPartida) {
              this.partidas.splice(i, 1);
              await axios.delete(`https://api-hlc.herokuapp.com/v1/api/partidas/${idPartida}`);
              break;
            }
          }
        } catch(error) {
          console.error(error)
        }
        },
        cargarMasPartidas(){
          this.cantidadAMostrar += this.cantidadAMostrar
        }
    },
    created() {
      axios.get('https://api-hlc.herokuapp.com/v1/api/partidas')
        .then(response => {
          this.partidas = Object.values(response.data);
        })
        .catch(error => {
          console.log(error);
        });

      axios.get('https://api-hlc.herokuapp.com/v1/api/juegos')
          .then(response => {
            const juegos = response.data
            this.allJuegos = juegos
          })
          .catch(error => {
            console.log(error)
          })

      axios.get('https://api-hlc.herokuapp.com/v1/api/jugadores')
      .then(response => {
        this.allJugadores = response.data;
      })
      .catch(error => {
        console.error('Error al cargar los datos de jugadores:', error);
      });
    },
  };
  </script>
  
  <style scoped>
.container {
  color: #fff;
  margin: auto;
  width: 80%;
  background-color: #666;
  padding: 2rem;
  border-radius: 0.5rem;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.table-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;
  font-size: 1.1rem;
}

th, td {
  text-align: left;
  padding: 0.5rem 1rem;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: black;
  color: white;
}
.partida:hover {
  background-color: #838383;
}

#filtroJuego, #ordenarPor {
  margin-left: 1rem;
  margin-right: 1rem;
}

button {
  background-color: black;
  color: white;
  border: none;
  border-radius: 0.25rem;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

button:hover {
  background-color: rgb(27, 27, 27);
}

select {
  padding: 0.5rem 1rem;
  font-size: 1rem;
  border: 1px solid black;
  border-radius: 0.25rem;
}

select:focus {
  outline: none;
  border-color: #585858;
}

label {
  font-size: 1.1rem;
  margin-right: 0.5rem;
}

.nombre-partida {
  font-weight: bold;
}
a {
  color: #fff;
  text-decoration: none;
}
a:hover{
  text-decoration: underline;
}

.id-partida {
  opacity: 50%;
  font-size: 0.8rem;
  color: #fff;
}

.estado {
  font-weight: bold;
  font-size: 16px;
}

.estado.verde {
  color: #56f556;
}

.estado.rojo {
  color: #fa5a5a;
}
.cargar-mas{
  margin-top: 20px;
}

</style>