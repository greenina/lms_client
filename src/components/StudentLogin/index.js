import { Component, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import './style.css'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {LoginSuccess} from '../../redux/auth/auth.actions';
import {Link} from 'react-router-dom';
import { selectToken } from '../../redux/auth/auth.selectors';
require('dotenv').config();

const StudentLogin = ({history}) => {

  var [userId, setUserId] = useState();
  var [userPassword, setUserPassword] = useState();
  var [isStudent, setIsStudent] = useState(true);
  var token = useSelector(state => {
    return selectToken(state)}
    );

  const changeHandler =(e)=>{
    switch(e.target.name){
      case 'userId':
        setUserId(e.target.value);
        break;
      case 'userPassword':
        setUserPassword(e.target.value);
        break;
      case 'isStudent':
        setIsStudent(e.target.value);
        break;
    }
   //this.setState({[e.target.name]:e.target.value})
  }

  const submitHandler = (e) =>{
    e.preventDefault();
    axios.post(`http://192.249.18.245:8080/auth/login`, {userId: userId, userPassword: userPassword, isStudent: isStudent})
    .then(response=>{
      dispatch(LoginSuccess(response.data.jwt));
      //document.location.href = "/studmain";
      history.push('/studmain');
    })
    .catch(error =>{
      console.log(error)
    })
    
  }

  const dispatch = useDispatch();

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
                <div className="apply_title">Login {isStudent?"(Student) ":"(Instructor) "}</div>
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

export default StudentLogin;