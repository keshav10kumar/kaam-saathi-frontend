import api from "./axios";

export const sendOtp = (phone) => {
  return api.post("/auth/send-otp", { phone });
};

export const verifyOtp = (phone, otp) => {
  return api.post("/auth/verify-otp", { phone, otp });
};