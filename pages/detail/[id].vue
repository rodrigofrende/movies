<template>
  <div>
    <section v-if="movieDetails" class="banner">
      <div class="row">
        <div class="col-lg-4">
          <Poster :showAddButton="true" :movie="movieDetails" />
        </div>
        <div class="col-lg-8">
          <div class="details">
            <h2>{{ movieDetails.Title }}</h2>
            <div class="row mt-5">
              <div class="col-lg-6">
                <p><strong>Año:</strong> {{ movieDetails.Year }}</p>
                <p><strong>Clasificación:</strong> {{ movieDetails.Rated }}</p>
                <p>
                  <strong>Fecha de lanzamiento:</strong>
                  {{ movieDetails.Released }}
                </p>
                <p><strong>Duración:</strong> {{ movieDetails.Runtime }}</p>
                <p><strong>Autor:</strong> {{ movieDetails.Writer }}</p>
              </div>
              <div class="col-lg-6">
                <p><strong>Género:</strong> {{ movieDetails.Genre }}</p>
                <p><strong>Director:</strong> {{ movieDetails.Director }}</p>
                <p><strong>Actores:</strong> {{ movieDetails.Actors }}</p>
                <p><strong>Idioma:</strong> {{ movieDetails.Language }}</p>
                <p><strong>País:</strong> {{ movieDetails.Country }}</p>
              </div>
              <div class="col-lg-12 mt-4">
                <p><strong>Descripción:</strong> {{ movieDetails.Plot }}</p>
              </div>
            </div>

            <div class="rating d-flex justify-content-center mt-5">
              <section class="d-flex mx-3 fs-4">
                <span class="my-auto"><strong>IMDb Rating:</strong></span>
                <section class="d-flex ms-2">
                  <img
                    v-for="star in calculateStarCount(
                      parseFloat(movieDetails.imdbRating)
                    )"
                    :key="star"
                    src="/img/star.svg"
                    alt="Estrella"
                    class="my-auto me-1"
                  />
                </section>
              </section>
              <section class="mx-3 d-flex fs-4">
                <span class="my-auto"
                  ><strong class="me-2">Votos:</strong>
                  {{ movieDetails.imdbVotes }}</span
                >
              </section>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section v-else>
      <p>Cargando detalles de la película...</p>
    </section>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import omdbService from '@/services/api'

const movieDetails = ref(null)
const isInMyList = ref(false)

onMounted(async () => {
  const { id } = useRoute().params
  try {
    movieDetails.value = await omdbService.getMovieById(id)
  } catch (error) {
    console.error(
      `Error al obtener detalles de la película con ID ${id}:`,
      error
    )
  }
})

const calculateStarCount = rating => {
  const parsedRating = parseFloat(rating)

  if (isNaN(parsedRating) || parsedRating < 0) {
    console.error('Error: Valor de rating no válido')
    return []
  }

  const roundedRating = Math.round(parsedRating) / 2

  const starCount = Math.max(0, Math.floor(roundedRating))

  return Array.from({ length: starCount }, (_, index) => index)
}
</script>
<style scoped>
p {
  text-align: justify;
}
.rating {
  margin: 15px;
}

.banner {
  text-align: center;
  padding: 20px;
  background-color: rgb(92 92 92 / 30%);
  color: #fff;
  border-radius: 6px;
}

.banner img {
  width: 100%;
  max-width: 550px;
  height: auto;
  margin-bottom: 10px;
}

.details {
  padding: 40px;
}
</style>
