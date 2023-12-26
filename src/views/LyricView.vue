<script setup>
import {ref, onMounted} from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSongStore } from '../stores/songs';
import SkeletonLyric from '../components/SkeletonLyric.vue';
import { useSettingStore } from '../stores/setting';
import '@vueup/vue-quill/dist/vue-quill.snow.css';
import { Vue3AutoScroll } from "vue3-auto-scroll";
import "vue3-auto-scroll/dist/style.css";

const route = useRoute();
const { song, loading } = storeToRefs(useSongStore());
const { settings } = storeToRefs(useSettingStore());
const { fetchSong } = useSongStore();
const id = route.params.id;
fetchSong(id);
let lyricHeight = ref(null);
const speed = ref(0.35);
onMounted(async () => {
  if (settings.value.isAutoScroll) {
    lyricHeight.value = document.getElementsByTagName('footer')?.[0]?.offsetTop - 215;
    console.log(document.getElementById('lyric').querySelectorAll('p:last-of-type')?.[0]?.offsetTop);
  }
})
const changeSpeed = (evt) => {
  speed.value = +evt.target.value;
}
</script>
<template>
  <SkeletonLyric v-if="loading"></SkeletonLyric>
  <div class="h-max scrolling-lyrics max-w-screen-xl my-0 mx-auto pb-20 px-4 flex flex-col pt-5 border-grey-500 leading-5 bg-scroll whitespace-pre-line text-center">
    <div id="infomation-song">
      <p class="bg-green-100 w-14 mx-auto text-green-800 text-base font-semibold px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ song?.id }}</p>
      <h1 class="font-semibold md:text-2xl text-lg leading-8">{{ song?.name1 }}</h1>
      <div class="flex justify-center mb-2">
        <h2 class="md:text-lg text-base" id="sub-title">{{ song?.name2 ? `(${song?.name2})` : '' }}</h2>
        <select
          @change="changeSpeed($event)"
          v-if="settings.isAutoScroll"
          :class="{'ml-2': settings.isAutoScroll}"
          class="w-20 h-6 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option value="0.35">0.35x</option>
            <option value="0.5">0.5x</option>
            <option value="0.7">0.7x</option>
            <option value="1">1x</option>
          </select>
      </div>
    </div>
    <div id="lyric" :style="{height: `${lyricHeight}px`}" :class="{'bg-green-50': settings.isAutoScroll}">
      <vue3-auto-scroll :delay="300" :speed="speed">
        <div class="mt-5 leading-tight" v-html="song?.lyric" :style="{ 'font-size': settings.textSizeLyric + 'px' }"></div>
      </vue3-auto-scroll>
    </div>
  </div>
</template>