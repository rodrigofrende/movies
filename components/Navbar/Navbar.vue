<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark px-1 px-md-3 py-3">
      <div class="container-fluid">
        <img
          src="/img/netflix.svg"
          alt="Netflix"
          class="navbar-brand me-5"
          height="50"
        />
        <!-- collapsable mobile -->
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <!-- desktop -->
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <ul class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item text-center">
              <NuxtLink class="nav-link" aria-current="page" to="/"
                >Inicio</NuxtLink
              >
            </li>
            <li class="nav-item text-center px-2">
              <NuxtLink class="nav-link" aria-disabled="true" to="/list"
                >Mi lista</NuxtLink
              >
            </li>
            <li class="nav-item text-center">
              <NuxtLink class="nav-link disabled" to="/about"
                >Acerca de</NuxtLink
              >
            </li>
            <li class="d-flex d-lg-none nav-item text-center">
              <a class="nav-link mx-auto pointer" @click="logout"
                >Cerrar sesión</a
              >
            </li>
          </ul>

          <form class="d-flex" role="search" @submit="null">
            <div class="input-group">
              <span class="input-group-text" id="basic-addon1">
                <img src="/img/search.svg" alt="Search" />
              </span>
              <input
                type="text"
                class="form-control"
                placeholder="Peliculas, series..."
                aria-label="Title"
                aria-describedby="basic-addon1"
              />
            </div>
          </form>

          <div class="d-none d-lg-flex my-auto ms-3">
            <ul class="navbar-nav me-auto">
              <li class="nav-item dropdown">
                <a
                  class="nav-link dropdown-toggle"
                  href="#"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {{ userName }}
                </a>
                <ul class="dropdown-menu dropdown-menu-dark dropdown-menu-end">
                  <!-- <li><hr class="dropdown-divider" /></li> -->
                  <li>
                    <a class="dropdown-item pointer" @click="logout"
                      >Cerrar sesión</a
                    >
                  </li>
                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  </div>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
const router = useRouter()
const userName = ref('')

onMounted(() => {
  userName.value = localStorage.getItem('userName')
})

const logout = () => {
  localStorage.removeItem('userName')
  localStorage.removeItem('moviesState')

  router.push('/login')
}
</script>
