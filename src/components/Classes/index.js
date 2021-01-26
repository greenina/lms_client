import React, { Component, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-modal';
import axios from 'axios';
import ClassPage from '../ClassPage'
import {Route} from 'react-router-dom'
import MultiDatePickerCalendar from './MultiDatePicker/index'
import {useHistory} from 'react-router-dom'
import { useAsync } from 'react-async';
import ClassItem from '../ClassItem'

const Classes = () =>{
    const history = useHistory();
    var [modalState, setModalState] = useState(false);
    var [instructor, setInstructor] = useState(useSelector(state => state.userId));
    var [classId, setClassId] = useState();
    var [className, setClassName] = useState();
    var [joinPassword, setJoinPassWord] = useState();
    var [lectureDate, setLectureDate] = useState();
    var [classesInfo, setClassesInfo] = useState();

    var token = useSelector(state => {
        //console.log(state);
        return state.jwt}
    );
    var isStudent = useSelector(state => {
        console.log(state);
        return state.isStudent}
    );

    var userId = useSelector(state => {
        //console.log(state);
        return state.userId}
    );

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };

    const submitHandler = (e) =>{
        e.preventDefault();
        console.log("isStudent",isStudent)
        console.log(token)
        // debugger;
        if (!isStudent) {
            var req ={ userId: instructor, lectureDate: lectureDate, className: className, joinPassword: joinPassword };
            console.log(req);
            axios.post('http://192.249.18.203:8080/class/create', { userId: instructor, lectureDate: lectureDate, className: className, joinPassword: joinPassword },
                {
                    headers: {
                        'x-access-token': token
                    }
                })
                .then(response => { console.log(response) })
                .catch(error => {
                    console.log(error)
                })
        }
        else{
            axios.post('http://192.249.18.203:8080/class/join', {userId:userId,joinPassword:joinPassword,className:className},
            {
                headers: {
                    'x-access-token': token
                }
            })
            .then(response=>{
                console.log(response)
                if(!response.data.success){
                    history.push('/classpage');
                }else{
                    // document.location.href = "/classpage";
                    history.push('/classpage');
                }
            })
            .catch(error =>{
                console.log(error)

            })
        }
      }
    //var classesInfo = [];
    const getDatafromServer = async() =>{
        var res = await  axios.post('http://192.249.18.203:8080/class/get',{isStudent:isStudent,userId:userId},{
            headers: {
                'x-access-token': token
            }
        }) 
        var classes = [];
        classes.push(res.data.classes);
        console.log(classes[0][0].className)
        var info = classes.map(element => <ClassItem className={element[0].className} instructor = {element[0].instructor}/>)
        setClassesInfo(info);
        return info;
    }

    //var info = useAsync({promiseFn:getDatafromServer})
    useEffect(()=>{
        getDatafromServer();
    },[])
    

    
    
    const instructorHandler = (e) =>{
        setInstructor(e.target.value);
    }
    const classIdHandler = (e) =>{
        setClassId(e.target.value);
    }
    const classNameHandler = (e) =>{
        setClassName(e.target.value);
    }
    const joinPasswordHandler = (e) =>{
        setJoinPassWord(e.target.value);
    }

    //student's page
    return(
        <div>
            <Route path="/classpage"exact={true} component={ClassPage}/>
        {isStudent?<div>수업 목록{classesInfo}</div>
            :<div></div>}
            <button onClick={openModal} >Add Class</button>
            <Modal isOpen={modalState} onRequestClose={closeModal}>
                {!isStudent?
                <form onSubmit = {submitHandler}>
                    <div>lectureDate : 
                    <MultiDatePickerCalendar onChangeDate={function(dates){
                        setLectureDate(dates);
                        console.log(lectureDate);
                    }.bind(this)}></MultiDatePickerCalendar>
                    {/* <input onChange={function(e){
                        var dateArr = [];
                        dateArr.push(new Date(98,2,24))
                        setLectureDate(dateArr);
                    }}></input> */}
                    </div>
                    <div>className : <input onChange={classNameHandler}></input></div>
                    <div>joinPassword : <input  onChange={joinPasswordHandler}></input></div>
                    <button type="submit">수업 추가하기</button>
                </form>:
                <form onSubmit = {submitHandler}>
                    <div>className : <input onChange={classNameHandler}></input></div>
                    <div>joinPassword : <input  onChange={joinPasswordHandler}></input></div>
                    <button type="submit">수업 참가하기</button>
                </form>
                }
                
            </Modal>

        </div>
    );
}



export default Classes;