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
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                  :class="
                    errors.type
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-600'
                  "
                  value="income"
                  @change="validateField('type')"
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
                  class="h-4 w-4 text-indigo-600 focus:ring-indigo-600"
                  :class="
                    errors.type
                      ? 'border-red-300 focus:border-red-500'
                      : 'border-gray-300 focus:ring-indigo-600'
                  "
                  value="expense"
                  :checked="transaction.type === 'expense'"
                  @change="validateField('type')"
                />
                <label
                  for="expense"
                  class="ml-3 block text-sm font-medium leading-6 text-gray-900"
                >
                  Expense
                </label>
              </div>
            </div>
            <div v-if="errors.type" class="text-sm text-red-600">
              {{ errors.type }}
            </div>
          </fieldset>
        </div>
        <Listbox
          v-model="transaction.category"
          @update:modelValue="validateField('category')"
          by="id"
        >
          <ListboxLabel class="text-base font-semibold text-gray-900">
            Select Category
          </ListboxLabel>
          <div class="relative">
            <ListboxButton
              class="relative w-full cursor-default rounded-md h-8 bg-white py-1.5 pl-3 pr-10 text-left text-gray-900 shadow-sm ring-1 ring-inset focus:outline-none focus:ring-2 sm:text-sm sm:leading-6"
              :class="
                errors.category
                  ? 'ring-red-300 focus:ring-red-500'
                  : 'ring-gray-300 focus:ring-indigo-600'
              "
            >
              <span class="block truncate">{{
                transaction.category?.toUpperCase()
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
            <div v-if="errors.category" class="text-sm text-red-600">
              {{ errors.category }}
            </div>

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
                  @input="validateField('category')"
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
              class="[appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 outline-none ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              :class="
                errors.amount
                  ? 'ring-red-300 focus:ring-red-500'
                  : 'ring-gray-300 focus:ring-indigo-600'
              "
              v-model="transaction.amount"
              @input="validateField('amount')"
            />
            <div v-if="errors.amount" class="text-sm text-red-600">
              {{ errors.amount }}
            </div>
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
              class="block w-full rounded-md border-0 py-1.5 pl-4 text-gray-900 ring-1 outline-none ring-inset placeholder:text-gray-400 focus:ring-2 focus:ring-inset sm:text-sm sm:leading-6"
              :class="
                errors.itemName
                  ? 'ring-red-300 focus:ring-red-500'
                  : 'ring-gray-300 focus:ring-indigo-600'
              "
              v-model="transaction.itemName"
              @input="validateField('itemName')"
            />
            <div v-if="errors.itemName" class="text-sm text-red-600">
              {{ errors.itemName }}
            </div>
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
          @click="onSave()"
        >
          Save
        </button>
      </div>
    </template>
  </Popup>
</template>

<script setup lang="ts">
import * as Yup from "yup";
import { ValidationError } from "yup";
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
import { useTransactionStore } from "@/stores/transaction";
import type ICategory from "@/core/models/category";

const categoryStore = useCategoryStore();
const transactionStore = useTransactionStore();
const props = defineProps<{
  data: ITransaction | undefined;
}>();
const emits = defineEmits(["onClose"]);

const categories = computed(() => categoryStore.getCategories);

const transaction = ref<ITransactionPost>({
  _id: "",
  amount: null,
  expenseDate: new Date().toString(),
  itemName: "",
  category: "",
  type: "",
});
const errors = ref({
  amount: "",
  itemName: "",
  category: "",
  type: "",
});
const validationSchema = Yup.object().shape({
  amount: Yup.number().required("Amount required"),
  itemName: Yup.string().required("Description required"),
  category: Yup.string().required("Category required"),
  type: Yup.string().required("Type required"),
});
function validateField(key) {
  validationSchema
    .validateAt(key, transaction.value)
    .then(() => {
      errors.value[key] = "";
    })
    .catch((error) => {
      errors.value[key] = error.message;
    });
}
if (props.data) {
  transaction.value = JSON.parse(JSON.stringify(props.data));
} else {
  clearData();
}
function clearData() {
  transaction.value = {
    _id: "",
    amount: null,
    expenseDate: new Date().toString(),
    itemName: "",
    category: "",
    type: "",
  };
}
onMounted(() => {
  categoryStore.fetchCategories();
});

async function onSave() {
  try {
    await validationSchema.validate(transaction.value, { abortEarly: false });
    if (transaction.value._id) {
      transactionStore.updateTransaction(transaction.value);
      closedModal({
        code: 0,
        success: true,
        message: "UPDATED",
        data: transaction.value,
      });
    } else {
      transactionStore.addTransaction(transaction.value);
      closedModal({
        code: 0,
        success: true,
        message: "ADDED",
        data: transaction.value,
      });
    }
  } catch (error) {
    if (error instanceof ValidationError)
      error.inner.forEach((err: ValidationError) => {
        errors.value[err.path ?? ""] = err.message;
      });
  }
}
function closedModal(e: IResponse) {
  emits("onClose", e);
}
</script>
