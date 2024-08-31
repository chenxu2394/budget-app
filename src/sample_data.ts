import { TransactionEntry } from "./types";
import schema from "./types";

const sampleData = [
  {
    id: "d2773336-f723-11e9-8f0b-362b9e155667",
    type: "INCOME",
    amount: "3000",
    date: "2024-06-15",
    source: "Salary",
  },
  {
    id: "d811e46d-70b3-4d90-b090-4535c7cf8fb1",
    type: "EXPENSE",
    amount: "50",
    date: "2024-06-15",
    source: "Water bill",
  },
  {
    id: "37be178f-a432-4ba4-aac2-f86810e36a15",
    type: "SAVING",
    amount: "500",
    date: "2024-06-23",
    source: "Savings",
  },
  {
    id: "ee81d6e0-330e-11ef-8f9b-15ef61f3fb4c",
    type: "EXPENSE",
    amount: "100",
    date: "2024-06-23",
    source: "Electricity bill",
  },
  {
    id: "3b649bf0-330f-11ef-8f9b-15ef61f3fb4c",
    type: "INCOME",
    amount: "2000",
    date: "2024-06-11",
    source: "Freelance",
  },
  {
    id: "aa26a4c0-330f-11ef-8f9b-15ef61f3fb4c",
    type: "SAVING",
    amount: "300",
    date: "2024-06-18",
    source: "Savings",
  },
];

const transactions: TransactionEntry[] = sampleData.map((obj) => {
  const object = schema.TransactionSchema.parse(obj);
  object.id = obj.id;
  return object;
});

export default transactions;
