<template>
  <NavBar/>
  <RouterView/>
</template>

<script>
import NavBar from './modules/shared/NavBar.vue';
export default {
  components: { NavBar }
}
</script>
<style>
body{
  background: url('https://www.esportsmag.it/wp-content/uploads/2020/12/esports.jpg');
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin: 0;
}
</style>