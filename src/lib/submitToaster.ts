import { toast } from "react-toastify";

type ToastMessages = {
  pending?: string;
  success?: string;
  error?: string;
};

export default function createSubmitToast(
  promise: Promise<unknown>,
  { pending = "Sending data ...", success = "Operation success", error = "Error occurred" } : ToastMessages = {}
) {
  return toast.promise(promise, { pending, success, error });
}
