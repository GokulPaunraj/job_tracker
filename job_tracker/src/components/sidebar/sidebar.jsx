import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ setdata }) => {
  const path = useLocation();
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

  const handleLogout = () => {
    setdata(null);
    localStorage.removeItem("userName");
    window.location.reload();
  };

  return (
    <div className="sidebar">
      <section className="sidebar_content">
        <nav onClick={jobs_applied}>Jobs Applied</nav>
        <nav onClick={jobs_interviewing}>Upcoming Interviews</nav>
        <nav onClick={jobs_offered}>Offered</nav>
        <nav onClick={jobs_rejected}>Rejected</nav>
        {path.pathname !== "/" && <nav onClick={navHome}>Home</nav>}
        <nav
          style={{
            flexGrow: "1",
            position: "absolute",
            bottom: "1rem",
            width: "70%",
          }}
          onClick={handleLogout}
        >
          Log out
        </nav>
      </section>
    </div>
  );
};

export default Sidebar;
