import { toast } from "react-toastify"
import nextApi from "./api"
import { AxiosError } from "axios"
import { TopupInput } from "@/interfaces/FormInput"

export const topupPost = async (value: TopupInput) => {
  const id = toast.loading("Sending data ...")
  try {
    await nextApi().post("/api/pay/topup", value)  
    toast.update(id, {
      render : "Success topup balance",
      type : "success",
      isLoading : false,
      autoClose : 3000
    })
    return null
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
