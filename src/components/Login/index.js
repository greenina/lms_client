import { Component, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { LoginSuccess, checkIfStudent } from '../../redux/auth/auth.actions';
import { selectToken } from '../../redux/auth/auth.selectors';
import './style.css'
import { useHistory } from 'react-router'
import Register from '../Register'

function Login() {

  const [userId, setUserId] = useState();
  const [userPassword, setUserPassword] = useState();
  const [mode, setMode] = useState('login');
  const [isStudent, setIsStudent] = useState(false);
  const [mode2, setMode2] = useState(false);

  const history = useHistory();
  const changeHandler = (e) => {
    switch (e.target.name) {
      case 'userId':
        setUserId(e.target.value)
        break;
      case 'userPassword':
        setUserPassword(e.target.value)
        break;
    }
  }
  var token = useSelector(state => selectToken(state))

  var dispatch = useDispatch();
  const changeMode = (e) => {
    e.preventDefault();
    setMode(e.target.value)
  }

  const changeHandler2 = (e) => {
    switch (e.target.name) {
      case userId:
        setUserId(e.target.value)
      case userPassword:
        setUserPassword(e.target.value)
      default:
        return
    }
  }

  const submitHandler = (e) => {
    e.preventDefault();
    axios.post(`http://192.249.18.203:8080/auth/login`, { userId: userId, userPassword: userPassword })
      .then(res => {
        console.log(res)
        //debugger;
        if (res.data.success === true) {
          console.log(userId);
          dispatch(LoginSuccess({ userId: userId, jwt: res.data.jwt }));
          dispatch(checkIfStudent(res.data.isStudent));
          history.push({
            pathname: '/main/classes',
            state: { userId: userId }
          });
        }
        else {
          alert('login fail');
        }
      })
    }

    const goRegister = () => {
      document.location.href = "/register";
    }

    return (

      <div className="cover">
        <div className="left">

        </div>

        <div className="blank">
          <div className="images">
            <img src='/images/logogray.png' width="300px"></img>
            <img src='/images/intro.png' style={{ width: "500px" }}></img>
          </div>
          <div className="roundLogin">
            <div className="login">
              <form onSubmit={submitHandler} alignItems="center" justify="center">
                <div className="loginText">Hello :)</div>
                <div className="input">
                  <div className="input-id">
                    <input className="id" style={{ width: "300px", height: "35px" }} placeholder="id" onChange={changeHandler} value={userId} name="userId" type="text" />
                  </div>
                  <div className="input-password">
                    <input className="password" style={{ width: "300px", height: "35px" }} placeholder="password" onChange={changeHandler} value={userPassword} name="userPassword" type="text" />
                  </div>
                </div>
                <div className="btn">
                  <div>
                    <img className='loginBtn' src="/images/loginBtn2.png" width='350px' onClick={submitHandler}></img>
                  </div>
                  <div onClick={goRegister}>
                    Forgot Password?  |      Register
                  {/* <img className = 'registerBtn' src = "/images/registerBtn.png" width='350px' value="register" onClick={changeMode}></img> */}
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>





    )
  
}
export default Login;