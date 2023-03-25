import { useState } from "react";
import { useRoutes } from "react-router-dom";
import { Container } from "@mui/material";
import "./App.css";
import passProps from "./routes";
import Login from "./Login/index";

function App() {
    // const [user, setUser] = useState(null);
    const [user, setUser] = useState(null);
    const [profile, setProfile] = useState([]);
    const [HOSTEL, setHOSTEL] = useState("");

    const updateProfile = (profileData) => {
        setProfile(profileData);
    };

    const updateHOSTEL = (hostel) => {
        setHOSTEL(hostel);
    };

    const updateUser = (userData) => {
        setUser(userData);
    };

    const routing = useRoutes(passProps({ user, updateUser, profile , updateProfile,HOSTEL , updateHOSTEL}));

    return <div className="App">{routing}</div>;
}

export default App;
