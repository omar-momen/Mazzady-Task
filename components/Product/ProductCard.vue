<template>
  <div class="product relative items-start flex gap-4 mb-6" v-if="product">
    <div class="relative">
      <NuxtImg
        class="relative z-2 w-[110px] h-[85px] md:w-[145px] md:h-[127px] rounded-ss-3xl rounded-ee-3xl"
        width="145px"
        height="127px"
        format="webp"
        :src="product.image"
        :alt="`product ${product.title}'s image'`"
        placeholder="https://placehold.co/145x127"
      />
      <span
        class="absolute bottom-0 end-0 z-3 text-xs font-normal text-whiteColor md:w-28 md:h-9 w-20 h-6 rounded-ss-full rounded-ee-full flex items-center justify-center"
        :class="{
          'bg-primary-700': product.status === 'Live auction',
          'bg-secondary': product.status === 'Hot Sale',
        }"
        >{{ product.status }}</span
      >
    </div>

    <div>
      <ClientOnly>
        <h2 class="text-sm md:text-lg font-normal">
          {{
            (useAppStore()?.current_x_size ?? 0) >= 768
              ? product.title.slice(0, 50) + " ..."
              : product.title.slice(0, 30) + " ..."
          }}
        </h2>
      </ClientOnly>

      <p class="my-2 flex gap-2">
        <span class="text-gray-500 text-sm md:text-lg font-normal">{{
          $t("product.starting_price")
        }}</span>
        <span class="text-md md:text-2xl font-bold"
          >{{ product.starting_price }}EGP</span
        >
      </p>

      <div class="flex flex-col md:flex-row md:items-center gap-2">
        <span class="text-gray-500 text-sm md:text-lg font-normal">{{
          $t("product.lot_starts_in")
        }}</span>
        <div
          class="flex md:gap-4 gap-2 *:bg-[#FFF5E9] *:flex *:items-center *:md:gap-2 *:gap-1 *:md:px-6 *:px-2 *:py-1.5 *:rounded-full text-secondary font-bold text-[8px] md:text-sm"
        >
          <ClientOnly>
            <div>
              <span class="text-[10px] md:text-lg">{{ start_date.days }}</span>
              {{ $t("product.days") }}
            </div>
            <div>
              <span class="text-[10px] md:text-lg">{{ start_date.hours }}</span>
              {{ $t("product.hours") }}
            </div>
            <div>
              <span class="text-[10px] md:text-lg">{{
                start_date.minutes
              }}</span>
              {{ $t("product.minutes") }}
            </div>
          </ClientOnly>
        </div>
      </div>
    </div>

    <button
      @click.prevent="SaveInFave"
      class="absolute xl:start-[unset] xl:top-0 xl:end-10 start-2 top-1 bg-whiteColor rounded-full p-1"
    >
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

  const targetDate: any = new Date(year, month - 1, day);

  const currentDate: any = new Date();

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
