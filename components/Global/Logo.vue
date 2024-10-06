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
      alt="site Logo"
      format="webp"
      v-bind="$attrs"
    />
  </NuxtLink>
</template>

<script setup lang="ts">
const localePath = useLocalePath();
defineOptions({
  inheritAttrs: false,
});
</script>
