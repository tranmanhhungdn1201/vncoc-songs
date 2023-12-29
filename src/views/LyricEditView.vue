<script setup>
import {ref} from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSongStore } from '../stores/songs';
import { QuillEditor } from '@vueup/vue-quill';
import { checkAuth } from '../helper/firebase.helper';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();
const { song, loading } = storeToRefs(useSongStore());
const { fetchSong, saveLyric, saveSong, revertLyric} = useSongStore();
const id = route.params.id;
fetchSong(id);
const admin = ref(false);
if (checkAuth()) {
  admin.value = true;
}
var toolbarOptions = [
  ['bold', 'italic', 'underline'],        // toggled buttons
  ['blockquote'],
  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction
  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],
];
</script>
<template>
  <div v-if="song?.id" class="overflow-auto scrollbar w-full my-0 pb-20 px-4 flex flex-col pt-5 border-grey-500 leading-5 bg-scroll whitespace-pre-line text-center">
    <div class="max-w-7xl mx-auto">
      <p class="bg-green-100 w-14 mx-auto text-green-800 text-base font-semibold px-2.5 py-0.5 rounded">{{ song?.id }}</p>
      <div class="mt-2">
        <input type="text" class="border border-gray-300 font-semibold text-center md:text-2xl text-lg mb-2 leading-8" :value="song?.name1" @change="song.name1 = $event.target.value" @keyup.enter="saveSong" placeholder="Nhập tên thứ 1"/>
        <br>
        <input type="text" class="border border-gray-300 md:text-lg text-base mb-5 text-center h-8 w-full" :value="song?.name2" @change="song.name2 = $event.target.value" @keyup.enter="saveSong" placeholder="Nhập tên thứ 2"/>
        <br>
        <input type="text" class="border border-gray-300 md:text-lg text-base mb-5 text-center h-8 w-full" :value="song?.src1" @change="song.src1 = $event.target.value" @keyup.enter="saveSong" placeholder="Nhập link mp3_1"/>
        <br>
        <input type="text" class="border border-gray-300 md:text-lg text-base mb-5 text-center h-8 w-full" :value="song?.seconds1" @change="song.seconds1 = $event.target.value" @keyup.enter="saveSong" placeholder="Nhập số giây mp3_1"/>
        <br>
        <input type="text" class="border border-gray-300 md:text-lg text-base mb-5 text-center h-8 w-full" :value="song?.src2" @change="song.src2 = $event.target.value" @keyup.enter="saveSong" placeholder="Nhập link mp3_2"/>
        <br>
        <input type="text" class="border border-gray-300 md:text-lg text-base mb-5 text-center h-8 w-full" :value="song?.seconds2" @change="song.seconds2 = $event.target.value" @keyup.enter="saveSong" placeholder="Nhập số giây mp3_2"/>
      </div>
      <QuillEditor theme="snow" v-model:content="song.lyric" contentType="html" :toolbar="toolbarOptions"/>
        <div class="mx-auto w-full">
          <button class="mt-5 bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded" @click="saveSong">
            Lưu
          </button>
          <button class="mt-5 ml-2 bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" @click="revertLyric">
            Đặt lại
          </button>
        </div>
      <div class="mt-5 pb-40" v-html="song?.lyric"></div>
      </div>
  </div>
</template>
