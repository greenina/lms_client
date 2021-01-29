import React, { useEffect, useState } from 'react'
import axios from 'axios';
import {useHistory} from 'react-router';
import {useSelector, useDispatch} from "react-redux";
import {selectToken, selectIsStudent, selectUserId} from '../../redux/auth/auth.selectors';
import MultiDatePickerCalendar from '../Classes/MultiDatePicker/index';
import './style.css'

const CreateClass = () => {
    const history = useHistory();
    var [className, setClassName] = useState();
    var [joinPassword, setJoinPassWord] = useState();
    var [lectureDate, setLectureDate] = useState();
    var [instructor, setInstructor] = useState(useSelector(state =>selectUserId(state)));

    var token = useSelector(state => {
        return selectToken(state)}
    );

    var userId = useSelector(state => {
        return selectUserId(state)}
    );

    const submitHandler = (e) => {
        e.preventDefault();
        axios.post('http://192.249.18.203:8080/class/create', { userId: instructor, lectureDates: lectureDate, className: className, joinPassword: joinPassword },
                {
                    headers: {
                        'x-access-token': token
                    },
                    params: {
                        userId: userId
                    }
                })
                .then(response => { 
                    console.log(response);
                })
                .catch(error => {
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
                    Lecture Dates:
                    <MultiDatePickerCalendar onChangeDate={function(dates){
                        setLectureDate(dates);
                    }.bind(this)}></MultiDatePickerCalendar>
                </label>
                <br/>
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
                <button type="submit">수업 추가하기</button>
            </form>
    )
}

export default CreateClass;