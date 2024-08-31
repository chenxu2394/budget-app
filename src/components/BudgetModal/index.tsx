import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import SetBudgetForm from "./SetBudgetForm";
import {
  onSubmitInterface,
  onCancelInterface,
  NonNegCurrencyOutputType,
} from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: onCancelInterface;
  onSubmit: onSubmitInterface;
  target: NonNegCurrencyOutputType;
  error?: string;
}

const SetBudgetModal = ({
  modalOpen,
  onClose,
  onSubmit,
  target,
  error,
}: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Set Budget</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <SetBudgetForm onSubmit={onSubmit} onCancel={onClose} target={target} />
      </DialogContent>
    </Dialog>
  );
};

export default SetBudgetModal;
