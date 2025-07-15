import "./signup.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = ({data,userName, password, setuserName, setpassword, email, setemail }) => {

  const navigate = useNavigate()

  async function handleSubmit(e) {
    e.preventDefault();

    let jobs_applied, jobs_interviewing, jobs_offered, jobs_rejected = [{}]

    try {
      await axios.post("http://localhost:5000/new_user/signup/",{ userName, password, email, jobs_applied,jobs_interviewing,jobs_offered,jobs_rejected})
                 .then((res)=>{
                    if(res.data === "success"){
                      alert("Hurray! You have successfully signed up")
                      localStorage.setItem("userName",userName)
                      navigate("/user/signin")
                    }
                    else if (res.data === "exist"){
                      alert("Username exist. Try a different one")
                    }
                 })
                 .catch((err)=>{alert(err + "--signup")})
    } 
    catch (err) {
      console.log(err);
    }

    setuserName("");
    setpassword("");
    setemail("");
    
  }
  return (
    <section className="signup_popup" >
      <div className="signup_content card">
        <h1>SignUp</h1>
        <p>Job Tracker</p>
        <form className="signupForm" onSubmit={(e) => handleSubmit(e)}>
          <span className="formField">
            <label htmlFor="userName">Username</label>
            <input
              id="userName"
              placeholder="eg : pikachu007"
              value={userName}
              onChange={(e) => {
                setuserName(e.target.value);
              }}
              required
            />
          </span>
          <span className="formField">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="eg : Wifi-87654321"
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
              value={email}
              onChange={(e) => {
                setemail(e.target.value);
              }}
              required
            />
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit">SignUp</button>
          </span>
        </form>
        <div>Continue with Google</div>
        <div style={{ fontSize: "0.7em", margin: "1em" }}>
          Already have an account?{" "}
          <span
            style={{ color: "var(--default_color)", cursor: "pointer" }}
            onClick={() => {
              navigate("/user/signin")
            }}
          >
            Sign In
          </span>
        </div>
      </div>
    </section>
  );
};

export default Signup;
