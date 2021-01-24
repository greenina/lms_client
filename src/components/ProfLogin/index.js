import { Component, useState } from 'react';
import './style.css'
import axios from 'axios';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import MainPage from '../ProfMain'
import {Route} from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';
import {LoginSuccess} from '../../index.js';

function ProfLogin({history}){

  const[userId, setUserId] = useState();
  const[userPassword, setUserPassword] = useState();
  const[isStudent, setIsStudent] = useState(true);

  const changeHandler = (e)=>{
    switch(e.target.name){
      case 'userId':
        setUserId(e.target.value)
        break;
      case 'userPassword':
        setUserPassword(e.target.value)
        break;
      case 'isStudent':
        setIsStudent(e.target.value)
        break;
    }
  }
  var token = useSelector(state =>{return state.jwt})
  
  var dispatch = useDispatch();

  const submitHandler = (e) =>{
    e.preventDefault();
    axios.post('http://192.249.18.169:8080/auth/login',{userId:userId, userPassword:userPassword, isStudent:isStudent})
    .then(res=>{
      dispatch(LoginSuccess(res.data.jwt));
      history.push('/profmain')
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
// class ProfLogin extends Component{
//   constructor(props){
//     super(props)
//     this.state={
//       userId:'',
//       userPassword :'',
//       isStudent :false
//     }
//   }
//   changeHandler =(e)=>{
//     this.setState({[e.target.name]:e.target.value})
//   }

//   submitHandler = (e) =>{
//     e.preventDefault();
//     if(!this.state.userId || !this.state.userPassword) return;
//     axios.post('http://192.249.18.169:8080/auth/login', this.state)
//     .then(res=>{
//         console.log(res);
//         const {accessToken } = res.token;
//         axios.defaults.headers.common['']
//         res.json();
//     })
//     .catch(error =>{
//       console.log(error)
//     })
//     if(res.success){

//     }
//     history.push('/profmain')
    
//   }

//   render(){
//     const{userId, userPassword} = this.state

//     return(
//         <div>
//             <Route path="/main" component={MainPage}/>
//             <div className="recruit">
//             <form  onSubmit={this.submitHandler}  alignItems="center" justify="center">
//                 <Grid align="center"
//                         justify="center"
//                         direction="column"
//                         className="format"  
//                         alignItems="center" 
//                         justify="center">
//                     <Grid item xs={5} alignItems="center" justify="center">
//                     <div className="blank"></div>
//                     <Paper className="titlePaper" >
//                         <div className="apply_title">Login {this.state.isStudent?"(Student) ":"(Instructor) "}</div>
//                     </Paper>
//                     <div className="blank1"></div>
//                     <Paper >
//                     <div  align="left" className="userid">아이디</div>
//                         <input  onChange={this.changeHandler} value={userId} name="userId" className="userid-input" type="text"/>
//                     </Paper>
//                     <Paper >
//                     <div  align="left" className="userid">비밀번호</div>
//                         <input  onChange={this.changeHandler} value={userPassword} name="userPassword" className="userPassword-input" type="text"/>
//                     </Paper>
                    
//                     <button className = 'submit' onClick={this.submitHandler}>완료</button>
//                     </Grid>
                    
//                 </Grid>

//             </form>
//       </div>
//     </div>
      
//     )
//   }
// }

export default ProfLogin;