<script setup>
import { ref, onMounted } from 'vue'
import {getItem} from "../helper/firebase.helper";
import { useRoute } from 'vue-router';
const route = useRoute();

const song = ref([])
onMounted(async () => {
  const id = route.params.id;
  const data = await getItem(id);
  data.lyric2 = data.lyric2.replace(/\\n/g, '<br>');
  song.value = data;
})
</script>
<template>
  <div class="flex flex-col pl-10 border-l border-grey-500 leading-5 bg-scroll overflow-auto about whitespace-pre-line text-center">
    <h1 class="bold text-2xl mb-2">{{ song.name1 }}</h1>
    <h2 class="text-lg mb-5">({{ song.name2 }})</h2>
    <div v-html="song.lyric2"></div>
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
