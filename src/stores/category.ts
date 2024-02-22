import { defineStore } from "pinia";
import type ICategory from "@/core/models/category";

import { $api } from "@/core/services";

export interface IState {
  categories: ICategory[];
}
export const useCategoryStore = defineStore({
  id: "categoryStore",
  state: (): IState => ({
    categories: [],
  }),
  getters: {
    getCategories: (state) => state.categories,
  },
  actions: {
    fetchCategories() {
      $api.category.getAll().then((res) => {
        this.categories = res;
      });
    },
    deleteCategory(item: ICategory) {
      const index = this.categories.findIndex((ind) => ind._id === item._id);
      if (index > -1) this.categories.splice(index, 1);
    },
  },
});
