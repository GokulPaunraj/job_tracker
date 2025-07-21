import { useState } from 'react';
import './otpWindow.css'

const OtpWindow = ({setotpWindow,otpRef,setis_signin,userName,setpasswordResetWindow}) => {

    const [otp,setotp] = useState("")

    function SendOTP(){
        console.log("6459")
    }

    function handleSubmit(e) {
        e.preventDefault();
        setpasswordResetWindow(true)
    } 
    function handleResendOtp(e) {
        e.preventDefault();
        SendOTP()
    } 
    function handleCancel(){
        setotpWindow(false)
        setis_signin(true)
    }

    return (
        <section className="otpWindow_popup" ref={otpRef}>
        <div className="otpWindow_content card">
            <h1>Verify Email</h1>
            <p>Job Tracker</p>
            <form className="otpForm" onSubmit={(e) => handleSubmit(e)}>
            <span className="formField">
                <label htmlFor="otp">OTP</label>
                <input
                id="otp"
                value={otp}
                onChange={(e) => {
                    setotp(e.target.value);
                }}
                autoComplete="otp"
                // required
                />
            </span>
            <span className="formField">
                <div className="resendOtp" onClick={(e)=>{handleResendOtp(e)}}>
                    <p>Resend OTP ?</p>
                    <span>2:14</span>
                </div>

            </span>
            <span className='otp_btn'>
                <button className="btn" type="submit">Verify</button>
                <button className="btn" onClick={(e)=>{handleCancel(e)}}>Cancel</button>
            </span>
            </form>
        </div>
        </section>
    );
}

export default OtpWindow