import "./listing_page.css";

import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import EditEentry  from "./edit_entry";
import axios from "axios"

import { LiaPencilAltSolid } from "react-icons/lia";
import { LiaTimesCircleSolid } from "react-icons/lia";


import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";

const Listing_page = ({ data, setdata,setis_signin, setnewEntry }) => {
  let [page, setpage] = useState("");
  let [search, setsearch] = useState("");
  let [edit_entry,setedit_entry] = useState([])
  let [editing,setediting] = useState(false)

  const editRef = useRef()

  const path = useLocation();

  useEffect(() => {
    let pageTitle = path.pathname.split("/").pop();
    setpage(pageTitle);

  }, [data, path.pathname]);

  let required_data = ((data ? data["jobs_list"].length : 0) ? data["jobs_list"].filter((datum)=>(datum["status"]===page)) : [] );

  const handleEdit = (id)=>{
    setedit_entry((data ? data["jobs_list"].length : 0) ? data["jobs_list"].filter((datum)=>(datum["id"]=== id)) : [] );
  }

  useEffect(()=>{
    const handleClick = (e)=>{
        if(!editRef.current.contains(e.target)){
            setedit_entry([])
            setediting(false)
        }
    }
    if (editing){
      document.addEventListener("mousedown",handleClick)
    }

    return ()=>{
      document.removeEventListener("mousedown",handleClick)
    }
  },[editing])

  function handleDelete(e,id) {
    e.preventDefault();

    try {
      if (data){
          let username = data["username"];
          let other_entries = (data["jobs_list"].length) ? data["jobs_list"].filter((datum)=>(datum["id"] !== id)):[]
    
          let new_list = [...other_entries]

            axios
              .post("http://localhost:5000/update/jobs_list", {
                username,
                new_list,
              })
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
    <div>
      {/* <p>"This is gonna be beautiful :)" </p> */}

      <Header setis_signin={setis_signin} setnewEntry={setnewEntry} />
      <Sidebar />
      <div className="main_content">
        {/* Cards section */}
        <div className="list_header">
          <h1 className="page_title">
            {page.split("_").join(" ").toUpperCase()}
          </h1>
          {page !== "news" && (
            <div className="searchbar">
              <input
                id="searchbar"
                placeholder="Search"
                value={search}
                onChange={(e) => setsearch(e.target.value)}
              />
            </div>
          )}
        </div>
        <div className="container">
          <div className="news_container2">
            {page === "news" &&
              required_data &&
              required_data.map((datum) => <p>{datum.news}</p>)}
          </div>
          <div className="list_container">
            {page !== "news" &&
              required_data &&
              required_data.map((datum) => (
                <section className="list">
                  <div className="list_content card">
                      <p>
                        <span style={{ fontWeight: "700" }}>Company : </span>
                        {datum.companyName}
                      </p>
                      <p>
                        <span style={{ fontWeight: "700" }}>Role : </span>
                        {datum.role}
                      </p>
                      <p>
                        <span style={{ fontWeight: "700" }}>CTC : </span>
                        {datum.ctc}
                      </p>
                      <p>
                        <span style={{ fontWeight: "700" }}>Date : </span>
                        {datum.date}
                      </p>
                  </div>
                  <div className="list_buttons">
                      <span onClick={()=>{handleEdit(datum.id);setediting(true)}}><LiaPencilAltSolid /></span>
                      <span onClick={(e)=>{handleDelete(e,datum.id)}}><LiaTimesCircleSolid /></span>
                  </div>
                </section>
              ))}
          </div>
        </div>
      </div>
      {editing && <EditEentry data={data} setdata = {setdata} edit_entry={edit_entry} editRef={editRef} setediting={setediting}/>}
    </div>
  );
};

export default Listing_page;
