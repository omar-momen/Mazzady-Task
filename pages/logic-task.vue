<template>
  <div class="logic-task-page">
    <UContainer>
      <h1 class="text-4xl font-bold text-center">Logic Task Page</h1>

      <UForm
        class="space-y-4"
        :schema="schema"
        :state="state"
        :validate="validate"
        @submit="onSubmit"
        @error="onError"
      >
        <!-- Category -->
        <UFormGroup label="Category" name="category">
          <USelectMenu
            v-model="state.category"
            :options="categories"
            placeholder="Select Category"
            option-attribute="name"
            searchable
            searchable-placeholder="Search a category..."
          />
        </UFormGroup>
        <!-- Sub Category -->
        <UFormGroup label="Sub Category" name="sub_category">
          <USelectMenu
            v-model="state.sub_category"
            :disabled="!state.category"
            :options="sub_categories"
            :loading="extracting_sub_categories"
            placeholder="Select Sub Category"
            option-attribute="name"
            searchable
            searchable-placeholder="Search a sub Category..."
          />
        </UFormGroup>

        <!-- Dynamiclly Created Serachable Select Menues Of Properties -->
        <h2
          class="text-primary text-3xl font-bold"
          v-if="sub_category_properties?.length > 0"
        >
          Properties
        </h2>
        <template
          v-for="(property, index) in sub_category_properties"
          :key="property.id"
        >
          <UFormGroup :label="property.name" :name="property.name">
            <USelectMenu
              v-model="state.properties[index]"
              :options="[
                ...property.options.map((option) => ({
                  ...option,
                  property_name: property.name,
                })),
                {
                  id: 'other',
                  name: locale == 'en' ? 'other' : 'آخر',
                  custom_value: null,
                  parent_name: property.name,
                },
              ]"
              :placeholder="`Select ${property.name}`"
              option-attribute="name"
              searchable
              :searchable-placeholder="`Search a ${property.name}...`"
            />
          </UFormGroup>
          <!-- Show Input Text only if user Choose Other -->
          <UFormGroup
            v-if="state.properties[index]?.id === 'other'"
            :label="`Custom ${property.name}`"
            :name="`custom ${property.name}`"
          >
            <UInput
              placeholder="Enter Custom Value"
              class="ps-10 mt-3"
              v-model="state.properties[index].custom_value"
            />
          </UFormGroup>
        </template>

        <UButton :loading="submit_loading" type="submit" aria-label="submit">
          Submit
        </UButton>
      </UForm>

      <!-- Display Submitted Data -->
      <div class="overflow-x-auto mt-16" v-if="data_to_display">
        <h2 class="text-3xl font-bold mb-2">Submitted Data</h2>
        <table
          class="min-w-full main-card shadow-md rounded-lg overflow-hidden"
        >
          <thead class="border-b border-primary-700">
            <tr>
              <th class="text-center py-3 px-4 font-bold text-primary text-lg">
                Category
              </th>
              <th class="text-center py-3 px-4 font-bold text-primary text-lg">
                Sub Category
              </th>
            </tr>
          </thead>
          <tbody class="rounded-lg">
            <tr class="border-b">
              <td class="py-3 px-4 text-darkColor text-center">
                {{ data_to_display?.category?.name }}
              </td>
              <td class="py-3 px-4 text-darkColor text-center">
                {{ data_to_display?.sub_category?.name }}
              </td>
            </tr>

            <tr class="border-b">
              <td
                colspan="2"
                class="py-3 px-4 font-bold text-primary text-center text-lg"
              >
                Properties
              </td>
            </tr>

            <!-- Properties -->
            <template v-for="property in data_to_display.properties">
              <tr class="border-b" v-if="property?.property_name">
                <td class="py-3 px-4 text-darkColor">
                  {{
                    property?.custom_value
                      ? property?.parent_name
                      : property?.property_name
                  }}
                </td>
                <td class="py-3 px-4 text-darkColor">
                  {{
                    property?.custom_value
                      ? property?.custom_value + " (Custom Value)"
                      : property?.name
                  }}
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>
    </UContainer>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  title: "logic-task",
});

const { locale } = useI18n();

// ====== State
const state = reactive({
  category: null,
  sub_category: null,

  // Dynamiclly Created Properties
  properties: [],
});

// ======= Schema
import { object } from "yup";
const schema = object({
  category: object().required(),
  sub_category: object().required(),
});
const validate = (state: any) => {
  const errors = [];

  state.properties.forEach((property) => {
    if (!property.id && property.hasOptions) {
      errors.push({
        path: property.name,
        message: `${property.name} is required`,
      });
    }

    if (property.id == "other" && !property.custom_value) {
      errors.push({
        path: `custom ${property.name}`,
        message: `Custom ${property.name} Property Name is required`,
      });
    }
  });

  return errors;
};
async function onError(event: { errors: { id: string }[] }) {
  const element = document.getElementById(event.errors[0].id);
  element?.focus();
  element?.scrollIntoView({ behavior: "smooth", block: "center" });
}

const lookups_store = useLookupsStore();

// ====== Fetch categories
const categories = await lookups_store.getCategories();

// ====== Extract sub categories
const sub_categories = ref([]);
const extracting_sub_categories = ref(false);
watch(
  () => state.category,
  async (new_category) => {
    if (new_category) {
      extracting_sub_categories.value = true;

      setTimeout(() => {
        sub_categories.value = new_category.children;
        state.sub_category = null;
        extracting_sub_categories.value = false;
      }, 300);
    }
  }
);

// ====== Fetch sub-categories's Properties
const sub_category_properties = ref([]);
watch(
  () => state.sub_category,
  async (new_sub_category) => {
    if (new_sub_category) {
      data_to_display.value = null;
      sub_category_properties.value =
        await lookups_store.getSubCategoryProperties(new_sub_category.id);

      // Reset Properties
      state.properties = [];

      // Set state properties with default values
      sub_category_properties.value.forEach((property) => {
        state.properties.push({
          name: property.name,
          hasOptions: property.options.length > 0,
        });
      });
    }
  }
);

// ====== Submit Form
const submit_loading = ref(false);
const data_to_display = ref(null);
async function onSubmit(event) {
  submit_loading.value = true;

  setTimeout(() => {
    data_to_display.value = event.data;
    console.log("Submitted Data: ", event.data);
    submit_loading.value = false;
  }, 300);
}
</script>
