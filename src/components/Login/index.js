import { Component, useState } from 'react';
import './style.css'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainPage from '../MainPage'
import {Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {LoginSuccess, checkIfStudent} from '../../redux/auth/auth.actions';
import { selectToken } from '../../redux/auth/auth.selectors';

function Login({history}){

  const[userId, setUserId] = useState();
  const[userPassword, setUserPassword] = useState();

  const changeHandler = (e)=>{
    switch(e.target.name){
      case 'userId':
        setUserId(e.target.value)
        break;
      case 'userPassword':
        setUserPassword(e.target.value)
        break;
    }
  }
  var token = useSelector(state =>selectToken(state))
  
  var dispatch = useDispatch();

  const submitHandler = (e) =>{
    e.preventDefault();
    axios.post(`http://192.249.18.203:8080/auth/login`,{userId:userId, userPassword:userPassword})
    .then(res=>{
      console.log(res)
      //debugger;
      if(res.data.success === true){
        console.log(userId);
        dispatch(LoginSuccess({userId:userId, jwt: res.data.jwt}));
        dispatch(checkIfStudent(res.data.isStudent));
        history.push('/main');
      }
      else{
        alert('login fail');
      }

    })
    .catch(error =>{
      console.log(error)
    })
  }


  return(
    <div className="recruit">
        <form  onSubmit={submitHandler}  alignItems="center" justify="center">
          <Grid align="center"
                justify="center"
                direction="column"
                className="format"  
                alignItems="center" 
                justify="center">
            <Grid item xs={5} alignItems="center" justify="center">
              <div className="blank"></div>
              <Paper className="titlePaper" >
                <div className="apply_title">Login</div>
              </Paper>
              <div className="blank1"></div>
              <Paper >
              <div  align="left" className="userid">아이디</div>
                <input  onChange={changeHandler} value={userId} name="userId" className="userid-input" type="text"/>
              </Paper>
              <Paper >
              <div  align="left" className="userid">비밀번호</div>
                <input  onChange={changeHandler} value={userPassword} name="userPassword" className="userPassword-input" type="text"/>
              </Paper>
              
              <button className = 'submit' onClick={submitHandler}>완료</button>
              

            </Grid>
            
          </Grid>

        </form>
      </div>
  )
}

export default Login;