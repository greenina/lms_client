import React from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import {useSelector, useDispatch} from "react-redux";
import { selectClassId, selectIsStudent, selectToken, selectUserId } from '../../redux/auth/auth.selectors';

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
                return <li key={i}> {isStudent ? null : submit.userId + ':'} {submit.fileName} {submit.lastSubmitTime}  <button onClick={() => downloadAssignment(submit.fileName, submit.lastSubmitTime)} /> </li>
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
                return <li key={i}> {isStudent ? null : submit.userId + ':'} {submit.fileName} {submit.lastSubmitTime}  <button onClick={() => downloadAssignment(submit.fileName, submit.lastSubmitTime)} /> </li>
            })
        }
    }

    return (
        <ul>
            {loadList()}
        </ul>
    )
}

export default HistoryList;