import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { googleut, useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import {
  Button,
  CircularProgress,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SvgIcon,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

import { CLIENT_ID, HOSTEL_NAME, SERVER_URL } from "../constants";
import "./style.css";
import gc from "../assets/GClogo2023.jpg";
import gymkhana from "../assets/gymkhana.png";

const Login = ({
  user,
  updateUser,
  profile,
  updateProfile,
  HOSTEL,
  updateHOSTEL,
}) => {
  const login = useGoogleLogin({
    onSuccess: (codeResponse) => updateUser(codeResponse),
    onError: (error) => console.log("Login Failed:", error),
  });

  const onCreateHandler = () => {
    axios.post(`${SERVER_URL}/hostel/create`, {});
  };

  useEffect(() => {
    if (user) {
      axios
        .get(
          `https://www.googleapis.com/oauth2/v1/userinfo?access_token=${user.access_token}`,
          {
            headers: {
              Authorization: `Bearer ${user.access_token}`,
              Accept: "application/json",
            },
          }
        )
        .then((res) => {
          updateProfile(res.data);
          navigate("/home");
        })
        .catch((err) => console.log(err));

      // axios.get(``)
    }
  }, [user]);
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState(null);

  const successResponseGoogle = (res) => {
    console.log(res);
    // const curr = {
    //   firstName: res.profileObj.givenName,
    //   lastName: res.profileObj.familyName,
    //   email: res.profileObj.email,
    //   image: res.profileObj.imageUrl,
    //   token: res.tokenId,
    // };
    console.log("Sucess");
    // setUserData(curr);
  };

  const failureResponseGoogle = (res) => {
    console.log(res);
    setIsLoading(false);
  };

  const onAutoLoadGoogle = (loggedIn) => {
    if (!loggedIn) {
      setIsLoading(false);
    }
  };

  // useEffect(() => {
  //   // if (userData && !userData.phone) {
  //   //   getUser(userData.token);
  //   // }
  //   if (userData?.token) {
  //     axios
  //       .post(`${SERVER_URL}/auth/login`, {
  //         tokenId: userData.token,
  //         hostel: HOSTEL,
  //       })
  //       .then((response) => {
  //         if (response.status === 200) {
  //           updateUser(userData);
  //         }
  //       })
  //       .catch((err) => {
  //         setIsLoading(false);

  //         const errorCode = err.response.status;
  //         updateUser({ ...userData, errorCode });
  //       });
  //   } else {
  //     updateUser(userData);
  //   }
  // }, [userData]);
  console.log(profile);
  console.log(user);

  // const branch = '';

  const handleChange = (event) => {
    updateHOSTEL(event.target.value);
    console.log(event.target.value);
  };

  return (
    // <div
    //   style={{
    //     height: "100vh",
    //     display: "flex",
    //     alignItems: "center",
    //     justifyContent: "center",
    //   }}
    // >
    //   <GoogleLogin
    //     clientId={CLIENT_ID}
    //     render={(renderProps) => {
    //       return (
    //         <Button
    //           className="shadow"
    //           variant="contained"
    //           onClick={() => {
    //             if (!isLoading) {
    //               setIsLoading(true);
    //               renderProps.onClick();
    //             }
    //           }}
    //           style={{
    //             color: "black",
    //             padding: 10,
    //             margin: 20,
    //             backgroundColor: "white",
    //           }}
    //         >
    //           {!isLoading ? (
    //             <>
    //               <SvgIcon>
    //                 <svg
    //                   xmlns="http://www.w3.org/2000/svg"
    //                   viewBox="0 0 48 48"
    //                   width="24px"
    //                   height="24px"
    //                 >
    //                   <path
    //                     fill="#FFC107"
    //                     d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    //                   />
    //                   <path
    //                     fill="#FF3D00"
    //                     d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    //                   />
    //                   <path
    //                     fill="#4CAF50"
    //                     d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    //                   />
    //                   <path
    //                     fill="#1976D2"
    //                     d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    //                   />
    //                 </svg>
    //               </SvgIcon>
    //               &nbsp;&nbsp; Login with Google
    //             </>
    //           ) : (
    //             <CircularProgress />
    //           )}
    //         </Button>
    //       );
    //     }}
    //     isSignedIn={true}
    //     onSuccess={successResponseGoogle}
    //     onFailure={failureResponseGoogle}
    //     onAutoLoadFinished={onAutoLoadGoogle}
    //     cookiePolicy={"single_host_origin"}
    //     padding={100}
    //   />
    // </div>
    <div className="container">
      <div className="forms-container">
        <div className="signin-signup">
          <form action="#" className="sign-in-form">
            <FormControl
              sx={{
                margin: "1rem",
              }}
            >
              <InputLabel id="branch">Branch</InputLabel>
              <Select
                labelId="branch"
                sx={{
                  width: "10rem",
                }}
                value={HOSTEL}
                label="School"
                onChange={handleChange}
              >
                <MenuItem value={""}>Select Branch</MenuItem>
                <MenuItem value={"CS"}>SES</MenuItem>
                <MenuItem value={"ECE"}>SBS + Meta</MenuItem>
                <MenuItem value={"EE"}>SHSSM</MenuItem>
                <MenuItem value={"CE"}>SIF</MenuItem>
                <MenuItem value={"ME"}>SMS</MenuItem>
                {/* <MenuItem value={"MTECH"}>M.Tech</MenuItem> */}
                <MenuItem value={"PHD"}>SEOCS</MenuItem>
                <MenuItem value={"MSC"}>SMMME</MenuItem>
              </Select>
            </FormControl>
            {/* <Button onClick={onCreateHandler}>Click</Button> */}
            <Button
              disabled={HOSTEL.length === 0}
              className="shadow"
              variant="contained"
              onClick={() => {
                if (!isLoading) {
                  setIsLoading(true);
                  login();
                  // navigate("/home");
                  // renderProps.onClick();
                }
              }}
              style={{
                backgroundColor: "#0b4178",
                color: "#FFFFFF",
                opacity: HOSTEL.length === 0 ? 0.5 : 1,
                padding: "10px 20px",
                borderRadius: "24px",
              }}
            >
              {!isLoading ? (
                <>
                  <SvgIcon>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 48 48"
                      width="24px"
                      height="24px"
                    >
                      <path
                        fill="#FFC107"
                        d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                      <path
                        fill="#FF3D00"
                        d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
                      />
                      <path
                        fill="#4CAF50"
                        d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
                      />
                      <path
                        fill="#1976D2"
                        d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
                      />
                    </svg>
                  </SvgIcon>
                  &nbsp;&nbsp; Login with Google
                </>
              ) : (
                <CircularProgress style={{ color: "white" }} />
              )}
            </Button>
            {/* <GoogleLogin
              clientId={CLIENT_ID}
              render={(renderProps) => {
                return (
                  <Button
                    className='shadow'
                    variant='contained'
                    onClick={() => {
                      if (!isLoading) {
                        setIsLoading(true);
                        renderProps.onClick();
                      }
                    }}
                    style={{
                      backgroundColor: '#0b4178',
                      color: '#FFFFFF',
                      padding: '10px 20px',
                      borderRadius: '24px',
                    }}
                  >
                    {!isLoading ? (
                      <>
                        <SvgIcon>
                          <svg
                            xmlns='http://www.w3.org/2000/svg'
                            viewBox='0 0 48 48'
                            width='24px'
                            height='24px'
                          >
                            <path
                              fill='#FFC107'
                              d='M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z'
                            />
                            <path
                              fill='#FF3D00'
                              d='M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z'
                            />
                            <path
                              fill='#4CAF50'
                              d='M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z'
                            />
                            <path
                              fill='#1976D2'
                              d='M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z'
                            />
                          </svg>
                        </SvgIcon>
                        &nbsp;&nbsp; Login with Google
                      </>
                    ) : (
                      <CircularProgress style={{ color: 'white' }} />
                    )}
                  </Button>
                );
              }}
              isSignedIn={true}
              onSuccess={successResponseGoogle}
              onFailure={failureResponseGoogle}
              onAutoLoadFinished={onAutoLoadGoogle}
              cookiePolicy={'single_host_origin'}
              padding={100}
            /> */}
          </form>
        </div>
      </div>
      <div className="panels-container">
        <div className="panel left-panel">
          {/* <img src={gc} alt="gclogo" className="logo" /> */}
          {/* <img src={gymkhana} alt="gymkhana" className="logo2" /> */}
          <div className="content">
            <h3 style={{ fontSize: "35px", fontWeight: "600" }}>
              {/* General Championships 2023 */}
              Research Scholar Election
            </h3>
            {/* <h3
              style={{
                fontSize: "25px",
                fontWeight: "600",
                marginBottom: "15px ",
                marginTop: "15px",
              }}
            >
              Team Coordinators Election
            </h3> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
