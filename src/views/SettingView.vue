<script setup>
import { watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useSettingStore } from '../stores/setting'

const { settings } = storeToRefs(useSettingStore());
watch(
  settings,
  (state) => {
    localStorage.setItem('settings', JSON.stringify(state))
  },
  { deep: true }
)
</script>

<template>
  <main>
    <div class="pt-5 max-w-screen-xl mb-20 my-0 mx-auto pl-5">
      <h1 class="mb-6 text-xl font-extrabold leading-none tracking-tight text-gray-900 dark:text-white">Cài đặt</h1>
      <p class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">Cuộn lời bài hát</p>
      <label class="relative flex items-center mb-5 cursor-pointer ml-4">
        <input type="checkbox" class="sr-only peer" v-model="settings.isAutoScroll">
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:w-5 after:h-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
      </label>
      <p class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300 mb-3">Kích thước lời bài hát</p>
      <div class="relative mb-6">
          <input :value="settings.textSizeLyric" @change="settings.textSizeLyric = $event.target.value" id="labels-range-input" type="range" min="15" max="24" class="accent-green-600 mb-5 w-2/3 ml-4 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer dark:bg-gray-700">
          <div class="ml-5" :style="{ 'font-size': settings.textSizeLyric + 'px' }">
            <p>Hát Amen, Amen, vui lên Amen, Amen</p>
            <p>Vinh hiển thuộc về Ngài Amen, Amen</p>
        </div>
      </div>
    </div>
  </main>
</template>
