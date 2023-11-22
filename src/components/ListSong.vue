<script setup>
import { ref } from 'vue';
import SongItem from './SongItem.vue'
import { useSongStore } from '../stores/songs'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter();
const { listSong } = storeToRefs(useSongStore());
const textSeach = ref('');
</script>

<template>
  <div class="max-w-screen-xl mb-10 my-0 mx-auto list-song">
    <div class="mt-5 lg:mb-10 mb-5 px-3">
      <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
          <input type="search" v-model="textSeach" @keyup="searchSong(textSeach)" id="default-search" class="block w-full p-3 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm kiếm bài hát">
      </div>
    </div>
    <template v-if="!loading && listSong.length">
      <SongItem
          v-for="(song, idx) in listSong"
          :key="idx"
          :name1="song.name1"
          :name2="song.name2"
          :songID="idx"
          :songCode="song.id"
          :isFavorite="song.isFavorite"
          >
      </SongItem>
  </template>
  </div>
  <h3 v-if="!loading && !listSong.length" class="text-center mt-10">Không có bài hát!</h3>
</template>
<style scoped>
</style>
