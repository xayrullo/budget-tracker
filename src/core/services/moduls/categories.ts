import { CATEGORIES, TRANSACTIONS } from "@/core/mocks";
import ApiService from "../ApiService";
import type ICategory from "@/core/models/category";
export default class CategoryApi extends ApiService {
  getAll(): Promise<ICategory[]> {
    return new Promise((resolve, reject) => {
      resolve(CATEGORIES.data);
      return CATEGORIES.data;
    });
  }
}
