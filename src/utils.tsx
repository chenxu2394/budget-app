import Papa from "papaparse";
import { TransactionEntry } from "./types";

export const getDomainBasedUID = () => {
  const domain = window.location.hostname;
  console.log("Domain:", domain);
  let hash = 0;
  if (domain.length === 0) return hash;
  for (let i = 0; i < domain.length; i++) {
    const char = domain.charCodeAt(i);
    hash = (hash << 5) - hash + char;
    hash |= 0;
  }
  return hash;
};

export const showFloatsWith2Decimals = (cents: number) => {
  return (cents / 100).toFixed(2);
};

export const handleDownloadCSV = (transactions: TransactionEntry[]) => {
  const modifiedTransactions = transactions.map((transaction) => ({
    ...transaction,
    amount: showFloatsWith2Decimals(transaction.amount),
  }));

  const csv = Papa.unparse(modifiedTransactions);
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.setAttribute("download", "transactions.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};
