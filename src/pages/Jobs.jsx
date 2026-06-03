import { useEffect, useState } from "react";
import api from "../api/api";

function Jobs() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    api.get("/jobs")
      .then((res) => {
        setJobs(res.data);
      })
      .catch((err) => {
        console.error("Error fetching jobs:", err);
      });
  }, []);

  return (
    <div>
      <h2>Jobs List</h2>

      {jobs.length === 0 && <p>No jobs found</p>}

      {jobs.map((job) => (
        <div key={job.id}>
          <p><b>{job.title}</b></p>
          <p>{job.city}</p>
          <p>📞 {job.phone}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default Jobs;