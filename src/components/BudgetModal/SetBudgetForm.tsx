import { useState, SyntheticEvent } from "react";
import { TextField, Grid, Button } from "@mui/material";

import {
  onSubmitInterface,
  onCancelInterface,
  NonNegCurrencyInputType,
  NonNegCurrencyOutputType,
} from "../../types";

import { showFloatsWith2Decimals } from "../../utils";

interface Props {
  onSubmit: onSubmitInterface;
  onCancel: onCancelInterface;
  target: NonNegCurrencyOutputType;
}

const SetBudgetForm = ({ onSubmit, onCancel, target }: Props) => {
  const [amount, setAmount] = useState<NonNegCurrencyInputType>(
    target.toString()
  );

  const handleReset = () => {
    setAmount("0");
  };

  const setBudgetValue = (e: SyntheticEvent) => {
    e.preventDefault();
    onSubmit(amount);
  };

  return (
    <form onSubmit={setBudgetValue}>
      <TextField
        style={{ marginTop: 20 }}
        label="Amount"
        value={showFloatsWith2Decimals(Number(amount))}
        onChange={(e) => setAmount(e.target.value)}
        fullWidth
      />
      <Grid container spacing={2} style={{ marginTop: 20 }}>
        <Grid item xs={4}>
          <Button
            color="secondary"
            variant="contained"
            style={{ width: "100%" }}
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            color="secondary"
            variant="contained"
            style={{ width: "100%" }}
            onClick={handleReset}
          >
            Reset
          </Button>
        </Grid>
        <Grid item xs={4}>
          <Button
            color="primary"
            variant="contained"
            style={{ width: "100%" }}
            type="submit"
          >
            Set
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default SetBudgetForm;
