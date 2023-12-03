<script setup>
import {ref} from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSongStore } from '../stores/songs';
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();
const { song, loading } = storeToRefs(useSongStore());
const { fetchSong, saveLyric, saveSong, revertLyric} = useSongStore();
const id = route.params.id;
fetchSong(id);
const admin = ref(false);
if (route.query.edit == 'true') {
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
  <div v-if="song?.id" class="max-w-screen-xl my-0 mx-auto pb-20 px-4 flex flex-col pt-5 border-grey-500 leading-5 bg-scroll whitespace-pre-line text-center">
    <p class="mb-2 bg-green-100 w-14 mx-auto text-green-800 text-base font-semibold px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ song?.id }}</p>
    <h1 v-if="!admin" class="font-semibold md:text-2xl text-lg mb-2 leading-8">{{ song?.name1 }}</h1>
    <h2 v-if="!admin" class="md:text-lg text-base mb-2">{{ song?.name2 ? `(${song?.name2})` : '' }}</h2>
    <div class="mt-2" v-if="admin && !loading">
      <input type="text" class="font-semibold text-center md:text-2xl text-lg mb-2 leading-8" :value="song?.name1" @change="song.name1 = $event.target.value" @keyup.enter="saveSong"/>
      <br>
      <input type="text" class="md:text-lg text-base mb-5 text-center h-8" :value="song?.name2" @change="song.name2 = $event.target.value" @keyup.enter="saveSong"/>
      <QuillEditor theme="snow" v-model:content="song.lyric" contentType="html" :toolbar="toolbarOptions"/>
      <div class="mx-auto w-full">
        <button class="mt-5 bg-green-400 hover:bg-green-300 text-white font-bold py-2 px-4 rounded" @click="saveSong">
          Lưu
        </button>
        <button class="mt-5 ml-2 bg-red-400 hover:bg-red-300 text-white font-bold py-2 px-4 rounded" @click="revertLyric">
          Đặt lại
        </button>
      </div>
    </div>
    <div class="text-base leading-8 mt-5" v-html="song?.lyric"></div>
  </div>
</template>
