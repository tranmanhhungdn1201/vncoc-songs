<script setup>
import {ref} from 'vue';
import { useRoute } from 'vue-router';
import { storeToRefs } from 'pinia';
import { useSongStore } from '../stores/songs';
import { QuillEditor } from '@vueup/vue-quill';
import { checkAuth } from '../helper/firebase.helper';
import SkeletonLyric from '../components/SkeletonLyric.vue';
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const route = useRoute();
const { song, loading } = storeToRefs(useSongStore());
const { fetchSong, saveLyric, saveSong, revertLyric} = useSongStore();
const id = route.params.id;
fetchSong(id);
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
  <SkeletonLyric v-if="loading"></SkeletonLyric>
  <div v-if="song?.id && !loading" class="max-w-screen-xl my-0 mx-auto pb-20 px-4 flex flex-col pt-5 border-grey-500 leading-5 bg-scroll whitespace-pre-line text-center">
    <p class="mb-2 bg-green-100 w-14 mx-auto text-green-800 text-base font-semibold px-2.5 py-0.5 rounded dark:bg-green-900 dark:text-green-300">{{ song?.id }}</p>
    <h1 class="font-semibold md:text-2xl text-lg leading-8">{{ song?.name1 }}</h1>
    <h2 class="md:text-lg text-base mb-2">{{ song?.name2 ? `(${song?.name2})` : '' }}</h2>
    <div class="mt-5" v-html="song?.lyric"></div>
  </div>
</template>
