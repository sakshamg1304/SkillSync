import * as React from 'react';
import './App.css';
import Appbar from './Components/Appbar';
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom';
import Login from './Components/Login';
import Signup from './Components/Signup';
import GetCourse from './Components/GetCourse';
import AddCourse from './Components/AddCourse';

function App() {
  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#f0f0f0"
    }}>
      <BrowserRouter>
      <Appbar/>
        <Routes>
          <Route path="/login" element={<Login />}> </Route>
          <Route path="/signup" element={<Signup />}> </Route>
          <Route path="/addCourse" element={<AddCourse />}> </Route>
          <Route path="/getcourses" element={<GetCourse />}> </Route>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
