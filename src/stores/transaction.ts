import { defineStore } from "pinia";
import type ITransaction from "@/core/models/transaction";

import { $api } from "@/core/services";
import type { ITransactionPost } from "@/core/models/transaction";

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
    addTransaction(e: ITransactionPost) {
      this.transactions.push({
        ...e,
        _id: "23143214321n23l14231",
        isDeleted: false,
        amount: Number(e.amount),
      });
    },
    updateTransaction(e: ITransactionPost) {
      const index = this.transactions.findIndex((ind) => ind._id === e._id);
      if (index > -1)
        this.transactions.splice(index, 1, {
          ...e,
          _id: e._id ? e._id : "",
          isDeleted: false,
          amount: Number(e.amount),
        });
    },
    deleteTransaction(item: ITransaction) {
      const index = this.transactions.findIndex((ind) => ind._id === item._id);
      if (index > -1) this.transactions.splice(index, 1);
    },
  },
});
