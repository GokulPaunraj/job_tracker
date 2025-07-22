import "./App.css";

import { useEffect, useRef, useState } from "react";
import axios from "axios";

import Home from "./components/home/Home";
import ListingPage from "./components/listing_page/listing_page";
import Header from "./components/header/header";
import Sidebar from "./components/sidebar/sidebar";

//importing packages
import { Routes, Route, useNavigate } from "react-router-dom";
import Signin from "./components/signin/signin";
import OtpWindow from "./components/signin/auth/OtpWindow";
import Signup from "./components/signup/signup";
import NewEntry from "./components/newEntry/newEntry";

function App() {
  const [is_signin, setis_signin] = useState(false);
  const [is_signup, setis_signup] = useState(false);
  const [newEntry, setnewEntry] = useState(false);
  const [sidebar,setsidebar] = useState(false)
  const [data, setdata] = useState(null);
  let [otpWindow, setotpWindow] = useState(false);

  const signinRef = useRef();
  const signupRef = useRef();
  const newEntryRef = useRef();
  const siderbarRef = useRef();
  const hamburgerMenuRef = useRef();

  const [userName, setuserName] = useState(localStorage.getItem('userName'));
  const [password, setpassword] = useState('');
  const [email, setemail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const fetch = async () => {
      try {
        await axios
          .post("http://localhost:5000/", { userName })
          .then((res) => {
            if (res.data !== "User not found!") {
              setdata(res.data.data);
            } else {
              localStorage.removeItem("userName");
              console.log("found it")
              setis_signup(true);
            }
          })
          .catch((err) => {
            alert(err);
          });
      } catch (err) {
        alert(err);
      }
    };
    if (userName && !data) {
      fetch();
    } else if (!localStorage.getItem("userName")) {
      setis_signin(true);
    }
  }, [userName, navigate, data, setdata]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!signinRef.current.contains(e.target)) {
        setis_signin(false);
      }
    };
    if (is_signin) {
      document.addEventListener("mousedown", handleClick);
    }

    setuserName(localStorage.getItem("userName"));

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [is_signin]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!signupRef.current.contains(e.target)) {
        setis_signup(false);
      }
    };
    if (is_signup) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [is_signup]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!newEntryRef.current.contains(e.target)) {
        setnewEntry(false);
      }
    };
    if (newEntry) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [newEntry]);

  useEffect(() => {
    const handleClick = (e) => {
      if (!siderbarRef.current.contains(e.target) && !hamburgerMenuRef.current.contains(e.target)) {
        setsidebar(false);
      }
    };
    if (sidebar) {
      document.addEventListener("mousedown", handleClick);
    }

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [sidebar]);

  return (
    <div className="App">
      <Header setis_signin={setis_signin} setnewEntry={setnewEntry} sidebar={sidebar} setsidebar={setsidebar} hamburgerMenuRef={hamburgerMenuRef}/>
      <Sidebar setdata={setdata} sidebar={sidebar} setsidebar={setsidebar} siderbarRef = {siderbarRef} />
      {/* {POP UP} */}
      {newEntry && (
        <NewEntry
          data={data}
          newEntryRef={newEntryRef}
          setnewEntry={setnewEntry}
        />
      )}
      {is_signin && (
        <Signin
          setdata={setdata}
          userName={userName}
          password={password}
          setuserName={setuserName}
          setpassword={setpassword}
          signinRef={signinRef}
          setis_signin={setis_signin}
          setis_signup={setis_signup}
          setotpWindow={setotpWindow}
        />
      )}
      {otpWindow && (
        <OtpWindow
          setis_signin={setis_signin}
          setotpWindow={setotpWindow}
          otpWindow={otpWindow}
        />
      )}
      
      {is_signup && (
        <Signup
          signupRef={signupRef}
          setis_signin={setis_signin}
          setis_signup={setis_signup}
          data={data}
          userName={userName}
          password={password}
          email={email}
          setuserName={setuserName}
          setpassword={setpassword}
          setemail={setemail}
        />
      )}
      {/* Creating Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              setdata={setdata}
              userName={userName}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
              sidebar={sidebar}
              setsidebar={setsidebar}
              siderbarRef = {siderbarRef}
            />
          }
        />
        <Route
          path="/jobs_applied"
          element={
            <ListingPage
              data={data}
              setdata={setdata}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
              sidebar={sidebar}
              setsidebar={setsidebar}
              siderbarRef = {siderbarRef}
            />
          }
        />
        <Route
          path="/jobs_interviewing"
          element={
            <ListingPage
              data={data}
              setdata={setdata}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
              sidebar={sidebar}
              setsidebar={setsidebar}
              siderbarRef = {siderbarRef}
            />
          }
        />
        <Route
          path="/jobs_offered"
          element={
            <ListingPage
              data={data}
              setdata={setdata}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
              sidebar={sidebar}
              setsidebar={setsidebar}
              siderbarRef = {siderbarRef}
            />
          }
        />
        <Route
          path="/jobs_rejected"
          element={
            <ListingPage
              data={data}
              setdata={setdata}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
              sidebar={sidebar}
              setsidebar={setsidebar}
              siderbarRef = {siderbarRef}
            />
          }
        />
        <Route
          path="/interviews_this_month"
          element={
            <ListingPage
              data={data}
              setdata={setdata}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
              sidebar={sidebar}
              setsidebar={setsidebar}
              siderbarRef = {siderbarRef}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
