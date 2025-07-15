import "./App.css";

import { useEffect, useRef, useState } from "react";

import Home from "./components/home/Home";
import ListingPage from "./components/listing_page/listing_page";

//importing packages
import { Routes, Route } from "react-router-dom";
import Signin from "./components/signin/signin";
import Signup from "./components/signup/signup";
import NewEntry from "./components/newEntry/newEntry";

function App() {
  const [is_signin, setis_signin] = useState(false);
  const [is_signup, setis_signup] = useState(false);
  const [newEntry, setnewEntry] = useState(false);
  const [data, setdata] = useState(null);

  const signinRef = useRef();
  const signupRef = useRef();
  const newEntryRef = useRef();

  const [userName, setuserName] = useState();
  const [password, setpassword] = useState(0);
  const [email, setemail] = useState("");

  useEffect(() => {
    const handleClick = (e) => {
      if (!signinRef.current.contains(e.target)) {
        setis_signin(false);
      }
    };
    if (is_signin) {
      document.addEventListener("mousedown", handleClick);
    }

    setuserName(localStorage.getItem("userName"))

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

  return (
    <div className="App">
      {/* {POP UP} */}

      {/* Creating Routes */}
      <Routes>
        <Route
          path="/"
          element={
            <Home
              data={data}
              setdata={setdata}
              userName = {userName}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
            />
          }
        />
        <Route
          path="/new_user/signup"
          element={
            <Signup
              signupRef={signupRef}
              setis_signin={setis_signin}
              setis_signup={setis_signup}
              data = {data}
              userName = {userName}
              password = {password}
              email= {email}
              setuserName = {setuserName}
              setpassword = {setpassword}
              setemail={setemail}
            />
          }
        />
        <Route
          path="/user/signin"
          element={
            <Signin
              setdata={setdata}
              userName = {userName}
              password = {password}
              setuserName = {setuserName}
              setpassword = {setpassword}
            />
          }
        />
        <Route path="/update/jobs_list" element={<NewEntry data={data} newEntryRef={newEntryRef} setnewEntry={setnewEntry} />} />
        <Route
          path="/jobs"
          element={
            <ListingPage
              data={data}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
            />
          }
        />
        <Route
          path="/jobs_applied"
          element={
            <ListingPage
              data={data}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
            />
          }
        />
        <Route
          path="/jobs_interviewing"
          element={
            <ListingPage
              data={data}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
            />
          }
        />
        <Route
          path="/jobs_offered"
          element={
            <ListingPage
              data={data}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
            />
          }
        />
        <Route
          path="/jobs_rejected"
          element={
            <ListingPage
              data={data}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
            />
          }
        />
        <Route
          path="/upcoming_interviews"
          element={
            <ListingPage
              data={data}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
            />
          }
        />
        <Route
          path="/news"
          element={
            <ListingPage
              data={data}
              setis_signin={setis_signin}
              setnewEntry={setnewEntry}
            />
          }
        />
      </Routes>
    </div>
  );
}

export default App;
