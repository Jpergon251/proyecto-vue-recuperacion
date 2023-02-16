<template>
    <div class="container">
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
            <th>ID</th>
            <th>Juego</th>
            <th>Fecha</th>
            <th>Duración</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="partida in partidasFiltradas" :key="partida.idPartida">
            <td>{{ partida.idPartida }}</td>
            <td><router-link :to="'/'+partida.juego.nombre.replace(/\s+/g, '')">{{ partida.juego.nombre }}</router-link></td>
            <td>{{ partida.fecha }}</td>
            <td>{{ formatearDuracion(partida) }}</td>
          </tr>
          
        </tbody>
      </table>
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
            if (!partida.finalizada) {
            setInterval(() => {
                duracion += 1;
            }, 1000);
            }
            const horas = Math.floor(duracion / 3600);
            const minutos = Math.floor((duracion % 3600) / 60);
            const segundos = duracion % 60;
            return `${horas}:${minutos}:${segundos}`;
        },
        async crearPartida() {
            try {
                const response = await fetch('http://localhost:3001/v1/api/partidas', {
                method: 'POST',
                });
                if (!response.ok) {
                throw new Error('Error al crear la partida.');
                }
                // Aquí se puede manejar la respuesta de la API en caso de ser necesario
            } catch (error) {
                console.error(error);
            }
        },
        
        
    },
    mounted() {
      axios.get('http://localhost:3001/v1/api/partidas')
        .then(response => {
          this.partidas = Object.values(response.data);
        })
        .catch(error => {
          console.log(error);
        });
    },
  };
  </script>
  
  <style>
  .container {
  max-width: 800px;
  margin: 0 auto;
}

table {
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  border-collapse: collapse;
  width: 100%;
  margin-top: 20px;
}

thead {
  background-color: #f2f2f2;
}

th,
td {
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #7f4caf;
  color: white;
}

tr:hover {
  background-color: #f5f5f5;
}

select {
  font-size: 1em;
  padding: 6px 10px;
  margin: 5px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

label {
  margin-right: 10px;
}

router-link{
    color: #7f4caf;
}

/* Estilos específicos para la duración */
td:nth-child(4) {
  text-align: left;
}

/* Ocultar ID */
th:first-child,
td:first-child {
  display: none;
}
  </style>