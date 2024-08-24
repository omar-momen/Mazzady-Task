import { useAuthStore } from "@/stores/auth";
import { useAppStore } from "@/stores/app";

// ========= Google Maps
// import { Loader } from "@googlemaps/js-api-loader";

export default defineNuxtPlugin((nuxtApp) => {
  // App
  const appStore = useAppStore();
  appStore.handleFirstLoad();

  // Auth
  const authStore = useAuthStore();
  authStore.handleFirstLoad();

  // Staticly Set User
  authStore.setStorage({
    id: 1,
    name: "Ahmed",
    token: "3%o8i}_;3D4bF]G5@22r2)Et1&mLJ4?$@+16",
  });

  // Google Map Loader
  // const loader = new Loader({
  //   apiKey: useRuntimeConfig().public.googleMapsApiKey,
  //   libraries: ["places"],
  // });

  nuxtApp.hook("app:mounted", async () => {
    // Map Init
    // await loader.load();

    // Handle Resize
    appStore.handleResize();
    window.addEventListener("resize", appStore.handleResize);

    // Handle Scroll
    const lastScrollTop = ref(
      window.pageYOffset || document.documentElement.scrollTop
    );
    appStore.handleScroll(lastScrollTop);
    window.addEventListener(
      "scroll",
      () => {
        appStore.handleScroll(lastScrollTop);
      },
      false
    );
  });

  // Handle Page Loading...
  nuxtApp.hook("page:start", () => {
    if (appStore.appInitLoading) return;
    appStore.pageLoading = true;
  });
  nuxtApp.hook("page:finish", () => {
    appStore.pageLoading = false;
  });

  // Handle App Loading...
  nuxtApp.hook("app:suspense:resolve", async () => {
    appStore.appInitLoading = false;
  });
});
