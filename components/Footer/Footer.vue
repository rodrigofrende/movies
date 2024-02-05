<template>
  <footer class="p-4 bg-dark text-white-50">
    <span>&copy; RF dev - {{ currentYear }}</span>
  </footer>
</template>

<script setup>
const currentYear = new Date().getFullYear()
</script>

<style scoped>
footer {
  position: absolute;
  bottom: 0;
  width: 100%;
}
</style>
