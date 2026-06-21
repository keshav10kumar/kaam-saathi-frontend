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

// ✅ SEARCH CANDIDATES
export const searchCandidates = async (city, skill) => {
  const response = await api.get(
    `/users/search?city=${city}&skill=${skill}`
  );
  return response.data;
};
