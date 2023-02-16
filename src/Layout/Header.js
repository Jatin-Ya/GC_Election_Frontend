import { GoogleLogout } from "react-google-login";
import { Avatar, Button } from "@mui/material";
import { googleLogout } from "@react-oauth/google"
import { CLIENT_ID } from "../constants";
import { useNavigate } from "react-router-dom";

const LogoutButton = ({ user, profile, updateProfile, updateUser  }) => {
  const navigate = useNavigate()

  const logOut = () => {
    googleLogout();
    updateUser(null);
    updateProfile([]);
    navigate("/");
};
  return (
    <GoogleLogout
      clientId={CLIENT_ID}
      render={(renderProps) => {
        return (
          <Button
            className="shadow"
            variant="contained"
            onClick={() => {
              logOut();
              
              // renderProps.onClick();
            }}
            style={{
              textTransform: "none",
              color: "black",
              backgroundColor: "white",
            }}
            sx={{ width: { xs: "100%" } }}
          >
            <Avatar
              src={profile.picture}
              sx={{
                width: 30,
                height: 30,
              }}
            />
            &nbsp;&nbsp;Logout
          </Button>
        );
      }}
      onLogoutSuccess={() => {
        window.location.href = "/";
      }}
    />
  );
};

const Header = ({ user, profile, updateProfile, updateUser  }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "flex-end",
        padding: "10px 20px",
      }}
    >
      <div>
        <LogoutButton user={user} profile={profile} updateProfile={updateProfile} updateUser={updateUser}/>
        {/* <Button>Logout</Button> */}
      </div>
    </div>
  );
};

export default Header;
