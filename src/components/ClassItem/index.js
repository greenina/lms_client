import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PaperButton from "react-paper-button";
import {useHistory} from 'react-router-dom'
import { enterClass } from '../../redux/auth/auth.actions';
import axios from 'axios';
import { selectClassId, selectToken , selectUserId } from '../../redux/auth/auth.selectors';
import fileDownload from 'js-file-download';
import {
    Card,
    CardHeader,
    CardContent,
  } from "@material-ui/core"
import lecturenote from './lecturenote.svg'
import './style.css'

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


export const LectureItem = ({classId, lectures, lectureDate, uploadLecture, setUploadLecture}) =>{

    var userId = useSelector((state)=> selectUserId(state));
    var token = useSelector(state => {
        return selectToken(state)}
    );

    const downloadLecture = (filename, lectureDate) => {
        axios.get("http://192.249.18.169:8080/class/download", {
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
    var lectureList = lectures.map((lecture) => <div className="div-lecture">
        <img onClick = {() => downloadLecture(lecture.fileName, lecture.lectureDate)} className="lectureimg" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIj8+CjxzdmcgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB2aWV3Qm94PSIwIDAgNTEyIDUxMiIgd2lkdGg9IjUxMiIgaGVpZ2h0PSI1MTIiPjxnIGlkPSJvdXRsaW5lIj48cGF0aCBkPSJNMTM2LDEyMEgzMTJhOCw4LDAsMCwwLDAtMTZIMTM2YTgsOCwwLDAsMCwwLDE2WiIvPjxwYXRoIGQ9Ik0xMzYsMTY4SDMxMmE4LDgsMCwwLDAsMC0xNkgxMzZhOCw4LDAsMCwwLDAsMTZaIi8+PHBhdGggZD0iTTEzNiwyMTZIMzEyYTgsOCwwLDAsMCwwLTE2SDEzNmE4LDgsMCwwLDAsMCwxNloiLz48cGF0aCBkPSJNMTM2LDI2NEgzMTJhOCw4LDAsMCwwLDAtMTZIMTM2YTgsOCwwLDAsMCwwLDE2WiIvPjxwYXRoIGQ9Ik0xMzYsMzEyaDY0YTgsOCwwLDAsMCwwLTE2SDEzNmE4LDgsMCwwLDAsMCwxNloiLz48cGF0aCBkPSJNNDUyLjEzMiwyMDUuMDE1YTI0LjAyNCwyNC4wMjQsMCwwLDAtMzIuODQxLDguNTcxTDQwMCwyNDYuNVY0OGE4LDgsMCwwLDAtOC04SDMzMS4zMTRzLTI0LjAzOC0yNC40OC0yNS0yMy42NTZBNy45NzYsNy45NzYsMCwwLDAsMzA0LDE2SDcyYTgsOCwwLDAsMC04LDhWNDkuMDEzYTMyLDMyLDAsMCwwLDAsNjEuOTc0djE4LjAyNmEzMiwzMiwwLDAsMCwwLDYxLjk3NHYxOC4wMjZhMzIsMzIsMCwwLDAsMCw2MS45NzR2MTAuMDI2YTMyLDMyLDAsMCwwLDAsNjEuOTc0VjM5MmE4LDgsMCwwLDAsOCw4aDh2MjRhOCw4LDAsMCwwLDgsOEgyOTEuMjkybC01LjQ4Miw5LjM1NGE3LjkzOCw3LjkzOCwwLDAsMC0uOTgxLDIuNzIxYy0uMDA4LjA0Ni0uMDIxLjA4NS0uMDI4LjEzMmwtLjAyLjEzMSwwLC4wMy02LjQsNDIuNDRhOCw4LDAsMCwwLDEyLjgxNyw3LjUxMUwzMjUuMjI2LDQ2Ny45YzIuMTgtMS42OTMsMy4yNDUtMi43MjksMy4wNzYtNC4xMTlMMzQ2LjkyNiw0MzJIMzkyYTgsOCwwLDAsMCw4LThWMzQxLjQzOGw2MC43LTEwMy41ODNBMjQuMDI3LDI0LjAyNywwLDAsMCw0NTIuMTMyLDIwNS4wMTVaTTQzNy45NzcsMjE3Ljk4YTgsOCwwLDAsMSw4LjkyMiwxMS43ODZsLTQuMDQ1LDYuOS0xMy44LTguMDksNC4wNDYtNi45QTcuOTQ0LDcuOTQ0LDAsMCwxLDQzNy45NzcsMjE3Ljk4Wk0zMTcuNDYyLDQ1MC42MzJsLTEzLjgtOC4wOUw0MDguODI2LDI2My4wODlsMTMuOCw4LjA5Wk0zMTIsNDMuMzE0LDM0MC42ODYsNzJIMzEyWm0xMDQuOTE2LDIwNS45Nyw0LjA0NC02LjksMTMuODA1LDguMDktNC4wNDUsNi45Wk0zODQsNTZWMjcyYTguMDQxLDguMDQxLDAsMCwwLC4xNTIsMS41NDZMMzY4LDMwMS4xMDhWODBhNy45NzgsNy45NzgsMCwwLDAtMi4zMzYtNS42NDlsLS4wMDctLjAwOEwzNDcuMzE0LDU2Wk04MCwzMkgyOTZWODBhOCw4LDAsMCwwLDgsOGg0OFYzMjguNDFMMzE5LjQyMiwzODRIODBWMzQyLjk4OGEzMS45NzQsMzEuOTc0LDAsMCwwLDIyLjk5MS0yMi45OTQsOCw4LDAsMCwwLTE1LjUtMy45ODhBMTUuOTQ4LDE1Ljk0OCwwLDAsMSw4MCwzMjUuODVWMjcwLjk4OGEzMS45NzQsMzEuOTc0LDAsMCwwLDIyLjk5MS0yMi45OTQsOCw4LDAsMCwwLTE1LjUtMy45ODhBMTUuOTQ4LDE1Ljk0OCwwLDAsMSw4MCwyNTMuODVWMTkwLjk4OGEzMS45NzQsMzEuOTc0LDAsMCwwLDIyLjk5MS0yMi45OTQsOCw4LDAsMCwwLTE1LjUtMy45ODhBMTUuOTQ4LDE1Ljk0OCwwLDAsMSw4MCwxNzMuODVWMTEwLjk4OGEzMS45NzQsMzEuOTc0LDAsMCwwLDIyLjk5MS0yMi45OTQsOCw4LDAsMCwwLTE1LjUtMy45ODhBMTUuOTQ4LDE1Ljk0OCwwLDAsMSw4MCw5My44NVpNNTYsODBhMTYsMTYsMCwwLDEsOC0xMy44MzV2MjcuNjdBMTYsMTYsMCwwLDEsNTYsODBabTAsODBhMTYsMTYsMCwwLDEsOC0xMy44MzV2MjcuNjdBMTYsMTYsMCwwLDEsNTYsMTYwWm0wLDgwYTE2LDE2LDAsMCwxLDgtMTMuODM1djI3LjY3QTE2LDE2LDAsMCwxLDU2LDI0MFptMCw3MmExNiwxNiwwLDAsMSw4LTEzLjgzNXYyNy42N0ExNiwxNiwwLDAsMSw1NiwzMTJaTTk2LDQxNlY0MDBIMzEwLjA0NWwtOS4zNzcsMTZabTIwMi44NjEsNDIuMjc2LDcuMjE5LDQuMjMxLTguOSw2LjkwOFpNMzg0LDQxNkgzNTYuM0wzODQsMzY4LjczOVoiLz48L2c+PC9zdmc+Cg==" />
    <div><small>{lecture.fileName}</small></div>
    </div>)
    // var lectureList = props.lectures.map((lecture) => <button onClick = {() => downloadLecture(lecture.fileName, lecture.lectureDate)}>{lecture.fileName}</button>)

    const onSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();
        console.log(e.target.lecture_note);
        formData.append("lecturenote", e.target.lecture_note.files[0]); 
        axios
          .post("http://192.249.18.169:8080/class/upload", formData, {
            headers: {
                'x-access-token': token
            },
            params: {
                userId: userId,
                classId: classId,
                lectureDate: lectureDate
            }
        })
          .then(res => {
            alert("The file is successfully uploaded");
            setUploadLecture(!uploadLecture);
          })
          .catch(err => {
            console.error(err);
          });
    };

    return(
        <div>
            <Card className = "my-card2" elevation={5}>
                <CardHeader title = {(new Date(lectureDate)).toLocaleString()} className = "card-header" />
                    <CardContent className = "my-card-content2">
                        {lectureList}
                    <form onSubmit={onSubmit}>
                        <button type="submit" >Upload lecture</button>
                        <input type="file" name='lecture_note'/>
                    </form>
                    </CardContent>
                    
            </Card>
        </div>
    )
}

export default ClassItem;