<template>
  <NuxtLink class="shrink-0 block" :to="localePath('/')">
    <NuxtImg
      sizes="100px md:108px"
      height="40px"
      src="/images/logo/logo-light.svg"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
</script>
