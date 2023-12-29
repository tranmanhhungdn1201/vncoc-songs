<script setup>
import {ref, onMounted, nextTick} from 'vue';
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
const speed = ref(0);

const changeSpeed = (evt) => {
  speed.value = +evt.target.value;
}
</script>
<template>
  <SkeletonLyric v-if="loading"></SkeletonLyric>
  <div v-else class="grow h-full mx-0 md:mx-auto md:w-3/4 my-0 pb-20 flex flex-col lg:pt-5 pt-2 border-grey-500 leading-5 whitespace-pre-line text-center">
    <div class="px-4">
      <div id="infomation-song" class="px-2 pt-2 " :class="{'bg-green-50 rounded-lg': song?.src1}">
        <p class="bg-green-100 w-14 mx-auto text-green-800 text-sm font-semibold px-2.5 py-0.5 rounded">{{ song?.id }}</p>
        <h1 class="font-semibold md:text-2xl text-md leading md:leading-8">{{ song?.name1 }}</h1>
        <h2 class="md:text-lg text-xs" id="sub-title">{{ song?.name2 ? `(${song?.name2})` : '' }}</h2>
        <Player v-if="song?.src1" :src1="song?.src1" :total-time1="song?.seconds1" :src2="song?.src2" :total-time2="song?.seconds2"></Player>
      </div>
      <div class="flex justify-center items-center mb-2 mt-2 md:my-5">
          <span class="mr-2 block font-medium text-gray-500">Aa</span>
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
          <span class="mr-2 block font-medium font-sm text-gray-500">Speed</span>
          <select
            :value="speed"
            @change="changeSpeed($event)"
            class="w-20 h-6 bg-gray-50 border text-center border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block"
          >
              <option value="0">0</option>
              <option value="0.05">1x</option>
              <option value="0.07">2x</option>
              <option value="0.1">3x</option>
              <option value="0.12">4x</option>
              <option value="0.13">5x</option>
              <option value="0.2">6x</option>
              <option value="0.3">7x</option>
            </select>
      </div>
    </div>
    <div id="lyric" class="lyric border-t grow overflow-auto scrollbar" :class="{'disable' : speed == 0}">
      <vue3-auto-scroll :speed="speed" :delay="500" :hideScrollBar="false">
        <div class="leading-normal px-4 pt-2 pb-40" v-html="song?.lyric" :style="{ 'font-size': textSizeLyric + 'px' }"></div>
      </vue3-auto-scroll>
    </div>
    </div>
</template>

<style scoped>
.lyric.disable .vue3-auto-scroll-wrapper {
  overflow: visible;
}
/* .lyric.disable .vue3-auto-scroll-wrapper {
  height: auto;
} */
</style>