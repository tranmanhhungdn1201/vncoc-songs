<script setup>
import { RouterLink, RouterView } from 'vue-router'
import DocumentationIcon from './components/icons/IconDocumentation.vue'
import IconFavoriteOutLine from './components/icons/IconFavoriteOutLine.vue'
import { useSongStore } from './stores/songs';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia'
const router = useRouter();
const { fetchSongs, fetchFavoriteIds, changeTab } = useSongStore();
const { tab } = storeToRefs(useSongStore());
fetchFavoriteIds();
fetchSongs();
const clickTab = (tabName) => {
  changeTab(tabName);
  if (router.currentRoute._value.name != 'home') {
    router.push(`/`);
  }
}
</script>

<template>
  <header class="sticky top-0 bg-white border-b pb-2 z-50">
    <div>
      <div class="text-center">
        <h1 class="green lg:text-4xl text-3xl font-semibold mb-4">VNCOC SONGS</h1>
      </div>
      <nav class="flex justify-center gap-2">
        <a class="menu flex justify-center items-center cursor-pointer text-black" :class="{ 'text-emerald-500': tab == 'normal'}" @click="clickTab('normal')">
          <DocumentationIcon />
            <span class="text-base">Danh sách</span>
        </a>
        <a class="menu flex justify-center items-center gap-2 border-l pl-2 cursor-pointer text-black" :class="{ 'text-emerald-500': tab == 'favorite'}" @click="clickTab('favorite')">
          <IconFavoriteOutLine />
            <span class="text-base">Yêu thích</span>
        </a>
      </nav>
    </div>
  </header>
  <RouterView />
</template>

<style scoped>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
</style>
