import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PaperButton from "react-paper-button";
import {useHistory} from 'react-router-dom'
import { enterClass } from '../../redux/auth/auth.actions';
import axios from 'axios';
import { selectClassId, selectToken } from '../../redux/auth/auth.selectors';
import fileDownload from 'js-file-download';

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

    const downloadLecture = (filename, lectureDate) => {
        axios.get("http://192.249.18.203:8081/class/download", {
            responseType: 'blob',
            headers: {
                'x-access-token': token
            },
            params: {
                classId: classId, fileName: filename, lectureDate: lectureDate
            }
        })
            .then((res) => {
                console.log(res);
                fileDownload(res.data, res.config.params.fileName);
            })
    }

    var lectureList = props.lectures.map((lecture) => <button onClick = {() => downloadLecture(lecture.fileName, lecture.lectureDate)}>{lecture.fileName}</button>)

    var classId = useSelector((state)=> selectClassId(state));
    const onSubmit = e => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("lecturenote", e.target.lecture_note.files[0]); 
        axios
          .post("http://192.249.18.203:8081/class/upload", formData, {
            headers: {
                'x-access-token': token
            },
            params: {
                classId: classId,
                lectureDate: props.lectureDate
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

export default ClassItem;