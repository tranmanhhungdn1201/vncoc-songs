<script setup>
import { ref } from 'vue'
import SupportIcon from './icons/IconSupport.vue'
import { useRouter } from 'vue-router';
import { loadState, saveState } from '../helper/localStorage.helper'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import { useSongStore } from '../stores/songs';
const router = useRouter();

const props = defineProps({
  songCode: String,
  songID: Number,
  name1: String,
  name2: String,
  isFavorite: Boolean
})
const { fetchFavoriteIds, fetchSongsFavorite } = useSongStore();
fetchFavoriteIds();
const isFavorite = ref(props.isFavorite);
const clickSong = async (id, event) => {
  if (event.target.tagName !== 'path') {
    router.push(`/songs/${id}`);
  }
}
const likeSong = () => {
  let lgFavorite = loadState('favorite') ?? [];
  let idxSong = lgFavorite.indexOf(props.songID);
  if (idxSong !== -1) {
    lgFavorite.splice(idxSong, 1);
    toast.success('Đã hủy chọn bài hát yêu thích!');
  } else {
    lgFavorite.push(props.songID);
    toast.success('Đã chọn thành bài hát yêu thích!');
  }
  lgFavorite = [...new Set(lgFavorite)];
  isFavorite.value = !isFavorite.value;
  saveState(lgFavorite, 'favorite');
  fetchFavoriteIds();
  if (router.currentRoute._value.name === 'favorite') {
    fetchSongsFavorite();
  }
}
</script>
<template>
  <div class="item flex cursor-pointer hover:bg-slate-50 p-3 items-center border-b">
    <span class="bg-green-100 text-green-800 md:text-base text-sm font-semibold me-2 px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ props.songCode }}</span>
    <div class="flex-1 ml-1 md:ml-5" @click="clickSong(props.songCode, $event)">
      <h3 class="md:text-lg text-sm font-semibold">
        {{props.name1}}
      </h3>
      <span class="md:text-sm text-xs">{{props.name2}}</span>
    </div>
    <div>
      <SupportIcon
        :class="{'fill-green-700': isFavorite }"
        class="fill-gray-300 hover:fill-green-700"
        @click="likeSong()"
      />
    </div>
  </div>
</template>
