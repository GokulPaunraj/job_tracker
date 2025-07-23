import { useEffect, useState } from "react";
import axios from "axios";

const EditEntry = ({data,setdata, edit_entry,editRef,setediting}) => {
 const [companyName, setcompanyName] = useState("");
  const [role, setrole] = useState("");
  const [ctc, setctc] = useState("");
  const [date, setdate] = useState("");
  const [status, setstatus] = useState("");

  useEffect(() => {
    if (edit_entry ) {
        setcompanyName(edit_entry[0].companyName);
        setrole(edit_entry[0].role);
        setctc(edit_entry[0].ctc);
        setdate(edit_entry[0].date);
        setstatus(edit_entry[0].status);
    }
  }, [edit_entry]);

  function handleSubmit(e) {
    e.preventDefault();

    try {
      if (data){
          const token = localStorage.getItem('jwtToken')
          let new_entry = {
            id: edit_entry[0].id,
            companyName: companyName,
            role: role,
            ctc: ctc,
            date: date,
            status:status
          };
          let other_entries = (data["jobs_list"].length) ? data["jobs_list"].filter((datum)=>(datum["id"] !== edit_entry[0].id)):[]
    
          let new_list = [...other_entries,new_entry]

            axios
              .post("http://localhost:5000/update/jobs_list", {new_list},{headers:{Authorization:`Bearer ${token}`}})
              .then((res) => {
                if (res.data === "success") {
                  console.log(res.data);
                } else {
                  console.log("failed");
                }
              })
              .catch((err) => {
                console.log(err);
              });
      }
    } catch (err) {
      console.log(err);
    }
    setdata(null)
    window.location.reload()
  }
  
  return (
    <section className="newEntry_popup" ref={editRef}>
      <div className="newEntry_content card">
        <h1>Edit</h1>
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
            <button type="submit">Edit</button>
          </span>
        </form>
      </div>
    </section>
  );
};

export default EditEntry