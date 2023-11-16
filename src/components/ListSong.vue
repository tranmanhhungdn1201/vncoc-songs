<script setup>
import SongItem from './SongItem.vue'
import { useSongStore } from '../stores/songs'
import { storeToRefs } from 'pinia'
const { songs, error } = storeToRefs(useSongStore());
</script>

<template>
  <div class="list-song">
    <div class="flex justify-center mt-5 mb-10">
        <input type="search" id="search" class="bg-gray-100 w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search">
    </div>
    <SongItem
        v-for="(song, idx) in songs"
        :key="idx"
        :name1="song.name1"
        :name2="song.name2"
        :songID="idx"
        :isFavorite="song.isFavorite"
        >
    </SongItem>
  </div>
</template>
<style scoped>
</style>
