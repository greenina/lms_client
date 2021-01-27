import React, { useState, useEffect, useLayoutEffect } from 'react';
import axios from 'axios';
import querystring from 'querystring';
import HistoryList from './historyList';

const SubmitAssignment = () => {
    const today = new Date();
    const [classId, setClassId] = useState('2021016114775373656fJW1tUH10rVD2j3MQGQeKTU75Hm57oJ1E2a7oEc');
    const [assignmentId, setAssignmentId] = useState('202101611579916756KaGfrXz2rtklRbFifVOpgVeLcPHFrQ');
    const [selectedFile, setSelectedFile] = useState(null);
    const [userId, setUserId] = useState('jinho123');
    const [assignmentHistory, setAssignmentHistory] = useState([]);
    const [submit, setSubmit] = useState(false);

    useEffect(() => {
        loadFileHistory();
    }, [submit])

    const loadFileHistory = () => {
        axios.get(`${process.env.REACT_APP_SERVER}/class/assignment/load`, {params: {userId: "jinho123", assignmentId: "202101611579916756KaGfrXz2rtklRbFifVOpgVeLcPHFrQ"}})
            .then(async (data) => {
                setAssignmentHistory(data.data.history);
            })
    }

    const fileSelector = (e) => {
        e.preventDefault();
        const files = e.target.files[0];
        setSelectedFile(files);
    }

    const classidChangeHandler = (e) => {
        e.preventDefault();
        setClassId(e.target.value);
    }

    const useridChangeHandler = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
    }

    const assignmentidChangeHandler = (e) => {
        e.preventDefault();
        setAssignmentId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
                //add userid 
        formData.append(
            "userId", userId
        )
        formData.append(
            "assignmentId", assignmentId
        )
        formData.append(
            "assignment", selectedFile
        )

        const submitURL = `${process.env.REACT_APP_SERVER}/class/assignment/submit?classId=`;

        axios.post(submitURL+classId, formData)
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            })
        setSubmit(!submit);
    } 
        return (
            <div>
                <h1>Submit Assignment. 학생들을 울려라~~~</h1>
                <form>
                    <br/>
                    <label>
                        assignmentId
                        <input type="text" name="assignmentId" onChange={assignmentidChangeHandler} value='202101611579916756KaGfrXz2rtklRbFifVOpgVeLcPHFrQ'/>
                    </label>
                    <br/>
                    <label>
                        class_id
                        <input type="text" name="classId" onChange={classidChangeHandler} value='2021016114775373656fJW1tUH10rVD2j3MQGQeKTU75Hm57oJ1E2a7oEc'/>
                    </label>
                    <br/>
                    <label>
                        <b>과제를 제출하시오~~</b><br/>
                        <input type="file" name="assignment" onChange={fileSelector} multiple/> 
                    </label>
                    <br/>
                    <label>
                        <b>유저아이디는??</b><br/>
                        <input type="text" name="userId" onChange={useridChangeHandler} value="jinho123"/>
                    </label>
                    <br/>
                    <button text="Submit" onClick={handleSubmit}>Submit</button>
                </form>
    
                <br/>
                <HistoryList assignmentList={assignmentHistory}/>
            </div>
            
        )
}

export default SubmitAssignment;