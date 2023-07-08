import { toast } from "react-toastify"
import nextApi from "./api"
import { AxiosError } from "axios"

export const registerPost = async (value: Object) => {
  const id = toast.loading("Sending data ...")
  try {
    await nextApi().post("/api/auth/register", value)  
    toast.update(id, {
      render : "Success creating new user",
      type : "success",
      isLoading : false
    })
  } catch (err) {
    if(err instanceof AxiosError) {
      console.log(err)
      toast.update(id, {
        render : err.response?.data?.message,
        type : "error",
        isLoading : false
      })
    }
  }
}
