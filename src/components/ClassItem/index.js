import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import PaperButton from "react-paper-button";
import {enterClass} from '../../index'
import {useHistory} from 'react-router-dom'

const ClassItem = (props) =>{
    const history = useHistory();
    var dispatch = useDispatch();

    return(
        <div>
            <PaperButton onClick = {(e)=>{
                console.log(props.classId)
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

    return(
        <div>
            <Paper>
                <h3>날짜 : {props.lectureDate}</h3>
            </Paper>
        </div>
    )
}

export default ClassItem;