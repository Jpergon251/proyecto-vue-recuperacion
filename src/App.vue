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
</style>