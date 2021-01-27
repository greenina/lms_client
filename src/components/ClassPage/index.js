import React, { Component, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import axios from 'axios';
import {LectureItem} from '../ClassItem'
import {selectToken, selectIsStudent, selectUserId, selectClassId} from '../../redux/auth/auth.selectors'
import SubmitAssignment from  '../SubmitAssignment/index'

const ClassPage = (props) => {
    var [modalState, setModalState] = useState(false);
    var [openTime, setOpenTime] = useState(new Date());
    var [endTime, setEndTime] = useState(new Date());
    var [lecturesInfo, setLecturesInfo] = useState();
    var token = useSelector(state => {
        return selectToken(state)}
    );
    var classId = useSelector(state => {
        return selectClassId(state)}
    );

    var isStudent = useSelector(state => {
        return selectIsStudent(state)
    })
    useEffect(()=>{
        getDatafromServer();
    },[])

    const getDatafromServer = async () =>{
        var res = await axios.post('http://192.249.18.203:8080/class/info',  {classId: classId}, {
            headers: {
                'x-access-token': token
            },
            params: {
                classId: classId
            }
        })
        
        var classInfo = res.data.classInfo;
        console.log(classInfo);
        var dates = res.data.classInfo.dates.sort((a,b) => {
            return new Date(a.scheduled_for).getTime() - 
                new Date(b.scheduled_for).getTime()
        });
        
        var lectures = res.data.classInfo.lectures;
        console.log(lectures)
        debugger
        var info = dates.map(element => <LectureItem lectureDate = {element} lectures = {lectures.filter((lecture) => {
            if((new Date(lecture.lectureDate)).getTime() === new Date(element).getTime())
                return true;
            else
                return false;
        })}/>)
        setLecturesInfo(info);
        return info;
    }

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };

    // const onChange = e => {
    //     setContent(e.target.files[0]);
    //   };

    return(<div>
        <p>ClassPage</p>
        <button onClick={openModal} >Add assignment</button>
        <Modal isOpen={modalState} onRequestClose={closeModal}>
                <form onSubmit = {function(e){
                    e.preventDefault();
                    var req = { assignmentName: e.target.assignmentNameBlank.value, openTime: openTime, endTime: endTime, instruction: e.target.instructionBlank.value };
                    console.log(req);
                    //debugger;
                    axios.post('http://192.249.18.203:8080/class/assignment/create?classId='+classId, req,
                    {
                        headers: {
                            'x-access-token': token
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
                    <DateTimePicker onChange={setEndTime} value={endTime} disableClock={true}/>
                    </div>

                    <div>instruction : <input name = 'instructionBlank' onChange={function(){
                        
                    }}></input></div>
                    <button type="submit">과제 추가하기</button>
                </form>
            </Modal>
            {lecturesInfo}
            <p>Assignment</p>
            {isStudent?<SubmitAssignment/>:<div></div>}
    </div>);
}

export default ClassPage;