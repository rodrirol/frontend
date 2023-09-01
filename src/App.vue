<script>
export default {
  name: 'App',
  data() {
    return {
      title: 'Vue 3 Tutorial',
    }
  },
  methods: {
    updateTitle(route) {
      this.title = route.meta.title || 'Home';
    }
  },
  mounted() {
    this.updateTitle(this.$route);
  },
  watch: {
    $route(to, from) {
      this.updateTitle(to);
    }
  }
}
</script>

<template>
  <header class="mx-0 p-0 mb-2">
    <nav class="navbar navbar-expand-lg bg-opaque" data-bs-theme='dark'>
      <div class="container-fluid">
        <RouterLink class="navbar-brand popper-text-dark fs-1 fw-bold text-white mb-0 pb-0 popper-link" to="/">Tutorials Co.<span
            class="fs-3 ps-2 fw-semibold">{{ title }}</span></RouterLink>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon popper-dark"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
          <div class="navbar-nav gap-sm-4">
            <RouterLink class="nav-link fs-4 popper-text-dark fw-semibold text-white popper-link rounded-4" to="/">Home</RouterLink>
            <RouterLink class="nav-link fs-4 popper-text-dark fw-semibold text-white popper-link rounded-4" to="/add">Add</RouterLink>
            <RouterLink class="nav-link fs-4 popper-text-dark fw-semibold text-white popper-link rounded-4" to="/tutorial">Tutorials
            </RouterLink>
          </div>
        </div>
      </div>
    </nav>
  </header>
  <main>
    <div class="row mx-0 p-0">
      <div class="col-sm-4 box rounded-5 mx-0 p-4">
        <div class="row p-sm-4 mx-0 align-middle justify-content-center gap-4">
          <RouterView />
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
.bg-opaque {
  background-color: rgba(18, 39, 20, 0.3);
  /* blurs the background */
  backdrop-filter: blur(.2rem);
  z-index: 1000;
}

.box {
  position: absolute;
  top: 5rem;
  left: 50%;
  width: 40rem;
  transform: translate(-50%);
  background-color: rgba(50, 50, 50, 0.15);
  /* blurs the background */
  backdrop-filter: blur(.5rem);
}

.navbar {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 4rem;
}
</style>
