<script setup>
import { ref } from 'vue'
import SupportIcon from './icons/IconSupport.vue'
import { useRouter } from 'vue-router';
import { loadState, saveState } from '../helper/localStorage.helper'
import { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
const router = useRouter();

const props = defineProps({
  songID: Number,
  name1: String,
  name2: String,
  isFavorite: Boolean
})
const isFavorite = ref(props.isFavorite);
const clickSong = async (id, event) => {
  console.log(event.target.tagName)
  if (event.target.tagName !== 'path') {
    router.push(`/songs/${id}`);
  }
}
const likeSong = () => {
  let lgFavorite = loadState('favorite') ?? [];
  let idxSong =  lgFavorite.indexOf(props.songID);
  if (idxSong !== -1) {
    lgFavorite.splice(idxSong, 1);
    toast.success('Đã hủy chọn bài hát yêu thích!');
  } else {
    lgFavorite.push(props.songID);
    toast.success('Đã chọn thành bài hát yêu thích!');
  }
  lgFavorite = [...new Set(lgFavorite)];
  isFavorite.value = !isFavorite.value;
  saveState(lgFavorite, 'favorite')
}
</script>
<template>
  <div @click="clickSong(props.songID, $event)" class="item cursor-pointer hover:bg-slate-50 p-3 rounded-lg items-center">
    <div  class="details">
      <h3>
        {{props.name1}}
      </h3>
      {{props.name2}}
    </div>
    <SupportIcon
      :class="{'fill-green-700': isFavorite }"
      class="fill-gray-300 hover:fill-green-700"
      @click="likeSong()"
    />
  </div>
</template>

<style scoped>
.item {
  margin-top: 2rem;
  display: flex;
  position: relative;
}

.details {
  flex: 1;
  margin-left: 1rem;
}

i {
  display: flex;
  place-items: center;
  place-content: center;
  width: 32px;
  height: 32px;
  color: var(--color-text);
}

h3 {
  font-size: 1.2rem;
  font-weight: 500;
  margin-bottom: 0.4rem;
  color: var(--color-heading);
}

@media (min-width: 1024px) {
  .item {
    margin: 0.4rem 0 1rem calc(var(--section-gap) / 2);
    margin-top: 0;
  }

  i {
    top: calc(50% - 25px);
    left: -26px;
    position: absolute;
    border: 1px solid var(--color-border);
    background: var(--color-background);
    border-radius: 8px;
    width: 50px;
    height: 50px;
  }
  .item:first-of-type:before {
    display: none;
  }

  .item:last-of-type:after {
    display: none;
  }
}
</style>
