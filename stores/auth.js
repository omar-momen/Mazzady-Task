export const useAuthStore = defineStore("auth", () => {
  const user = ref(null);
  const token_cookie = useCookie("token_cookie");

  // ======== Handle First Load
  const handleFirstLoad = async () => {
    const localeUser = JSON.parse(localStorage.getItem("mazaady_App_User"));
    if (!localeUser) return;
    user.value = localeUser;
  };

  // ======== Storage
  const setStorage = (userData) => {
    user.value = userData;
    localStorage.setItem("mazaady_App_User", JSON.stringify(userData));
    token_cookie.value = userData.token;
  };
  const clearStorage = () => {
    user.value = null;
    token_cookie.value = null;
    localStorage.removeItem("mazaady_App_User");
  };

  return {
    user,

    handleFirstLoad,

    clearStorage,
    setStorage,
  };
});
