import "./sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

const Sidebar = ({ setdata, sidebar, setsidebar, siderbarRef }) => {
  const path = useLocation();
  const navigate = useNavigate();

  const navHome = () => {
    navigate("/");
    setsidebar(false);
  };
  const jobs_applied = () => {
    navigate("/jobs_applied");
    setsidebar(false);
  };
  const jobs_interviewing = () => {
    navigate("/jobs_interviewing");
    setsidebar(false);
  };
  const jobs_offered = () => {
    navigate("/jobs_offered");
    setsidebar(false);
  };
  const jobs_rejected = () => {
    navigate("/jobs_rejected");
    setsidebar(false);
  };

  const handleLogout = () => {
    setdata(null);
    localStorage.removeItem("userName");
    window.location.reload();
  };

  return (
    <aside className={`sidebar ${sidebar ? "active" : ""}`} ref={siderbarRef}>
      <section className="sidebar_content">
        <nav onClick={jobs_applied}>Jobs Applied</nav>
        <nav onClick={jobs_interviewing}>Upcoming Interviews</nav>
        <nav onClick={jobs_offered}>Offered</nav>
        <nav onClick={jobs_rejected}>Rejected</nav>
        {path.pathname !== "/" && <nav onClick={navHome}>Home</nav>}
        <nav onClick={handleLogout}>Log out</nav>
      </section>
    </aside>
  );
};

export default Sidebar;
