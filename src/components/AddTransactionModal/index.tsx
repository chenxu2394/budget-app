import {
  Dialog,
  DialogTitle,
  DialogContent,
  Divider,
  Alert,
} from "@mui/material";

import AddTransactionForm from "./AddTransactionForm";
import { onSubmitInterface, onCancelInterface } from "../../types";

interface Props {
  modalOpen: boolean;
  onClose: onCancelInterface;
  onSubmit: onSubmitInterface;
  error?: string;
}

const AddTransactionModal = ({
  modalOpen,
  onClose,
  onSubmit,
  error,
}: Props) => {
  return (
    <Dialog fullWidth={true} open={modalOpen} onClose={() => onClose()}>
      <DialogTitle>Add A Transaction</DialogTitle>
      <Divider />
      <DialogContent>
        {error && <Alert severity="error">{error}</Alert>}
        <AddTransactionForm onSubmit={onSubmit} onCancel={onClose} />
      </DialogContent>
    </Dialog>
  );
};

export default AddTransactionModal;
