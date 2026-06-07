import api from "../api/axios";

// ✅ Get User Profile
export const getProfile = async (phone) => {
  const response = await api.get(`/users/${phone}`);
  return response.data;
};

// ✅ Update User Profile
export const updateProfile = async (data) => {
  const response = await api.put("/users/profile", data);
  return response.data;
};