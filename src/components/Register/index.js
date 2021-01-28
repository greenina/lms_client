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
    axios.post(`http://192.249.18.245:8080/auth/register`, this.state)
    .then(response=>{console.log(response)})
    .catch(error =>{
      console.log(error)
    })
    alert('회원가입에 성공하셨습니다.')
    //document.location.href = "/";
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

  goMainPage = () => {
    document.location.href = "/";
  }

  

  render(){
    const{userId, userPassword} = this.state

    return(
      <div className="roundregister">
      <div className="register">
        <form onSubmit={this.submitHandler} alignItems="center" justify="center">
          <div className="registerText">Register</div>
          <div className="input2">
            <div className="input-id2"><input style={{ width: "300px", height: "30px" }} placeHolder="id" onChange={this.changeHandler} value={userId} name="userId" className="userid-input" type="text" /></div>
            <div className="input-password2"><input placeHolder="password" style={{ width: "300px", height: "30px" }} onChange={this.changeHandler} value={userPassword} name="userPassword" className="userPassword-input" type="text" /></div>
            <div><input placeHolder="confirm password" style={{ width: "300px", height: "30px" }} onChange={this.passwordHandler} name="userPasswordConfirm" className="userPassword-input" type="text" /></div>
          </div>
          {this.state.mode ? <div className="green">비밀번호가 일치합니다</div> : <div className="red">비밀번호가 일치하지 않습니다.</div>}
          <input onClick={this.changeHandler} name="isStudent" type="radio" value="false" /><span class="up">교수</span>&nbsp;&nbsp; <input onClick={this.changeHandler} value="true" name="isStudent" type="radio" /> <span class="up">학생</span>
          <div className>
          <img className='submitBtn2' src="/images/registerBtn2.png" width='300px' onClick={this.submitHandler}></img>
          </div>
        </form>
      </div>
    </div>
    )
  }
}

export default Register; 