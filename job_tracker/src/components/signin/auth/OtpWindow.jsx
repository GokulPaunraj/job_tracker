import { useState } from "react";
import "./otpWindow.css";

import axios from "axios";

const OtpWindow = ({ setotpWindow, setis_signin }) => {
  const [passwordResetWindow, setpasswordResetWindow] = useState(false);
  const [otp, setotp] = useState("");
  const [userNameOTP, setuserNameOTP] = useState("");
  const [enterOTP, setenterOTP] = useState(false);
  const [usernameWindow, setusernameWindow] = useState(true);
  const [timeLeft, settimeLeft] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [reEnterNewPassword, setreEnterNewPassword] = useState("");

  function SendOTP() {
    axios
      .post("http://localhost:5000/send/otp", { userNameOTP })
      .then((res) => {
        if (res.data === "something went wrong! Try again") {
          alert(res.data);
        } else if (res.data === "user not found!") {
          alert(res.data);
        } else {
          alert(res.data.text);
          setenterOTP(true);
          setusernameWindow(false);
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
  function handleSubmit(e) {
    e.preventDefault();
    SendOTP();
  }
  function handleCancel() {
    setotpWindow(false);
    setis_signin(true);
    setuserNameOTP("");
  }

  function handleSubmitOTP(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/verify/reset_otp", { userNameOTP, otp })
      .then((res) => {
        if (res.data === "success") {
          alert("Verified");
          setpasswordResetWindow(true);
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
    setotpWindow(false);
    setis_signin(true);
    setenterOTP(false);
  }

  function handleSubmitNewPassword(e) {
    e.preventDefault();
    if (newPassword === reEnterNewPassword) {
      axios
        .post("http://localhost:5000/reset/newpassword", {
          userNameOTP,
          newPassword,
        })
        .then((res) => {
          if (res.data) {
            alert(res.data);
            setis_signin(true)
            setotpWindow(false)
          }
        })
        .catch((err) => {
          alert("Something went wrong. Try again!");
        });
    } else {
      alert("Password did not match");
      setreEnterNewPassword("");
    }
  }

  function handleCancelNewPassword() {
    setpasswordResetWindow(false);
    setis_signin(true);
    setnewPassword("");
    setreEnterNewPassword("");
    setotpWindow(false);
  }

  return (
    <section className="otpWindow_popup">
      {usernameWindow && (
        <div className="otpWindow_content card">
          <h1>Verify Email</h1>
          <p>Job Tracker</p>
          <form className="otpForm" onSubmit={(e) => handleSubmit(e)}>
            <span className="formField">
              <label htmlFor="otp">Enter Username</label>
              <input
                id="userNameOTP"
                value={userNameOTP}
                onChange={(e) => {
                  setuserNameOTP(e.target.value);
                }}
                autoComplete="otp"
                required
              />
            </span>
            <span className="otp_btn">
              <button className="btn" type="submit">
                Submit
              </button>
              <button
                className="btn"
                onClick={(e) => {
                  handleCancel(e);
                }}
              >
                Cancel
              </button>
            </span>
          </form>
        </div>
      )}
      {enterOTP && (
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
      )}
      {passwordResetWindow && (
          <div className="otpWindow_content card">
            <h1>Reset Password</h1>
            <p>Job Tracker</p>
            <form
              className="otpForm"
              onSubmit={(e) => handleSubmitNewPassword(e)}
            >
              <span className="formField">
                <label htmlFor="newPassword">New Password</label>
                <input
                  id="newPassword"
                  value={newPassword}
                  onChange={(e) => {
                    setnewPassword(e.target.value);
                  }}
                  autoComplete="otp"
                  required
                />
              </span>
              <span className="formField">
                <label htmlFor="reEnterNewPassword">Re-enter Password</label>
                <input
                  id="reEnterNewPassword"
                  value={reEnterNewPassword}
                  onChange={(e) => {
                    setreEnterNewPassword(e.target.value);
                  }}
                  autoComplete="otp"
                  required
                />
              </span>
              <span className="otp_btn">
                <button className="btn" type="submit">
                  Verify
                </button>
                <button
                  className="btn"
                  onClick={(e) => {
                    handleCancelNewPassword(e);
                  }}
                >
                  Cancel
                </button>
              </span>
            </form>
          </div>
      )}
    </section>
  );
};

export default OtpWindow;
