import { Button, Divider, Container, Typography, Grid } from "@mui/material";
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import {
  TransactionEntry,
  TransactionType,
  PosCurrencyOutputType,
  NonNegCurrencyOutputType,
} from "./types";
import TransactionListPage from "./components/TransactionListPage";
import BudgetPage from "./components/BudgetPage";
import Summary from "./components/Summary";
import transactionsService from "./services/transactions";
import budgetService from "./services/budget";
import { handleDownloadCSV } from "./utils";
import Chart from "./components/Chart";

const App = () => {
  const [transactions, setTransactions] = useState<TransactionEntry[]>([]);
  const [totalSaving, setTotalSaving] = useState<PosCurrencyOutputType>(0);
  const [totalExpense, setTotalExpense] = useState<PosCurrencyOutputType>(0);
  const [totalIncome, setTotalIncome] = useState<PosCurrencyOutputType>(0);
  const [targetSaving, setTargetSaving] = useState<NonNegCurrencyOutputType>(0);

  useEffect(() => {
    transactionsService.getAll().then((data) => {
      setTransactions(data);
    });
  }, []);

  useEffect(() => {
    const saving = transactions
      .filter(
        (transaction) =>
          transaction.type === TransactionType.SAVING && transaction.amount
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalSaving(saving);

    const expense = transactions
      .filter(
        (transaction) =>
          transaction.type === TransactionType.EXPENSE && transaction.amount
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalExpense(expense);

    const income = transactions
      .filter(
        (transaction) =>
          transaction.type === TransactionType.INCOME && transaction.amount
      )
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    setTotalIncome(income);
  }, [transactions]);

  useEffect(() => {
    budgetService.getBudget().then((data) => {
      setTargetSaving(data);
    });
  }, []);

  return (
    <div className="App">
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <Router>
          <Container style={{ height: "100vh", overflow: "auto" }}>
            <Typography
              variant="h3"
              style={{ marginBottom: "0.5em", marginTop: "0.5em" }}
            >
              Budget App
            </Typography>
            <Grid container spacing={2} style={{ marginTop: 20 }}>
              <Grid item xs={3}>
                <Button
                  component={Link}
                  to="/"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                >
                  Home
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={Link}
                  to="/budget-app"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                >
                  Budget
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                  onClick={() => handleDownloadCSV(transactions)}
                >
                  Export
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  component={Link}
                  to="/chart"
                  variant="contained"
                  color="primary"
                  style={{ width: "100%" }}
                >
                  Chart
                </Button>
              </Grid>
            </Grid>
            <Divider style={{ margin: "1em 0" }} />
            <Routes>
              <Route
                path="/"
                element={
                  <>
                    <Summary
                      totalSaving={totalSaving}
                      totalExpense={totalExpense}
                      totalIncome={totalIncome}
                      targetSaving={targetSaving}
                    />
                    <Divider style={{ margin: "1em 0" }} />
                    <TransactionListPage
                      transactions={transactions}
                      setTransactions={setTransactions}
                      totalSaving={totalSaving}
                      setTotalSaving={setTotalSaving}
                      totalExpense={totalExpense}
                      setTotalExpense={setTotalExpense}
                      totalIncome={totalIncome}
                      setTotalIncome={setTotalIncome}
                    />
                  </>
                }
              />
              <Route
                path="/budget-app"
                element={
                  <BudgetPage
                    totalSaving={totalSaving}
                    targetSaving={targetSaving}
                    setTargetSaving={setTargetSaving}
                  />
                }
              />
              <Route
                path="/chart"
                element={<Chart transactions={transactions} />}
              />
            </Routes>
          </Container>
        </Router>
      </LocalizationProvider>
    </div>
  );
};

export default App;
