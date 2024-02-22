import ApiService from "./ApiService";
import CategoryApi from "./moduls/categories";
import TransactionApi from "./moduls/transactions";
export const $api = {
  common: new ApiService(),
  transaction: new TransactionApi(),
  category: new CategoryApi(),
};
