import React, { useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import DateTimePicker from 'react-datetime-picker';
import Modal from 'react-modal';
import axios from 'axios';

const ClassPage = (props) => {
    var [modalState, setModalState] = useState(false);
    var [openTime, setOpenTime] = useState(new Date());
    var [endTime, setEndTime] = useState(new Date());
    var token = useSelector(state => {
        //console.log(state);
        return state.jwt}
    );

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };

    return(<div>
        <p>ClassPage</p>
        <button onClick={openModal} >Add Class</button>
        <Modal isOpen={modalState} onRequestClose={closeModal}>
                <form onSubmit = {function(e){
                    var req = { assignmentName: e.target.assignmentNameBlank.value, openTime: openTime.toLocaleString(), endTime: endTime.toLocaleString(), instruction: e.target.instructionBlank.value };
                    console.log(req);
                    axios.post('http://192.249.18.169:8080/class/assignment/create?classId='+props.classId, req,
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
                    console.log(date)
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
    </div>);
}

export default ClassPage;