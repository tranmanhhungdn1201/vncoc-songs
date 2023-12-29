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
      <h1 class="mb-6 text-xl font-extrabold leading-none tracking-tight text-gray-900">Cài đặt</h1>
      <p class="ms-3 text-sm font-medium text-gray-900">Cuộn lời bài hát</p>
      <label class="relative flex items-center mb-5 cursor-pointer ml-4">
        <input type="checkbox" class="sr-only peer" v-model="settings.isAutoScroll">
        <div class="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 "></div>
      </label>
    </div>
  </main>
</template>
