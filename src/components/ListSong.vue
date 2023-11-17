<script setup>
import { ref } from 'vue';
import SongItem from './SongItem.vue'
import { useSongStore } from '../stores/songs'
import { storeToRefs } from 'pinia'
import { useRouter } from 'vue-router'
const router = useRouter();
const { songs, tabName, loading, error } = storeToRefs(useSongStore());
const { searchSong,fetchSongs, fetchSongsFavorite, fetchFavoriteIds } = useSongStore();
fetchFavoriteIds();
if (router.currentRoute._value.name == 'favorite') {
  fetchSongsFavorite();
} else {
  fetchSongs();
}
const textSeach = ref('');
</script>

<template>
  <div class="list-song">
    <div class="flex justify-center mt-5 lg:mb-10 mg-5 px-3" >
        <input
          v-model="textSeach"
          type="search"
          id="search"
          class="bg-gray-100 w-1/2 border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Tìm bài hát"
          @keyup="searchSong(textSeach)"
        >
    </div>
    <template v-if="!loading && songs.length">
      <SongItem
          v-for="(song, idx) in songs"
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
  <h3 v-if="!loading && !songs.length" class="text-center mt-10">Không có bài hát!</h3>
</template>
<style scoped>
</style>
