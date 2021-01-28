import React, { useState, useEffect, useLayoutEffect } from 'react';
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import querystring from 'querystring';
import HistoryList from './historyList';
import { selectClassId, selectClassStudents, selectIsStudent, selectToken, selectUserId } from '../../redux/auth/auth.selectors';

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
            <div>
                <h1>Submit Assignment. 학생들을 울려라~~~</h1>
                <div>{props.assignmentInstruction}</div>
                {isStudent?
                <form>
                    <br/>
                    <label>
                        <b>과제를 제출하시오~~</b><br/>
                        <input type="file" name="assignment" onChange={fileSelector} multiple/> 
                    </label>
                    <button text="Submit" onClick={handleSubmit}>Submit</button>
                </form>:
                <div>
                        <button onClick={function (e) {
                            e.preventDefault();
                            setFilter(null);
                        }}>all</button>
                    {loadStudents()}</div>
                }
                <br/>
                <HistoryList assignmentList={assignmentHistory} filter = {filter} assignmentId = {props.assignmentId}/>
            </div>
            
        )
}

export default SubmitAssignment;