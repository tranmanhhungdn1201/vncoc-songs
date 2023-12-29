<script setup>
import { ref, onMounted} from 'vue';
import SongItem from './SongItem.vue'
import { useSongStore } from '../stores/songs'
import { storeToRefs } from 'pinia'
import { checkAuth } from '../helper/firebase.helper';
import SkeletonList from '../components/SkeletonList.vue'
const { listSong, loading } = storeToRefs(useSongStore());
const { searchSong } = useSongStore();
const textSearch = ref('');
const isEdit = ref(false);
onMounted(async () => {
  isEdit.value = await checkAuth();
})
const clearSearch = () => {
  textSearch.value = '';
  searchSong('');
}
</script>
<template>
  <div class="max-w-screen-xl mb-12 my-0 mx-auto list-song">
    <div class="mt-5 lg:mb-10 mb-3 px-3">
      <div class="relative">
          <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
              <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                  <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
              </svg>
          </div>
            <div class="relative w-full">
                <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                  <svg class="w-4 h-4 text-gray-500" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                    <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                  </svg>
                </div>
                <input v-model="textSearch" @keyup="searchSong(textSearch)" type="text" class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5" placeholder="Tìm kiếm tên, mã, nội dung của bài hát">
                <button type="button" class="absolute inset-y-0 end-0 flex items-center pe-3" v-show="textSearch.length > 0">
                    <svg @click="clearSearch()" class="w-4 h-4 text-gray-500  hover:text-gray-900 fill-gray-500" version="1.1" viewBox="0 0 512 512" width="512px" fill="none">
                      <path stroke="currentColor" d="M443.6,387.1L312.4,255.4l131.5-130c5.4-5.4,5.4-14.2,0-19.6l-37.4-37.6c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4  L256,197.8L124.9,68.3c-2.6-2.6-6.1-4-9.8-4c-3.7,0-7.2,1.5-9.8,4L68,105.9c-5.4,5.4-5.4,14.2,0,19.6l131.5,130L68.4,387.1  c-2.6,2.6-4.1,6.1-4.1,9.8c0,3.7,1.4,7.2,4.1,9.8l37.4,37.6c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1L256,313.1l130.7,131.1  c2.7,2.7,6.2,4.1,9.8,4.1c3.5,0,7.1-1.3,9.8-4.1l37.4-37.6c2.6-2.6,4.1-6.1,4.1-9.8C447.7,393.2,446.2,389.7,443.6,387.1z"/>
                    </svg>
                </button>
            </div>
      </div>
    </div>
    <SkeletonList v-if="loading"></SkeletonList>
    <div v-if="!loading && listSong.length" class="pb-8">
      <SongItem
          v-for="(song, idx) in listSong"
            :isEdit="isEdit"
            :song="song"
            :key="idx"
          >
      </SongItem>
    </div>
  </div>
  <h3 v-if="!loading && !listSong.length" class="text-center mt-10">
  Không có bài hát!
  </h3>
</template>
<style scoped>
</style>
