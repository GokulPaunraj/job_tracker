import "./listing_page.css";

import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";

import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

const Listing_page = ({ data, setis_signin, setnewEntry }) => {
  let [page, setpage] = useState("");

  let [search, setsearch] = useState("");

  const path = useLocation();

  useEffect(() => {
    let pageTitle = path.pathname.split("/").pop();
    setpage(pageTitle);

  }, [data, path.pathname]);

  let required_data = ((data ? data["jobs_list"].length : 0) ? data["jobs_list"].filter((datum)=>(datum["status"]===page)) : [] );


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
                <section className="list card">
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
                </section>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Listing_page;
