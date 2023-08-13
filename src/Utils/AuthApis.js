import axiosInstance from "./axiosInstance"

export const postSignUp = (email, password) => { 
  const data = { email, password };
  return axiosInstance.post("auth/signup", data);
}

export const postSignIn = (email, password) => { 
  const data = { email, password };
  return axiosInstance.post("auth/signin", data);
}