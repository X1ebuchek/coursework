import React, {useState} from "react";
import {Button, Alert, Table} from 'react-bootstrap';
import MyTable from "./Components/MyTable";
import './CSS/styles.css';
import User from "./Components/User";
import StrongAbbat from "./Components/StrongAbbat";
import {BrowserRouter, Route, Router, Routes} from "react-router-dom";
import Login from "./Components/Login";
import Outsider from "./Components/Outsider";
import WeakAbbat from "./Components/WeakAbbat";
import Elected from "./Components/Elected";


const App = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/signup" element={<Login/>} />
                <Route path="/user" element={<User/>} />
                <Route path="/abbat/strong" element={<StrongAbbat/> } />
                <Route path="/outsider" element={<Outsider/>} />
                <Route path="/abbat" element={<WeakAbbat/>} />
                <Route path="/user/elected" element={<Elected/>} />
                <Route path="/" element={<Login/>} />
            </Routes>
        </BrowserRouter>
    );
};
export default App;
