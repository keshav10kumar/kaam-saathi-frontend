import axios from "axios";

const BASE_URL = "http://localhost:8080/api/auth";

export const sendOtp = (phone) => {
    return axios.post(`${BASE_URL}/send-otp`, { phone });
};

export const verifyOtp = (phone, otp) => {
    return axios.post(`${BASE_URL}/verify-otp`, { phone, otp });
};
