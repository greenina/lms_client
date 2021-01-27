import React from 'react';
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Register from '../Register'
import Login from '../Login'
import './style.css'

const LoginMenu = () =>{

    const goRegister = () => {
        document.location.href = "/register";
    }
    const goStudLogin = () => {
        document.location.href = "/studlogin";
    }
    const goProfLogin = () => {
        document.location.href = "/proflogin";
    }
    const Login = () =>{
        document.location.href='/login';
    }

    return (
        <div>
            <Route path="/register" component={Register}/>
            {/* <Route path="/studlogin" component={StudentLogin}/>
            <Route path="/proflogin" component={ProfLogin}/> */}
            <Route path="/login" component={Login}/>
            <div className="login">
                <button onClick={Login}>통합 로그인</button>
                <img  className = 'submit' src = "/images/login_prof.png" height='300px' onClick={goProfLogin}></img>
                <img className = 'submit' src = "/images/login_stud2.png" height='300px' onClick={goStudLogin}></img>
            </div>
            
            <button className="registerBtn" onClick={goRegister}>회원가입</button>
        </div>
    )
}

export default LoginMenu;