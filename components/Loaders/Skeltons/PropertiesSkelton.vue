<template>
  <div class="flex flex-col gap-4">
    <div class="flex-grow flex flex-col gap-2" v-for="item in 5">
      <USkeleton class="w-10 h-3 bg-gray-300" :ui="{ rounded: 'rounded-md' }" />
      <USkeleton
        class="w-full h-3 bg-gray-300"
        :ui="{ rounded: 'rounded-md' }"
      />
    </div>
  </div>
</template>
