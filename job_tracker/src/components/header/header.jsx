import "./header.css";
import { BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({setis_signin,setnewEntry, sidebar, setsidebar}) => {

  const new_entry = () => {setnewEntry(true)}
  const signin = () => {setis_signin(true)}

  return (
    <header className="header">
      <div className="header_content">
        <div className="header_nav hamburger_icon"><RxHamburgerMenu onClick={()=>{sidebar?setsidebar(false):setsidebar(true)}}/></div>
        <h1 className="title">Job Tracker</h1>
        <nav className="header_nav"><span className="new_entry" onClick={new_entry}><BsPlusLg /></span></nav>
        <nav className="header_nav" onClick={signin}>Signin</nav>
      </div>
    </header>
  );
};

export default Header;
