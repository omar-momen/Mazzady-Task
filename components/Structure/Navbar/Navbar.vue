<template>
  <nav
    class="bg-whiteColor fixed w-full z-[998] left-0 top-0 h-[var(--navbar-height)]"
  >
    <UContainer class="flex justify-between items-center py-4">
      <div class="flex items-center gap-2">
        <UButton
          @click="isOpen = true"
          class="p-0 lg:hidden block"
          variant="ghost"
          aria-label="close"
        >
          <MenuSVG class="strok-secondary" />
        </UButton>

        <Logo class="me-5" />

        <NavLinks class="hidden lg:flex items-center gap-10" />
      </div>

      <!-- Actions -->
      <ul class="flex items-center gap-4">
        <li class="md:pe-6 md:border-e md:border-secondary-200">
          <SearchSVG class="stroke-darkColor" />
        </li>
        <li class="md:pe-6 md:border-e md:border-secondary-200">
          <NotificationSVG class="stroke-darkColor" />
        </li>
        <li>
          <NuxtImg
            sizes="40px"
            height="40px"
            class="h-[30px] md:h-[40px] w-[30px] md:w-[40px] rounded-full"
            src="https://placehold.co/40x40"
            alt="User Image"
          />
        </li>

        <!-- Show In Large Screen Only -->
        <ClientOnly>
          <li class="hidden lg:block me-4" v-if="useAuthStore().user">
            <UButton
              @click="useAuthStore().logOut(true)"
              class="h-10 px-4"
              color="default"
              label="Fake Logout"
              aria-label="Fake Logout"
            >
            </UButton>
          </li>
        </ClientOnly>
        <LangSwitcher class="hidden lg:flex" />
      </ul>
    </UContainer>

    <!-- Menu Links SlideOver -->
    <USlideover v-model="isOpen">
      <div class="p-4 flex-1">
        <UButton
          color="primary"
          variant="ghost"
          size="md"
          icon="i-heroicons-x-mark-20-solid"
          class="flex sm:hidden absolute end-5 top-5 z-10"
          square
          padded
          @click="isOpen = false"
          aria-label="close"
        />
        <NavLinks
          class="pt-16 flex justify-center items-center flex-col gap-10"
          @close="isOpen = false"
        />
        <LangSwitcher class="mt-20 flex justify-center" />
      </div>
    </USlideover>
  </nav>
</template>

<script setup lang="ts">
const isOpen = ref(false);
</script>
