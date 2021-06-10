import { optionsPie } from "../dataset/chartDataset";
import Chart from "react-apexcharts";
import QcscoreComp2 from "./qcscore-comp2";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { LEAD_FIELDS_URL } from "../utils";

export default function MyForm({ setBlur }) {
  const [mydate,setMyDate]=useState("");
  const [totalCount, setTotalCount] = useState(0);
  const [qcScore, setQcScore] = useState(0);
  const [yesBtnObj, setYesBtnObj] = useState({
    mobile: "none",
    email1: "none",
    email2: "none",
  }); //yes no none
  const [api,setApi]=useState({});
  useEffect(() => {
    setTotalCount(Object.keys(yesBtnObj).length);
    fetch(LEAD_FIELDS_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify({
        lead_id: "31",
      }),
    }).then(r=>r.json()).then((r)=>{
        setApi(r.lead_details);
        const d=new Date(r.lead_details.created_on);
        const day=d.getDate();
        const month=d.getMonth();
        const year=d.getFullYear();
        const dateString=`${day<10?"0"+day:day}/${month<10?"0"+(month+1):(month+1)}/${year}`;
        setMyDate(dateString);
        console.log(d,day,month,year,dateString)
    });
  }, []);

  const updateScore = (e) => {
    const label = e.target.dataset.label;
    const value = e.target.innerText;
    if (value === "YES") {
      yesBtnObj[label] = "yes";
      setYesBtnObj({ ...yesBtnObj });
      console.log("I am in Yes");
      console.log(yesBtnObj);
      let count = 0;
      for (const key in yesBtnObj) {
        if (yesBtnObj[key] === "yes") {
          count = count + 1;
        }
      }

      const score = (count / totalCount) * 100;
      console.log(score);
      setQcScore(Math.trunc(score));
      optionsPie.series = [Math.trunc(score), 100 - Math.trunc(score)];
    } else if (value === "NO") {
      yesBtnObj[label] = "no";
      setYesBtnObj({ ...yesBtnObj });
      let count = 0;
      for (const key in yesBtnObj) {
        if (yesBtnObj[key] === "yes") {
          count = count + 1;
        }
      }

      const score = (count / totalCount) * 100;
      console.log(score);
      setQcScore(Math.trunc(score));
      console.log("I am in No");
      console.log(yesBtnObj);
      optionsPie.series = [Math.trunc(score), 100 - Math.trunc(score)];
    }
  };
  return (
    <>
      <div className="form-container">
        <div className="backArrow">
          <img
            src={window.location.origin + "/images/backArrow.svg"}
            alt="back-arrow"
            className="backArrowImg"
          />
        </div>
        <div className="form">
          <div className="inputContainer">
            <div>Lead Id</div>
            <div>
              <input className="myInputField" disabled value={api.lead_id?api.lead_id:"Jio Mart"} />
            </div>
          </div>
          <div className="inputContainer">
            <div>Date</div>
            <div>
              <input
                className="myInputField"
                disabled
                value={`${mydate.length>0?mydate:"25/07/2021"}`}
              />
            </div>
          </div>
          <div className="inputContainer">
            <div>Merchant Contact Number</div>
            <div>
              <input
                className="myInputField"
                disabled
                value={`${api.merchant_number?api.merchant_number:"xxxxxxx119"}`}
              />
            </div>
          </div>
          <div className="inputContainer">
            <div>Area</div>
            <div>
              <input
                className="myInputField"
                disabled
                value={`Bangaluru, Karnataka`}
              />
            </div>
          </div>
          <div className="inputContainer">
            <div>Aadhar Card</div>
            <div className="panCardContainer">
              {/* <input className="myInputField" disabled /> */}
              <img
                src={`${/*Object.keys(api).length>0?api.aadhar_front_image:*/window.location.origin + "/images/panCard.svg"}`}
                alt="pan-card"
                className="panImg"
              />
            </div>
          </div>
          
          <div className="inputContainer">
            <div>Mobile</div>
            <div className="inputAndYesNo">
              <input
                className="myInputField invalidInput"
                disabled
                value={`7879872341`}
              />
              <div className="yesNo">
                <div
                  style={{
                    pointerEvents: `${
                      yesBtnObj.mobile === "no" ? "none" : "auto"
                    }`,
                  }}
                  className={`btn ${yesBtnObj.mobile === "no" ? "noBtn" : ""}`}
                  onClick={updateScore}
                  data-label="mobile"
                >
                  NO
                </div>
                <div
                  style={{
                    pointerEvents: `${
                      yesBtnObj.mobile === "yes" ? "none" : "auto"
                    }`,
                  }}
                  className={`btn ${
                    yesBtnObj.mobile === "yes" ? "yesBtn" : ""
                  }`}
                  data-label="mobile"
                  onClick={updateScore}
                  value={`YES`}
                >
                  YES
                </div>
              </div>
            </div>
            <div className="invalidInputText">
              <img
                src={window.location.origin + "/images/warningIcon.svg"}
                alt="warning icon"
                className="warningIcon"
              />
              Email ID not verified. Please verify again!
            </div>
          </div>
          <div className="inputContainer">
            <div>Email1</div>
            <div className="inputAndYesNo">
              <input
                className="myInputField invalidInput"
                disabled
                value={`rahul420@gmail.com`}
              />
              <div className="yesNo">
                <div
                  style={{
                    pointerEvents: `${
                      yesBtnObj.email1 === "no" ? "none" : "auto"
                    }`,
                  }}
                  className={`btn ${yesBtnObj.email1 === "no" ? "noBtn" : ""}`}
                  onClick={updateScore}
                  data-label="email1"
                >
                  NO
                </div>
                <div
                  style={{
                    pointerEvents: `${
                      yesBtnObj.email1 === "yes" ? "none" : "auto"
                    }`,
                  }}
                  className={`btn ${
                    yesBtnObj.email1 === "yes" ? "yesBtn" : ""
                  }`}
                  data-label="email1"
                  onClick={updateScore}
                  value={`YES`}
                >
                  YES
                </div>
              </div>
            </div>

            <div className="invalidInputText">
              <img
                src={window.location.origin + "/images/warningIcon.svg"}
                alt="warning icon"
                className="warningIcon"
              />
              Email ID not verified. Please verify again!
            </div>
          </div>
          <div className="inputContainer">
            <div>Email2</div>
            <div className="inputAndYesNo">
              <input
                className="myInputField invalidInput"
                disabled
                value={`rahul420@gmail.com`}
              />
              <div className="yesNo">
                <div
                  style={{
                    pointerEvents: `${
                      yesBtnObj.email2 === "no" ? "none" : "auto"
                    }`,
                  }}
                  className={`btn ${yesBtnObj.email2 === "no" ? "noBtn" : ""}`}
                  onClick={updateScore}
                  data-label="email2"
                >
                  NO
                </div>
                <div
                  style={{
                    pointerEvents: `${
                      yesBtnObj.email2 === "yes" ? "none" : "auto"
                    }`,
                  }}
                  className={`btn ${
                    yesBtnObj.email2 === "yes" ? "yesBtn" : ""
                  }`}
                  data-label="email2"
                  onClick={updateScore}
                  value={`YES`}
                >
                  YES
                </div>
              </div>
            </div>

            <div className="invalidInputText">
              <img
                src={window.location.origin + "/images/warningIcon.svg"}
                alt="warning icon"
                className="warningIcon"
              />
              Email ID not verified. Please verify again!
            </div>
          </div>
        </div>
      </div>
      <div className="right-content">
        <div className="remark">
          <div className="remarkIcon">
            <img
              src={window.location.origin + "/images/remarkIcon.svg"}
              alt="remark"
            />
            <div>Remark</div>
          </div>
          <div>
            <div className="qcStyle">QC01</div>
            <div className="qcContent invalidInputText">
              Email ID is incorrect
            </div>
          </div>
          <div>
            <div className="qcStyle">QC02</div>
            <div className="qcContent invalidInputText">
              Email ID is incorrect
            </div>
          </div>
        </div>
        <div className="qcScore">
          <div className="qcScoreText">QC Score</div>
          <div className="donutStyle">
            <div className="donutLegend">{`${qcScore}%`}</div>

            <Chart
              options={optionsPie.options}
              series={optionsPie.series}
              type="donut"
              width="200px"
            />
          </div>
          <Switch>
            <Route exact path="/main/redo">
              <div className="redoText">REDO</div>
            </Route>
            <Route exact path="/main">
              <QcscoreComp2 setBlur={setBlur} qcScore={qcScore} />
            </Route>
          </Switch>
        </div>
      </div>
    </>
  );
}
