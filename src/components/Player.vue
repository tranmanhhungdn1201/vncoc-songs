<script setup>
import {ref} from 'vue';
import {formatTimer} from '../helper/timer'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'

const player = new Audio();
const currentlyTimer = ref("00:00");
const isPlaying = ref(false);
const percent = ref(0);
const totalTime = ref(formatTimer(323));
const seekSliderFormatState = ref((v) => `${formatTimer(v)}`)
const play = () => {
    if (!player.src) {
        player.src = "/src/assets/audios/091%20Hosanna.mp3";
    }
    console.log(player);
    player.play();
    isPlaying.value = true;
    listenersWhenPlay();
}

const pause = () => {
    player.pause();
    isPlaying.value = false;
}
const listenersWhenPlay = () => {
    player.addEventListener("timeupdate", () => {
        const playerTimer = player.currentTime;
        percent.value = (playerTimer * 100) / 323;
        console.log(percent);
        currentlyTimer.value = formatTimer(playerTimer);
    });
}
</script>
<template>
    <div>
      <main>
        <section class="player">
          <div class="song-details">
            <div class="space-y-2">
                <vue-slider
                    v-model="percent"
                    :min="0"
                    :max="323"
                    lazy
                    contained
                    :tooltip="'active'"
                    :tooltip-formatter="seekSliderFormatState"
                ></vue-slider>
                <div class="flex justify-between text-sm leading-6 font-medium tabular-nums">
                    <div class="text-cyan-500 transition-all duration-500 dark:text-slate-100">{{ currentlyTimer }}</div>
                    <div class="text-slate-500 transition-all duration-500 dark:text-slate-400">{{ totalTime }}</div>
                </div>
            </div>
          </div>
          <div class="controls">
            <button class="play" v-if="!isPlaying">
              <font-awesome-icon icon="play" @click="play"/>
            </button>
            <button class="pause"  v-else>
              <font-awesome-icon icon="pause" @click="pause"/>
            </button>
          </div>
        </section>
      </main>
    </div>
  </template>

<style scoped>
.pause, .play {
    background-image: linear-gradient(to right top,#d16ba5,#c777b9,#ba83ca,#aa8fd8,#9a9ae1,#8aa7ec,#79b3f4,#69bff8,#52cffe,#41dfff,#46eefa,#5ffbf1);
    border-radius: 50%;
    width: 80px;
    height: 80px;
    box-shadow: -1px 17px 24px -6px rgba(0,0,0,.2);
    font-size: 25px;
    margin-left: 20px;
    margin-right: 20px;
    color: white
}
</style>
  