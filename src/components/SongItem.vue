<script setup>
import SupportIcon from './icons/IconSupport.vue'
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
  songID: Number,
  name1: String,
  name2: String,
})
const clickSong = async (id) => {
  router.push(`/songs/${id}`);
}

</script>
<template>
  <div @click="clickSong(props.songID)" class="item cursor-pointer hover:bg-slate-50 p-3 rounded-lg items-center">
    <div  class="details">
      <h3>
        {{props.name1}}
      </h3>
      {{props.name2}}
    </div>
    <SupportIcon class="fill-gray-300 hover:fill-green-700"/>
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
