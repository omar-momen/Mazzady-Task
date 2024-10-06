<template>
  <div class="products-section">
    <!-- <ClientOnly> -->
    <!-- <ProductsSkelton v-if="status == 'pending'" class="mb-5" /> -->
    <main class="main">
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
    <!-- </ClientOnly> -->
  </div>
</template>

<script lang="ts" setup>
// Simulate API call For Skelton to Show
// const { data: photos, status } = await useApi(
//   "https://jsonplaceholder.typicode.com/photos?_limit=2000",
//   {
//     lazy: true,
//     server: false,
//   }
// );

const localePath = useLocalePath();

const SaveInFave = (id: number) => {
  const product = products.value.find((product) => product.id === id);
  if (product) {
    product.inFav = !product.inFav;
  }
};

const products = ref<any[]>([
  {
    id: 1,
    title: "Product 1",
    starting_price: 1000,
    lot_start_date: "27-8-2024",
    status: "Live auction",
    inFav: false,
    image: "/images/temp/products/product-1.png",
  },
  {
    id: 2,
    title: "Product 2",
    starting_price: 1000,
    lot_start_date: "27-8-2024",
    status: "Live auction",
    inFav: true,
    image: "/images/temp/products/product-2.png",
  },
  {
    id: 3,
    title: "Product 3",
    starting_price: 1000,
    lot_start_date: "27-8-2024",
    status: "Live auction",
    inFav: false,
    image: "/images/temp/products/product-3.png",
  },
  {
    id: 1,
    title: "Product 1",
    starting_price: 1000,
    lot_start_date: "27-8-2024",
    status: "Live auction",
    inFav: false,
    image: "/images/temp/products/product-1.png",
  },
  {
    id: 2,
    title: "Product 2",
    starting_price: 1000,
    lot_start_date: "27-8-2024",
    status: "Live auction",
    inFav: true,
    image: "/images/temp/products/product-2.png",
  },
  {
    id: 3,
    title: "Product 3",
    starting_price: 1000,
    lot_start_date: "27-8-2024",
    status: "Live auction",
    inFav: false,
    image: "/images/temp/products/product-3.png",
  },
]);
</script>
