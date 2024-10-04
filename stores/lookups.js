export const useLookupsStore = defineStore("lookups", () => {
  const categories = ref(null);
  const getCategories = async () => {
    if (categories.value) return categories.value;
    const data = await lookupsService().get_all_cats();
    if (data) {
      categories.value = data?.categories;
    }

    return categories.value;
  };

  const subCategoryProperties = ref(null);
  const getSubCategoryProperties = async (subCategoryId) => {
    if (subCategoryProperties.value) return subCategoryProperties.value;
    const data = await lookupsService().get_sub_cat_properties(subCategoryId);
    if (data) {
      subCategoryProperties.value = data;
    }
    return subCategoryProperties.value;
  };

  return {
    getCategories,
    categories,

    getSubCategoryProperties,
    subCategoryProperties,
  };
});
