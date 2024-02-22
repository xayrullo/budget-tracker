import type ICategory from "./models/category";
import type ITransaction from "./models/transaction";

const currentDate = new Date();

export const AUTH = {
  email: "xayrullo.jaloldinov@gmail.com",
  password: "12345678",
};

export const USER = {
  id: 1,
  email: "xayrullo.jaloldinov@gmail.com",
  fullName: "Xayrullo Jaloldinov",
  phone: "998939499896",
  createdAt: currentDate.toString(),
};
export const TRANSACTIONS: {
  count: number;
  data: ITransaction[];
} = {
  count: 5,
  data: [
    {
      amount: 800,
      expenseDate: currentDate.toString(),
      itemName: "Harry Potter Book 1",
      isDeleted: false,
      category: "Education",
      type: "expense",
      _id: "5e84bf4e31afde2abc9bde91",
    },
    {
      amount: 3000,
      expenseDate: currentDate.toString(),
      itemName: "School Fee",
      isDeleted: false,
      category: "Bills",
      type: "expense",
      _id: "5e84be5fe0fabd3ff422d1ac",
    },
    {
      amount: 800,
      expenseDate: currentDate.toString(),
      itemName: "Harry Potter Book 1",
      isDeleted: false,
      category: "Education",
      type: "expense",
      _id: "5e84bfca6c65dc381cb2bf1b",
    },
    {
      amount: 4000,
      expenseDate: currentDate.toString(),
      itemName: "Bought Many Vegetables",
      isDeleted: false,
      category: "Vegetables",
      type: "expense",
      _id: "5e856d9609435c2e807c89f7",
    },
    {
      amount: 450,
      expenseDate: currentDate.toString(),
      itemName: "Grocery",
      isDeleted: false,
      category: "Dairy",
      type: "expense",
      _id: "5e85e35a8dbd303d54611273",
    },
  ],
};

export const CATEGORIES: {
  count: number;
  data: ICategory[];
} = {
  count: 10,
  data: [
    {
      value: "salary",
      name: "Salary",
      _id: "5e8430284b25ad1da893b5e0",
    },
    {
      value: "fruits",
      name: "Fruits",
      _id: "5e8430284b25ad1da893b5e1",
    },
    {
      value: "vegetables",
      name: "Vegetables",
      _id: "5e84302e4b25ad1da893b5e3",
    },
    {
      value: "electricity",
      name: "Electricity",
      _id: "5e84b6acb8ce720944f61fb2",
    },
    {
      value: "bills",
      name: "Bills",
      _id: "5e84b6b2b8ce720944f61fb4",
    },
    {
      value: "grocery",
      name: "Grocery",
      _id: "5e84b6b6b8ce720944f61fb6",
    },
    {
      value: "diary",
      name: "Diary",
      _id: "5e84b6bab8ce720944f61fb8",
    },
    {
      value: "rent",
      name: "Rent",
      _id: "5e84b6bfb8ce720944f61fba",
    },
    {
      value: "sports",
      name: "Sports",
      _id: "5e84b6c8b8ce720944f61fbc",
    },
    {
      value: "education",
      name: "Education",
      _id: "5e84b6ceb8ce720944f61fbe",
    },
    {
      value: "school",
      name: "School",
      _id: "5e85dcbc8dbd303d54611271",
    },
  ],
};
