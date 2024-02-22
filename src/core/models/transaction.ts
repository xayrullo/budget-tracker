export default interface ITransaction extends Omit<ITransactionPost, "amount"> {
  amount: number;
  isDeleted: false;
  _id: string;
}

export interface ITransactionPost {
  _id?: string;
  amount: number | null;
  expenseDate: string;
  itemName: string;
  category: string;
  type: string;
}
