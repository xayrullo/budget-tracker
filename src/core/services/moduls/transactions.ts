import { TRANSACTIONS } from "@/core/mocks";
import ApiService from "../ApiService";
import type ITransaction from "@/core/models/transaction";
export default class TransactionApi extends ApiService {
  getAll(): Promise<ITransaction[]> {
    return new Promise((resolve, reject) => {
      resolve(TRANSACTIONS.data);
      return TRANSACTIONS.data;
    });
  }
}
