<template>
  <div class="index-page">
    <UContainer class="flex flex-col md:flex-row gap-6">
      <div class="flex flex-col gap-6">
        <div class="main-card">
          <Suspense>
            <template #fallback> <UserInfoSkelton /> </template>
            <UserInfo />
          </Suspense>
        </div>
        <QrCard class="main-card" />
      </div>

      <div class="main-card grow">
        <Suspense>
          <template #fallback> <ProductsSkelton /> </template>
          <div>
            <header class="header flex justify-between items-center mb-6">
              <div class="flex items-center gap-3 flex-wrap">
                <UButton
                  @click="changeTab('ProductsTap')"
                  :class="{ active: current_tab === 'ProductsTap' }"
                  class="tabBtn"
                  label="Products"
                ></UButton>
                <UButton
                  @click="changeTab('ArticlesTap')"
                  :class="{ active: current_tab === 'ArticlesTap' }"
                  class="tabBtn"
                  label="Articles"
                ></UButton>
                <UButton
                  @click="changeTab('ReviewsTap')"
                  :class="{ active: current_tab === 'ReviewsTap' }"
                  class="tabBtn"
                  label="Reviews"
                ></UButton>
              </div>
              <UButton
                class="h-10 px-4 fixed end-0 top-1/2 -translate-y-1/2 lg:static md:translate-y-0 lg:z-0 z-[9999]"
                color="default"
                label="Add Review"
              >
                <template #leading>
                  <Icon size="18" name="ic:round-add-circle-outline" />
                </template>
              </UButton>
            </header>
            <component :is="current_tab"></component>
          </div>
        </Suspense>
      </div>
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

<style lang="postcss" scoped>
.tabBtn {
  @apply h-9 w-[90px] md:w-28 justify-center border-2 rounded-xl border-gray-300 bg-transparent text-gray-500 text-sm font-normal hover:bg-secondary hover:text-whiteColor hover:border-secondary transition-all;
}

.active {
  @apply bg-[#FFF5E9] border-secondary text-secondary;
}
</style>
