import { InputItem } from "@/interfaces/InputItem";
import { SubmitHandler, useForm } from "react-hook-form";

interface RegisterInput {
  email: string;
  name: string;
  username: string;
  age: number;
  password: string;
  confirmPassword: string;
}

export default function RegisterTab() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    console.log(data);
  };

  const forms: InputItem[] = [
    { name: "name", label: "Name", required: true },
    { name: "username", label: "Username", required: true },
    { name: "email", label: "Email", required: true, type: "email" },
    { name: "age", label: "Age", required: true, type: "number" },
    { name: "password", label: "Password", required: true, type: "password" },
    { name: "confirmPassword", label: "Confirm Password", required: true, type: "password" },
  ];

  return (
    <div className="bg-white p-8 flex justify-center min-h-[500px] items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {forms.map((form) => (
            <>
              <p className="font-bold mt-2">{form.label}</p>
              <input
                className="bg-gray-200 px-4 py-1 rounded-md"
                id={form.name}
                required={form.required}
                type={form.type ? form.type : "text"}
                {...register(form.name as keyof RegisterInput)}
              />
            </>
          ))}
        </div>
        <button className="w-full">
          <div className="bg-blue-600 text-white text-center font-bold py-1 mt-4">Register</div>
        </button>
      </form>
    </div>
  );
}
