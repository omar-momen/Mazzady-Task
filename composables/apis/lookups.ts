export const lookupsService = () => {
  const toast = useToast();
  const { $dollarfetch } = useNuxtApp();

  return {
    async get_all_cats() {
      const { data, error } = await useApi("get_all_cats");

      if (error.value) {
        return toast.add({
          color: "red",
          id: `get_cats_failed`,
          title: getError(error.value),
        });
      }

      return data?.value?.data;
    },

    async get_sub_cat_properties(subCategoryId: string | number) {
      let data;

      try {
        data = await $dollarfetch("properties?cat=" + subCategoryId);
      } catch (error) {
        toast.add({
          color: "red",
          id: "get_properties_failed",
          title: getError(error),
        });
        return 0;
      }

      return data?.data;
    },

    async get_option_childs(optionId: string | number) {
      let data;

      try {
        data = await $dollarfetch("get-options-child/" + optionId);
      } catch (error) {
        toast.add({
          color: "red",
          id: "get_options_child_failed",
          title: getError(error),
        });
        return 0;
      }

      return data?.data;
    },
  };
};
