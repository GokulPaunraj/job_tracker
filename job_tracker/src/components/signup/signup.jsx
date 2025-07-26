import { useState } from "react";
import "./signup.css";
import "./auth/otpWindow.css"

import {auth, googleAuthProvider} from '../../firebase/firebaseConfig'
import { signInWithPopup } from "firebase/auth";

import axios from "axios";

const Signup = ({password, setuserName, setpassword, Email, setEmail, setis_signin, signupRef, setis_signup}) => {

  let [user,setuser] = useState('')
  const [otp, setotp] = useState("");
  const [enterOTP, setenterOTP] = useState(false);
  const [timeLeft, settimeLeft] = useState("");

  let googleUser = null
  let googleEmail = null

  function handleSubmit(e) {
    e.preventDefault();
    SendOTP()
  }

  function SendOTP(){
    let email = Email
    axios
      .post("https://job-tracker-xnm0.onrender.com/send/signup_otp", { email })
      .then((res) => {
        if (res.data === "something went wrong! Try again") {
          alert(res.data);
        } else if (res.data === "user not found!" || res.data === "User already exist!") {
          alert(res.data);
        } else {
          alert(res.data.text);
          setenterOTP(true);
          const interval = setInterval(() => {
            let timeLeft = Math.max(
              0,
              Math.floor((new Date(res.data.expiry) - new Date()) / 1000)
            );
            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;
            if (timeLeft <= 0) {
              settimeLeft("0:00");
              clearInterval(interval);
            } else {
              let time = `${minutes}:${seconds}`;
              settimeLeft(time);
            }
          }, 500);
        }
      })
      .catch((err) => {
        alert("someting went wrong! Try again");
      });
  }

  function handleSubmitOTP(e) {
    e.preventDefault();
    let email = Email
    axios
      .post("https://job-tracker-xnm0.onrender.com/verify/otp_signup", {email,otp})
      .then((res) => {
        if (res.data === "success") {
          alert("Verified");
          createUser()
          setenterOTP(false);
        } else if (
          res.data === "Wrong OTP!" ||
          res.data === "OTP expired" ||
          res.data === "User not found!" ||
          res.data === "something went wrong! Try again"
        ) {
          alert(res.data);
        }
      });
  }
  function handleResendOtp(e) {
    e.preventDefault();
    SendOTP();
  }
  function handleCancelOTP() {
    setis_signin(true);
    setenterOTP(false);
  }

  function createUser(){
    let username = googleUser ? googleUser : user;
    let email = googleEmail ? googleEmail : Email;
    let jobs_list = []
    let jobs_history = []
    let passwordResetOtp = 987956
    let passwordResetOtpExpiry = new Date()

    try {
        axios.post("https://job-tracker-xnm0.onrender.com/new_user/signup/",{ username, password, email, jobs_list,jobs_history,passwordResetOtp,passwordResetOtpExpiry})
                 .then((res)=>{
                    if(res.data.text === "success"){
                      alert("Hurray! You have successfully signed up")
                      let token = res.data.token
                      localStorage.setItem('jwtToken',token)
                      setuserName(user)
                      setEmail(email)
                      googleUser = null
                      googleEmail = null
                      setis_signup(false)
                    }
                    else{
                      alert(res.data)
                      localStorage.removeItem('jwtToken')
                    }
                 })
                 .catch((err)=>{
                  alert(err)
                })
    } 
    catch (err) {
      console.log(err);
    }

    setuser('')
    setpassword("");
    window.location.reload()
  }

  async function signupWithGoogle(){
    try{
      const result = await signInWithPopup(auth,googleAuthProvider)
      let user = result.user
      googleUser = user.displayName
      googleEmail = user.email
      createUser()
    }
    catch(err){
      console.log(err)
    }
  }

  return (
    <div>
    {!enterOTP &&
      <section className="signup_popup" ref={signupRef}>
        <div className="signup_content card">
          <h1>SignUp</h1>
          <p>Job Tracker</p>
          <form className="signupForm" onSubmit={(e) => handleSubmit(e)}>
            <span className="formField">
              <label htmlFor="userName">Username</label>
              <input
                id="userName"
                placeholder="eg : pikachu007"
                value={user}
                onChange={(e) => {
                  setuser(e.target.value);
                }}
                autoComplete="username"
                required
              />
            </span>
            <span className="formField">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="eg : Wifi-87654321"
                autoComplete="new-password"
                value={password}
                onChange={(e) => {
                  setpassword(e.target.value);
                }}
                required
              />
            </span>
            <span className="formField">
              <label htmlFor="email">E-mail</label>
              <input
                id="email"
                type="email"
                placeholder="eg : you@gmail.com"
                value={Email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                autoComplete="email"
                required
              />
            </span>
            <span style={{ display: "flex", justifyContent: "center" }}>
              <button className="btn" type="submit">SignUp</button>
            </span>
          </form>
          <span className="bottom">
          <div onClick={()=>{signupWithGoogle()}}>Continue with Google</div>
          <div style={{ fontSize: "0.7em", margin: "1em" }}>
            Already have an account?{" "}
            <span
              style={{ color: "var(--default_color)", cursor: "pointer" }}
              onClick={() => {
                setis_signin(true);
                setis_signup(false)
              }}
            >
              Sign In
            </span>
          </div>
          </span>
        </div>
      </section>
    }
      {enterOTP && (
        <section className="otpWindow_popup" ref={signupRef}>
          <div className="otpWindow_content card">
            <h1>Verify Email</h1>
            <p>Job Tracker</p>
            <form className="otpForm" onSubmit={(e) => handleSubmitOTP(e)}>
              <span className="formField">
                <label htmlFor="otp">OTP</label>
                <input
                  id="otp"
                  value={otp}
                  onChange={(e) => {
                    setotp(e.target.value);
                  }}
                  autoComplete="otp"
                  required
                />
              </span>
              <span className="formField">
                <div
                  className="resendOtp"
                  onClick={(e) => {
                    handleResendOtp(e);
                  }}
                >
                  <p>Resend OTP ?</p>
                  <span>{timeLeft}</span>
                </div>
              </span>
              <span className="otp_btn">
                <button className="btn" type="submit">
                  Verify
                </button>
                <button
                  className="btn"
                  onClick={(e) => {
                    handleCancelOTP(e);
                  }}
                >
                  Cancel
                </button>
              </span>
            </form>
          </div>
        </section>
      )}
    </div>
  );
};

export default Signup;
