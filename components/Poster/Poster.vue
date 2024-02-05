<template>
  <div class="poster-container" v-if="movie">
    <img
      :src="movie.Poster"
      :alt="movie.Title"
      :title="movie.Title"
      class="img-fluid pointer"
      @click="redirectToDetailPage"
    />
    <div v-if="showAddButton">
      <button
        v-if="!isInMyList"
        @click.stop="addToMyList"
        class="btn btn-secondary m-auto add-button"
        title="Agregar a mi lista"
      >
        <img src="/img/add-icon.svg" alt="Agregar a mi lista" />
      </button>
      <button
        v-else
        @click.stop="removeFromMyList"
        class="btn btn-secondary m-auto remove-button"
        title="Eliminar de mi lista"
      >
        <img src="/img/remove-icon.svg" alt="Eliminar de mi lista" />
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue'
import Swal from 'sweetalert2'
import { useRouter } from 'vue-router'
const emit = defineEmits(['update'])

const router = useRouter()

const props = defineProps(['movie', 'showAddButton'])

const isInMyList = ref(false)

onMounted(() => {
  checkStatus()
})

const checkStatus = () => {
  const myList = JSON.parse(localStorage.getItem('myList')) || []

  isInMyList.value = myList.some(item => item.imdbID === props.movie.imdbID)
}

const addToMyList = () => {
  console.log(props.movie, 'movie')
  if (props.movie) {
    const myList = JSON.parse(localStorage.getItem('myList')) || []

    const exists = myList.some(item => item.imdbID === props.movie.imdbID)

    if (!exists) {
      myList.push(props.movie)

      localStorage.setItem('myList', JSON.stringify(myList))

      showNotification('Película agregada a la lista', 'success')
    } else {
      showNotification('La película ya está en la lista', 'error')
    }
    checkStatus()
    emit('update')
  }
}

const removeFromMyList = () => {
  if (props.movie) {
    const myList = JSON.parse(localStorage.getItem('myList')) || []

    const updatedList = myList.filter(
      item => item.imdbID !== props.movie.imdbID
    )

    localStorage.setItem('myList', JSON.stringify(updatedList))
    showNotification('Película removida de la lista', 'info')

    checkStatus()
    emit('update')
  }
}
const showNotification = (message, type) => {
  Swal.fire({
    title: message,
    icon: type,
    position: 'bottom-end',
    toast: true,
    showConfirmButton: false,
    timer: 3000
  })
}
const redirectToDetailPage = () => {
  router.push(`/detail/${props.movie.imdbID}`)
}
</script>

<style scoped>
.poster-container {
  position: relative;
  margin: 20px 10px;
  width: fit-content;
  display: flex;
  margin-left: auto;
  margin-right: auto;
}

.button-container {
  position: absolute;
  top: 10px;
  background: none;
  border: none;
  cursor: pointer;
  height: 50px;
}

.list-view .button-container {
  right: 10px;
}

.add-button,
.remove-button {
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  cursor: pointer;
  height: 50px;
  background-color: rgba(0, 9, 20, 0.5) !important;
}
</style>
