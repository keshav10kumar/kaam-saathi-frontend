import api from "../api/axios";

// ✅ Recruiter Jobs
export const getRecruiterJobs = async (userId) => {
  const response = await api.get(`/jobs/recruiter/${userId}`);
  return response.data;
};

// ✅ Job Applicants
export const getJobApplicants = async (jobId) => {
  const response = await api.get(`/jobs/${jobId}/applications`);
  return response.data;
};

// ✅ UPDATE JOB
export const updateJob = async (jobId, data, userId) => {
  const response = await api.put(`/jobs/${jobId}?userId=${userId}`, data);
  return response.data;
};

// ✅ DELETE JOB
export const deleteJob = async (jobId, userId) => {
  const response = await api.delete(`/jobs/${jobId}?userId=${userId}`);
  return response.data;
};