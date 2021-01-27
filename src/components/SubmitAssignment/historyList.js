import React from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
import {useSelector, useDispatch} from "react-redux";
import { selectIsStudent } from '../../redux/auth/auth.selectors';

const HistoryList = ( {assignmentList, filter} ) => {
    var isStudent = useSelector(state => selectIsStudent(state));

    const downloadAssignment = (filename, lastsubmittime) => {
        axios.get("http://192.249.18.203:8080/class/assignment/download", {responseType: 'blob', params: {userId: "jinho123", assignmentId: "202101611579916756KaGfrXz2rtklRbFifVOpgVeLcPHFrQ", fileName: filename, lastSubmitTime: lastsubmittime}})
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