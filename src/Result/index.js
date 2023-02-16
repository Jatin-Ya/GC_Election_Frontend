import { useState, useEffect } from "react";
import { Card, Typography } from "@mui/material";
import ResultTable from "./resultTable.js";
import axios from "axios";
import { HOSTEL, HOSTEL_NAME, SERVER_URL } from "../constants";

const Resultpage = ({ user }) => {
  const [hostelResults, setHostelResults] = useState({});
  useEffect(() => {
    // axios
    //   .post(`${SERVER_URL}/hostel/results`, {
    //     tokenId: user.token,
    //     hostel: HOSTEL,
    //   })
    //   .then((response) => {
    //     setHostelResults({
    //       gsec: response.data.hostel.gsec,
    //       hsec: response.data.hostel.hsec,
    //       msec1: response.data.hostel.msec1,
    //       msec2: response.data.hostel.msec2,
    //     });
        
    //   });
    setHostelResults({
        coordinator : {
            nota : 10,
            abstain : 20,
            contestants :  [
                {
                    name : "Salman khan",
                    email : "bigboss@iitbbs.ac.in",
                    votes : 340
                },
                {
                    name : "Shahrukh khan",
                    email : "loveking@iitbbs.ac.in",
                    votes : 300
                }
            ]
        }
    })
  }, []);

  const showFullName = (post) => {
    switch (post) {
      case "coordinator":
        return "Branch Coordinator";
      case "gsec":
        return "General Secretary";
      case "msec1":
        return "Mess Secretary 1";
      case "msec2":
        return "Mess Secretary 2";
      case "hsec":
        return "Health and Hygeine Secretary";
      default:
        return "Post";
    }
  };

  return (
    <div>
      <Typography
        variant="h3"
        style={{
          marginBottom: "2%",
          letterSpacing: "3px",
        }}
      >
        GC Election Results
      </Typography>
      <Typography
        variant="h5"
        style={{
          marginBottom: "4%",
        }}
      >
        {HOSTEL_NAME}
      </Typography>
      <div>
        {Object.entries(hostelResults)
          ?.sort((a, b) => a[0] - b[0])
          .map((post, index) => {
            return (
              <div key={index} style={{ margin: "10px" }}>
                <Typography variant="h6" style={{ marginBottom: "20px" }}>
                  {showFullName(post[0])}
                </Typography>
                <ResultTable postResults={post[1]} />
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Resultpage;
