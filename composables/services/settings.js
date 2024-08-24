export const settingsService = () => {
  return {
    async getSettings() {
      const { data, error } = await useMyFetch(`member/general/settings`);

      if (error.value) {
        return toast.add({
          color: "red",
          id: "get_settings_failed",
          title: useError(error.value),
        });
      }

      return data?.value?.data;
    },
  };
};
