interface InputTextProps {
  name: string;
}
export default function InputText({ name }: InputTextProps) {
  return <input name={name} className="bg-gray-200 px-4 py-1 rounded-md w-full" />;
}
