  import { useState } from "react";
import "./signin.css";
import { useNavigate } from "react-router-dom";

const Signin = ({ data,  userName, password, setuserName, setpassword }) => {

  const navigate = useNavigate();

  const [usernameInput,setusernameInput] = useState("")

  function handleSubmit(e) {
    e.preventDefault();
    setuserName(usernameInput)
    localStorage.setItem("userName",usernameInput)
    navigate("/")
  } 

  return (
    <section className="signin_popup" >
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
              required
            />
          </span>
          <span className="formField">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="eg : 3333333"
              value={password}
              onChange={(e) => {
                setpassword(e.target.value);
              }}
              required
            />
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">SignIn</button>
          </span>
        </form>
        <div>Continue with Google</div>
        <div style={{ fontSize: "0.7em", margin: "1em" }}>
          Don't have an account?{" "}
          <span
            style={{ color: "var(--default_color)", cursor: "pointer" }}
            onClick={() => {
              navigate("/new_user/signup");
            }}
          >
            Sign Up
          </span>
        </div>
      </div>
    </section>
  );
};

export default Signin;
