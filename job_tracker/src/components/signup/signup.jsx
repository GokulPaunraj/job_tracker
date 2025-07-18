import "./signup.css";
import axios from "axios";

const Signup = ({userName, password, setuserName, setpassword, email, setemail, setis_signin, signupRef, setis_signup}) => {

  async function handleSubmit(e) {
    e.preventDefault();

    let jobs_list = []
    let jobs_history = []

    try {
      await axios.post("http://localhost:5000/new_user/signup/",{ userName, password, email, jobs_list,jobs_history})
                 .then((res)=>{
                    if(res.data === "success"){
                      alert("Hurray! You have successfully signed up")
                      localStorage.setItem("userName",userName)
                      setis_signup(false)
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
              autoComplete="current-password"
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
            <button className="btn" type="submit">SignUp</button>
          </span>
        </form>
        <span className="bottom">
        <div>Continue with Google</div>
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
  );
};

export default Signup;
