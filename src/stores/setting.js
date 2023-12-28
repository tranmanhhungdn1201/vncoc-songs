import { ref } from 'vue';
import { defineStore } from 'pinia'

export const useSettingStore = defineStore('auth', () => {
  const getDefaultSettings = () => ({
    isAutoScroll: true
  })
  const getSettings = () => {
    return getDefaultSettings();
    const settings = localStorage.getItem('settings')
  
    return settings ? JSON.parse(settings) : getDefaultSettings()
  }
  const updateSettings = () => {
    this.settings = {
      ...this.settings,
    }

    localStorage.setItem(STORE_NAME, JSON.stringify(this.settings))
  }
  const settings = ref(getSettings());
  return { settings }
})