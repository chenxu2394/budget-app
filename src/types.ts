import { z } from "zod";

const dateSchema = z.coerce
  .date()
  .transform((date) => date.toISOString().split("T")[0]);

export enum TransactionType {
  INCOME = "INCOME",
  EXPENSE = "EXPENSE",
  SAVING = "SAVING",
}

const TransactionTypeSchema = z.nativeEnum(TransactionType);

// Base schema for currency that ensures it's a numeric string up to two decimal places.
const baseCurrencySchema = z
  .string()
  .refine((value) => !isNaN(Number(value)) && /^-?\d*\.?\d{0,2}$/.test(value), {
    message: "Amount must be a valid number with up to two decimal places.",
  })
  .transform((value) => parseFloat(value))
  .transform((value) => {
    const result = value * 100;
    return Math.round(result);
  });

// Non-negative currency schema allowing zero and positive values.
const NonNegCurrencySchema = baseCurrencySchema.refine((value) => value >= 0, {
  message: "Amount must be greater than or equal to 0.",
});

// Positive currency schema that extends the non-negative to disallow zero.
const PosCurrencySchema = NonNegCurrencySchema.refine((value) => value > 0, {
  message: "Amount must be greater than 0.",
});

export type PosCurrencyInputType = z.input<typeof PosCurrencySchema>; // string (valid currency)
export type PosCurrencyOutputType = z.output<typeof PosCurrencySchema>; // number (in cents)

export type NonNegCurrencyInputType = z.input<typeof NonNegCurrencySchema>; // string (valid currency)
export type NonNegCurrencyOutputType = z.output<typeof NonNegCurrencySchema>; // number (in cents)

const TransactionEntrySchema = z.object({
  id: z.string(),
  type: TransactionTypeSchema,
  source: z.string(),
  amount: PosCurrencySchema,
  date: dateSchema,
});

export type TransactionEntry = z.infer<typeof TransactionEntrySchema>;

const transactionFormValuesSchema = TransactionEntrySchema.omit({ id: true });

export type TransactionFormValues = z.infer<typeof transactionFormValuesSchema>;

export interface onSubmitInterface {
  (values: unknown): void;
}

export interface onCancelInterface {
  (): void;
}

export default {
  TransactionSchema: TransactionEntrySchema,
  TransactionTypeSchema,
  transactionFormValuesSchema,
  PosCurrencySchema,
  NonNegCurrencySchema,
};
