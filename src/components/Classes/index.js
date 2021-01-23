import React, { useState } from 'react'
import Modal from 'react-modal';
import axios from 'axios';

const Classes = () =>{
    var [modalState, setModalState] = useState(false);
    var [instructor, setInstructor] = useState();
    var [classId, setClassId] = useState();
    var [className, setClassName] = useState();
    var [joinPassword, setJoinPassWord] = useState();

    const openModal = () => {
        setModalState(true);
    };
    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };
    const submitHandler = (e) =>{
        e.preventDefault();
        axios.post('http://192.249.18.245:8080/class/create', {instructor:instructor, classId:classId, className:className, joinPassword:joinPassword})
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
                    <div>Instructor : <input onChange={instructorHandler}></input></div>
                    <div>classId : <input onChange={classIdHandler}></input></div>
                    <div>className : <input onChange={classNameHandler}></input></div>
                    <div>joinPassword : <input  onChange={joinPasswordHandler}></input></div>
                    <button type="submit">수업 추가하기</button>
                </form>
            </Modal>
        </div>
    );
}

export default Classes;