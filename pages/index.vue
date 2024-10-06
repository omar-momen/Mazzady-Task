<template>
  <div class="index-page">
    <UContainer class="flex flex-col md:flex-row gap-6">
      <section class="flex flex-col gap-6">
        <div class="main-card">
          <UserInfo />
        </div>
        <!-- <QrCard class="main-card" /> -->
      </section>

      <section class="main-card grow">
        <header class="header flex justify-between items-center mb-6">
          <div class="flex items-center gap-3 flex-wrap">
            <UButton
              @click="changeTab('ProductsTap')"
              :class="{ active: current_tab === 'ProductsTap' }"
              class="tabBtn"
              label="Products"
              aria-label="Products"
            ></UButton>
            <UButton
              @click="changeTab('ArticlesTap')"
              :class="{ active: current_tab === 'ArticlesTap' }"
              class="tabBtn"
              label="Articles"
              aria-label="Articles"
            ></UButton>
            <UButton
              @click="changeTab('ReviewsTap')"
              :class="{ active: current_tab === 'ReviewsTap' }"
              class="tabBtn"
              label="Reviews"
              aria-label="Reviews"
            ></UButton>
          </div>
          <UButton
            class="h-10 px-4 fixed end-0 top-1/2 -translate-y-1/2 lg:static md:translate-y-0 lg:z-0 z-[998]"
            color="default"
            label="Add Review"
            aria-label="Add Review"
          >
            <template #leading>
              <Icon size="18" name="ic:round-add-circle-outline" />
            </template>
          </UButton>
        </header>
        <component :is="current_tab"></component>
      </section>
    </UContainer>
  </div>
</template>

<script setup>
definePageMeta({
  title: "HomePage",
});

const current_tab = ref("ProductsTap");
const changeTab = (tab) => {
  current_tab.value = tab;
};
</script>

<script>
import { defineComponent } from "vue";
import ProductsTap from "@/components/pages/home/Tabs/ProductsTap.vue";
import ArticlesTap from "@/components/pages/home/Tabs/ArticlesTap.vue";
import ReviewsTap from "@/components/pages/home/Tabs/ReviewsTap.vue";

export default defineComponent({
  components: {
    ProductsTap,
    ArticlesTap,
    ReviewsTap,
  },
});
</script>
