import React from 'react';
import { Route, Router} from 'react-router-dom';
import Register from '../Register'
import goRegister from '../LoginMenu';
import LoginMenu from '../LoginMenu';
import './style.css'

function FirstPage(){
    return(
        <div className="background">
            <LoginMenu/>
        </div>
    );
}

export default FirstPage;



