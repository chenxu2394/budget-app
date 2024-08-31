import { useState } from "react";
import {
  Typography,
  Button,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Paper,
  Grid,
} from "@mui/material";

import { z } from "zod";
import { fromZodError } from "zod-validation-error";

import schema, {
  TransactionEntry,
  TransactionFormValues,
  PosCurrencyOutputType,
} from "../../types";
import AddTransactionModal from "../AddTransactionModal";
import transactionService from "../../services/transactions";
import { showFloatsWith2Decimals } from "../../utils";

interface Props {
  transactions: TransactionEntry[];
  setTransactions: React.Dispatch<React.SetStateAction<TransactionEntry[]>>;
  totalSaving: PosCurrencyOutputType;
  setTotalSaving: React.Dispatch<React.SetStateAction<PosCurrencyOutputType>>;
  totalExpense: PosCurrencyOutputType;
  setTotalExpense: React.Dispatch<React.SetStateAction<PosCurrencyOutputType>>;
  totalIncome: PosCurrencyOutputType;
  setTotalIncome: React.Dispatch<React.SetStateAction<PosCurrencyOutputType>>;
}

const TransactionListPage = ({
  transactions,
  setTransactions,
  totalSaving,
  setTotalSaving,
  totalExpense,
  setTotalExpense,
  totalIncome,
  setTotalIncome,
}: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const addTransaction = async (values: unknown) => {
    let newTransaction: TransactionFormValues;
    try {
      newTransaction = schema.transactionFormValuesSchema.parse(values);
    } catch (e: unknown) {
      if (e instanceof z.ZodError) {
        setError(fromZodError(e).message);
        console.error("Data validation error", e.errors);
      } else {
        setError("An unknown validation error occurred");
        console.error("Unknown validation error", e);
      }
      return;
    }

    let response: TransactionEntry;
    try {
      response = await transactionService.create(newTransaction);
      setTransactions([...transactions, response]);
    } catch (error) {
      console.error("Failed to create transaction:", error);
      setError("Failed to create transaction");
    }

    setModalOpen(false);
    if (newTransaction.type === "SAVING") {
      setTotalSaving(totalSaving + newTransaction.amount);
    }
    if (newTransaction.type === "EXPENSE") {
      setTotalExpense(totalExpense + newTransaction.amount);
    }
    if (newTransaction.type === "INCOME") {
      setTotalIncome(totalIncome + newTransaction.amount);
    }
  };

  const handleDelete = async (id: string) => {
    let toBeDeleted: TransactionEntry | undefined;
    try {
      toBeDeleted = await transactionService.remove(id);
      setTransactions(transactions.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Failed to delete transaction:", error);
    }
    if (toBeDeleted) {
      if (toBeDeleted.type === "SAVING") {
        setTotalSaving(totalSaving - toBeDeleted.amount);
      }
      if (toBeDeleted.type === "EXPENSE") {
        setTotalExpense(totalExpense - toBeDeleted.amount);
      }
      if (toBeDeleted.type === "INCOME") {
        setTotalIncome(totalIncome - toBeDeleted.amount);
      }
    }
  };

  return (
    <div className="App">
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <Typography
            variant="h5"
            style={{ marginBottom: "0.0em", textAlign: "left" }}
          >
            Transaction List
          </Typography>
        </Grid>
        <Grid
          item
          xs={6}
          style={{
            display: "flex",
            justifyContent: "flex-end",
            marginBottom: 20,
          }}
        >
          <Button variant="contained" onClick={() => openModal()}>
            Add Transaction
          </Button>
        </Grid>
      </Grid>
      <TableContainer component={Paper} style={{ maxHeight: 440 }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Amount</TableCell>
              <TableCell>Date</TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {transactions.map((transaction) => (
              <TableRow key={transaction.id}>
                <TableCell>{transaction.type}</TableCell>
                <TableCell>{transaction.source}</TableCell>
                <TableCell>
                  {showFloatsWith2Decimals(transaction.amount)}
                </TableCell>
                <TableCell>{transaction.date}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    color="secondary"
                    style={{ width: "100%" }}
                    onClick={() => handleDelete(transaction.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <AddTransactionModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={addTransaction}
        error={error}
      />
    </div>
  );
};

export default TransactionListPage;
