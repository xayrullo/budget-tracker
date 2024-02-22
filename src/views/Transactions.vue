<template>
  <div class="px-4 sm:px-6 lg:px-8">
    <div class="sm:flex sm:items-center">
      <div class="sm:flex-auto">
        <h1 class="text-base font-semibold leading-6 text-gray-900">
          Transactions
        </h1>
      </div>
      <div class="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
        <button
          type="button"
          class="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="onAction()"
        >
          Add new transaction
        </button>
      </div>
    </div>
    <div class="mt-8 flow-root">
      <div class="-mx-4 -my-2 sm:-mx-6 lg:-mx-8">
        <div class="inline-block min-w-full py-2 align-middle">
          <table class="min-w-full border-separate border-spacing-0">
            <thead>
              <tr>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  Amount
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:pl-6 lg:pl-8"
                >
                  Category
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter sm:table-cell"
                >
                  Description
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 hidden border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter lg:table-cell"
                >
                  Transaction Date
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 px-3 py-3.5 text-left text-sm font-semibold text-gray-900 backdrop-blur backdrop-filter"
                >
                  Actions
                </th>
                <th
                  scope="col"
                  class="sticky top-0 z-10 border-b border-gray-300 bg-white bg-opacity-75 py-3.5 pl-3 pr-4 backdrop-blur backdrop-filter sm:pr-6 lg:pr-8"
                >
                  <span class="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="(item, ind) in transactions" :key="ind">
                <td
                  :class="[
                    ind !== transactions.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6 lg:pl-8',
                  ]"
                >
                  <div class="flex-auto">
                    <div class="flex items-start gap-x-3">
                      <div class="text-sm font-medium leading-6 text-gray-900">
                        {{ item.amount }}
                      </div>
                      <div
                        :class="[
                          statuses[item.type],
                          'rounded-md py-1 px-2 text-xs font-medium ring-1 ring-inset',
                        ]"
                      >
                        {{ item.type }}
                      </div>
                    </div>
                  </div>
                </td>
                <td
                  :class="[
                    ind !== transactions.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 sm:table-cell',
                  ]"
                >
                  {{ item.category }}
                </td>
                <td
                  :class="[
                    ind !== transactions.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap hidden px-3 py-4 text-sm text-gray-500 lg:table-cell',
                  ]"
                >
                  {{ item.itemName }}
                </td>
                <td
                  :class="[
                    ind !== transactions.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'whitespace-nowrap px-3 py-4 text-sm text-gray-500',
                  ]"
                >
                  {{ getDateTime(item.expenseDate) }}
                </td>
                <td
                  :class="[
                    ind !== transactions.length - 1
                      ? 'border-b border-gray-200'
                      : '',
                    'relative whitespace-nowrap py-4 pr-4 pl-3 text-right text-sm font-medium sm:pr-8 lg:pr-8',
                  ]"
                >
                  <div class="flex gap-x-6 justify-center">
                    <div class="cursor-pointer" @click="onAction(item)">
                      <component
                        :is="PencilSquareIcon"
                        class="hidden h-6 w-5 flex-none text-gray-400 sm:block"
                        aria-hidden="true"
                      />
                    </div>
                    <div class="cursor-pointer" @click="onDelete(item)">
                      <component
                        :is="TrashIcon"
                        class="hidden h-6 w-5 flex-none text-red-500 sm:block"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <DeletePopup
      v-if="isDeletePopup"
      title="Are you sure want delete it?"
      @onClose="closedDeletePopup"
    />
    <TransactionPopup
      v-if="isActionPopup"
      :data="selectedTran"
      @on-close="closeActionPopup"
    />
  </div>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from "vue";
import { useTransactionStore } from "@/stores/transaction";

import { PencilSquareIcon, TrashIcon } from "@heroicons/vue/20/solid";
import type ITransaction from "@/core/models/transaction";

import DeletePopup from "@/components/popups/Delete.vue";
import TransactionPopup from "@/components/popups/Transaction.vue";
import type IResponse from "@/core/models/response";

import { getDateTime } from "@/core/utils/tools";

const transactionStore = useTransactionStore();

const statuses = {
  income: "text-green-700 bg-green-50 ring-green-600/20",
  expense: "text-red-700 bg-red-50 ring-red-600/10",
};

const transactions = computed(() => transactionStore.getTransactions);
const selectedTran = ref<ITransaction>();
const isDeletePopup = ref(false);
const isActionPopup = ref(false);
onMounted(() => {
  transactionStore.fetchTransactions();
});

function onAction(item?: ITransaction) {
  isActionPopup.value = true;
  if (item) {
    selectedTran.value = item;
  }
}
function closeActionPopup(e: IResponse) {
  isActionPopup.value = false;
  selectedTran.value = {} as ITransaction;
}
function onDelete(item: ITransaction) {
  isDeletePopup.value = true;
  selectedTran.value = item;
}
function closedDeletePopup(e: IResponse) {
  isDeletePopup.value = false;
  if (e.success) {
    if (selectedTran.value)
      transactionStore.deleteTransaction(selectedTran.value);
    selectedTran.value = {} as ITransaction;
  }
}
</script>
