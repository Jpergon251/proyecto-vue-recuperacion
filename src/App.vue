<template>
  <NavBar/>
  <RouterView/>
</template>

<script>

import NavBar from './modules/shared/NavBar.vue';
export default {
  components: { NavBar },
}
</script>
<style>
body{
  background-color: #272727;
  font-family: 'Lucida Sans', 'Lucida Sans Regular', 'Lucida Grande', 'Lucida Sans Unicode', Geneva, Verdana, sans-serif;
  margin: 0;
}
</style>