import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import dataHostels from "../assets/data.json";

import {
  Avatar,
  Card,
  Button,
  Typography,
  CircularProgress,
} from "@mui/material";
import { makeStyles } from "@mui/styles";

import { HOSTEL_NAME, SERVER_URL } from "../constants";

const useStyles = makeStyles({
  cntsnt: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "20px",
    cursor: "pointer",
    transition: "200ms all ease-in-out",
    transform: "scale(1)",
    marginBottom: "20px",
    boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.1)",
    "&:hover": {
      transform: "scale(1.05)",
      backgroundColor: "blue",
    },
  },
  image: {
    "& img": {
      objectFit: "contain !important",
    },
  },
});

const Home = ({ user, profile, HOSTEL }) => {
  console.log(HOSTEL);
  const data = dataHostels[HOSTEL];

  const classes = useStyles();
  const navigate = useNavigate();

  const [contestants, setContestants] = useState(null);
  const [choices, setChoices] = useState({});
  const [page, setPage] = useState(0);

  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const vote = () => {
    console.log(choices);
    console.log(HOSTEL);
    axios
      .post(`${SERVER_URL}/hostel/vote`, {
        hostel: HOSTEL,
        tokenId: profile.token,
        profile,
        ...choices,
      })
      .then((response) => {
        if (response.status === 200) navigate("/voted", { replace: true });
      })
      .catch((error) => {
        const code = error.response.status;

        if (code === 404 || code === 403)
          navigate(`/${code}`, { replace: true });
        else window.alert(error.response.data.message);
      });
  };

  let posts = {};

  contestants?.forEach((el) => {
    const positions = [];

    if (el.position === "msec") positions.push(el.position + 1);
    else positions.push(el.position);

    // if (data.double.includes(el.position)) {
    //   positions.push(el.position + "2");
    // }

    positions.forEach((pos) => {
      if (!posts[pos]) posts[pos] = [];
      posts[pos].push(el);
    });
  });

  useEffect(() => {
    if (!contestants) setContestants(data?.contestants);
  }, [contestants]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const showFullName = (post) => {
    switch (post) {
      case "coordinator":
        return "Coordinator";
      case "CS":
        // return "Computer Science and Engineering";
        return "SES";
      case "CE":
        // return "Civil";
        return "SIF";
      case "EE":
        // return "Electrical Engineering";
        return "SHSSM";
      case "ECE":
        // return "ECE + META";
        return "SBS";
      case "PHD":
        // return "PHD";
        return "SEOCS";
      case "MSC":
        // return "MSC";
        return "SMMME";
      case "ME":
        // return "Mechanical";
        return "SMS";
      case "MTECH":
        return "MTECH";
      default:
        return "Post";
    }
  };

  return (
    <div style={{ padding: "2%" }}>
      <Typography
        variant="h3"
        style={{
          marginBottom: "2%",
          letterSpacing: "3px",
        }}
      >
        {/* GC Elections */}
        Research Council Elections
      </Typography>
      <Typography
        variant="h5"
        style={{
          marginBottom: "4%",
        }}
      >
        {showFullName(HOSTEL)}
      </Typography>

      <div>
        {Object.entries(posts)
          ?.sort((a, b) => a[0] - b[0])
          .filter((post, index) => index === page)
          .map((post, index) => {
            return (
              <div key={"post-" + index} style={{ margin: "20px" }}>
                <Card
                  style={{
                    padding: "30px",
                    boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.1)",
                  }}
                >
                  <Typography variant="h6" style={{ marginBottom: "20px" }}>
                    {showFullName(post[0])}
                  </Typography>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-evenly",
                      padding: "20px 0px",
                      flexWrap: "wrap",
                    }}
                  >
                    {post[1].map((cnt) => {
                      return (
                        <Card
                          className={classes.cntsnt}
                          style={{
                            width: "120px",
                            backgroundColor:
                              choices[post[0]] === cnt.email
                                ? "rgb(107, 209, 249,0.4)"
                                : "inherit",
                            filter:
                              post[0] === "msec2" &&
                              choices["msec1"] === cnt.email
                                ? "opacity(0.4)"
                                : "opacity(1)",
                          }}
                          key={"contestant-" + cnt.email}
                          onClick={() => {
                            if (
                              post[0] === "msec2" &&
                              choices["msec1"] === cnt.email
                            )
                              return;
                            if (
                              post[0] === "msec1" &&
                              choices["msec2"] === cnt.email
                            )
                              setChoices({
                                ...choices,
                                [post[0]]: cnt.email,
                                msec2: undefined,
                              });
                            else
                              setChoices({ ...choices, [post[0]]: cnt.email });
                          }}
                        >
                          <Avatar
                            style={{
                              height: "80px",
                              width: "80px",
                            }}
                            className={classes.image}
                            src={
                              "/images/" +
                              cnt.email.split("@iitbbs.ac.in")[0] +
                              ".jpg"
                            }
                          />
                          {cnt.name}
                        </Card>
                      );
                    })}
                  </div>
                  <div
                    style={{ display: "flex", justifyContent: "space-evenly" }}
                  >
                    <Card
                      style={{
                        padding: "10px 20px",
                        boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.1)",
                        cursor: "pointer",
                        backgroundColor:
                          choices[post[0]] === "NOTA"
                            ? "rgb(107, 209, 249,0.4)"
                            : "inherit",
                      }}
                      onClick={() => {
                        setChoices({ ...choices, [post[0]]: "NOTA" });
                      }}
                    >
                      None of the Above
                    </Card>
                    <Card
                      style={{
                        padding: "10px 20px",
                        boxShadow: "0px 0px 10px 2px rgb(0,0,0,0.1)",
                        cursor: "pointer",
                        backgroundColor:
                          choices[post[0]] === "AFV"
                            ? "rgb(107, 209, 249,0.4)"
                            : "inherit",
                      }}
                      onClick={() => {
                        setChoices({ ...choices, [post[0]]: "AFV" });
                      }}
                    >
                      Abstain from Voting
                    </Card>
                  </div>
                </Card>
                <div
                  style={{
                    position: "relative",
                    marginTop: "20px",
                  }}
                >
                  {page !== 0 && (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ position: "absolute", left: "0px" }}
                      onClick={() => {
                        setPage(page - 1);
                      }}
                    >
                      ⬅️ BACK
                    </Button>
                  )}
                  {page !== Object.entries(posts).length - 1 ? (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ position: "absolute", right: "0px" }}
                      onClick={() => {
                        setPage(page + 1);
                      }}
                      disabled={!choices[post[0]]}
                    >
                      NEXT ➡️
                    </Button>
                  ) : (
                    <Button
                      variant="contained"
                      color="primary"
                      style={{ position: "absolute", right: "0px" }}
                      onClick={() => {
                        setIsLoading((state) => true);
                        setSubmitted(true);
                        // navigate('/voted');
                        vote();
                      }}
                      disabled={!choices[post[0]] || submitted}
                    >
                      {!isLoading ? (
                        "SUBMIT"
                      ) : (
                        <CircularProgress size={20} color="inherit" />
                      )}
                    </Button>
                  )}
                  <br />
                  <br />
                </div>
              </div>
            );
          })}
      </div>
    </div>
  );
};

export default Home;
