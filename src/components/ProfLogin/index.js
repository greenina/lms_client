import { Component, useState } from 'react';
import './style.css'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainPage from '../ProfMain'
import {Route} from 'react-router-dom'


class ProfLogin extends Component{
  constructor(props){
    super(props)
    this.state={
      userId:'',
      userPassword :'',
      isStudent :false
    }
  }
  changeHandler =(e)=>{
    this.setState({[e.target.name]:e.target.value})
  }

  submitHandler = (e) =>{
    e.preventDefault();
    console.log(this.state)
    axios.post('http://192.249.18.169:8080/auth/login', this.state)
    .then(response=>{console.log(response)})
    .catch(error =>{
      console.log(error)
    })
    document.location.href = "/profmain";
    
  }

  render(){
    const{userId, userPassword} = this.state

    return(
        <div>
            <Route path="/main" component={MainPage}/>
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
                        <div className="apply_title">Login {this.state.isStudent?"(Student) ":"(Instructor) "}</div>
                    </Paper>
                    <div className="blank1"></div>
                    <Paper >
                    <div  align="left" className="userid">아이디</div>
                        <input  onChange={this.changeHandler} value={userId} name="userId" className="userid-input" type="text"/>
                    </Paper>
                    <Paper >
                    <div  align="left" className="userid">비밀번호</div>
                        <input  onChange={this.changeHandler} value={userPassword} name="userPassword" className="userPassword-input" type="text"/>
                    </Paper>
                    
                    <button className = 'submit' onClick={this.submitHandler}>완료</button>
                    </Grid>
                    
                </Grid>

            </form>
      </div>
    </div>
      
    )
  }
}

export default ProfLogin;