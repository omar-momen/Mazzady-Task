<template>
  <div class="products-section">
    <ClientOnly>
      <template v-if="status == 'pending'">
        <ProductSkelton class="mb-5" v-for="product in 4" :key="product" />
      </template>
      <main v-else class="main">
        <h1 class="text-3xl font-extrabold flex items-center gap-2 mb-3">
          {{ $t("products.title") }}
          <span class="text-gray-400 text-xs font-normal"
            >( {{ products?.length }} )</span
          >
        </h1>
        <div class="overflow-y-scroll h-full max-h-[720px] hide-scrollbar">
          <template v-for="product in products" :key="product.id">
            <NuxtLink
              :to="localePath(`/products/${product.id}`)"
              aria-label="go-to-product-page"
            >
              <ProductCard :product="product" @saveInFave="SaveInFave" />
            </NuxtLink>
          </template>
        </div>
      </main>
    </ClientOnly>
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();

const SaveInFave = (id: number) => {
  const product = products.value.find((product) => product.id === id);
  if (product) {
    product.inFav = !product.inFav;
  }
};

const products: Ref<any[]> = ref([]);

// Simulate API call For Skelton to Show
const { data: photos, status } = await useApi(
  "https://jsonplaceholder.typicode.com/photos?_limit=20",
  {
    lazy: true,
    server: false,
  }
);
watch(
  () => photos.value,
  () => {
    products.value = photos.value?.map((photo: any) => ({
      id: photo.id,
      title: photo.title,
      starting_price: 1000,
      lot_start_date: "27-8-2024",
      status: "Live auction",
      inFav: false,
      image: photo.url,
    }));
  }
);
</script>
