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

        <!-- Dynamiclly Created Serachable Select Menues Of Properties:: Based On sub_category -->
        <template v-if="!sub_category_properties_loading">
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
            <div class="border-2 p-5 rounded-lg">
              <div class="parent">
                <!-- Parent -->
                <div>
                  <UFormGroup :label="property.name" :name="property.name">
                    <USelectMenu
                      v-model="state.properties[index]"
                      @change="optioSelected(index, false, false, $event)"
                      :options="[
                        ...property.options.map((option) => ({
                          ...option,
                          property_name: property.name,
                        })),
                        {
                          id: 'other',
                          name: locale == 'en' ? 'other' : 'آخر',
                          custom_value: null,
                          property_name: property.name,
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
                    class="ps-5 pt-5"
                    v-if="state.properties[index]?.id === 'other'"
                    :label="`Custom ${property.name}`"
                    :name="`Custom ${property.name}`"
                  >
                    <UInput
                      placeholder="Enter Custom Value"
                      class="ps-10 mt-3"
                      v-model="state.properties[index].custom_value"
                    />
                  </UFormGroup>
                </div>

                <!-- Childs -->
                <div
                  class="childs ps-10 my-5"
                  v-if="property.childs && property.childs?.length > 0"
                >
                  <h3 class="font-bold text-xl mb-1">
                    {{ property.name }} childs
                  </h3>
                  <div v-for="(child_property, child_index) in property.childs">
                    <div>
                      <UFormGroup
                        :label="child_property.name"
                        :name="child_property.name"
                        v-if="
                          state.properties &&
                          state.properties[index]?.childs &&
                          state.properties[index]?.childs[child_index]
                        "
                      >
                        <USelectMenu
                          v-model="state.properties[index].childs[child_index]"
                          @change="
                            optioSelected(child_index, index, false, $event)
                          "
                          :options="[
                            ...child_property.options.map((option) => ({
                              ...option,
                              property_name: child_property.name,
                            })),
                            {
                              id: 'other',
                              name: locale == 'en' ? 'other' : 'آخر',
                              custom_value: null,
                              property_name: child_property.name,
                            },
                          ]"
                          :placeholder="`Select ${child_property.name}`"
                          option-attribute="name"
                          searchable
                          :searchable-placeholder="`Search a ${child_property.name}...`"
                        />
                      </UFormGroup>
                      <!-- Show Input Text only if user Choose Other -->

                      <UFormGroup
                        v-if="
                          state.properties &&
                          state.properties[index]?.childs &&
                          state.properties[index]?.childs[child_index]?.id ===
                            'other'
                        "
                        :label="`Custom ${child_property.name}`"
                        :name="`Custom ${child_property.name}`"
                        class="ps-5 pt-5"
                      >
                        <UInput
                          placeholder="Enter Custom Value"
                          class="ps-10 mt-3"
                          v-model="
                            state.properties[index].childs[child_index]
                              .custom_value
                          "
                        />
                      </UFormGroup>
                    </div>

                    <!-- Grandchilds -->
                    <div
                      v-if="
                        child_property.childs &&
                        child_property.childs?.length > 0
                      "
                      class="grand-childs ps-10 my-5"
                    >
                      <h4 class="font-bold text-lg mb-1">
                        {{ child_property.name }} childs
                      </h4>
                      <div
                        v-for="(
                          grand_child_property, grand_child_index
                        ) in child_property.childs"
                      >
                        <div>
                          <UFormGroup
                            :label="grand_child_property.name"
                            :name="grand_child_property.name"
                            v-if="
                              state.properties &&
                              state.properties[index] &&
                              state.properties[index].childs &&
                              state.properties[index].childs[child_index] &&
                              state.properties[index].childs[child_index].childs
                            "
                          >
                            <USelectMenu
                              v-model="
                                state.properties[index].childs[child_index]
                                  .childs[grand_child_index]
                              "
                              @change="
                                optioSelected(
                                  grand_child_index,
                                  child_index,
                                  index,
                                  $event
                                )
                              "
                              :options="[
                                ...grand_child_property.options.map(
                                  (option) => ({
                                    ...option,
                                    property_name: grand_child_property.name,
                                  })
                                ),
                                {
                                  id: 'other',
                                  name: locale == 'en' ? 'other' : 'آخر',
                                  custom_value: null,
                                  property_name: grand_child_property.name,
                                },
                              ]"
                              :placeholder="`Select ${grand_child_property.name}`"
                              option-attribute="name"
                              searchable
                              :searchable-placeholder="`Search a ${grand_child_property.name}...`"
                            />
                          </UFormGroup>
                          <!-- Show Input Text only if user Choose Other -->
                          <UFormGroup
                            v-if="
                              state.properties &&
                              state.properties[index] &&
                              state.properties[index].childs &&
                              state.properties[index].childs[child_index] &&
                              state.properties[index].childs[child_index]
                                .childs &&
                              state.properties[index].childs[child_index]
                                .childs[grand_child_index]?.id === 'other'
                            "
                            class="ps-5 pt-5"
                            :label="`Custom ${grand_child_property.name}`"
                            :name="`Custom ${grand_child_property.name}`"
                          >
                            <UInput
                              placeholder="Enter Custom Value"
                              class="ps-10 mt-3"
                              v-model="
                                state.properties[index].childs[child_index]
                                  .childs[grand_child_index].custom_value
                              "
                            />
                          </UFormGroup>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </template>
        </template>
        <PropertiesSkelton v-else />

        <UButton :loading="submit_loading" type="submit" aria-label="submit">
          Submit
        </UButton>
      </UForm>

      <!-- Display Submitted Data Table -->
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
                <h2 class="text-2xl pt-5">Properties</h2>
                <template v-if="data_to_display.properties?.length > 0">
                  <div v-for="property in data_to_display.properties">
                    <div class="border-b p-5 flex justify-between">
                      <div class="text-gray-900">
                        {{ property?.property_name }}
                      </div>
                      <div class="text-Tprimary-700">
                        {{
                          property?.custom_value
                            ? property?.custom_value + " (Custom Value)"
                            : property?.name
                        }}
                      </div>
                    </div>

                    <template v-if="property.childs">
                      <div
                        class="px-10"
                        v-for="child_property in property.childs"
                      >
                        <div>
                          <div class="border-b p-5 flex justify-between">
                            <div class="text-gray-900">
                              {{ child_property?.property_name }}
                            </div>
                            <div class="text-Tprimary-700">
                              {{
                                child_property?.custom_value
                                  ? child_property?.custom_value +
                                    " (Custom Value)"
                                  : child_property?.name
                              }}
                            </div>
                          </div>
                        </div>

                        <template v-if="child_property.childs">
                          <div
                            class="px-10"
                            v-for="grand_child_property in child_property.childs"
                          >
                            <div class="border-b p-5 flex justify-between">
                              <div class="text-gray-900">
                                {{ grand_child_property?.property_name }}
                              </div>
                              <div class="text-Tprimary-700">
                                {{
                                  grand_child_property?.custom_value
                                    ? grand_child_property?.custom_value +
                                      " (Custom Value)"
                                    : grand_child_property?.name
                                }}
                              </div>
                            </div>
                          </div>
                        </template>
                      </div>
                    </template>
                  </div>
                </template>
              </td>
            </tr>
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
  const errors: { path: any; message: string }[] = [];

  state.properties.forEach((property) => {
    // Level 1
    if (!property.id) {
      errors.push({
        path: property.name,
        message: `${property.name} is required`,
      });
    }
    if (property.id == "other" && !property.custom_value) {
      errors.push({
        path: `Custom ${property.property_name}`,
        message: `${property.property_name} is required`,
      });
    }

    // Level 2
    if (property.childs?.length > 0) {
      property.childs.forEach((child_property) => {
        if (!child_property.id && child_property.hasOptions) {
          errors.push({
            path: child_property.name,
            message: `${child_property.name} is required`,
          });
        }
        if (child_property.id == "other" && !child_property.custom_value) {
          errors.push({
            path: `Custom ${child_property.property_name}`,
            message: `${child_property.property_name} is required`,
          });
        }

        // Level 3
        if (child_property.childs?.length > 0) {
          child_property.childs.forEach((grand_child_property) => {
            if (!grand_child_property.id && grand_child_property.hasOptions) {
              errors.push({
                path: grand_child_property.name,
                message: `${grand_child_property.name} is required`,
              });
            }
            if (
              grand_child_property.id == "other" &&
              !grand_child_property.custom_value
            ) {
              errors.push({
                path: `Custom ${grand_child_property.property_name}`,
                message: `${grand_child_property.property_name} is required`,
              });
            }
          });
        }
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
const sub_category_properties_loading = ref(false);
watch(
  () => state.sub_category,
  async (new_sub_category) => {
    if (new_sub_category) {
      sub_category_properties_loading.value = true;
      data_to_display.value = null;

      sub_category_properties.value =
        await lookups_store.getSubCategoryProperties(new_sub_category.id);

      // Reset Properties
      state.properties = [];

      // Set state properties with default values
      sub_category_properties.value.forEach((property) => {
        state.properties.push({
          name: property.name,
          hasOptions: property.options?.length > 0,
        });
      });

      sub_category_properties_loading.value = false;
    } else {
      sub_category_properties.value = [];
    }
  }
);

const optioSelected = async (
  current_index,
  parent_index = false,
  grand_parent_index = false,
  e
) => {
  if (e.id == "other") {
    if (parent_index === false) {
      state.properties[current_index].childs = null;
      sub_category_properties.value[current_index].childs = null;
    } else if (grand_parent_index === false) {
      state.properties[parent_index].childs[current_index].childs = null;
      sub_category_properties.value[parent_index].childs[current_index].childs =
        null;
    } else {
      state.properties[grand_parent_index].childs[parent_index].childs[
        current_index
      ].childs = null;
      sub_category_properties.value[grand_parent_index].childs[
        parent_index
      ].childs[current_index].childs = null;
    }

    return;
  }

  const childs = await lookupsService().get_option_childs(e.id);
  if (childs?.length > 0) {
    if (parent_index === false) {
      sub_category_properties.value[current_index].childs = childs;

      state.properties[current_index].childs = [];
      childs.forEach((child) => {
        state.properties[current_index].childs.push({
          name: child.name,
          hasOptions: child.options?.length > 0,
        });
      });
    } else if (grand_parent_index === false) {
      sub_category_properties.value[parent_index].childs[current_index].childs =
        childs;

      state.properties[parent_index].childs[current_index].childs = [];
      childs.forEach((child) => {
        state.properties[parent_index].childs[current_index].childs.push({
          name: child.name,
          hasOptions: child.options?.length > 0,
        });
      });
    } else {
      sub_category_properties.value[grand_parent_index].childs[
        parent_index
      ].childs[current_index].childs = childs;

      state.properties[grand_parent_index].childs[parent_index].childs[
        current_index
      ].childs = [];
      childs.forEach((child) => {
        state.properties[grand_parent_index].childs[parent_index].childs[
          current_index
        ].childs.push({
          name: child.name,
          hasOptions: child.options?.length > 0,
        });
      });
    }
  }
};

// ====== Submit Form
const toast = useToast();
const submit_loading = ref(false);
const data_to_display = ref(null);
async function onSubmit(event) {
  submit_loading.value = true;

  setTimeout(() => {
    data_to_display.value = event.data;
    console.log(data_to_display.value);
    submit_loading.value = false;
  }, 300);
}
</script>
