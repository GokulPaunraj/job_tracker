import React from "react";
import "./header.css";
import { BsPlusLg } from "react-icons/bs";

const Header = ({setis_signin,setnewEntry}) => {

  const new_entry = () => {setnewEntry(true)}
  const signin = () => {setis_signin(true)}

  return (
    <header className="header">
      <div className="header_content">
        <h1 className="title">Job Tracker</h1>
        <nav className="header_nav"><span className="new_entry" onClick={new_entry}><BsPlusLg /></span></nav>
        <nav className="header_nav" onClick={signin}>Signin</nav>
      </div>
    </header>
  );
};

export default Header;
