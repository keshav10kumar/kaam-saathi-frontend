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