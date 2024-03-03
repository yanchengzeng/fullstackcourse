import React, { useState, useEffect, useContext } from 'react'
import Notes from './Notes'
import axios from 'axios'
import noteService from '../services/notes'
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { AuthContext } from './authConfig.tsx'
import jwt_decode from "jwt-decode";



const Dashboard = () => {
    const authContext = useContext(AuthContext)

    const handleLogOut = () => {
        authContext.signout(() => {
            console.log(`now log out`);
            sessionStorage.clear();
        });
    }

    let token = sessionStorage.getItem("jwt");
    var decoded = jwt_decode(token);
    let userId = decoded["sub"]

    console.log(`decoded user id is ${userId}`);

    return (
            <>
                <button onClick={() => handleLogOut()}>Log Out</button>


                <Notes user_id={userId}/>
            </>
        )
}

export default Dashboard