import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('auth', () => {
  const getDefaultSettings = () => ({
    textSizeLyric: 19,
    isAutoScroll: false
  })
  const getSettings = () => {
    const settings = localStorage.getItem('settings')
  
    return settings ? JSON.parse(settings) : getDefaultSettings()
  }
  const updateSettings = () => {
    this.settings = {
      ...this.settings,
      ...partialSettings,
    }

    localStorage.setItem(STORE_NAME, JSON.stringify(this.settings))
  }
  const settings = ref(getSettings());
  return { settings }
})