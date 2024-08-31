import { Box, Grid, Typography } from "@mui/material";
import { PosCurrencyOutputType, NonNegCurrencyOutputType } from "../types";
import { showFloatsWith2Decimals } from "../utils";

interface Props {
  totalSaving: PosCurrencyOutputType;
  totalExpense: PosCurrencyOutputType;
  totalIncome: PosCurrencyOutputType;
  targetSaving: NonNegCurrencyOutputType;
}

const Summary = ({
  totalSaving,
  totalExpense,
  totalIncome,
  targetSaving,
}: Props) => {
  return (
    <Box sx={{ width: "100%" }}>
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "center" }}
          >
            Total Income
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "center" }}
          >
            Total Expense
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "center" }}
          >
            Current Saving
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "center" }}
          >
            Target Saving
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "center" }}
          >
            {showFloatsWith2Decimals(totalIncome)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "center" }}
          >
            {showFloatsWith2Decimals(totalExpense)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "center" }}
          >
            {showFloatsWith2Decimals(totalSaving)}
          </Typography>
        </Grid>
        <Grid item xs={3}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "center" }}
          >
            {showFloatsWith2Decimals(targetSaving)}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "left" }}
          >
            Balance (= Income - Expense - Saving):
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography
            variant="h6"
            style={{ marginBottom: "0.0em", textAlign: "right" }}
          >
            {showFloatsWith2Decimals(totalIncome - totalExpense - totalSaving)}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Summary;
