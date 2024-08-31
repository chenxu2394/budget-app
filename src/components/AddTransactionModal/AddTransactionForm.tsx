import { useState, SyntheticEvent } from "react";
import {
  TextField,
  MenuItem,
  Select,
  Grid,
  Button,
  SelectChangeEvent,
  Box,
  InputLabel,
  FormControl,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs, { Dayjs } from "dayjs";

import {
  onSubmitInterface,
  onCancelInterface,
  TransactionType,
  PosCurrencyInputType,
} from "../../types";

interface Props {
  onSubmit: onSubmitInterface;
  onCancel: onCancelInterface;
}

interface TransactionOption {
  value: TransactionType;
  label: string;
}

const transactionOptions: TransactionOption[] = Object.values(
  TransactionType
).map((v) => ({ value: v, label: v.toString() }));

const AddTransactionForm = ({ onSubmit, onCancel }: Props) => {
  const [type, setType] = useState<TransactionType>(TransactionType.EXPENSE);
  const [source, setSource] = useState<string>("");
  const [dateDayjs, setDateDayjs] = useState<Dayjs>(dayjs(new Date()));
  const [amountInput, setAmountInput] = useState<PosCurrencyInputType>("");

  const onTypeChange = (event: SelectChangeEvent<string>) => {
    event.preventDefault();
    if (typeof event.target.value === "string") {
      const value = event.target.value as TransactionType;
      const type = Object.values(TransactionType).find(
        (g) => g.toString() === value
      );
      if (type) {
        setType(type);
        if (type === TransactionType.SAVING) {
          setSource("Savings");
        }
      }
    }
  };

  const addTransaction = (e: SyntheticEvent) => {
    e.preventDefault();
    // const parsedAmount = parseFloat(amountInput) || 0; // Fallback to 0 if NaN
    onSubmit({
      type,
      source,
      amount: amountInput,
      date: dateDayjs.format("YYYY-MM-DD"),
    });
  };

  return (
    <form onSubmit={addTransaction}>
      <Box style={{ marginTop: 20, top: "auto" }}>
        <InputLabel>Type</InputLabel>
        <Select label="Type" fullWidth value={type} onChange={onTypeChange}>
          {transactionOptions.map((option) => (
            <MenuItem key={option.label} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </Box>
      <FormControl fullWidth style={{ marginTop: 20 }}>
        <DatePicker
          label="Date"
          format="YYYY-MM-DD"
          value={dateDayjs}
          onChange={(target) => {
            setDateDayjs(dayjs(target));
          }}
        />
      </FormControl>
      <TextField
        style={{ marginTop: 20 }}
        label="Source"
        value={source}
        onChange={(e) => setSource(e.target.value)}
        fullWidth
      />
      <TextField
        style={{ marginTop: 20 }}
        label="Amount"
        value={amountInput}
        onChange={(e) => setAmountInput(e.target.value)}
        fullWidth
      />
      <Grid style={{ marginTop: 20 }}>
        <Grid item>
          <Button
            color="secondary"
            variant="contained"
            style={{ float: "left" }}
            type="button"
            onClick={onCancel}
          >
            Cancel
          </Button>
        </Grid>
        <Grid item>
          <Button
            style={{
              float: "right",
            }}
            type="submit"
            variant="contained"
          >
            Add
          </Button>
        </Grid>
      </Grid>
    </form>
  );
};

export default AddTransactionForm;
