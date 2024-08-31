import { v1 as uuid } from "uuid";

import sample_data from "../sample_data";
import { TransactionFormValues, TransactionEntry } from "../types";
import { getDomainBasedUID } from "../utils";

const LOCAL_STORAGE_KEY = `transactions-${getDomainBasedUID()}`;

const loadDataFromLocalStorage = async () => {
  let transactions = [];
  try {
    const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedData) {
      transactions = JSON.parse(storedData);
    } else {
      // No stored data, load sample data
      transactions = sample_data;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
    }
  } catch (error) {
    console.error("Failed to load transactions from local storage:", error);
  }
  return transactions;
};

const getAll = async () => {
  return loadDataFromLocalStorage();
};

const create = async (object: TransactionFormValues) => {
  const newTransaction = { ...object, id: uuid() };
  const transactions = await loadDataFromLocalStorage();
  transactions.push(newTransaction);
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(transactions));
  return newTransaction;
};

const remove = async (id: string) => {
  const transactions = await loadDataFromLocalStorage();
  const toBeDeleted = transactions.find((t: TransactionEntry) => t.id === id);
  const updatedTransactions = transactions.filter(
    (t: TransactionEntry) => t.id !== id
  );
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedTransactions));
  return toBeDeleted;
};

export default { getAll, create, remove };
