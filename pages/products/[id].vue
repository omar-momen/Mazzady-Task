<template>
  <div>
    <h1>Product with id: {{ params.id }}</h1>
  </div>
</template>

<script setup>
const params = useRoute().params;
</script>
