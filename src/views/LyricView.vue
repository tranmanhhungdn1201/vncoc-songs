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
import Player from "../components/Player.vue"
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
const route = useRoute();
const textSizeLyric = ref(15);
const { song, loading } = storeToRefs(useSongStore());
const { settings } = storeToRefs(useSettingStore());
const { fetchSong } = useSongStore();
const id = route.params.id;
fetchSong(id);
let lyricHeight = ref(null);
const speed = ref(0.1);
onMounted(async () => {
  if (settings.value.isAutoScroll) {
    const sub = song?.src1 ? 285 : 215;
    lyricHeight.value = document.getElementsByTagName('footer')?.[0]?.offsetTop - sub;
  }
})

const changeSpeed = (evt) => {
  speed.value = +evt.target.value;
}
</script>
<template>
  <SkeletonLyric v-if="loading"></SkeletonLyric>
  <div v-else class="max-w-screen-xl my-0 mx-auto pb-20 px-4 flex flex-col lg:pt-5 pt-2 border-grey-500 leading-5 whitespace-pre-line text-center">
    <div id="infomation-song" class="px-2 pt-2 " :class="{'bg-green-50 rounded-lg': song?.src1}">
      <p class="bg-green-100 w-14 mx-auto text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-00">{{ song?.id }}</p>
      <h1 class="font-semibold md:text-2xl text-md leading-8">{{ song?.name1 }}</h1>
      <h2 class="md:text-lg text-sm" id="sub-title">{{ song?.name2 ? `(${song?.name2})` : '' }}</h2>
      <Player v-if="song?.src1" :src1="song?.src1" :total-time1="song?.seconds1" :src2="song?.src2" :total-time2="song?.seconds2"></Player>
    </div>
    <div class="flex justify-center items-center mb-2 mt-2 md:my-5">
        <vue-slider
            class="flex-1"
            v-model="textSizeLyric"
            :min="15"
            :max="24"
            lazy
            contained
            :tooltip="'active'"
          >
          </vue-slider>
        <select
          :value="speed"
          @change="changeSpeed($event)"
          v-if="settings.isAutoScroll"
          :class="{'ml-2': settings.isAutoScroll}"
          class="w-20 h-6 bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        >
            <option value="0">0</option>
            <option value="0.1">0.1x</option>
            <option value="0.2">0.2x</option>
            <option value="0.3">0.3x</option>
            <option value="0.4">0.4x</option>
            <option value="0.5">0.5x</option>
            <option value="1">1x</option>
          </select>
    </div>
    <div id="lyric" :style="{height: `${speed !='0' ? lyricHeight + 'px' : 100 + '%'}`}" class="border-t">
      <vue3-auto-scroll :delay="2000" :speed="speed">
        <div class="mt-5 leading-normal" v-html="song?.lyric" :style="{ 'font-size': textSizeLyric + 'px' }"></div>
      </vue3-auto-scroll>
    </div>
    </div>
</template>