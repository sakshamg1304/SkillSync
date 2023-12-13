import Card from '@mui/material/Card';
import { Button, TextField, Typography } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';

function Signup() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = async() => {
        const res =  await axios.post("http://localhost:3000/admin/signup",{
            username: username,
            password: password
          },{
            headers: {
                "Content-type": "application/json"
            }
        });
        localStorage.setItem('token', res.data.token);
        window.location = "/";
     };

    return (
        <div>
            <div style={{
                paddingTop: 150,
                marginBottom: 20,
                display: "flex",
                justifyContent: "center"
            }}>
                <Typography variant='h6'>
                    Welcome to CourseEra. Sign up Below
                </Typography>
            </div>
            <div style={{
                display: "flex",
                justifyContent: "center"
            }}>
                <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                    <TextField id="outlined-basic" label="Email" variant="outlined" onChange={ e => setUsername(e.target.value)} fullWidth />
                    <br /> <br />
                    <TextField id="outlined-password-input" label="Password" variant="outlined" type="password" onChange={ e => setPassword(e.target.value)}  fullWidth />
                    <br /><br />
                    <Button variant="contained" onClick={ handleSubmit }>Sign up</Button>
                </Card>
            </div>

        </div>
    )
}
export default Signup;