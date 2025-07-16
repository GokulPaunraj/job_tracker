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

const Home = ({ data, userName, setis_signin, setnewEntry }) => {
  // placeholder data

  const jobs_applied_data = [
    { day: "1", count: 2 },
    { day: "2", count: 8 },
    { day: "3", count: 16 },
    { day: "4", count: 18 },
    { day: "5", count: 5 },
    { day: "6", count: 9 },
    { day: "7", count: 4 },
    { day: "8", count: 6 },
    { day: "9", count: 6 },
    { day: "10", count: 18 },
    { day: "11", count: 9 },
    { day: "12", count: 18 },
    { day: "13", count: 21 },
    { day: "14", count: 3 },
    { day: "15", count: 12 },
    { day: "16", count: 0 },
    { day: "17", count: 2 },
    { day: "18", count: 2 },
    { day: "19", count: 2 },
    { day: "20", count: 14 },
    { day: "21", count: 4 },
    { day: "22", count: 8 },
    { day: "23", count: 11 },
    { day: "24", count: 22 },
    { day: "25", count: 5 },
    { day: "26", count: 7 },
    { day: "27", count: 9 },
    { day: "28", count: 0 },
    { day: "29", count: 2 },
    { day: "30", count: 4 },
  ];

  const upcoming_interviews = [
    "TCS",
    "Deloitte",
    "Zoho",
    "TCS",
    "Deloitte",
    "Zoho",
  ];

  const navigate = useNavigate()

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

  let ctc_list = data ? data.jobs_list.map((job)=>{return job.ctc}) : []
  
  function find_low_ctc(){
    let min = ctc_list[0]
    for (let i=1; i < ctc_list.length;i++){
      if(min > ctc_list[i]){
        min = ctc_list[i]
      }
    }
    return min
  }
  function find_high_ctc(){
    let max = ctc_list[0]
    for (let i=1; i < ctc_list.length;i++){
      if(max < ctc_list[i]){
        max = ctc_list[i]
      }
    }
    return max
  }

  let low_ctc = find_low_ctc()
  let high_ctc = find_high_ctc()

  const card_data = [
    { count: jobs_applied.length, status: "jobs applied" },
    { count: jobs_interviewing.length, status: "interviewing" },
    { count: jobs_offered.length, status: "job offers" },
    { count: jobs_rejected.length, status: "jobs rejected" },
  ];

  const news = () => {
    navigate("/news");
  };
  const Upcoming_interviews = () => {
    navigate("/upcoming_interviews");
  };

  return (
    <div>
      {/* <p>"This is gonna be beautiful :)" </p> */}
      <Header setis_signin={setis_signin} setnewEntry={setnewEntry} />
      <Sidebar />
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
                labels: jobs_applied_data.map((datum) => datum.day),
                datasets: [
                  {
                    label: "Number of jobs applied",
                    data: jobs_applied_data.map((datum) => datum.count),
                    backgroundColor: "#4380f8",
                    borderColor: "#4380f8",
                  },
                ],
              }}
              options={{
                elements: { line: { tension: 0.3 } },
                plugins: { title: { text: "Jobs Applied" } },
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
            onClick={Upcoming_interviews}
          >
            <p>Upcoming Interviews</p>
            {upcoming_interviews.map((company) => (
              <p className="upcoming_company">{company}</p>
            ))}
          </section>

          <section className="news_container card" onClick={news}>
            <p>News</p>
            {upcoming_interviews.map((company) => (
              <p className="news">{company}</p>
            ))}
          </section>
        </section>
      </div>
    </div>
  );
};

export default Home;
