<script setup lang="ts">
import ProductCard from "~/components/Product/ProductCard.vue";
</script>

<template>
  <div class="flex flex-col space-y-4">
    <div class="flex gap-4">
      <USkeleton class="h-10 w-24" :ui="{ rounded: 'rounded-xl' }" />
      <USkeleton class="h-10 w-24" :ui="{ rounded: 'rounded-xl' }" />
      <USkeleton class="h-10 w-24" :ui="{ rounded: 'rounded-xl' }" />
    </div>

    <USkeleton class="h-5 w-20" :ui="{ rounded: 'rounded-md' }" />

    <ProductSkelton />
    <ProductSkelton />
    <ProductSkelton />
    <ProductSkelton />
    <ProductSkelton />
  </div>
</template>
