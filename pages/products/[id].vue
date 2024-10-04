<template>
  <div>
    <UContainer>
      <h1>Product with id: {{ params.id }}</h1>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  title: `Product`,
});

const params = useRoute().params;
</script>
