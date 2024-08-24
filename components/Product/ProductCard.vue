<template>
  <div class="product relative flex gap-4 mb-6" v-if="product">
    <div class="relative">
      <NuxtImg
        class="relative z-2"
        width="145px"
        height="127px"
        :src="product.image"
        :alt="`product ${product.title}'s image'`"
      />
      <span
        class="absolute bottom-0 end-0 z-3 text-xs font-normal text-whiteColor w-28 h-9 rounded-ss-full rounded-ee-full flex items-center justify-center"
        :class="{
          'bg-primary-700': product.status === 'Live auction',
          'bg-secondary': product.status === 'Hot Sale',
        }"
        >{{ product.status }}</span
      >
    </div>

    <div>
      <h2 class="text-lg font-normal">
        {{ product.title.slice(0, 50) + " ..." }}
      </h2>

      <p class="my-2 flex gap-2">
        <span class="text-gray-500 text-lg font-normal">Starting Price</span>
        <span class="text-2xl font-bold">{{ product.starting_price }}EGP</span>
      </p>

      <div class="flex items-center gap-2">
        <span class="text-gray-500 text-lg font-normal">Lot starts in</span>
        <div
          class="flex gap-4 *:bg-[#FFF5E9] *:flex *:items-center *:gap-2 *:px-6 *:py-1.5 *:rounded-full text-secondary font-bold text-sm"
        >
          <div>
            <span class="text-xl">{{ start_date.days }}</span> Days
          </div>
          <div>
            <span class="text-xl">{{ start_date.hours }}</span> Hours
          </div>
          <div>
            <span class="text-xl">{{ start_date.minutes }}</span> Minutes
          </div>
        </div>
      </div>
    </div>
    <button @click="SaveInFave" class="absolute top-0 end-10">
      <HeartSVG
        v-if="product.inFav"
        class="stroke-Tprimary-700 fill-Tprimary-700"
      />
      <HeartSVG v-else class="stroke-darkColor" />
    </button>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});
const emit = defineEmits(["saveInFave"]);

const SaveInFave = () => {
  // Simulate saving in favorite
  // ....

  emit("saveInFave", props.product.id);
};

const start_date = reactive({
  days: 0,
  hours: 0,
  minutes: 0,
});
const calculateDate = () => {
  const [day, month, year]: [number, number, number] =
    props.product.lot_start_date.split("-").map(Number);

  const targetDate: Date = new Date(year, month - 1, day);

  const currentDate: Date = new Date();

  const differenceInMs: number = targetDate - currentDate;

  const msInADay: number = 24 * 60 * 60 * 1000;
  const msInAnHour: number = 60 * 60 * 1000;
  const msInAMinute: number = 60 * 1000;

  start_date.days = Math.floor(differenceInMs / msInADay);
  start_date.hours = Math.floor((differenceInMs % msInADay) / msInAnHour);
  start_date.minutes = Math.floor((differenceInMs % msInAnHour) / msInAMinute);
};
calculateDate();
</script>

<style lang="postcss" scoped>
.active {
  @apply stroke-Tprimary-700 fill-Tprimary-700;
}
</style>
