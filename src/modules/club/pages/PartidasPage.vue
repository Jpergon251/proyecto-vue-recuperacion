<template>
    <div class="container">
      <div class="table-container">
      <label for="filtroJuego">Filtrar por juego:</label>
      <select id="filtroJuego" v-model="filtro">
        <option value="">Todos</option>
        <option v-for="juego in juegos" :value="juego.nombre">{{ juego.nombre }}</option>
      </select>
  
      <label for="ordenarPor">Ordenar por:</label>
      <select id="ordenarPor" v-model="orden">
        <option value="fecha">Fecha</option>
        <option value="duracion">Duración</option>
      </select>
      <button @click="crearPartida">Nueva Partida</button>
      
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
          </tr>
          
        </tbody>
      </table>
    </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        partidas: [],
        filtro: '',
        orden: 'fecha',
      };
    },
    computed: {
      partidasFiltradas() {
        return this.partidas
          .filter(partida => partida.juego.nombre.toLowerCase().includes(this.filtro.toLowerCase()))
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
            const response = await axios.post('http://localhost:3001/v1/api/partidas');
            
            if (!response.data.success) {
              throw new Error('Error al crear la partida.');
            }
            const nuevaPartida = response.data.partida;
            this.partidas.unshift(nuevaPartida);
          } catch (error) {
            console.error(error);
          }
        }
    },
    async created() {
      await axios.get('http://localhost:3001/v1/api/partidas')
        .then(response => {
          this.partidas = Object.values(response.data);
        })
        .catch(error => {
          console.log(error);
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

</style>