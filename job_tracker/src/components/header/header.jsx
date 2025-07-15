import React from "react";
import "./header.css";
import { BsPlusLg } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Header = ({setis_signin,setnewEntry}) => {
  const navigate = useNavigate()

  const new_entry = () => {navigate("/update/jobs_list")}
  const jobs = () => {navigate('/jobs')}
  const signin = () => {navigate('/user/signin')}

  return (
    <header className="header">
      <div className="header_content">
        <h1 className="title">Job Tracker</h1>
        <nav className="header_nav"><span className="new_entry" onClick={new_entry}><BsPlusLg /></span></nav>
        <nav className="header_nav" onClick={jobs}>Jobs</nav>
        <nav className="header_nav" onClick={signin}>Signin</nav>
      </div>
    </header>
  );
};

export default Header;
