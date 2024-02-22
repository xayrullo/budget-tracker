<template>
  <Popup
    @onClose="
      closedModal({
        code: 0,
        success: false,
        message: 'Canceled',
        data: null,
      })
    "
  >
    <template #modal_body>
      <div class="mb-7">
        <div>
          <label class="text-base font-semibold text-gray-900"
            >Transaction Type</label
          >
          <fieldset>
            <div
              class="space-y-4 sm:flex sm:items-center sm:space-x-10 sm:space-y-0"
            >
              <div class="flex items-center">
                <input
                  id="income"
                  v-model="transaction.type"
                  name="notification-method"
                  type="radio"
                  :checked="transaction.type === 'income'"
                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  value="income"
                />
                <label
                  for="income"
                  class="ml-3 block text-sm font-medium leading-6 text-gray-900"
                  >Income</label
                >
              </div>
              <div class="flex items-center">
                <input
                  id="expense"
                  v-model="transaction.type"
                  name="notification-method"
                  type="radio"
                  class="h-4 w-4 border-gray-300 text-indigo-600 focus:ring-indigo-600"
                  value="expense"
                  :checked="transaction.type === 'expense'"
                />
                <label
                  for="expense"
                  class="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  Expense
                </label>
              </div>
            </div>
          </fieldset>
        </div>
        <Listbox v-model="transaction.category">
          <ListboxLabel class="text-base font-semibold text-gray-900">
            Select Category
          </ListboxLabel>
          <div class="relative">
            <ListboxButton
              class="relative w-full cursor-default rounded-md h-8 bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            >
              <span class="block truncate">{{
                transaction.category.toUpperCase()
              }}</span>
              <span
                class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
              >
                <ChevronUpDownIcon
                  class="h-5 w-5 text-gray-400"
                  aria-hidden="true"
                />
              </span>
            </ListboxButton>

            <transition
              leave-active-class="transition ease-in duration-100"
              leave-from-class="opacity-100"
              leave-to-class="opacity-0"
            >
              <ListboxOptions
                class="absolute z-10 mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
              >
                <ListboxOption
                  as="template"
                  v-for="(category, ind) in categories"
                  :key="ind"
                  :value="category.value"
                  v-slot="{ active, selected }"
                >
                  <li
                    :class="[
                      active ? 'bg-indigo-600 text-white' : 'text-gray-900',
                      'relative cursor-default select-none py-2 pl-3 pr-9',
                    ]"
                  >
                    <span
                      :class="[
                        selected ? 'font-semibold' : 'font-normal',
                        'block truncate',
                      ]"
                      >{{ category.name }}</span
                    >

                    <span
                      v-if="selected"
                      :class="[
                        active ? 'text-white' : 'text-indigo-600',
                        'absolute inset-y-0 right-0 flex items-center pr-4',
                      ]"
                    >
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                    </span>
                  </li>
                </ListboxOption>
              </ListboxOptions>
            </transition>
          </div>
        </Listbox>
        <div>
          <label for="amount" class="text-base font-semibold text-gray-900"
            >Amount</label
          >
          <div class="relative rounded-md shadow-sm">
            <input
              type="number"
              name="amount"
              id="amount"
              class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="transaction.amount"
            />
          </div>
        </div>
        <div>
          <label for="description" class="text-base font-semibold text-gray-900"
            >Description</label
          >
          <div class="relative rounded-md shadow-sm">
            <input
              type="text"
              name="description"
              id="description"
              class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 outline-none ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              v-model="transaction.itemName"
            />
          </div>
        </div>
      </div>
      <div class="flex items-center justify-center 576:justify-between">
        <button
          class="text-center mx-2.5 font-medium py-1.5 w-[130px] border-2 border-gray-300 bg-gray-300 rounded-md 576:mx-0"
          @click="
            closedModal({
              code: 0,
              success: true,
              message: 'Successfully Delete',
              data: null,
            })
          "
        >
          Cancel
        </button>
        <button
          class="text-center mx-2.5 font-medium py-2 w-[130px] bg-green-300 text-green-950 rounded-md 576:mx-0"
          @click="
            closedModal({
              code: 0,
              success: false,
              message: 'Canceled',
              data: null,
            })
          "
        >
          Save
        </button>
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import type IResponse from "@/core/models/response";
import type ITransaction from "@/core/models/transaction";
import type { ITransactionPost } from "@/core/models/transaction";

import {
  Listbox,
  ListboxButton,
  ListboxLabel,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/vue";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/vue/20/solid";
import Popup from "../Popup.vue";
import { ref, computed, onMounted } from "vue";
import { useCategoryStore } from "@/stores/category";
import type ICategory from "@/core/models/category";

const categoryStore = useCategoryStore();
const props = defineProps<{
  data: ITransaction | undefined;
}>();
const emits = defineEmits(["onClose"]);

const categories = computed(() => categoryStore.getCategories);

const transaction = ref<ITransactionPost>({
  amount: null,
  expenseDate: new Date().toString(),
  itemName: "",
  category: "",
  type: "",
});

const selectedCategory = ref<ICategory>();

onMounted(() => {
  categoryStore.fetchCategories();
});

function closedModal(e: IResponse) {
  emits("onClose", e);
}
</script>
