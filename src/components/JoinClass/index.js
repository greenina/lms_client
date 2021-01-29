import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useSelector, useDispatch} from "react-redux";
import {selectToken, selectIsStudent, selectUserId} from '../../redux/auth/auth.selectors';
import MultiDatePickerCalendar from '../Classes/MultiDatePicker/index';
import './style.css';
import {useHistory} from 'react-router';

const JoinClass = () => {
    var [className, setClassName] = useState();
    var [joinPassword, setJoinPassWord] = useState();
    const history = useHistory();
    var token = useSelector(state => {
        return selectToken(state)}
    );

    var userId = useSelector(state => {
        return selectUserId(state)}
    );

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post(`http://192.249.18.203:8080/class/join`, {userId:userId,joinPassword:joinPassword,className:className},
            {
                headers: {
                    'x-access-token': token
                },
                params: {
                    userId: userId

                }
            })
            .then((response)=>{
                if(!response.data.success){
                    history.push('/main/classes');
                }else{
                    // document.location.href = "/classpage";
                    history.push('/main/classes');
                }
            })
            .catch(error =>{
                console.log(error)

            })
    }

    const classNameHandler = (e) =>{
        setClassName(e.target.value);
    }

    const joinPasswordHandler = (e) =>{
        setJoinPassWord(e.target.value);
    }


    return (
        <form onSubmit = {submitHandler} id="createClass">
                <label>
                    Class Name: 
                    <input onChange={classNameHandler}></input>
                </label>
                <br/>
                <label>
                    Join Password:
                    <input onChange={joinPasswordHandler}></input>
                </label>
                <br/>
                <button type="submit">수업 참여하기</button>
            </form>
    )
}

export default JoinClass;