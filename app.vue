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
        "Shop online in Egypt with Mazzadyand enjoy low prices, fast shipping, cash on delivery and easy returns on millions of items. Explore deals on electronics, fashion, groceries, home …",
    },
    {
      name: "author",
      content: "Mazzady",
    },
    {
      name: "keywords",
      content: "BYE",
    },
    {
      property: "og:title",
      content: "Mazzady",
    },
    {
      property: "og:descreption",
      content:
        "Shop online in Egypt with Amazon.eg and enjoy low prices, fast shipping, cash on delivery and easy returns on millions of items. Explore deals on electronics, fashion, groceries, home …",
    },
    {
      property: "og:type",
      content: "website",
    },
    {
      property: "og:image",
      content: "/images/logo.png",
    },
    {
      property: "og:url",
      content: "https://mazzady-task.vercel.app/",
    },

    {
      property: "twitter:title",
      content: "Mazzady",
    },
    {
      property: "twitter:descreption",
      content:
        "Shop online in Egypt with Amazon.eg and enjoy low prices, fast shipping, cash on delivery and easy returns on millions of items. Explore deals on electronics, fashion, groceries, home …",
    },
    {
      property: "twitter:type",
      content: "website",
    },
    {
      property: "twitter:image",
      content: "/images/logo.png",
    },
    {
      property: "twitter:url",
      content: "https://mazzady-task.vercel.app/",
    },
  ],
  link: [
    // Preconnect to Google Fonts
    {
      rel: "preconnect",
      href: "https://fonts.googleapis.com",
    },
    {
      rel: "preconnect",
      href: "https://fonts.gstatic.com",
      crossorigin: "anonymous",
    },
    // Preload the font stylesheets
    {
      rel: "preload",
      href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap",
      as: "style",
    },
    {
      rel: "preload",
      href: "https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap",
      as: "style",
    },
    // Actual font stylesheets
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap",
    },
    {
      rel: "stylesheet",
      href: "https://fonts.googleapis.com/css2?family=Abril+Fatface&display=swap",
    },
  ],
});
</script>
