export const crudService = () => {
  return {
    async getTable(url, page, params) {
      const { data: response_data, error } = await useMyFetch(
        url +
          `?page=${page}&per_page=10&keyword=${
            params?.keyword || ""
          }&updated_at=${params?.updated_at || ""}&status=${
            params?.status?.value || ""
          }`
      );

      if (error.value) {
        return toast.add({
          color: "red",
          id: "get_table_failed",
          title: useError(error.value),
        });
      }

      return response_data?.value;
    },

    async deleteRow(url) {
      const { data: response_data, error } = await useMyFetch(url, {
        method: "DELETE",
      });

      if (error.value) {
        return toast.add({
          color: "red",
          id: "delete_row_failed",
          title: useError(error.value),
        });
      }

      return response_data?.value?.data;
    },
  };
};
