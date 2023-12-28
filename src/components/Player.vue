<script setup>
import {ref, onUnmounted} from 'vue';
import {formatTimer} from '../helper/timer'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const props = defineProps({
  src1: String,
  totalTime1: Number,
  src2: String,
  totalTime2: Number
})
const currentSong = ref({
  src: props.src1,
  totalTime: +props.totalTime1,
})
const player = new Audio();
const currentlyTimer = ref("00:00");
const isPlaying = ref(false);
const isBeat = ref(true);
const totalTime = ref(formatTimer(currentSong.value.totalTime));
const seekSliderFormatState = ref((v) => `${formatTimer(v)}`)
const play = () => {
  isPlaying.value = true;
  player.play();
  listenersWhenPlay();
}

const setCurrentSong = () => {
  if (isBeat.value) {
    currentSong.value.src = props.src1
    currentSong.value.totalTime = props.totalTime1
    totalTime.value = formatTimer(props.totalTime1)
  } else {
    currentSong.value.src = props.src2
    currentSong.value.totalTime = props.totalTime2
    totalTime.value = formatTimer(props.totalTime2)
  }
  player.src = currentSong.value.src;
}

const pause = () => {
  isPlaying.value = false;
  player.pause();
}
const listenersWhenPlay = () => {
    player.addEventListener("timeupdate", () => {
        const playerTimer = player.currentTime;
        currentlyTimer.value = formatTimer(playerTimer);
        if (playerTimer >= +currentSong.value.totalTime) {
          setTimeZero();
        }
    });
}
const setTimeZero = () => {
  currentlyTimer.value = formatTimer(0);
  player.currentTime = 0;
  pause();
}
const seekTo = () => {
  if (!isPlaying.value) {
    setCurrentSong();
    play();
  }
}
onUnmounted(async () => {
  pause()
})
const switchMode = () => {
  isBeat.value = !isBeat.value;
  pause();
  setCurrentSong();
  play();
}

setCurrentSong();
</script>
<template>
    <div>
      <main>
        <section class="player">
          <div class="song-details flex justify-center items-center">
            <div class="">
              <button class="mb-5 md:mr-5 mr-2 text-xl text-emerald-400" v-if="props.src2" @click="switchMode">
                <span v-if="isBeat" class="inline-flex items-center rounded-md bg-yellow-50 px-2 py-1 text-xs font-medium text-yellow-800 ring-1 ring-inset ring-yellow-600/20">Ko lời</span>
                <span v-else class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">Có lời</span>
              </button>
              <button class="play" v-if="!isPlaying" @click="play">
                <font-awesome-icon icon="play"/>
              </button>
              <button class="pause" v-else @click="pause">
                <font-awesome-icon icon="pause"/>
              </button>
            </div>
            <div class="flex-1">
              <vue-slider
                    v-model="player.currentTime"
                    :min="0"
                    :max="+currentSong.totalTime"
                    lazy
                    contained
                    :tooltip="'active'"
                    :tooltip-formatter="seekSliderFormatState"
                    :process-style="{ backgroundColor: 'hsla(160, 100%, 37%, 1)' }"
                    @change="seekTo"
                >
                  <template v-slot:dot="{ focus }">
                    <div :class="['w-full h-full rounded-full bg-emerald-500 transform transition-all duration-300 cursor-pointer', { focus }]"></div>
                  </template>
              </vue-slider>
              <div class="flex justify-between text-sm leading-6 mt-0">
                <div class="text-emerald-500 transition-all duration-500 dark:text-slate-100">{{ currentlyTimer }}</div>
                <div class="text-emerald-500 transition-all duration-500 dark:text-slate-400">{{ totalTime }}</div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  </template>

<style scoped>
.pause, .play {
  background: #11998e; /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #11998e, #38ef7d); /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #11998e, #38ef7d); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  border-radius: 50%;
  width: 50px;
  height: 50px;
  box-shadow: -1px 17px 24px -6px rgba(0,0,0,.2);
  font-size: 20px;
  margin-right: 15px;
  margin-bottom: 15px;
  color: white
}
</style>
  