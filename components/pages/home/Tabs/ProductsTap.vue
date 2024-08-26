<template>
  <div class="products-section">
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
  </div>
</template>

<script lang="ts" setup>
const localePath = useLocalePath();

const products = ref([]);
products.value = await new Promise((resolve) =>
  setTimeout(() => {
    resolve([
      {
        id: 1,
        title:
          "Six-piece clothing set (blouse - pants - hat and to be continued",
        starting_price: 1000,
        lot_start_date: "27-8-2024",
        status: "Live auction",
        inFav: true,
        image: "/temp/products/product-1.png",
      },
      {
        id: 2,
        title:
          "Six-piece clothing set (blouse - pants - hat and to be continued",
        starting_price: 1000,
        lot_start_date: "27-8-2024",
        status: "Live auction",
        inFav: false,
        image: "/temp/products/product-2.png",
      },
      {
        id: 3,
        title:
          "Six-piece clothing set (blouse - pants - hat and to be continued",
        starting_price: 1000,
        lot_start_date: "27-8-2024",
        status: "Hot Sale",
        inFav: true,
        image: "/temp/products/product-3.png",
      },
      {
        id: 4,
        title:
          "Six-piece clothing set (blouse - pants - hat and to be continued",
        starting_price: 1000,
        lot_start_date: "27-8-2024",
        status: "Live auction",
        inFav: false,
        image: "/temp/products/product-1.png",
      },
      {
        id: 5,
        title:
          "Six-piece clothing set (blouse - pants - hat and to be continued",
        starting_price: 1000,
        lot_start_date: "27-8-2024",
        status: "Hot Sale",
        inFav: true,
        image: "/temp/products/product-2.png",
      },
      {
        id: 6,
        title:
          "Six-piece clothing set (blouse - pants - hat and to be continued",
        starting_price: 1000,
        lot_start_date: "27-8-2024",
        status: "Live auction",
        inFav: false,
        image: "/temp/products/product-3.png",
      },
    ]);
  }, 2000)
);

const SaveInFave = (id: number) => {
  const product = products.value.find((product) => product.id === id);
  product.inFav = !product.inFav;
};
</script>
