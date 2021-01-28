import React, { useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PaperButton from "react-paper-button";
import {useHistory} from 'react-router-dom'
import { enterClass } from '../../redux/auth/auth.actions';
import axios from 'axios';
import { selectClassId, selectToken, selectUserId } from '../../redux/auth/auth.selectors';
import fileDownload from 'js-file-download';
import Modal from 'react-modal';
import SubmitAssignment from  '../SubmitAssignment/index'
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Typography,
  } from "@material-ui/core"
import './style.css'
import path from './round-add-button.png'
import path2 from './lecture_note.png'

const ClassItem = (props) =>{
    const history = useHistory();
    var dispatch = useDispatch();

    return(
        <div>
            <PaperButton onClick = {(e)=>{
                dispatch(enterClass(props.classId))
                history.push('/classpage')
            }}>
                <h3>수업명 : {props.className}</h3>
                <div>교수 : {props.instructor}</div>
            </PaperButton>
        </div>
    )
}


export const LectureItem = (props) =>{
    const history = useHistory();
    var dispatch = useDispatch();
    var [modalState, setModalState] = useState(false);

    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };

    const openModal = (e) => {
        e.preventDefault();
        setModalState(true);
    };

    var token = useSelector(state => {
        return selectToken(state)}
    );
    var classId = useSelector((state)=> selectClassId(state));
    var userId = useSelector((state)=> selectUserId(state));
    const downloadLecture = (filename, lectureDate) => {
        axios.get(`http://192.249.18.203:8080/class/download`, {
            responseType: 'blob',
            headers: {
                'x-access-token': token
            },
            params: {
                classId: classId, fileName: filename, lectureDate: lectureDate, userId: userId
            }
        })
            .then((res) => {
                console.log(res);
                fileDownload(res.data, res.config.params.fileName);
            })
    }

    var lectureList = props.lectures.map((lecture) => <div className = 'div-lecture'>
        <button className='img-button2' onClick = {() => downloadLecture(lecture.fileName, lecture.lectureDate)}><img src = {path2} className = 'img-lecture'/></button>
        <div><small>{lecture.fileName}</small></div>
        </div>)

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("lecturenote", e.target.lecture_note.files[0]); 
        axios
          .post(`http://192.249.18.203:8080/class/upload`, formData, {
            headers: {
                'x-access-token': token
            },
            params: {
                classId: classId,
                lectureDate: props.lectureDate,
                userId: userId
            }
        })
          .then(res => {
            alert("The file is successfully uploaded");
          })
          .catch(err => {
            console.error(err);
          });
    };

    return(
        <div>
            {/* <Paper>
                <h3>{(new Date(props.lectureDate)).toLocaleString()}</h3>
                <form onSubmit={onSubmit}>
                <button type="submit" >Upload lecture</button>
                <input type="file" name='lecture_note'/>
                </form>
                {lectureList}
            </Paper> */}
            {/* <img className = 'add-button' src = {path}/> */}
            <Card className = "my-card2" elevation={5}>
            <CardHeader title = {(new Date(props.lectureDate)).toLocaleString()} action = {<button className='img-button' onClick = {(e) => {
                openModal(e)
            }}>+</button>} className = "card-header" />
            <CardContent className = "my-card-content2">
                <Modal isOpen={modalState} onRequestClose={closeModal} className = 'modal'>
                        <form onSubmit={onSubmit}>
                            <button type="submit" >Upload lecture</button>
                            <input type="file" name='lecture_note' />
                        </form>
                </Modal>
                {lectureList}
            </CardContent>
        </Card>
        </div>
    )
}

export const AssignmentItem = (props) =>{
    const history = useHistory();
    var dispatch = useDispatch();
    var [modalState, setModalState] = useState(false);

    const openModal = () => {
        setModalState(true);
    };

    const closeModal = event => {
        event.preventDefault();
        setModalState(false);
    };
    
    return(
        <Card className = "my-card" elevation={5}>
            <CardHeader title = {props.assignmentName} className = "card-header" />
            <CardContent className = "my-card-content">
                <SubmitAssignment assignmentId = {props.assignmentId} assignmentInstruction = {props.assignmentInstruction}/>
            </CardContent>
        </Card>
    )
}

export default ClassItem;