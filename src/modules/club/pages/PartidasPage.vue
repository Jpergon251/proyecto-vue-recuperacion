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
          </tr>
        </thead>
        <tbody>
          <tr class='partida' v-for="partida in partidasFiltradas" :key="partida.idPartida">
            
            <td class="nombre-partida" >
              <router-link :to="'/'+partida.juego.nombre.replace(/\s+/g, '')">{{ partida.juego.nombre }}</router-link><br>
              <router-link :to="'/partidas/'+partida.idPartida"><p class="id-partida">{{ partida.idPartida }}</p></router-link></td>
            <td>{{ partida.fecha }}</td>
            <td>{{ formatearDuracion(partida) }}</td>
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
            if (!partida.finalizada) {
            setInterval(() => {
                duracion += 1;
            }, 1000);
            }
            const minutos = Math.floor((duracion % 3600) / 60);
            const segundos = duracion % 60;
            return `${minutos}:${segundos}`;
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
  border-radius: 5px;
  width: 100%;
  margin-top: 20px;
}

thead {
  border-radius: 5px;
  background-color: #611534;
}
th,
td {
  
  background: none;
  text-align: left;
  padding: 8px;
  border-bottom: 1px solid #ddd;
}
.id-partida{
  opacity: 60%;
}
th {
  color: white;
}
.partida{
  color: #fff;
  background-color: #3d2944;
}
.partida:hover {
  background-color: #564b68;
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

a{
    text-decoration: none;
    color: #ff232a;
    font-weight: bold;
}
a:hover{
  text-decoration: underline;
}

a>p{
  text-decoration: none;
  color: #fff;
  font-weight: bold;
}
a>p:hover{
  text-decoration: underline;
}

.table-container{
  color: #fff;
  font-weight: bold;
  border-radius: 5px;
  padding: 10px 50px;
  background-color: #3d2944;
}


/* Estilos específicos para la duración */
td:nth-child(4) {
  text-align: left;
}
</style>