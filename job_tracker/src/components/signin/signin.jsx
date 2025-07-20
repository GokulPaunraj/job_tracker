import { useState } from "react";
import "./signin.css";

import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

import axios from 'axios'

const Signin = ({ setdata, password, setuserName, setpassword, signinRef, setis_signin, setis_signup }) => {

  let [usernameInput,setusernameInput] = useState("")
  let [passwordInput,setpasswordInput] = useState("")
  let [show_password,setshow_password] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();

    const fetch = () => {
      try {
        axios
          .post("http://localhost:5000/user/signin", { usernameInput,passwordInput })
          .then((res) => {
            if (res.data === "User not found!") {
              alert(res.data);
              localStorage.removeItem("userName");
              setpassword("")
              setuserName("")
              setis_signup(true);
            } 
            else if(res.data === "wrong password") {
              alert(res.data);
              localStorage.removeItem("userName");
              setpassword("")
            }
            else{
              setdata(res.data.data);
              setuserName(usernameInput)
              setpassword(passwordInput)
              localStorage.setItem("userName",usernameInput)
              setis_signin(false)
            }
          })
          .catch((err) => {
            alert(err);
          });
      } catch (err) {
        alert(err);
      }
    };
    if (usernameInput) {
      fetch();
    }
  } 

  return (
    <section className="signin_popup" ref={signinRef}>
      <div className="signin_content card">
        <h1>SignIn</h1>
        <p>Job Tracker</p>
        <form className="signinForm" onSubmit={(e) => handleSubmit(e)}>
          <span className="formField">
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              placeholder="eg : smileKiller123"
              value={usernameInput}
              onChange={(e) => {
                setusernameInput(e.target.value);
              }}
              autoComplete="username"
              required
            />
          </span>
          <span className="formField">
            <label htmlFor="password">Password</label>
            <div className="password_field">
              <input
                id="password"
                type={show_password ? "text" : "password"}
                placeholder="eg : 3333333"
                autoComplete="current-password"
                value={passwordInput}
                onChange={(e) => {
                  setpasswordInput(e.target.value);
                }}
                required
              />
              {show_password ? <VscEye onClick={()=>{setshow_password(false)}}/> : <VscEyeClosed onClick={()=>{setshow_password(true)}}/>}
            </div>
            <label htmlFor="password" className="forgot_password">Forgot Password ?</label>
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn" type="submit">SignIn</button>
          </span>
        </form>
        <span className="bottom">
        <div>Continue with Google</div>
        <span>
          Don't have an account?{" "}
          <span
            style={{ color: "var(--default_color)", cursor: "pointer" }}
            onClick={() => {
              setis_signup(true);
              setis_signin(false)
            }}
          >
            Sign Up
          </span>
        </span>
        </span>
      </div>
    </section>
  );
};

export default Signin;
