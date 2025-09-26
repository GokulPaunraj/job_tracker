import "./Home.css";

//importing sections of the page
import Card from "../card/card";

import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { gsap } from "gsap";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.font.size = 20;
defaults.plugins.title.align = "center";
defaults.plugins.title.color = "black";

const Home = ({ data }) => {
  let graph_data = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
    11: 0,
    12: 0,
    13: 0,
    14: 0,
    15: 0,
    16: 0,
    17: 0,
    18: 0,
    19: 0,
    20: 0,
    21: 0,
    22: 0,
    23: 0,
    24: 0,
    25: 0,
    26: 0,
    27: 0,
    28: 0,
    29: 0,
    30: 0,
  };

  const navigate = useNavigate();

  let jobs_applied = (data ? data["jobs_list"].length : 0)
    ? data["jobs_list"].filter((datum) => datum["status"] === "jobs_applied")
    : [];
  let jobs_interviewing = (data ? data["jobs_list"].length : 0)
    ? data["jobs_list"].filter(
        (datum) => datum["status"] === "jobs_interviewing"
      )
    : [];
  let jobs_offered = (data ? data["jobs_list"].length : 0)
    ? data["jobs_list"].filter((datum) => datum["status"] === "jobs_offered")
    : [];
  let jobs_rejected = (data ? data["jobs_list"].length : 0)
    ? data["jobs_list"].filter((datum) => datum["status"] === "jobs_rejected")
    : [];

  let ctc_list = data ? data.jobs_list.map((job) => job.ctc) : [];

  let applied_dates = jobs_applied ? jobs_applied.map((job) => job.date) : [];

  let dates = applied_dates.filter((date) =>
    date
      ? date.split("-")[1] ===
        new Date().toISOString().split("T")[0].split("-")[1]
      : []
  );

  console.log(dates)
  console.log("data"+data)
  console.log("applied"+ jobs_applied)
  console.log("ad"+ applied_dates)

  let interviews_this_month = jobs_interviewing.filter((datum) =>
    datum
      ? datum.date.split("-")[1] ===
        new Date().toISOString().split("T")[0].split("-")[1]
      : []
  );

  let jobs_this_month = 0;
  dates.map((date) => {
    console.log(date)
    if (date != null) {
      jobs_this_month += 1;
      return (graph_data[
        date.split("-")[2].split("")[0] === "0"
          ? date.split("-")[2].split("")[1]
          : date.split("-")[2]
      ] += 1);
  }
  return []
  });

  function find_low_ctc() {
    let min = ctc_list[0];
    for (let i = 1; i < ctc_list.length; i++) {
      if (min > ctc_list[i]) {
        min = ctc_list[i];
      }
    }
    return min ? min : 0;
  }
  function find_high_ctc() {
    let max = ctc_list[0];
    for (let i = 1; i < ctc_list.length; i++) {
      if (max < ctc_list[i]) {
        max = ctc_list[i];
      }
    }
    return max ? max : 0;
  }

  let low_ctc = find_low_ctc();
  let high_ctc = find_high_ctc();

  const card_data = [
    { count: jobs_applied.length, status: "jobs applied" },
    { count: jobs_interviewing.length, status: "interviewing" },
    { count: jobs_offered.length, status: "job offers" },
    { count: jobs_rejected.length, status: "jobs rejected" },
  ];

  const interviews_this_month_nav = () => {
    navigate("/interviews_this_month");
  };

  let jobs_history_list = data ? data.jobs_history : [];

  useEffect(() => {
    //sidebar
    let sidebar = document.querySelector(".sidebar");
    let sbtl = gsap.timeline();
    sbtl.fromTo(sidebar, { x: -200 }, { x: 0, duration: 1 }, 0);

    //card container
    let cards = document.querySelectorAll(".cardAnim");
    cards.forEach((card) => {
      let ctl = gsap.timeline();
      ctl.fromTo(card, { scale: 0 }, { scale: 1, duration: 0.7 }, 0);
    });

    //chart
    let chart_container = document.querySelector(".chart_container");
    let chtl = gsap.timeline();
    chtl.fromTo(chart_container, { x: 200 }, { x: 0, duration: 1 }, 0);

    // bottom section
    let card1 = document.querySelector(".b_card1");
    let card2 = document.querySelector(".b_card2");
    let card3 = document.querySelector(".b_card3");

    let btl = gsap.timeline();
    btl
      .fromTo(card1, { y: 100 }, { y: 0, duration: 0.7 }, 0)
      .fromTo(card2, { y: 100 }, { y: 0, duration: 0.7 }, "-=0.6")
      .fromTo(card3, { y: 100 }, { y: 0, duration: 0.7 }, "-=0.6");
  }, [navigate]);

  return (
    <div>
      <div className="main_content">
        {/* Cards section */}
        <section className="card_container">
          {card_data.map((card_datum, index) => (
            <Card
              key={index}
              count={card_datum.count}
              text={card_datum.status}
            />
          ))}
        </section>

        {/* Chart */}
        <section className="chart_container">
          <div className="chart">
            <Line
              data={{
                labels: Object.keys(graph_data),
                datasets: [
                  {
                    label: "Number of jobs applied",
                    data: Object.values(graph_data),
                    backgroundColor: "#4380f8",
                    borderColor: "#4380f8",
                  },
                ],
              }}
              options={{
                elements: { line: { tension: 0.3 } },
                plugins: {
                  title: {
                    text: `Jobs Applied (${
                      new Date().toDateString().split(" ")[1]
                    })`,
                  },
                },
              }}
            />
          </div>
        </section>

        {/* bottom section  */}
        <section className="bottom_container">
          <section className="b_card1">
            <h2>{low_ctc}</h2>
            <p>Lowest CTC</p>
            <h2>{high_ctc}</h2>
            <p>Highest CTC</p>
          </section>

          <section className="b_card2 ">
            <h2>{jobs_history_list.length}</h2>
            <p>Total jobs (lifetime):</p>
            <h2>{jobs_this_month}</h2>
            <p>Jobs applied(this month):</p>
          </section>

          <section className="b_card3" onClick={interviews_this_month_nav}>
            <p>Interviews this month:</p>
            {interviews_this_month.length
              ? interviews_this_month.map((datum) => (
                  <p className="upcoming_company">
                    {datum.companyName} -{" "}
                    {datum.date.split("-").reverse().join("/")}
                  </p>
                ))
              : "Nothing to show"}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Home;
