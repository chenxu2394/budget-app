import { Typography, Grid, Box } from "@mui/material";
import { styled } from "@mui/material/styles";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useState } from "react";
import { z } from "zod";
import { fromZodError } from "zod-validation-error";
import schema, {
  PosCurrencyOutputType,
  NonNegCurrencyOutputType,
} from "../types";

import BudgetModal from "./BudgetModal";
import budgetService from "../services/budget";
import { showFloatsWith2Decimals } from "../utils";

interface Props {
  totalSaving: PosCurrencyOutputType;
  targetSaving: NonNegCurrencyOutputType;
  setTargetSaving: React.Dispatch<
    React.SetStateAction<NonNegCurrencyOutputType>
  >;
}

const BudgetPage = ({ totalSaving, targetSaving, setTargetSaving }: Props) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  const setBudgetModal = async (values: unknown) => {
    let newBudget: NonNegCurrencyOutputType;
    try {
      newBudget = schema.NonNegCurrencySchema.parse(values);
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

    try {
      const response = await budgetService.updateBudget(newBudget);
      setTargetSaving(response);
    } catch (error) {
      console.error("Error updating budget", error);
    }

    setModalOpen(false);
  };

  const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
    height: 10,
    borderRadius: 5,
    [`&.${linearProgressClasses.colorPrimary}`]: {
      backgroundColor:
        theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
    },
    [`& .${linearProgressClasses.bar}`]: {
      borderRadius: 5,
      backgroundColor: theme.palette.mode === "light" ? "#1a90ff" : "#308fe8",
    },
  }));

  const progressAmount =
    totalSaving >= targetSaving ? 100 : (totalSaving / targetSaving) * 100;

  return (
    <>
      <BudgetModal
        modalOpen={modalOpen}
        onClose={closeModal}
        onSubmit={setBudgetModal}
        target={targetSaving}
        error={error}
      />
      <Box>
        <Typography variant="h4" style={{ marginBottom: "0.5em" }}>
          Budget
        </Typography>
      </Box>
      <Box sx={{ width: "100%" }} onClick={() => openModal()}>
        <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              style={{ marginBottom: "0.5em", textAlign: "left" }}
            >
              Target:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              style={{ marginBottom: "0.5em", textAlign: "right" }}
            >
              <u>{showFloatsWith2Decimals(targetSaving)}</u>
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              style={{ marginBottom: "0.5em", textAlign: "left" }}
            >
              Current Saving:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              style={{ marginBottom: "0.5em", textAlign: "right" }}
            >
              {showFloatsWith2Decimals(totalSaving)}
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              style={{ marginBottom: "0.5em", textAlign: "left" }}
            >
              Progress:
            </Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography
              variant="h4"
              style={{ marginBottom: "0.5em", textAlign: "right" }}
            >
              {progressAmount.toFixed(2)}%
            </Typography>
          </Grid>
        </Grid>
        <BorderLinearProgress variant="determinate" value={progressAmount} />
      </Box>
    </>
  );
};

export default BudgetPage;
