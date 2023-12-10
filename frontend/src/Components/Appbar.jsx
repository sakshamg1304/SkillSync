import { Button, Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom';

function Appbar() {
    const navigate = useNavigate();
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
                           onClick={() => navigate("/login") }> 
                            Log in
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appbar;