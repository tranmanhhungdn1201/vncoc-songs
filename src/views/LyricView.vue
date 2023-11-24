<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSongStore } from '../stores/songs';
const route = useRoute();
const { song } = storeToRefs(useSongStore());
const { fetchSong } = useSongStore();
const id = route.params.id;
fetchSong(id);
</script>
<template>

  <div v-if="song?.id" class="max-w-screen-xl my-0 mx-auto pb-20 px-4 flex flex-col pt-5 border-grey-500 leading-5 bg-scroll about whitespace-pre-line text-center">
    <span class="mb-2 bg-green-100 text-green-800 text-base font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ song?.id }}</span>
    <h1 class="font-semibold md:text-2xl text-lg mb-2 leading-8">{{ song?.name1 }}</h1>
    <h2 class="md:text-lg text-base mb-2">{{ song?.name2 ? `(${song?.name2})` : '' }}</h2>
    <div class="text-base leading-8 mt-5 " v-html="song?.lyric"></div>
  </div>
  <h1 v-else class="text-center mt-10">Wrong song</h1>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
