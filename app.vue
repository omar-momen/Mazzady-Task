<template>
  <div class="app">
    <AppLoader v-if="appStore?.appInitLoading" />
    <div class="layout-wrapper">
      <NuxtLayout>
        <PageLoader v-if="appStore?.pageLoading" />
        <div class="page-wrapper md:py-16 py-6">
          <NuxtPage />
        </div>
        <NuxtLoadingIndicator />
      </NuxtLayout>
    </div>

    <UNotifications />
  </div>
</template>

<script setup>
const nuxtApp = useNuxtApp();
const appStore = useAppStore();

useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk
      ? `${titleChunk} - ${nuxtApp.$i18n.t("app.title")}`
      : nuxtApp.$i18n.t("app.title");
  },
  meta: [
    {
      name: "charset",
      content: "utf-8",
    },
    {
      name: "description",
      content:
        "Discover your dream home with DreamSpaces Realty – where exceptional properties meet unparalleled service. Explore a world of unique listings, tailored to fit every lifestyle and budget",
    },
    {
      name: "author",
      content: "Samh Team",
    },
    {
      name: "keywords",
      content: "SALE, BYE, RENT, HOME",
    },
    {
      property: "og:title",
      content: "Samh Realstate",
    },
    {
      property: "og:descreption",
      content:
        "Discover your dream home with DreamSpaces Realty – where exceptional properties meet unparalleled service. Explore a world of unique listings, tailored to fit every lifestyle and budget",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content:
        "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      property: "og:url",
      content: "http://8.213.24.120:8080/",
    },

    {
      property: "twitter:title",
      content: "Samh Realstate",
    },
    {
      property: "twitter:descreption",
      content:
        "Discover your dream home with DreamSpaces Realty – where exceptional properties meet unparalleled service. Explore a world of unique listings, tailored to fit every lifestyle and budget",
    },
    {
      property: "twitter:type",
      content: "website",
    },
    {
      property: "twitter:image",
      content:
        "https://images.unsplash.com/photo-1586724237569-f3d0c1dee8c6?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      property: "twitter:url",
      content: "http://8.213.24.120:8080/",
    },
  ],
});
</script>
