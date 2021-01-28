import React, { useState, useEffect, useLayoutEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import querystring from 'querystring';
import HistoryList from './historyList';
import { selectClassId, selectClassStudents, selectIsStudent, selectToken, selectUserId } from '../../redux/auth/auth.selectors';
import './style.css';
import path from "./simple-upload-arrow-button.png";

const SubmitAssignment = (props) => {
    var userId = useSelector(state => selectUserId(state));
    var classId = useSelector(state => selectClassId(state));
    var isStudent = useSelector(state => selectIsStudent(state));
    var students = useSelector(state=> selectClassStudents(state));
    var token = useSelector(state=>selectToken(state));
    const [selectedFile, setSelectedFile] = useState(null);
    const [assignmentHistory, setAssignmentHistory] = useState([]);
    const [submit, setSubmit] = useState(false);
    const [filter, setFilter] = useState(null);
    const [fileName, setFileName] = useState('');

    useEffect(() => {
        loadFileHistory();
    }, [submit])

    const loadFileHistory = () => {
        if(isStudent){
            axios.get('http://192.249.18.203:8080/class/assignment/load', {
                headers: {
                    'x-access-token': token
                },
                params: { userId: userId, classId: classId, assignmentId: props.assignmentId }
            })
                .then(async (data) => {
                    console.log(data);
                    setAssignmentHistory(data.data.history);
                })
        }
        else{
            axios.get('http://192.249.18.203:8080/class/assignment/loadall', {
                headers: {
                    'x-access-token': token
                },
                params: { userId: userId, classId: classId, assignmentId: props.assignmentId }
            })
                .then(async (data) => {
                    console.log(data);
                    setAssignmentHistory(data.data.history);
                })
        }
    }

    const fileSelector = (e) => {
        e.preventDefault();
        const files = e.target.files[0];
        setSelectedFile(files);
        if(files === undefined)
            setFileName('');
        else  
            setFileName(e.target.files[0].name);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
                //add userid 
        formData.append(
            "userId", userId
        )
        formData.append(
            "assignmentId", props.assignmentId
        )
        formData.append(
            "assignment", selectedFile
        )
        formData.append(
            "progress", 2
        )

        const submitURL = `http://192.249.18.203:8080/class/assignment/submit`;

        axios.post(submitURL, formData, {
            headers: {
                'x-access-token': token
            },
            params : {
                classId: classId,
                userId: userId
            }
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        setSubmit(!submit);
    } 

    const loadStudents = () => {
        return students.map((element) => <button onClick = {function(e){
            e.preventDefault();
            setFilter(element);
        }}>{element}</button>)
    }
        return (
            <div className = 'content-div'>
                <div>{props.assignmentInstruction}</div>
                <br/>
                {isStudent?
                <form>
                        <br/>

                        <div className="image-upload">
                            <input class="upload-name" value={fileName} disabled="disabled"/>
                            <label for="file-input">
                                <img src={path}  className ='image'/>
                            </label>
                            <input id="file-input" type="file" name="assignment" onChange={fileSelector} multiple />
                            <button text="Submit" onClick={handleSubmit}>Submit</button>
                        </div>
                </form>:
                <div>
                        <button onClick={function (e) {
                            e.preventDefault();
                            setFilter(null);
                        }}>all</button>
                    {loadStudents()}</div>
                }
                <HistoryList assignmentList={assignmentHistory} filter = {filter} assignmentId = {props.assignmentId}/>
            </div>
            
        )
}

export default SubmitAssignment;