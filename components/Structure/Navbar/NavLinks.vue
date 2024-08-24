<template>
  <ul @click="emit('close')">
    <li>
      <NuxtLink :to="localePath('/')">{{ $t("links.home") }}</NuxtLink>
    </li>
    <!-- <li>
      <NuxtLink to="/blog">Blog</NuxtLink>
    </li> -->
    <li>
      <NuxtLink :to="localePath('/logic-task')">{{
        $t("links.logic_task")
      }}</NuxtLink>
    </li>
  </ul>
</template>

<script setup lang="ts">
const emit = defineEmits(["close"]);
const localePath = useLocalePath();
</script>

<style lang="postcss" scoped>
li a {
  @apply text-darkColor-400 font-bold text-lg relative;

  &.router-link-exact-active {
    @apply text-primary-700 after:content-[''] after:block after:w-full after:h-[6px] after:bg-primary-700 after:rounded-t-2xl after:absolute after:-bottom-[22px] after:left-0;
  }
}
</style>
