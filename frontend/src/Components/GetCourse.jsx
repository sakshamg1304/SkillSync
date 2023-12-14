import { Button } from "@mui/base";
import { Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function GetCourse() {
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        axios.get("http://localhost:3000/admin/courses/", {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token"),
            }
        }).then((res) => {
            console.log(res.data.courses);
            setCourses(res.data.courses);
        });

    }, []);

    return (
        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}>
            {courses.map(course => {
                return <SingleCourseCard course={course} />
            })}
        </div>
    );
}

export function SingleCourseCard({ course }) {
    const navigate = useNavigate();
    return <Card style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20
    }}>
        <CardMedia
            sx={{ height: 140 }}
            image={course.imageLink}
            title="thumbnail"
        />
        <CardContent>
            <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
            <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
        </CardContent>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 20 }}>
            <Button variant="contained" size="large" onClick={() => {
                navigate("/course/" + course._id);
            }}>Edit</Button>
        </div>
    </Card>



    // return <Card style={{
    //     margin: 10,
    //     width: 300,
    //     minHeight: 200,
    //     padding: 20
    // }}>
    //     <Typography textAlign={"center"} variant="h5">{course.title}</Typography>
    //     <Typography textAlign={"center"} variant="subtitle1">{course.description}</Typography>
    //     <img src={course.imageLink} style={{width: 300}} ></img>
    //     <div style={{display: "flex", justifyContent: "center", marginTop: 20}}>
    //         <Button variant="contained" size="large" onClick={() => {
    //             navigate("/course/" + course._id);
    //         }}>Edit</Button>
    //     </div>
    // </Card>
}

export default GetCourse;