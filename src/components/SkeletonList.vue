<template>
  <div role="status" class="p-4 space-y-4 divide-y divide-gray-200 rounded animate-pulse">
        <div class="flex items-center justify-between pt-2" v-for="n in 15" :key="n">
            <div>
                <div class="h-2.5 bg-gray-300 rounded-full w-24 mb-2.5"></div>
                <div class="w-32 h-2 bg-gray-200 rounded-full"></div>
            </div>
            <div class="h-2.5 bg-gray-300 rounded-full w-12"></div>
        </div>
        <span class="sr-only">Loading...</span>
    </div>
</template>
