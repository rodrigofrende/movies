<template>
  <div>
    <div v-if="initialLoading" class="d-flex mt-5">
      <section class="mx-auto d-flex">
        <span
          class="spinner-border spinner-border-md me-3"
          role="status"
          aria-hidden="true"
        ></span>
        <h3>Cargando películas...</h3>
      </section>
    </div>
    <div v-else-if="movies && movies.length">
      <h3 class="mb-5 ml-auto d-flex">
        Hola! tenemos estas películas para recomendarte...
      </h3>
      <div class="row">
        <div v-for="movie in movies" :key="movie.imdbID" class="col-md-3">
          <Poster :showAddButton="false" :movie="movie" />
        </div>
      </div>
      <section v-if="movies.length < 27">
        <button @click="loadMoreMovies" class="btn btn-danger btn-brand mt-3">
          <section class="mx-auto d-flex">
            <span
              class="spinner-border spinner-border-md"
              role="status"
              aria-hidden="true"
              v-if="isLoadingMoreMovies"
            ></span>
            <span v-else>Mostrar más</span>
          </section>
        </button>
      </section>
    </div>
    <div v-else>
      <p>No hay películas para mostrar</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import omdbService from '@/services/api'
import Poster from '@/components/Poster/Poster.vue'

useHead({
  title: 'Inicio'
})
const router = useRouter()
const movies = ref([])
const initialLoading = ref(true)
const isLoadingMoreMovies = ref(false)

const moviesToShow = ref(8)
const startIndex = ref(0)

async function loadMoreMovies () {
  startIndex.value += moviesToShow.value
  isLoadingMoreMovies.value = true
  try {
    const newMovies = await omdbService.getPlaceholderMovies(
      startIndex.value,
      moviesToShow.value
    )
    movies.value = [...movies.value, ...newMovies]

    localStorage.setItem(
      'moviesState',
      JSON.stringify({ startIndex: startIndex.value, movies: movies.value })
    )
  } catch (error) {
    console.error(
      `Error al cargar más películas desde el índice ${startIndex}:`,
      error
    )
  } finally {
    isLoadingMoreMovies.value = false
  }
}

onMounted(async () => {
  const isAuthenticated = localStorage.getItem('userName') !== null
  if (!isAuthenticated) {
    router.push('/login')
  }
  if (!isAuthenticated) return
  try {
    initialLoading.value = true
    const storedMoviesState = localStorage.getItem('moviesState')

    if (storedMoviesState) {
      const { startIndex: storedStartIndex, movies: storedMovies } =
        JSON.parse(storedMoviesState)
      startIndex.value = storedStartIndex
      movies.value = storedMovies
    } else {
      movies.value = await omdbService.getPlaceholderMovies(
        startIndex.value,
        moviesToShow.value
      )
    }
  } catch (error) {
    console.error('Error al obtener las películas aleatorias:', error)
  } finally {
    initialLoading.value = false
  }
})
</script>
<style></style>
