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

const Assignments = (props) => {
    var [assignmentsInfo, setAssignmentsInfo] = useState();
    var [modalState, setModalState] = useState(false);
    var [openTime, setOpenTime] = useState(new Date());
    var [endTime, setEndTime] = useState(new Date());
    var token = useSelector(state => {
        return selectToken(state)}
    );
    var classId = useSelector(state => {
        return selectClassId(state)}
    );
    var userId = useSelector(state => {
        return selectUserId(state)
    })
    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };

    useEffect(()=>{
        getDatafromServer();
    },[assignmentsInfo])

    const getDatafromServer = () =>{
        
        axios.get('http://192.249.18.203:8080/class/info', {
            headers: {
                'x-access-token': token
            },
            params: {
                classId: classId, 
                userId: userId
            }})
            .then((res) => {
                var assignments = res.data.assignments;

                var assignInfo = assignments.map(element => <AssignmentItem assignmentId = {element.assignmentId} assignmentName = {element.assignmentName} assignmentInstruction ={element.instruction} assignment = {element}/>)
                 setAssignmentsInfo(assignInfo);
            })
    }

    // useEffect(()=>{
    //     listAssignments(props.assignments);
    // },[])

    // const listAssignments = (assignments) => {
    //     var assignInfo = assignments.map(element => <AssignmentItem assignmentId = {element.assignmentId} assignmentName = {element.assignmentName} assignmentInstruction ={element.instruction} assignment = {element}/>)
    //     setAssignmentsInfo(assignInfo);
    // }
    const openModal = () => {
        setModalState(true);
    };

    return(<div>
            <button onClick={openModal} className='add-assign'>Add assignment</button>
            <Modal isOpen={modalState} onRequestClose={closeModal}>
                <form onSubmit = {function(e){
                    e.preventDefault();
                    var req = { assignmentName: e.target.assignmentNameBlank.value, openTime: openTime, endTime: endTime, instruction: e.target.instructionBlank.value };
                    console.log(req);
                    console.log(classId)
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
            <div className = 'assignments'>
                {assignmentsInfo}
            </div>
    </div>);
}

export default Assignments;