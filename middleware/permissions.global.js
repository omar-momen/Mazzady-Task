export default defineNuxtRouteMiddleware(async (to, from) => {
  const locale = useNuxtApp().$i18n.locale.value;

  if (process.client) {
    const conditions = [
      to.fullPath.includes("dashboard") &&
        !useHelpers().hasPermission("access-memberDashboard"),
    ];

    if (conditions.some((condition) => condition === true)) {
      // 1- Show Message Not Authorized
      const message =
        locale == "en"
          ? "You are not authorized to access this page"
          : "ليس لديك الصلاحية للوصول إلى هذه الصفحة";
      toast.add({
        color: "red",
        id: "not_authorized",
        title: message,
      });
      // 2- Cancel Navigation
      if (from.href) {
        /* {{If}} Means that you navigate throw a link normaly */
        return navigateTo("/");
      } else {
        /* {{Else}} Means that you navigate throw writing in the web search bar directly */
        return navigateTo("/");
      }
    }
  }
});
