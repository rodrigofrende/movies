<template>
  <div class="login-container">
    <form @submit.prevent="login" class="login-form">
      <h2 class="mb-5">Ingresa para continuar</h2>
      <input
        type="text"
        placeholder="Nombre de usuario"
        v-model="userName"
        required
      />

      <input
        type="password"
        v-model="password"
        required
        placeholder="Contraseña"
      />

      <button class="btn-brand w-100 mt-4" type="submit">Iniciar sesión</button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
useHead({
  title: 'Inicia sesión'
})
definePageMeta({
  layout: 'empty'
})
const userName = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  localStorage.setItem('userName', userName.value)
  router.push('/')
}
</script>

<style scoped>
.login-container {
  background-image: url('/img/login-background.jpeg'); /* Reemplaza con la ruta correcta de tu imagen de fondo */
  background-size: cover;
  background-position: center;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  color: #fff; /* Color del texto, puedes ajustarlo según tus necesidades */
}

.login-form {
  background-color: rgba(
    0,
    0,
    0,
    0.6
  ); /* Fondo semi-transparente para mejorar la legibilidad del formulario */
  padding: 50px;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.5);
  max-width: 450px;
}

label {
  display: block;
  margin-bottom: 8px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
</style>
