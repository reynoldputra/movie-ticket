import ErrorForm from "@/components/form/ErrorForm";
import { LoginInput } from "@/interfaces/FormInput";
import { signIn } from "next-auth/react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";

export default function LoginTab() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginInput>();

  const onSubmit: SubmitHandler<LoginInput> = async (data) => {
    const id = toast.loading("Sending data ...");
    const res = await signIn("credentials", {
      email: data.email,
      password: data.password,
      redirect: false,
      callbackUrl: "/",
    });
    if (!res?.ok) {
      let message = "Internal server error";
      if (res?.error == "CredentialsSignin") message = "Wrong email/password";
      toast.update(id, {
        render: message,
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
      return;
    }
    toast.update(id, {
      render: "Success creating new user",
      type: "success",
      isLoading: false,
      autoClose: 3000,
    });
    
  };

  return (
    <div className="bg-white p-8 flex justify-center h-96 items-center">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <p className="font-bold mt-2">Email</p>
          <input
            id="email"
            className="bg-gray-200 px-4 py-1 rounded-md"
            type="email"
            {...register("email", { required: true })}
          />
          {errors.email && (
            <ErrorForm
              message={
                errors.email.type == "required"
                  ? "This field is required"
                  : (errors.email.message as string)
              }
            />
          )}
          <p className="font-bold mt-2">Password</p>
          <input
            id="password"
            className="bg-gray-200 px-4 py-1 rounded-md"
            type="password"
            {...register("password", { required: true })}
          />
          {errors.password && (
            <ErrorForm
              message={
                errors.password.type == "required"
                  ? "This field is required"
                  : (errors.password.message as string)
              }
            />
          )}
        </div>
        <button className="w-full" type="submit">
          <div className="bg-blue-600 rounded text-white text-center font-bold py-1 mt-4">
            Login
          </div>
        </button>
      </form>
    </div>
  );
}
