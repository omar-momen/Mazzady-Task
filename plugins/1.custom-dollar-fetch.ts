const handleUnAuthunticated = async (
  auth_store: any,
  locale: any,
  nuxtApp: any,
  response: any
) => {
  if (response.status == 401 && response.url.includes("/auth/logout")) {
    const toast = useToast();

    const message =
      locale == "en" ? "You have been logged out" : "تم تسجيل الخروج";

    toast.add({
      color: "green",
      id: "logout_success",
      title: message,
    });

    auth_store.clearStorage();

    return navigateTo("/authentication/login");
  }

  if (
    response.status == 401 &&
    !response.url.includes("/auth/login") &&
    !response.url.includes("/auth/logout") &&
    auth_store.user
  ) {
    await nuxtApp.$Swal.fire({
      title: useLayerHelpers().capitalizeEveryWord(
        nuxtApp.$i18n.t("alerts.logout.title")
      ),
      text: useLayerHelpers().capitalizeEveryWord(
        nuxtApp.$i18n.t("alerts.logout.text")
      ),
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: nuxtApp.$i18n.t("form.ok"),
    });

    auth_store.logOut();
  }
};

const handleUnAuthorized = async (locale: any, response: any) => {
  const toast = useToast();

  if (response.status == 403) {
    const message =
      locale == "en"
        ? "You don't have permission to access this page"
        : "ليس لديك الصلاحية للوصول إلى هذه الصفحة";
    toast.add({
      color: "green",
      id: "unauthorized",
      title: message,
    });
    return navigateTo("/");
  }
};

const serverError = async (locale: any, response: any) => {
  if (response.status == 500) {
    const message = locale == "en" ? "server error" : "خطأ في الخادم";
    showError({
      message: message,
      statusCode: 500,
    });
  }
};

export default defineNuxtPlugin((nuxtApp) => {
  const token = useCookie("token");
  const locale = (nuxtApp.$i18n as any)?.locale;
  const appConfig = useRuntimeConfig();
  const auth_store = useAuthStore();

  const dollarfetch = $fetch.create({
    baseURL: appConfig.public.apiBase,
    onRequest({ request, options, error }) {
      const headers = (options.headers ||= {});

      // Set the Authorization header && Accept-Language
      if (Array.isArray(headers)) {
        if (token.value) {
          headers.push(["Authorization", `Bearer ${token.value}`]);
          headers.push(["private-key", token.value]); // temp
        }
        headers.push(["Accept-Language", locale.value]);
      } else if (headers instanceof Headers) {
        if (token.value) {
          headers.set("Authorization", `Bearer ${token.value}`);
          headers.set("private-key", token.value); // temp
        }
        headers.set("Accept-Language", locale.value);
      } else {
        if (token.value) {
          headers.Authorization = `Bearer ${token.value}`;
          headers["private-key"] = token.value; // temp
        }
        headers["Accept-Language"] = locale.value;
      }
    },
    async onResponseError({ response, options, error }) {
      handleUnAuthunticated(auth_store, locale.value, nuxtApp, response);
      handleUnAuthorized(locale.value, response);
      serverError(locale.value, response);
    },
  });

  // Expose to useNuxtApp().$dollarfetch
  return {
    provide: {
      dollarfetch,
    },
  };
});
