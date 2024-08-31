import { getDomainBasedUID } from "../utils";
import { PosCurrencyOutputType } from "../types";

const LOCAL_STORAGE_KEY = `budget-${getDomainBasedUID()}`;

const loadBudgetFromLocalStorage = (): PosCurrencyOutputType => {
  try {
    const storedBudget = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedBudget) {
      return JSON.parse(storedBudget);
    } else {
      // No stored budget, set default value of 100000 cents
      const defaultBudget: PosCurrencyOutputType = 100000;
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(defaultBudget));
      return defaultBudget;
    }
  } catch (error) {
    console.error("Failed to load budget from local storage:", error);
    return NaN;
  }
};

const getBudget = async () => {
  return loadBudgetFromLocalStorage();
};

const updateBudget = async (newBudget: PosCurrencyOutputType) => {
  try {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newBudget));
  } catch (error) {
    console.error("Failed to update budget in local storage:", error);
  }
  return newBudget;
};

export default { getBudget, updateBudget };
