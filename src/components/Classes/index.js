import React, { useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-modal';
import axios from 'axios';
import ClassPage from '../ClassPage'
import {Route} from 'react-router-dom'

const Classes = ({history}) =>{
    var [modalState, setModalState] = useState(false);
    var [instructor, setInstructor] = useState(useSelector(state => state.userId));
    var [classId, setClassId] = useState();
    var [className, setClassName] = useState();
    var [joinPassword, setJoinPassWord] = useState();
    var [lectureDate, setLectureDate] = useState();
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
            axios.post('http://192.249.18.245:8080/class/create', { userId: instructor, lectureDate: lectureDate, className: className, joinPassword: joinPassword },
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
            axios.post('http://192.249.18.245:8080/class/join', {userId:userId,joinPassword:joinPassword,className:className},
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
    var classes = [];
    var classesInfo = [];
    axios.post('http://192.249.18.245:8080/class/get',{isStudent:isStudent,userId:userId},{
        headers: {
            'x-access-token': token
        }
    })
    .then(res =>{
        console.log(res)
        if(res.data.success){
            classes.push(res.data.classes);
            //console.log(res.data.classes)
            console.log(classes)
            classes.forEach(element =>{
                classesInfo.push(<div>{element.className},{element.instructor}</div>)
            })
        }
        else{console.log(res.data.msg)}
    })
    .catch(error =>{
        console.log(error)

    })
    //professor's page
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
            {isStudent?<div>학생 수업 불러오기!!!<div>{classesInfo}111</div></div>
            :<div></div>}
            <button onClick={openModal} >Add Class</button>
            <Modal isOpen={modalState} onRequestClose={closeModal}>
                {!isStudent?
                <form onSubmit = {submitHandler}>
                    <div>lectureDate : <input onChange={function(e){
                        // var dateArr = [];
                        // dateArr.push(new Date(98,2,24))
                        setLectureDate("12/11/1981");
                    }}></input></div>
                    <div>className : <input onChange={classNameHandler}></input></div>
                    <div>joinPassword : <input  onChange={joinPasswordHandler}></input></div>
                    <button type="submit">수업 추가하기</button>
                </form>:
                <form onSubmit = {submitHandler}>
                    <div>className : <input onChange={classNameHandler}></input></div>
                    <div>joinPassword : <input  onChange={joinPasswordHandler}></input></div>
                    <button type="submit">수업 참가하기</button>
                </form>}
                
            </Modal>
        </div>
    );
}

export default Classes;