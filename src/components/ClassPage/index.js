import React, { Component, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import {useHistory} from 'react-router';
import axios from 'axios';
import {LectureItem, AssignmentItem} from '../ClassItem'
import {selectToken, selectIsStudent, selectUserId, selectClassId, selectClassName} from '../../redux/auth/auth.selectors'
import SubmitAssignment from  '../SubmitAssignment/index'
import { updateClass } from '../../redux/auth/auth.actions';
import './style.css'

const ClassPage = (props) => {
    var dispatch = useDispatch();
    const history = useHistory();

    var [modalState, setModalState] = useState(false);
    var [openTime, setOpenTime] = useState(new Date());
    var [endTime, setEndTime] = useState(new Date());
    var [lecturesInfo, setLecturesInfo] = useState();
    var [assignmentsInfo, setAssignmentsInfo] = useState();
    var token = useSelector(state => {
        return selectToken(state)}
    );

    
    var classId = useSelector(state => {
        return selectClassId(state)}
    );

    var userId = useSelector(state => {
        return selectUserId(state)
    })

    var isStudent = useSelector(state => {
        return selectIsStudent(state)
    })
    var className = useSelector(state => {
        return selectClassName(state)
    })
    useEffect(()=>{
        getDatafromServer();
    },[])

    const getDatafromServer = async () =>{
        var res = await axios.get('http://192.249.18.203:8080/class/info', {
            headers: {
                'x-access-token': token
            },
            params: {
                classId: classId, 
                userId: userId
            }
        })
        
        var classInfo = res.data.classInfo;
        console.log(classInfo);

        dispatch(updateClass(classInfo));
        var dates = res.data.classInfo.dates.sort((a,b) => {
            return new Date(a.scheduled_for).getTime() - 
                new Date(b.scheduled_for).getTime()
        });
        
        var lectures = res.data.classInfo.lectures;
        var assignments = res.data.assignments;

        console.log(res.data)
        var info = dates.map(element => <LectureItem lectureDate = {element} lectures = {lectures.filter((lecture) => {
            if((new Date(lecture.lectureDate)).getTime() === new Date(element).getTime())
                return true;
            else
                return false;
        })}/>)

        setLecturesInfo(info);
        
        var assignInfo = assignments.map(element => <AssignmentItem assignmentId = {element.assignmentId} assignmentName = {element.assignmentName} assignmentInstruction ={element.instruction}/>)
        setAssignmentsInfo(assignInfo);
        
        return info;
    }

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };

    const noticePage = (event) => {
        event.preventDefault();
        history.push({
            pathname: "/main/notice",
            state: {userId: userId, classId: classId, isStudent: isStudent}
        })
    }

    const quizPage = (event) => {
        event.preventDefault();
        history.push({
            pathname: '/main/quiz',
            state: {userId: userId, classId: classId}
        })
    }

    return(<div>
        <p>ClassPage <h1>{className}</h1></p>
        <button onClick={openModal} >Add assignment</button>
        <button onClick={quizPage}>See Quiz!!!!!</button>
        <button onClick={noticePage}>See Notice!!</button>
        <Modal isOpen={modalState} onRequestClose={closeModal}>
                <form onSubmit = {function(e){
                    e.preventDefault();
                    var req = { assignmentName: e.target.assignmentNameBlank.value, openTime: openTime, endTime: endTime, instruction: e.target.instructionBlank.value };
                    console.log(req);
                    axios.post('http://192.249.18.203:8080/class/assignment/create', req,
                    {
                        headers: {
                            'x-access-token': token
                        },
                        params: {
                            classId: classId,
                            userId: userId
                        }
                    })
                    .then(response => { console.log(response) })
                    .catch(error => {
                        console.log(error)
                    })
                }}>
                    <div>assignmentName : <input name = 'assignmentNameBlank'onChange={function(){
            
                    }}></input></div>
                    <div>openTime : 
                        {/* <input name = 'openTimeBlank' onChange={function(){
                    }}></input> */}
                    <DateTimePicker onChange={(date)=>{setOpenTime(date)
                    }} value={openTime} disableClock={true}/>
                    </div>
                    <div>endTime :
                    {/* <input name = 'endTimeBlank' onChange={function(){
                    }}></input> */}
                    <DateTimePicker onChange={(date)=>setEndTime(date)} value={endTime} disableClock={true}/>
                    </div>

                    <div>instruction : <input name = 'instructionBlank' onChange={function(){
                        
                    }}></input></div>
                    <button type="submit">과제 추가하기</button>
                </form>
            </Modal>
            {lecturesInfo}
            <p>Assignment</p>
            <div className = 'assignments'>
            {assignmentsInfo}
            </div>
            {/* {isStudent?{assignmentsInfo}:<div></div>} */}
    </div>);
}

export default ClassPage;