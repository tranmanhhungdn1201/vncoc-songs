<script setup>
import { ref, onMounted } from 'vue'
import SongItem from './SongItem.vue'
import { getData } from "../helper/firebase.helper";
const songs = ref([])
onMounted(async () => {
  songs.value = await getData();
})
</script>

<template>
  <div class="list-song">
    <SongItem
        v-for="(song, idx) in songs"
        :key="idx"
        :name1="song.name1"
        :name2="song.name2"
        :songID="idx">
    </SongItem>
  </div>
</template>
<style scoped>
.list-song {
  border-left: 1px solid #ddd;
}
@media (max-width: 768px) {
  .list-song {
    border-left: none;
  }
}
</style>
