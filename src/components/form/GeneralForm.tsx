import clsxm from "@/lib/clsxm";
import { ReactNode } from "react";

interface GeneralFormProps {
  children: ReactNode;
  title: string;
  submitLabel : string;
  className ?: string
}

export default function GeneralForm({ children, title, submitLabel, className }: GeneralFormProps) {
  return (
    <div className={clsxm([
      "w-[400px] min-h-[400px] bg-white rounded-xl text-black px-8 py-8 flex flex-col justify-center items-center gap-8",
      className
    ])}>
      <div className="text-black font-bold text-xl text-center">{title}</div>
      <div className="pb-12">
        {children}
        <div className="bg-blue-600 text-white text-center font-bold py-1 mt-4">{submitLabel}</div>
      </div>
    </div>
  );
}
