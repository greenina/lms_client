import React, { useState } from 'react';
import axios from 'axios';
import querystring from 'querystring';

const SubmitAssignment = () => {
    const today = new Date();
    const [classId, setClassId] = useState('2021016114775373656fJW1tUH10rVD2j3MQGQeKTU75Hm57oJ1E2a7oEc');
    const [assignmentId, setAssignmentId] = useState('202101611579916756KaGfrXz2rtklRbFifVOpgVeLcPHFrQ');
    const [selectedFile, setSelectedFile] = useState(null);
    const [userId, setUserId] = useState('jinho123');

    const fileSelector = (e) => {
        e.preventDefault();
        const files = e.target.files[0];
        console.log(files);
        setSelectedFile(files);
    }

    const classidChangeHandler = (e) => {
        e.preventDefault();
        console.log("change classid")
        setClassId(e.target.value);
    }

    const useridChangeHandler = (e) => {
        e.preventDefault();
        console.log("change userid")
        setUserId(e.target.value);
    }

    const assignmentidChangeHandler = (e) => {
        e.preventDefault();
        console.log("change assignmentid")
        setAssignmentId(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitting assignment");
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


        console.log(selectedFile);

        const submitURL = `http://192.249.18.169:8080/class/assignment/submit?classId=`;

        axios.post(submitURL+classId, formData)
            .then((res) => {
                console.log("get response");
                console.log(res);
            })
            .catch((err) => {
                console.log("errrrrrrrrrrrrrrrrrrrrrrrr");
                console.log(err);
            })
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

                <button text="Submit" onClick={handleSubmit}/>
            </form>

        </div>
        
    )
}

export default SubmitAssignment;