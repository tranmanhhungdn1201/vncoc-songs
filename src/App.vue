<script setup>
import { RouterLink, RouterView } from 'vue-router'
import SupportIcon from './components/icons/IconSupport.vue'
import DocumentationIcon from './components/icons/IconDocumentation.vue'
import { useSongStore } from './stores/songs';
const { fetchSongs, fetchSongsFavorite, fetchFavoriteIds } = useSongStore();
fetchFavoriteIds();
fetchSongsFavorite();
const clickTab = (tabName) => {
  if (tabName === 'favorite') {
    fetchSongsFavorite();
  } else {
    fetchSongs();
  }
}
</script>

<template>
  <header>
    <div class="wrapper">
      <div class="section-title">
        <h1 class="green">VNCOC SONGS</h1>
      </div>
      <nav class="tab-menu flex justify-center">
            <RouterLink to="/" class="menu text-slate-900" @click="clickTab('normal')">
              <DocumentationIcon />
              <span>Danh sách</span>
            </RouterLink>
          <RouterLink to="/favorite" class="menu text-slate-900" @click="clickTab('favorite')">
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
  display: flex;
}

nav a.router-link-exact-active {
  color: hsla(160, 100%, 37%, 1);
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
</style>
