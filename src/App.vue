<script setup>
import { RouterView } from 'vue-router'
import DocumentationIcon from './components/icons/IconDocumentation.vue'
import IconFavoriteOutLine from './components/icons/IconFavoriteOutLine.vue'
import IconBack from './components/icons/IconBack.vue'
import { useSongStore } from './stores/songs';
import { useRouter } from 'vue-router';
import { storeToRefs } from 'pinia';
import SlideTransition from './components/SildeTransition.vue'
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
  <header class="sticky top-0 bg-white border-b pb-2 z-50" v-show="$route.path !== '/login'">
    <div>
      <div class="text-center">
        <h1 class="green lg:text-4xl text-3xl font-semibold lg:mb-4 mb-0">VNCOC SONGS</h1>
      </div>
      <nav class="flex justify-center gap-2">
        <a class="menu flex justify-center items-center cursor-pointer text-black" :class="{ 'text-emerald-500': tab == 'normal'}" @click="clickTab('normal')">
          <DocumentationIcon />
          <span class="lg:text-base text-sm">Danh sách</span>
        </a>
        <a class="menu flex justify-center items-center gap-2 border-l pl-2 cursor-pointer text-black" :class="{ 'text-emerald-500': tab == 'favorite'}" @click="clickTab('favorite')">
          <IconFavoriteOutLine />
          <span class="lg:text-base text-sm">Yêu thích</span>
        </a>
        <a v-if="tab == 'back'" class="menu flex justify-center items-center gap-2 border-l pl-2 cursor-pointer text-black" :class="{ 'text-emerald-500': tab == 'back'}" @click="clickTab('normal')">
          <IconBack/>
          <span class="lg:text-base text-sm">Quay lại</span>
        </a>
      </nav>
    </div>
  </header>
  <SlideTransition>
    <RouterView />
  </SlideTransition>
  <footer class="fixed bottom-0 left-0 z-20 w-full lg:p-4 p-0 text-center bg-white border-t border-gray-200 shadow md:items-center md:justify-between md:p-6 dark:bg-gray-800 dark:border-gray-600">
    <span class="lg:text-sm text-xs leading-none text-gray-500 text-center dark:text-gray-400">
      Copyright © {{ new Date().getFullYear() }} - Present <br class="block md:hidden"><span class="hidden md:inline">|</span> <a href="https://vncoc.net/" class="hover:underline" target="_blank">Viet Nam Church of Christ</a>. All Rights Reserved.
    </span>
  </footer>
</template>

<style>
.menu {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}
.color-main {
  color: hsla(160, 100%, 37%, 1);
}
</style>
