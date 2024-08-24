<template>
  <div class="user-info" v-if="user">
    <NuxtImg
      :src="user.image"
      width="100"
      height="100"
      alt="owner user image"
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
    />
  </div>
</template>

<script lang="ts" setup>
const user = ref(null);

// Simulate fetching user data
user.value = await new Promise((resolve) =>
  setTimeout(() => {
    resolve({
      image: "/temp/owner.png",
      name: "Hala Ahmed",
      desc: "I am Hala Ahmed, I am the owner of the local brand called Beauty which is for Mackeup and Skin Care.",
      num_of_followers: 20,
      num_of_following: 5,
      rate: 4.2,
      total_rates: 15,
    });
  }, 2000)
);
</script>
