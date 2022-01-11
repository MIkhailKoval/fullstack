import React, { useContext, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import "../styles/Block.css"
import {Context} from "../context";
import Item from './Item';
import { Redirect } from 'react-router-dom/cjs/react-router-dom.min';


function Logout({state}) {
    window.localStorage.setItem("ACCESS", null);
    window.localStorage.setItem("REFRESH", null);
    const {setIsLogin} = useContext(Context);
    setIsLogin(null);
    return (
        <Redirect to='/auth'/>
    );
}

export default Logout;

