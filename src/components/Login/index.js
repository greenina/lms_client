import { Component, useState } from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { LoginSuccess, checkIfStudent } from '../../redux/auth/auth.actions';
import { selectToken } from '../../redux/auth/auth.selectors';
import './style.css'
import {useHistory} from 'react-router'
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
    axios.post(`http://192.249.18.245:8080/auth/login`, { userId: userId, userPassword: userPassword })
      .then(res => {
        console.log(res)
        //debugger;
        if (res.data.success === true) {
          console.log(userId);
          dispatch(LoginSuccess({ userId: userId, jwt: res.data.jwt }));
          dispatch(checkIfStudent(res.data.isStudent));
          history.push('/main');
          console.log("aaaaa")
        }
        else {
          alert('login fail');
        }

      })
      .catch(error => {
        console.log(error)
      })
  }

  const submitHandler2 = (e) => {
    if (mode2) {
      e.preventDefault();
      axios.post(`http://192.249.18.245:8080/auth/register`, { userId: userId, userPassword: userPassword, isStudent: isStudent })
        .then(response => { console.log(response) })
        .catch(error => {
          console.log(error)
        })
      alert('회원가입에 성공하셨습니다.')
    }
    else {
      alert('비밀번호가 일치하지 않습니다')
    }
  }

  const passwordHandler = (e) => {
    e.preventDefault();
    if (userPassword === e.target.value) {
      setMode2(true)
    } else {
      setMode2(false)
    }
  }
  const goRegister = () => {
    document.location.href = "/register";
  }


  return (

    <div className="cover">
      <div className="left">
        
      </div>
      {mode === 'login' ?
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
                  <input className="id"style={{ width: "300px", height: "35px" }} placeholder="id" onChange={changeHandler} value={userId} name="userId" type="text" />
                </div>
                <div className="input-password">
                  <input className="password"style={{ width: "300px", height: "35px" }} placeholder="password" onChange={changeHandler} value={userPassword} name="userPassword" type="text" />
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
          

        :

        <div className="roundregister">
          <div className="register">
            <form onSubmit={submitHandler2} alignItems="center" justify="center">
              <div className="registerText">Register</div>
              <div className="input2">
                <div className="input-id2"><input style={{ width: "300px", height: "30px" }} placeHolder="id" onChange={changeHandler2} value={userId} name="userId" className="userid-input" type="text" /></div>
                <div className="input-password2"><input placeHolder="password" style={{ width: "300px", height: "30px" }} onChange={changeHandler2} value={userPassword} name="userPassword" className="userPassword-input" type="text" /></div>
                <div><input placeHolder="confirm password" style={{ width: "300px", height: "30px" }} onChange={passwordHandler} name="userPasswordConfirm" className="userPassword-input" type="text" /></div>
              </div>
              {mode2 ? <div className="green">비밀번호가 일치합니다</div> : <div className="red">비밀번호가 일치하지 않습니다.</div>}
              <input onClick={changeHandler2} name="isStudent" type="radio" value="false" /><span class="up">교수</span>&nbsp;&nbsp; <input onClick={changeHandler2} value="true" name="isStudent" type="radio" /> <span class="up">학생</span>
              <div className>
              <img className='submitBtn2' src="/images/registerBtn2.png" width='300px' onClick={submitHandler}></img>
              </div>
            </form>
          </div>
        </div>
      }
    </div>





  )
}

export default Login;