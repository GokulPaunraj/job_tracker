import "./Home.css";

//importing sections of the page
import Header from "../header/header";
import Sidebar from "../sidebar/sidebar";
import Card from "../card/card";

import { defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { useNavigate } from "react-router-dom";

defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.font.size = 20;
defaults.plugins.title.align = "start";
defaults.plugins.title.color = "black";

const Home = ({ data, setdata, setis_signin, setnewEntry }) => {
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

  let dates = applied_dates.filter(
    (date) =>
      date.split("-")[1] ===
      new Date().toISOString().split("T")[0].split("-")[1]
  );

  let interviews_this_month = jobs_interviewing.filter(
    (datum) =>
      datum.date.split("-")[1] ===
      new Date().toISOString().split("T")[0].split("-")[1]
  );

  let jobs_this_month = 0;
  dates.map((date) => {
    jobs_this_month += 1;
    return (graph_data[
      date.split("-")[2].split("")[0] === "0"
        ? date.split("-")[2].split("")[1]
        : date.split("-")[2]
    ] += 1);
  });

  function find_low_ctc() {
    let min = ctc_list[0];
    for (let i = 1; i < ctc_list.length; i++) {
      if (min > ctc_list[i]) {
        min = ctc_list[i];
      }
    }
    return min;
  }
  function find_high_ctc() {
    let max = ctc_list[0];
    for (let i = 1; i < ctc_list.length; i++) {
      if (max < ctc_list[i]) {
        max = ctc_list[i];
      }
    }
    return max;
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

  return (
    <div>
      {/* <p>"This is gonna be beautiful :)" </p> */}
      <Header setis_signin={setis_signin} setnewEntry={setnewEntry} />
      <Sidebar setdata={setdata} />
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
          <div className="card chart">
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

        {/* bottom section */}
        <section className="bottom_container">
          <section className="card ctc_card">
            <p>Lowest CTC:</p>
            <h2>{low_ctc}</h2>
            <p>Highest CTC:</p>
            <h2>{high_ctc}</h2>
          </section>

          <section
            className="upcoming_interviews card"
            onClick={interviews_this_month_nav}
          >
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

          <section className="card ctc_card">
            <p>Total jobs (lifetime):</p>
            <h2>{jobs_history_list.length}</h2>
            <p>Jobs applied(this month):</p>
            <h2>{jobs_this_month}</h2>
          </section>
        </section>
      </div>
    </div>
  );
};

export default Home;
