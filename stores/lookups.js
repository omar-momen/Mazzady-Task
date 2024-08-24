export const useLookupsStore = defineStore("lookups", () => {
  const categories = ref(null);
  const getCategories = async () => {
    const data = await lookupsService().getLookup("get_all_cats");
    if (data) {
      categories.value = data?.categories;
    }
    return categories.value;
  };

  const subCategoryProperties = ref(null);
  const getSubCategoryProperties = async (subCategoryId) => {
    const data = await lookupsService().getLookup(
      `properties?cat=${subCategoryId}`
    );
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
