import { GoogleLogout } from "react-google-login";
import { Avatar, Button } from "@mui/material";
import { googleLogout } from "@react-oauth/google";
import { CLIENT_ID } from "../constants";
import { useNavigate } from "react-router-dom";
import gclogo from "../assets/GClogo2023.jpg";
import gymkhana from "../assets/gymkhana.png";
import styles from "./Header.module.css";

const LogoutButton = ({ user, profile, updateProfile, updateUser }) => {
  const navigate = useNavigate();

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

const Header = ({ user, profile, updateProfile, updateUser }) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "2rem",
        alignItems: "center",
      }}
    >
      <div style={{ marginRight: "20px" }}>
        <img src={gclogo} alt="GC Logo" className={styles.logos} />
        <img src={gymkhana} alt="Gymkhana Logo" className={styles.logos} />
      </div>
      <div>
        <LogoutButton
          user={user}
          profile={profile}
          updateProfile={updateProfile}
          updateUser={updateUser}
        />
        {/* <Button>Logout</Button> */}
      </div>
    </div>
  );
};

export default Header;
