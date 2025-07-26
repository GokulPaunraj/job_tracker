import { useState } from "react";
import "./signin.css";

import {auth, googleAuthProvider} from '../../firebase/firebaseConfig'
import { signInWithPopup } from "firebase/auth";

import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";

import axios from 'axios'

const Signin = ({ setdata, setuserName, setEmail, setpassword, signinRef, setis_signin, setis_signup, setotpWindow }) => {

  let [emailInput,setemailInput] = useState("")
  let [passwordInput,setpasswordInput] = useState("")
  let [show_password,setshow_password] = useState(false)

  function handleSubmit(e) {
    e.preventDefault();

    const fetch = () => {
      try {
        axios
          .post("https://job-tracker-xnm0.onrender.com/user/signin", { emailInput,passwordInput })
          .then((res) => {
            if (res.data === "User not found!") {
              alert(res.data);
              localStorage.removeItem("jwtToken");
              setpassword("")
              setuserName("")
              setEmail("")
              setis_signup(true);
            } 
            else if(res.data === "wrong password") {
              alert(res.data);
              localStorage.removeItem("jwtToken");
              setpassword("")
            }
            else{
              setdata(res.data.data);
              setuserName(res.data.data.email)
              setEmail(emailInput)
              setpassword(passwordInput)
              localStorage.setItem('jwtToken',res.data.token)
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
    if (emailInput) {
      fetch();
    }
  } 

  function handleForgotPassword(){
    setotpWindow(true)
    setis_signin(false)
  }

  async function signinWithGoogle(){
    try{
      const result = await signInWithPopup(auth,googleAuthProvider)
      let user = result.user
      let googleEmail = user.email
      await axios
          .post("https://job-tracker-xnm0.onrender.com/user/google_signin", { googleEmail })
          .then((res) => {
            if (res.data === "User not found!") {
              alert(res.data);
              localStorage.removeItem("jwtToken");
              setpassword("")
              setuserName("")
              setEmail("")
              setis_signup(true);
            } 
            else{
              alert("Signin successful!")
              setdata(res.data.data);
              setuserName(res.data.data.email)
              setEmail(googleEmail)
              localStorage.setItem('jwtToken',res.data.token)
              setis_signin(false)
            }
          })
          .catch((err) => {
            alert(err);
          });
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <section className="signin_popup" ref={signinRef}>
      <div className="signin_content card">
        <h1>SignIn</h1>
        <p>Job Tracker</p>
        <form className="signinForm" onSubmit={(e) => handleSubmit(e)}>
          <span className="formField">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              placeholder="eg : you@you.com"
              type="email"
              value={emailInput}
              onChange={(e) => {
                setemailInput(e.target.value);
              }}
              autoComplete="email"
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
            <label htmlFor="password" className="forgot_password" onClick={()=>{handleForgotPassword()}}>Forgot Password ?</label>
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            <button className="btn" type="submit">SignIn</button>
          </span>
        </form>
        <span className="bottom">
        <div onClick={()=>{signinWithGoogle()}}>Continue with Google</div>
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
