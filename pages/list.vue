<template>
  <div>
    <h3 class="mb-5 ml-auto d-flex">
      En tu lista podes guardar tu contenido preferido
    </h3>

    <div v-if="myList.length === 0">
      <p>Tu lista está vacía. ¡Agrega algunas películas!</p>
    </div>

    <div v-else class="row">
      <div v-for="movie in myList" :key="movie.imdbID" class="col-md-3">
        <Poster :showAddButton="true" :movie="movie" @update="updateList" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const myList = ref([])

onMounted(() => {
  updateList()
})

const updateList = () => {
  const storedList = localStorage.getItem('myList')

  if (storedList) {
    myList.value = JSON.parse(storedList)
  }
}
</script>
