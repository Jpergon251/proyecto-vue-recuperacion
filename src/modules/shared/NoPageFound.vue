<template>
  <div class="not-found">
    <h1>404 - Página no encontrada</h1>
    <p>Lo sentimos, la página que estás buscando no existe.</p>
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.not-found {
  text-align: center;
  padding: 100px;
}

.btn-home {
  margin-top: 20px;
  display: inline-block;
  background-color: #0077ff;
  color: #fff;
  padding: 10px 20px;
  border-radius: 5px;
  text-decoration: none;
}
</style>