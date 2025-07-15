import React from "react";
import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = () => {
  const path = useLocation()
  const navigate = useNavigate();

  const navHome = () => {
    navigate("/");
  };
  const jobs_applied = () => {
    navigate("/jobs_applied");
  };
  const jobs_interviewing = () => {
    navigate("/jobs_interviewing");
  };
  const jobs_offered = () => {
    navigate("/jobs_offered");
  };
  const jobs_rejected = () => {
    navigate("/jobs_rejected");
  };

  return (
    <div className="sidebar">
      <section className="sidebar_content">
        <nav onClick={jobs_applied}>Jobs Applied</nav>
        <nav onClick={jobs_interviewing}>Interviewing</nav>
        <nav onClick={jobs_offered}>Offered</nav>
        <nav style={{ border: "none" }} onClick={jobs_rejected}>Rejected</nav>
        {path.pathname !== "/" && <nav onClick={navHome}>Home</nav>}
      </section>
    </div>
  );
};

export default Sidebar;
