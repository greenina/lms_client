import React from 'react';
import axios from 'axios';
import FileDownload from 'js-file-download';
const HistoryList = ( {assignmentList} ) => {

    const downloadAssignment = (filename, lastsubmittime) => {
        axios.get("http://192.249.18.203:8080/class/assignment/download", {responseType: 'blob', params: {userId: "jinho123", assignmentId: "202101611579916756KaGfrXz2rtklRbFifVOpgVeLcPHFrQ", fileName: filename, lastSubmitTime: lastsubmittime}})
            .then((res) => {
                console.log(res);
                FileDownload(res.data, res.config.params.fileName);
            })
    }

    const loadList = () => {
        console.log("hello world!!")
        console.log(assignmentList);
        let i = 0;
        return assignmentList.map((submit) => {
            console.log(submit.lastSubmitTime)
            i = i + 1;
            return <li key={i}>{submit.fileName} {submit.lastSubmitTime}  <button onClick={() => downloadAssignment(submit.fileName, submit.lastSubmitTime)}/> </li>
        })
    }

    return (
        <ul>
            {loadList()}
        </ul>
    )
}

export default HistoryList;