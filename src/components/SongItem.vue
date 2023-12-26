<script setup>
import SupportIcon from './icons/IconSupport.vue'
import IconEdit from './icons/IconEdit.vue'
import { useRouter } from 'vue-router';
import { loadState, saveState } from '../helper/localStorage.helper'
import { useSongStore } from '../stores/songs';
const router = useRouter();

const props = defineProps({
  isEdit: Boolean,
  song: Object
})
const { fetchFavoriteIds } = useSongStore();
const clickSong = (id, event) => {
  if (event.target.tagName !== 'path') {
    router.push(`/songs/${id}`);
  }
}
const clickEdit = (id) => {
  router.push(`/songs/${id}/edit`);
}

const likeSong = () => {
  let lgFavorite = loadState('favorite') ?? [];
  let idxSong = lgFavorite.indexOf(props.song.id);
  if (idxSong !== -1) {
    lgFavorite.splice(idxSong, 1);
    props.song.isFavorite = false;
  } else {
    props.song.isFavorite = true;
    lgFavorite.push(props.song.id);
  }
  lgFavorite = [...new Set(lgFavorite)];
  saveState(lgFavorite, 'favorite');
  fetchFavoriteIds();
}
</script>
<template>
  <div class="item flex cursor-pointer hover:bg-slate-50 p-3 items-center border-b">
    <span @click="clickSong(props.song.id, $event)" class="bg-green-100 text-green-800 md:text-base text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ props.song.id }}</span>
    <div class="flex-1 ml-1 md:ml-5" @click="clickSong(props.song.id, $event)">
      <h3 class="md:text-lg text-sm font-semibold">
        {{props.song.name1}}
      </h3>
      <span class="md:text-sm text-xs">{{props.song.name2}}</span>
    </div>
    <div class="flex items-center">
      <IconEdit
        v-if="props.isEdit"
        class="fill-gray-300 hover:fill-green-700"
        @click="clickEdit(props.song.id)"
      />
      <SupportIcon
        :class="{'fill-green-700': props.song.isFavorite }"
        class="mt-1 ml-2 fill-gray-300 hover:fill-green-700"
        @click="likeSong()"
      />
    </div>
  </div>
</template>

<style scoped>

</style>
