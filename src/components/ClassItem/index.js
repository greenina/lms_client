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

    var token = useSelector(state => {
        return selectToken(state)}
    );
    var classId = useSelector((state)=> selectClassId(state));
    var userId = useSelector((state)=> selectUserId(state));
    const downloadLecture = (filename, lectureDate) => {
        axios.get(`http://192.249.18.245:8080/class/download`, {
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

    var lectureList = props.lectures.map((lecture) => <button onClick = {() => downloadLecture(lecture.fileName, lecture.lectureDate)}>{lecture.fileName}</button>)

    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("lecturenote", e.target.lecture_note.files[0]); 
        axios
          .post(`http://192.249.18.245:8080/class/upload`, formData, {
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
            <Paper>
                <h3>날짜 : {props.lectureDate}</h3>
                <form onSubmit={onSubmit}>
                <button type="submit" >Upload lecture</button>
                <input type="file" name='lecture_note'/>
                </form>
                {lectureList}
            </Paper>
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
        <div>
            <PaperButton onClick = {(e)=>{
                openModal();
            }}>
                <h3>Assignment_id : {props.assignmentName}</h3>
            </PaperButton>
            <Modal isOpen={modalState} onRequestClose={closeModal}>
                <SubmitAssignment assignmentId = {props.assignmentId} assignmentInstruction = {props.assignmentInstruction}/>
            </Modal>
        </div>
    )
}

export default ClassItem;