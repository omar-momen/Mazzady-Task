export const lookupsService = () => {
  return {
    async getLookup(endpoint) {
      const { data, error } = await useMyFetch(endpoint);

      if (error.value) {
        return toast.add({
          color: "red",
          id: `get_${endpoint}_failed`,
          title: useError(error.value),
        });
      }
      return data?.value?.data;
    },
  };
};
