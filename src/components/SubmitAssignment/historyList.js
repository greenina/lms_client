import React from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import {useSelector, useDispatch} from "react-redux";
import { selectClassId, selectIsStudent, selectToken, selectUserId } from '../../redux/auth/auth.selectors';
import './style.css'

const HistoryList = ( {assignmentList, filter, assignmentId} ) => {
    var isStudent = useSelector(state => selectIsStudent(state));
    var userId = useSelector(state => selectUserId(state));
    var classId = useSelector(state => selectClassId(state));
    var token = useSelector(state => selectToken(state));

    const downloadAssignment = (filename, lastsubmittime) => {
        axios.get("http://192.249.18.203:8080/class/assignment/download", {responseType: 'blob',
            headers: {
            'x-access-token': token
            },
            params: {userId: userId, classId: classId, assignmentId: assignmentId, fileName: filename, lastSubmitTime: lastsubmittime}})
            .then((res) => {
                console.log(res);
                FileDownload(res.data, res.config.params.fileName);
            })
    }

    const loadList = () => {
        if (filter === null) {
            let i = 0;
            return assignmentList.map((submit) => {
                i = i + 1;
                return <div key={i}> 
                <span>{(new Date(submit.lastSubmitTime)).toLocaleString()}</span>
                <span className='filename'>{submit.fileName}</span>
                {isStudent ? null : <span className ='userId'>{submit.userId}</span>}
                <button onClick={() => downloadAssignment(submit.fileName, submit.lastSubmitTime)} className='download'>download</button> </div>
            })
        }
        else{
            let i = 0;
            var newlist = assignmentList.filter((assignment) => {
                if(assignment.userId == filter)
                    return true;
                else
                    return false;
            });
            return newlist.map((submit) => {
                i = i + 1;
                return <div key={i}> 
                <span>{(new Date(submit.lastSubmitTime)).toLocaleString()}</span>
                <span className='filename'>{submit.fileName}</span>
                {isStudent ? null : <span className ='userId'>{submit.userId}</span>}
                <button onClick={() => downloadAssignment(submit.fileName, submit.lastSubmitTime)} className='download'>download</button> </div>
            })
        }
    }

    return (
        <ul className = 'history-content'>
            {loadList()}
        </ul>
    )
}

export default HistoryList;