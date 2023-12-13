import { Button, Typography } from "@mui/material";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';

function Appbar() {
    const navigate = useNavigate();

    const [username, setUsername] = useState(null);

    useEffect(() => {
        axios.get("http://localhost:3000/admin/me", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }}).then((res) => setUsername(res.data.username));
    }, []);


    if (username) {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, marginLeft: 10 }}>
                    <Typography variant="h6">
                        Coursera
                    </Typography>
                    <div style={{ display: "flex", marginRight: 10 }}>
                        <div style={{ marginRight: 10 }}>
                        <Button variant="outlined"
                               onClick={() => {
                                navigate("/addCourse");
                               }}> 
                                Add Course
                            </Button>
                        </div>
                        <div style={{ marginRight: 10 }}>
                        <Button variant="outlined"
                               onClick={() => {
                                navigate("/getcourses");
                               }}> 
                                My Courses
                            </Button>
                        </div>
                        <div>
                            <Button variant="contained"
                               onClick={() => {
                                localStorage.setItem("token",null);
                                window.location ="/";
                                //</div></div>navigate("/login") 
                               }}> 
                                Log out
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div>
                <div style={{ display: "flex", justifyContent: "space-between", paddingTop: 10, marginLeft: 10 }}>
                    <Typography variant="h6">
                        Coursera
                    </Typography>
                    <div style={{ display: "flex", marginRight: 10 }}>
                        <div style={{ marginRight: 10 }}>
                            <Button variant="contained"
                                //onClick={() => window.location = "/signup"}>
                                onClick={() => navigate("/signup")}>

                                Sign up</Button>
                        </div>
                        <div>
                            <Button variant="contained"
                                onClick={() => navigate("/login")}>
                                Log in
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default Appbar;