import React, { Component, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import Modal from 'react-modal';
import axios from 'axios';
import ClassPage from '../ClassPage'
import {Route} from 'react-router-dom'
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
    //var classesInfo = [];
    const getDatafromServer = async() =>{
        var res = await  axios.post('http://192.249.18.245:8080/class/get',{isStudent:isStudent,userId:userId},{
            headers: {
                'x-access-token': token
            }
        }) 
        //var classes = [];
        var classes = res.data.classes
        console.log(classes)
        //classes.push(res.data.classes);
        //console.log(classes[0].className)
        var info = classes.map(element => <ClassItem className={element.className} instructor = {element.instructor}/>)
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
            <div>수업 목록{classesInfo}</div>
        {/* {isStudent?<div>{classesInfo}</div>
            :<div></div>} */}
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

// const Classes = () =>{
//     const history = useHistory();
//     var [modalState, setModalState] = useState(false);
//     var [instructor, setInstructor] = useState(useSelector(state => state.userId));
//     var [classId, setClassId] = useState();
//     var [className, setClassName] = useState();
//     var [joinPassword, setJoinPassWord] = useState();
//     var [lectureDate, setLectureDate] = useState();
//     var [classesInfo, setClassesInfo] = useState([]);
//     var token = useSelector(state => {
//         //console.log(state);
//         return state.jwt}
//     );
//     var isStudent = useSelector(state => {
//         console.log(state);
//         return state.isStudent}
//     );

//     var userId = useSelector(state => {
//         //console.log(state);
//         return state.userId}
//     );

//     const openModal = () => {
//         setModalState(true);
//     };

//     const closeModal = event => {
//         event.preventDefault();
//         setModalState(false);
//     };

//     const submitHandler = (e) =>{
//         e.preventDefault();
//         console.log("isStudent",isStudent)
//         console.log(token)
//         // debugger;
//         if (!isStudent) {
//             axios.post('http://192.249.18.245:8080/class/create', { userId: instructor, lectureDate: lectureDate, className: className, joinPassword: joinPassword },
//                 {
//                     headers: {
//                         'x-access-token': token
//                     }
//                 })
//                 .then(response => { console.log(response) })
//                 .catch(error => {
//                     console.log(error)
//                 })
//         }
//         else{
//             axios.post('http://192.249.18.245:8080/class/join', {userId:userId,joinPassword:joinPassword,className:className},
//             {
//                 headers: {
//                     'x-access-token': token
//                 }
//             })
//             .then(response=>{
//                 console.log(response)
//                 if(!response.data.success){
//                     history.push('/classpage');
//                 }else{
//                     // document.location.href = "/classpage";
//                     history.push('/classpage');
//                 }
//             })
//             .catch(error =>{
//                 return error
//                 console.log(error)

//             })
//         }
//       }
//     var classes = [];
    

//     const getDataFromServer = async() =>{
//         const res = await axios.post('http://192.249.18.245:8080/class/get',{isStudent:isStudent,userId:userId},{
//             headers: {
//                 'x-access-token': token
//             }
//         })
//         await axios.post('http://192.249.18.245:8080/class/get',{isStudent:isStudent,userId:userId},{
//             headers: {
//                 'x-access-token': token
//             }
//         })
//         return (res.data.classes).map(element => <li key = {element.className}>{element.className},{element.instructor}</li>)
//     }
    
//     // const infos = useAsync({promiseFn:getDataFromServer});
//     // setClassesInfo(infos)

//     useEffect(()=>{
//         const infos = useAsync({promiseFn:getDataFromServer})
//         //const infos = await getDataFromServer();
//         console.log("infos1",infos)
//         setTimeout(() => {
//             setClassesInfo(infos);
//             console.log("infos2",infos);
//         }, 3000);
        
        
//      },[])
//     //professor's page
//     const instructorHandler = (e) =>{
//         setInstructor(e.target.value);
//     }
//     const classIdHandler = (e) =>{
//         setClassId(e.target.value);
//     }
//     const classNameHandler = (e) =>{
//         setClassName(e.target.value);
//     }
//     const joinPasswordHandler = (e) =>{
//         setJoinPassWord(e.target.value);
//     }

//     //student's page
   
//     return(
//         <div>
//             <Route path="/classpage"exact={true} component={ClassPage}/>
//         {isStudent?<div>학생 수업 불러오기!!!{classesInfo}</div>
//             :<div></div>}
//             <button onClick={openModal} >Add Class</button>
//             <Modal isOpen={modalState} onRequestClose={closeModal}>
//                 {!isStudent?
//                 <form onSubmit = {submitHandler}>
//                     <div>lectureDate : <input onChange={function(e){
//                         // var dateArr = [];
//                         // dateArr.push(new Date(98,2,24))
//                         setLectureDate("12/11/1981");
//                     }}></input></div>
//                     <div>className : <input onChange={classNameHandler}></input></div>
//                     <div>joinPassword : <input  onChange={joinPasswordHandler}></input></div>
//                     <button type="submit">수업 추가하기</button>
//                 </form>:
//                 <form onSubmit = {submitHandler}>
//                     <div>className : <input onChange={classNameHandler}></input></div>
//                     <div>joinPassword : <input  onChange={joinPasswordHandler}></input></div>
//                     <button type="submit">수업 참가하기</button>
//                 </form>}
//             </Modal>
//         </div>
//     );

    
// }

export default Classes;