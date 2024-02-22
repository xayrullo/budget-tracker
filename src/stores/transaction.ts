import { defineStore } from "pinia";
import type ITransaction from "@/core/models/transaction";

import { $api } from "@/core/services";

export interface IState {
  transactions: ITransaction[];
}
export const useTransactionStore = defineStore({
  id: "transactionStore",
  state: (): IState => ({
    transactions: [],
  }),
  getters: {
    getTransactions: (state) => state.transactions,
  },
  actions: {
    fetchTransactions() {
      $api.transaction.getAll().then((res) => {
        this.transactions = res;
      });
    },
    deleteTransaction(item: ITransaction) {
      const index = this.transactions.findIndex((ind) => ind._id === item._id);
      if (index > -1) this.transactions.splice(index, 1);
    },
  },
});
