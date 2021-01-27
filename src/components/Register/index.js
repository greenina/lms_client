import { Component, useState } from 'react';
import './style.css'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import {useAlert} from 'react-alert'; 


class Register extends Component{
  constructor(props){
    super(props)
    this.state={
      userId:'',
      userPassword :'',
      isStudent :false,
      mode:false
    }
  }
  changeHandler =(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  submitHandler = (e) =>{
    if(this.state.mode){
      e.preventDefault();
    axios.post('http://192.249.18.245:8081/auth/register', this.state)
    .then(response=>{console.log(response)})
    .catch(error =>{
      console.log(error)
    })
    alert('회원가입에 성공하셨습니다.')
    //document.location.href('/login')
    }
    else{
      alert('비밀번호가 일치하지 않습니다')
    }
    

  }
  passwordHandler = (e) =>{
    e.preventDefault();
    if(this.state.userPassword === e.target.value){
      this.setState({mode:true})
    }else{
      this.setState({mode:false})
    }
  }

  

  render(){
    const{userId, userPassword} = this.state

    return(
      <div className="recruit">
        <form  onSubmit={this.submitHandler}  alignItems="center" justify="center">
          <Grid align="center"
                justify="center"
                direction="column"
                className="format"  
                alignItems="center" 
                justify="center">
            <Grid item xs={5} alignItems="center" justify="center">
              <div className="blank"></div>
              <Paper className="titlePaper" >
                <div className="apply_title">회원 가입</div>
              </Paper>
              <div className="blank1"></div>
              <Paper >
              <div  align="left" className="userid">id</div>
                <input  onChange={this.changeHandler} value={userId} name="userId" className="userid-input" type="text"/>
              </Paper>
              <Paper >
              <div  align="left" className="userid">password</div>
                <input  onChange={this.changeHandler} value={userPassword} name="userPassword" className="userPassword-input" type="text"/>
              </Paper>
              <Paper >
                <div  align="left" className="userid">confirm password</div>
                <input  onChange={this.passwordHandler}  name="userPasswordConfirm" className="userPassword-input" type="text"/>
                {this.state.mode?<div className="green">비밀번호가 일치합니다</div>:<div className="red">비밀번호가 일치하지 않습니다.</div>}
              </Paper>
              <Paper >
              <input onClick={this.changeHandler} name="isStudent" type="radio" value = "false"/><span class="up">교수</span>&nbsp;&nbsp; <input onClick={this.changeHandler} value = "true"name="isStudent"type="radio" /> <span class="up">학생</span>
              </Paper>

              <button className = 'submit' onClick={this.submitHandler}>완료</button>
                {/* <img className = 'submit' src = "/images/apply_button.png" height='50px' onClick={this.submitHandler}></img> */}
            </Grid>

          </Grid>

        </form>
      </div>
    )
  }
}

export default Register; 