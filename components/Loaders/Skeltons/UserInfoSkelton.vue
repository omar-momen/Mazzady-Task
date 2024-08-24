<template>
  <div class="flex flex-col space-y-4">
    <USkeleton class="h-24 w-24" :ui="{ rounded: 'rounded-xl' }" />
    <div class="space-y-2">
      <USkeleton class="h-4 w-[150px]" />
      <USkeleton class="h-10 w-[300px]" />
    </div>
    <div class="flex gap-5 *:gap-2 *:px-3 *:py-3 *:rounded-2x">
      <USkeleton class="h-14 w-14" :ui="{ rounded: 'rounded-xl' }" />
      <USkeleton class="h-14 w-14" :ui="{ rounded: 'rounded-xl' }" />
      <USkeleton class="h-14 w-14" :ui="{ rounded: 'rounded-xl' }" />
    </div>
    <USkeleton class="h-11 w-full" />
  </div>
</template>
