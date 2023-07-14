// Default input using react-hook-form context
import { useFormContext } from "react-hook-form";
import ErrorForm from "./ErrorForm";
import { InputItem } from "@/interfaces/InputItem";
import { InputHTMLAttributes } from "react-day-picker";

interface ShortInputItem extends InputItem {
  inputProps? : HTMLInputElement
}

export default function InputWithCtx({name, label, option, inputProps} : ShortInputItem) {
  const {
    register,
    formState: { errors }
  } = useFormContext();

  return (
    <>
      <p className="font-bold mt-2">{label}</p>
      <input className="bg-gray-200 px-4 py-1 rounded-md w-full" 
        {...register(name, option)}
        type={inputProps?.type ? inputProps.type : "text"}
      />
      {errors[name] && (
        <ErrorForm
          message={
            errors[name]?.type == "required"
              ? "This field is required"
              : (errors[name]?.message as string)
          }
        />
      )}
    </>
  );
}
