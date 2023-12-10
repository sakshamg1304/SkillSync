import Card from '@mui/material/Card';
import { Button, TextField, Typography } from '@mui/material';
import axios from "axios";
import { useState } from "react";

function AddCourse() {
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [price,setPrice] = useState();
    const [imageLink,setImageLink] = useState("");

    const handleAddCourse = async () =>{
        const data = await axios.post("http://localhost:3000/admin/courses/", {
            title,
            description,
            price,
            imageLink
        },{
            headers: {
                "Content-type": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        })
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
               Add your new course
            </Typography>
        </div>
        <div style={{
            display: "flex",
            justifyContent: "center"
        }}>
            <Card variant="outlined" style={{ width: 400, padding: 20 }}>
                <TextField id="outlined-basic" label="Title" variant="outlined" onChange={ (e) => setTitle(e.target.value)} fullWidth />
                <br /> <br />
                <TextField id="outlined-password-input" label="Description" variant="outlined" onChange={ (e) => setDescription(e.target.value)}  fullWidth />
                <br /> <br />
                <TextField id="outlined-password-input" label="Price" variant="outlined" onChange={ (e) => setPrice(e.target.value)}  fullWidth />
                <br /> <br />
                <TextField id="outlined-password-input" label="Image Link" variant="outlined" onChange={ (e) => setImageLink(e.target.value)}  fullWidth />
                <br /><br />
                <Button variant="contained" onClick={handleAddCourse}> Add Course </Button>
            </Card>
        </div>

    </div>
    );
}

export default AddCourse;