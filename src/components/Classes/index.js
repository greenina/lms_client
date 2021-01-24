import React, { useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-modal';
import axios from 'axios';

const Classes = (props) =>{
    var [modalState, setModalState] = useState(false);
    var [instructor, setInstructor] = useState(useSelector(state => state.userId));
    var token = useSelector(state => state.jwt);
    var [classId, setClassId] = useState();
    var [className, setClassName] = useState();
    var [joinPassword, setJoinPassWord] = useState();
    var [lectureDate, setLectureDate] = useState();

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };
    const submitHandler = (e) =>{
        
        console.log(token);
        e.preventDefault();
        var req = {userId:instructor, lectureDate:lectureDate, className:className, joinPassword:joinPassword};
        console.log(req);
        debugger;
        axios.post('http://192.249.18.169:8080/class/create', {userId:instructor, lectureDate:lectureDate, className:className, joinPassword:joinPassword},
        {
            headers: {
                'x-access-token': token
            }
        })
        .then(response=>{console.log(response)})
        .catch(error =>{
          console.log(error)
        })
      }
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
    
    return(
        <div>
            <button onClick={openModal} >Add Class</button>
            <Modal isOpen={modalState} onRequestClose={closeModal}>
                <form onSubmit = {submitHandler}>
                    <div>lectureDate : <input onChange={function(e){
                        var dateArr = [];
                        dateArr.push(new Date(98,2,24))
                        setLectureDate(dateArr);
                    }}></input></div>
                    <div>className : <input onChange={classNameHandler}></input></div>
                    <div>joinPassword : <input  onChange={joinPasswordHandler}></input></div>
                    <button type="submit">수업 추가하기</button>
                </form>
            </Modal>
        </div>
    );
}

export default Classes;