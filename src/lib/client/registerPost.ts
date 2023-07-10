import { toast } from "react-toastify"
import nextApi from "./api"
import { AxiosError } from "axios"
import { RegisterInput } from "@/interfaces/FormInput"

export const registerPost = async (value: RegisterInput) => {
  const id = toast.loading("Sending data ...")
  try {
    console.log(value)
    await nextApi().post("/api/myauth/register", value)  
    toast.update(id, {
      render : "Success creating new user",
      type : "success",
      isLoading : false,
      autoClose : 3000
    })
  } catch (err) {
    if(err instanceof AxiosError) {
      console.log(err)
      toast.update(id, {
        render : err.response?.data?.message,
        type : "error",
        isLoading : false,
        autoClose : 3000
      })
    }
  }
}
