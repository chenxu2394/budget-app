import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartDataset,
} from "chart.js";
import { TransactionEntry } from "../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Props {
  transactions: TransactionEntry[];
}

interface TransactionDataset extends ChartDataset<"bar"> {
  data: number[];
}

const Chart = ({ transactions }: Props) => {
  // Helper function to process data
  const processData = (transactions: TransactionEntry[]) => {
    const modifiedTransactions = transactions.map((transaction) => ({
      ...transaction,
      amount: transaction.amount / 100,
    }));

    const sortedTransactions = modifiedTransactions.sort((a, b) =>
      a.date.localeCompare(b.date)
    );
    const dataByDateAndType: { [date: string]: { [type: string]: number } } =
      {};

    sortedTransactions.forEach((txn) => {
      if (!dataByDateAndType[txn.date]) {
        dataByDateAndType[txn.date] = {};
      }
      if (!dataByDateAndType[txn.date][txn.type]) {
        dataByDateAndType[txn.date][txn.type] = 0;
      }
      dataByDateAndType[txn.date][txn.type] += txn.amount;
    });

    const labels = Object.keys(dataByDateAndType);
    const datasets: TransactionDataset[] = [];

    const typeColors: { [key: string]: string } = {
      INCOME: "rgba(75, 192, 192, 0.5)", // Green
      EXPENSE: "rgba(255, 99, 132, 0.5)", // Red
      SAVING: "rgba(53, 162, 235, 0.5)", // Blue
    };

    const types = ["INCOME", "EXPENSE", "SAVING"];
    types.forEach((type) => {
      const data = labels.map((label) => dataByDateAndType[label][type] || 0);
      datasets.push({
        label: type,
        data,
        backgroundColor: typeColors[type],
      });
    });

    return { labels, datasets };
  };

  const { labels, datasets } = processData(transactions);

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
      },
    },
  };

  const data = {
    labels,
    datasets,
  };

  return <Bar options={options} data={data} />;
};

export default Chart;
