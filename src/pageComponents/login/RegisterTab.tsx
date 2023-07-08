import { InputItem } from "@/interfaces/InputItem";
import { registerPost } from "@/lib/client/registerPost";
import { RegisterOptions, SubmitHandler, Validate, useForm } from "react-hook-form";

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
    watch,
  } = useForm<RegisterInput>();

  const onSubmit: SubmitHandler<RegisterInput> = (data) => {
    // registerPost(data);
  };

  const checkPassword = (val: string) => {
    if (watch("password") != val) {
      return "Your passwords do no match";
    } else {
      return true;
    }
  };

  const forms: InputItem[] = [
    { name: "name", label: "Name", required: true },
    { name: "username", label: "Username", required: true },
    { name: "email", label: "Email", required: true, type: "email" },
    { name: "age", label: "Age", required: true, type: "number" },
    { name: "password", label: "Password", required: true, type: "password" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      required: true,
      type: "password",
      option : {
        validate: checkPassword
      }
    },
  ];

  return (
    <div className="bg-white p-8 flex justify-center min-h-[500px] items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {forms.map((form) => {
            let registerOption: RegisterOptions = {}

            if (form.option) registerOption = form.option;

            return (
              <>
                <p className="font-bold mt-2">{form.label}</p>
                <input
                  className="bg-gray-200 px-4 py-1 rounded-md"
                  id={form.name}
                  type={form.type ? form.type : "text"}
                  {...register(form.name as keyof RegisterInput, registerOption)}
                />
                {errors[form.name as keyof RegisterInput] && <p className="text-sm text-red-500">{errors[form.name as keyof RegisterInput]?.message}</p>}
              </>
            );
          })}
        </div>
        <button className="w-full">
          <div className="bg-blue-600 text-white text-center font-bold py-1 mt-4">Register</div>
        </button>
      </form>
    </div>
  );
}
