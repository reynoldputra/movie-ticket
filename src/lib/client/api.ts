import axios, { AxiosResponse } from "axios";

const nextApi = () => {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
  const instance = axios.create({
    baseURL: baseUrl,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    }
  });

  instance.interceptors.response.use((response : AxiosResponse) => {
    return response;
  });

  return instance;
};

export default nextApi;
