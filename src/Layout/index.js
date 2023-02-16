import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Header from "./Header";

const Layout = ({ user, profile, updateProfile, updateUser }) => {
  return (
    <div>
      {user && <Header user={user} profile= {profile} updateProfile={updateProfile} updateUser={updateUser}/>}
      <Container>
        <Outlet />
      </Container>
    </div>
  );
};

export default Layout;
