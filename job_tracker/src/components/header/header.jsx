import "./header.css";
import { BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";

const Header = ({data, setis_signin,setnewEntry, sidebar, setsidebar, hamburgerMenuRef}) => {

  const new_entry = () => {setnewEntry(true)}
  const signin = () => {setis_signin(true)}

  return (
    <header className="header">
      <div className="header_content">
        <div className="header_nav hamburger_icon" ref={hamburgerMenuRef}><RxHamburgerMenu onClick={()=>{setsidebar(!sidebar)}}/></div>
        <h1 className="title">Job Tracker</h1>
        <nav className="header_nav"><span className="new_entry" onClick={new_entry}><BsPlusLg /></span></nav>
        <nav className="header_nav" onClick={signin}>{data? data.username.slice(0,15) : 'Signin'}</nav>
      </div>
    </header>
  );
};

export default Header;
