<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SupportIcon from './components/icons/IconSupport.vue'
import DocumentationIcon from './components/icons/IconDocumentation.vue'
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="section-title">
        <h1 class="green">VNCOC SONGS</h1>
      </div>
      <nav class="tab-menu">
            <RouterLink to="/" class="menu">
              <DocumentationIcon />
              <span>Danh sách</span>
            </RouterLink>
          <RouterLink to="/about" class="menu">
            <SupportIcon />
            <span>Yêu thích</span>
          </RouterLink>
      </nav>
    </div>
  </header>

  <RouterView />
</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

h1 {
  font-weight: 500;
  font-size: 2.6rem;
  position: relative;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.section-title h1,
.section-title h3 {
  text-align: center;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
  display: flex;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
