<template>
  <NuxtLink
    class="shrink-0 block"
    :to="localePath('/')"
    aria-label="go-to-home-page"
  >
    <NuxtImg
      width="110px"
      height="40px"
      src="/images/logo/logo-light.svg"
      v-bind="$attrs"
      alt="site Logo"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath();

definePageMeta({
  inheritAttrs: false,
});
</script>
