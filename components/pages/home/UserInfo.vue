<template>
  <div class="user-info">
    <!-- <ClientOnly> -->
    <!-- <UserInfoSkelton v-if="status == 'pending'" /> -->
    <div>
      <NuxtImg
        src="/images/temp/avatar-lg.png"
        placeholder="https://placehold.co/100x100"
        width="100"
        height="100"
        alt="owner user image"
        class="rounded-full"
        format="webp"
      />
      <h2 class="text-2xl font-bold mt-4">{{ user.name }}</h2>
      <p class="max-w-96 text-sm">{{ user.desc }}</p>
      <div
        class="flex flex-wrap items-center gap-4 mt-6 *:bg-[#FFF5E9] *:flex *:items-center *:gap-2 *:px-2 *:md:px-3 *:py-3 *:rounded-2xl *:flex-grow"
      >
        <div>
          <UserSVG class="w-5 h-5 md:w-6 md:h-6" />
          <div class="flex flex-col">
            <span class="text-sm font-bold">{{ user.num_of_following }}</span>
            <span class="text-secondary text-xs md:text-sm font-normal">{{
              $t("user_info.following")
            }}</span>
          </div>
        </div>
        <div>
          <TowUsersSVG class="w-5 h-5 md:w-6 md:h-6" />
          <div class="flex flex-col">
            <span class="text-sm font-bold">{{ user.num_of_followers }}</span>
            <span class="text-secondary text-xs md:text-sm font-normal">{{
              $t("user_info.followers")
            }}</span>
          </div>
        </div>
        <div>
          <RateSVG class="w-5 h-5 md:w-6 md:h-6" />
          <div class="flex flex-col">
            <span class="text-sm font-bold">
              {{ user.rate }}
              <span class="text-gray-400 text-xs md:text-sm font-normal"
                >( {{ user.total_rates }} )</span
              >
            </span>
            <span class="text-secondary text-sm font-normal">{{
              $t("user_info.rate")
            }}</span>
          </div>
        </div>
      </div>
      <UButton
        class="h-12 w-full justify-center mt-9 rounded-2xl"
        color="default"
        :label="$t('user_info.follow')"
        :aria-label="$t('user_info.follow')"
      />
    </div>
    <!-- </ClientOnly> -->
  </div>
</template>

<script lang="ts" setup>
// Simulate fetching user data for skeleton to show
// const { status } = await useApi(
//   "https://jsonplaceholder.typicode.com/photos?_limit=2000",
//   {
//     lazy: true,
//     server: false,
//   }
// );

interface User {
  image: string;
  name: string;
  desc: string;
  num_of_followers: number;
  num_of_following: number;
  rate: number;
  total_rates: number;
}

let user: User;

user = {
  image: "/temp/owner.png",
  name: "Hala Ahmed",
  desc: "I am Hala Ahmed, I am the owner of the local brand called Beauty which is for Mackeup and Skin Care.",
  num_of_followers: 20,
  num_of_following: 5,
  rate: 4.2,
  total_rates: 15,
};
</script>
