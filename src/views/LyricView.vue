<script setup>
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSongStore } from '../stores/songs';
const route = useRoute();
const { song, error } = storeToRefs(useSongStore());
const { fetchSong } = useSongStore();
const id = route.params.id;
fetchSong(id);
</script>
<template>
  <div class="flex flex-col pt-10 md:pl-10 mt-4 border-grey-500 leading-5 bg-scroll overflow-auto about whitespace-pre-line text-center">
    <h1 class="bold text-2xl mb-2">{{ song?.name1 }}</h1>
    <h2 class="text-lg mb-5">({{ song?.name2 }})</h2>
    <div v-html="song?.lyric2"></div>
  </div>
</template>

<style>
@media (min-width: 1024px) {
  .about {
    display: flex;
    align-items: center;
  }
}
</style>
