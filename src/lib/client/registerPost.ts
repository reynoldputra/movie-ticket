import createSubmitToast from "../submitToaster"
import nextApi from "./api"

export const registerPost = async (value: Object) => {
  const request = nextApi().post("/auth/register", value)  
  const response = await createSubmitToast(request)
  console.log(response)
}
