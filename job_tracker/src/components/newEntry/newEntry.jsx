import { useState } from "react";
import "./newEntry.css";
import axios from "axios";

const NewEntry = ({ data, newEntryRef, setnewEntry }) => {
  const [companyName, setcompanyName] = useState("");
  const [role, setrole] = useState("");
  const [ctc, setctc] = useState("");
  const [date, setdate] = useState("");
  const [status, setstatus] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      
      let username = data ? data["username"] : localStorage.getItem("userName");
      let new_entry = {
        id: (data ? data["jobs_list"].length : 0),
        companyName: companyName,
        role: role,
        ctc: ctc,
        date: date,
        status:status
      };
      let new_list = data ? [...data["jobs_list"],new_entry] : [new_entry]
      let new_history_list = data ? [...data["jobs_history"],new_entry] : [new_entry]

      await  axios
          .post("http://localhost:5000/update/jobs_list", {
            username,
            new_list,
          })
          .then((res) => {
            if (res.data === "success") {
              console.log("success");
            } else {
              console.log("failed");
            }
          })
          .catch((err) => {
            console.log(err);
          });

      await axios
          .post("http://localhost:5000/update/jobs_history", {
            username,
            new_history_list,
          })
          .then((res) => {
            if (res.data === "success") {
              console.log("success--history");
            } else {
              console.log("failed");
            }
          })
          .catch((err) => {
            console.log(err);
          });
    } catch (err) {
      console.log(err);
    }

    setdate(null)
    window.location.reload()

  }
  return (
    <section className="newEntry_popup" ref={newEntryRef}>
      <div className="newEntry_content card">
        <h1>Create New</h1>
        <form
          className="newEntryForm"
          onSubmit={(e) => {
            handleSubmit(e);
          }}
        >
          <span className="formField">
            <label htmlFor="companyName">Company Name</label>
            <input
              id="companyName"
              type="text"
              placeholder="eg : TCS"
              value={companyName}
              onChange={(e) => {
                setcompanyName(e.target.value);
              }}
              required
            />
          </span>
          <span className="formField">
            <label htmlFor="role">Role</label>
            <input
              id="role"
              type="text"
              placeholder="eg : Web dev"
              value={role}
              onChange={(e) => {
                setrole(e.target.value);
              }}
              required
            />
          </span>
          <span className="formField">
            <label htmlFor="ctc">CTC</label>
            <input
              id="ctc"
              type="text"
              placeholder="eg : 600000"
              value={ctc}
              onChange={(e) => {
                setctc(e.target.value);
              }}
              required
            />
          </span>
          <span className="formField">
            <label htmlFor="date">Date</label>
            <input
              id="date"
              type="date"
              value={date}
              onChange={(e) => {
                setdate(e.target.value);
              }}
              required
            />
          </span>
          <span className="formField">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              value={status}
              onChange={(e) => {
                setstatus(e.target.value);
              }}
              required
            >
              <option value="">--Choose--</option>
              <option value="jobs_applied">Applied</option>
              <option value="jobs_interviewing">Interviewing</option>
              <option value="jobs_offered">Offered</option>
              <option value="jobs_rejected">Rejected</option>
            </select>
          </span>
          <span style={{ display: "flex", justifyContent: "center" }}>
            <button type="submit" className="btn">Create</button>
          </span>
        </form>
      </div>
    </section>
  );
};

export default NewEntry;
