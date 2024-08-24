<template>
  <NuxtLink class="shrink-0 block" :to="localePath('/')">
    <NuxtImg
      width="110px"
      height="40px"
      src="/images/logo/logo-light.svg"
      v-bind="$attrs"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

definePageMeta({
  inheritAttrs: false,
});
</script>
