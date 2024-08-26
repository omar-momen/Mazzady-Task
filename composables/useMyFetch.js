const handleUnAuthunticated = async (auth_store, locale, nuxtApp, response) => {
  if (response.status == 401 && response.url.includes("/auth/logout")) {
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
      title: useHelpers().capitalizeEveryWord(
        nuxtApp.$i18n.t("alerts.logout.title")
      ),
      text: useHelpers().capitalizeEveryWord(
        nuxtApp.$i18n.t("alerts.logout.text")
      ),
      icon: "warning",
      showCancelButton: false,
      confirmButtonText: nuxtApp.$i18n.t("form.ok"),
    });

    auth_store.logOut();
  }
};

const handleUnAuthorized = async (locale, response) => {
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

const serverError = async (locale, response) => {
  if (response.status == 500) {
    const message = locale == "en" ? "server error" : "خطأ في الخادم";
    showError({
      message: message,
      statusCode: 500,
    });
  }
};

export const useMyFetch = (url, options) => {
  const token_cookie = useCookie("token_cookie");
  const nuxtApp = useNuxtApp();
  const locale = nuxtApp?.$i18n?.locale;

  const auth_store = useAuthStore();

  const BASE_URL = useRuntimeConfig().public.apiBase;

  const my_options = {
    baseURL: BASE_URL,
    headers: {
      "Accept-Language": locale.value,
      ...(token_cookie.value ? { "private-key": token_cookie.value } : {}),
      ...options?.headers,
    },
    onRequestError({ request, options, error }) {},
    async onResponseError({ response, options, error }) {
      handleUnAuthunticated(auth_store, locale.value, nuxtApp, response);
      handleUnAuthorized(locale.value, response);
      serverError(locale.value, response);
    },
    ...options,
  };

  return useFetch(url, my_options);
};
