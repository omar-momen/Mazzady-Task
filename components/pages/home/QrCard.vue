<template>
  <div class="qr-card">
    <header class="flex justify-between">
      <h2 class="font-bold text-2xl">QR Code</h2>
      <div class="flex items-center gap-6">
        <EyeSvg />
        <ShareSVG />
        <DocumentDownloadSVG class="stroke-darkColor" />
      </div>
    </header>

    <p
      class="my-4 flex items-center gap-2 bg-[#FFF5E9] p-3 rounded-3xl text-xs font-normal"
    >
      <DocumentDownloadSVG class="stroke-secondary shrink-0" />
      <useScriptFathomAnalytics
        >Download the QR code or share it with your
        friends.</useScriptFathomAnalytics
      >
    </p>

    <div
      class="rounded-3xl bg-gradient-to-r from-primary-700 to-secondary-500 p-4 flex items-center justify-center"
    >
      <div
        class="bg-whiteColor flex items-center justify-center flex-col w-full h-full rounded-3xl py-5"
      >
        <Logo />
        <h2 class="text-lg font-bold mt-4">{{ user?.name }}</h2>
        <NuxtImg
          src="/images/Qr.png"
          width="117px"
          height="117px"
          alt="Qr Code"
        />
        <p class="font-normal text-sm mt-2">Follow Us on Mazaady</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
// Simulate get user from store
const user = reactive({
  image: "/temp/owner.png",
  name: "Hala Ahmed",
  desc: "I am Hala Ahmed, I am the owner of the local brand called Beauty which is for Mackeup and Skin Care.",
  num_of_followers: 20,
  num_of_following: 5,
  rate: 4.2,
  total_rates: 15,
});
</script>

<style lang="postcss" scoped></style>
