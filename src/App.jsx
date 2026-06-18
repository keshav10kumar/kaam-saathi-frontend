
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./pages/LoginPage";
import Profile from "./pages/Profile";
import Jobs from "./pages/Jobs";
import RecruiterDashboard from "./pages/RecruiterDashboard";
import ApplicantsPage from "./pages/ApplicantsPage";
import PostJob from "./pages/PostJob";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/jobs" element={<Jobs />} />
        <Route path="/recruiter" element={<RecruiterDashboard />} />
        <Route path="/recruiter/jobs/:jobId/applications" element={<ApplicantsPage />} />
        <Route path="/recruiter/post-job" element={<PostJob />} />
      </Routes>
    </Router>
  );
}

export default App;