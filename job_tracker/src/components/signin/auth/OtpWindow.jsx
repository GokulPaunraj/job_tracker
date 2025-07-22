import { useState } from "react";
import "./otpWindow.css";

import axios from "axios";

const OtpWindow = ({
  setotpWindow,
  setis_signin,
  userName,
  setpasswordResetWindow,
}) => {
  const [otp, setotp] = useState("");
  const [userNameOTP, setuserNameOTP] = useState("");
  const [enterOTP, setenterOTP] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/send/otp", { userNameOTP })
      .then((res) => {
        if (res.data === "something went wrong! Try again") {
          alert(res.data);
        } else if (res.data === "user not found!") {
          alert(res.data);
        } else {
          alert(res.data)
          setenterOTP(true);
        }
      })
      .catch((err) => {
        alert("someting went wrong! Try again");
      });
  }
  function handleCancel() {
    setotpWindow(false);
    setis_signin(true);
  }

  function handleSubmitOTP(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/verify/reset_otp", { userNameOTP, otp })
      .then((res) => {
        if (res.data === "success") {
          alert('Verified')
          setpasswordResetWindow(true);
        }
        else if (res.data === "Wrong OTP!" || res.data === "OTP expired" || res.data === "User not found!" || res.data === 'something went wrong! Try again') {
          alert(res.data)
        }
      });
  }
  function handleResendOtp(e) {
    e.preventDefault();
    axios.post("http://localhost:5000/send/otp", { userNameOTP }).then();
  }
  function handleCancelOTP() {
    setotpWindow(false);
    setis_signin(true);
  }

  return (
    <section className="otpWindow_popup">
      {!enterOTP && (
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
                <span>2:14</span>
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
    </section>
  );
};

export default OtpWindow;
