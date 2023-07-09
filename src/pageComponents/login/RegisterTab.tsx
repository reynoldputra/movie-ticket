import ErrorForm from "@/components/form/ErrorForm";
import { InputItem } from "@/interfaces/InputItem";
import { registerPost } from "@/lib/client/registerPost";
import { RegisterOptions, SubmitHandler, useForm } from "react-hook-form";

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
    console.log(data);
    registerPost(data);
  };

  const checkPassword = (val: string) => {
    if (watch("password") != val) {
      return "Your passwords do no match";
    } else {
      return true;
    }
  };

  const forms: InputItem[] = [
    { name: "name", label: "Name", option: { required: true } },
    { name: "username", label: "Username", option: { required: true } },
    { name: "email", label: "Email", type: "email", option: { required: true } },
    { name: "age", label: "Age", type: "number", option: { required: true } },
    { name: "password", label: "Password", type: "password", option: { required: true } },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      option: {
        validate: checkPassword,
        required: true,
      },
    },
  ];

  return (
    <div className="bg-white p-8 flex justify-center min-h-[500px] items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          {forms.map((form) => {
            let registerOption: RegisterOptions = {};

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
                {errors[form.name as keyof RegisterInput] && (
                  <ErrorForm
                    message={errors[form.name as keyof RegisterInput]?.type == "required" ? "This field is required" : errors[form.name as keyof RegisterInput]?.message as string}
                  />
                )}
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
