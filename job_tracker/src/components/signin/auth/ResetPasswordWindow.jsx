import { useState } from 'react';
import './resetPasswordWindow.css'

const ResetPasswordWindow = ({setpasswordResetWindow,passwordResetRef,setis_signin,setotpWindow,userName}) => {
  const [newPassword,setnewPassword] = useState("")
  const [reEnterNewPassword,setreEnterNewPassword] = useState("")
 
     function handleSubmit(e) {
         e.preventDefault();
     } 

     function handleCancel(){
         setpasswordResetWindow(false)
         setotpWindow(false)
         setis_signin(true)
     }
 
     return (
         <section className="passwordResetWindow_popup" ref={passwordResetRef}>
         <div className="passwordResetWindow_content card">
             <h1>Verify Email</h1>
             <p>Job Tracker</p>
             <form className="passwordResetForm" onSubmit={(e) => handleSubmit(e)}>
             <span className="formField">
                 <label htmlFor="newPassword">New Password</label>
                 <input
                 id="newPassword"
                 value={newPassword}
                 onChange={(e) => {
                     setnewPassword(e.target.value);
                 }}
                 autoComplete="otp"
                 // required
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
                 // required
                 />
             </span>
             <span className='passwordReset_btn'>
                 <button className="btn" type="submit">Verify</button>
                 <button className="btn" onClick={(e)=>{handleCancel(e)}}>Cancel</button>
             </span>
             </form>
         </div>
         </section>
     );
}

export default ResetPasswordWindow