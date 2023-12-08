<template>
  <transition name="slide" mode="out-in">
    <slot></slot>
  </transition>
</template>

<style scoped>
  .slide-leave {
    opacity: 1;
  }

  .slide-leave-active {
    transition: opacity 0.3s ease;
    opacity: 0;
    animation: slide-out 0.3s ease-out forwards;
  }

  .slide-enter {
    opacity: 0;
  }

  .slide-enter-active {
    transition: opacity 0.3s ease;
    opacity: 1;
    animation: slide-out 0.3s ease-in reverse;
  }

  @keyframes slide-out {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(30px);
    }
  }
</style>