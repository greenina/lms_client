import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from "react-redux";
import PaperButton from "react-paper-button";
import { useHistory } from 'react-router-dom'
import { enterClass } from '../../redux/auth/auth.actions';
import axios from 'axios';
import { selectClassId, selectToken, selectUserId } from '../../redux/auth/auth.selectors';
import './style.css';

const TaskItem = (props) => {
    const [progress, setProgress] = useState(props.progress);
    const [color2, setColor] = useState()

    var date = new Date(props.date)
    var stringDate = date.getFullYear() + '/' + String(parseInt(date.getMonth()) + 1) + '/' + ("0" + date.getDate()).slice(-2);

    const colorsetting = () => {
        var color = "red"
        switch (progress) {
            case "0":
                color = "red"
            case "1":
                color = "orange"
            case "2":
                color = "blue"
            default:
                color = "black"
        }
        setColor(color);
    }
    useEffect(() => {
        colorsetting();
    }, [progress])
    var color = "red"


    const token = useSelector((state) => {
        return selectToken(state)
    })
    const userid = useSelector(state => {
        return selectUserId(state);
    }
    )

    const classId = useSelector(state => selectClassId(state));
    const changeProgress = (e) => {
        setProgress(e.target.value)
        updateProgress();
    };

    useEffect(() => {
        updateProgress();
    }, [progress])

    const updateProgress = async () => {
        var res = await axios.post('http://192.249.18.203:8080/class/updateprogress', { userId: userid, assignmentId: props.taskId, progress: progress }, {
            headers: {
                'x-access-token': token
            },
            params: {
                userId: userid,
                classId: classId
            }
        })
        console.log("res", props.taskId);
    }

    return (

        <div className="taskItem">
            <div >{
                progress === '0'
                    ? <div className="a">
                        <div>과제명 : {props.taskName}</div>
                        <div>마감일 : {stringDate}</div>
                    </div>
                    : (progress === '1'
                        ? <div className="b">
                            <div>과제명 : {props.taskName}</div>
                            <div>마감일 : {stringDate}</div>
                        </div>
                        : <div className="c">
                            <div>과제명 : {props.taskName}</div>
                            <div>마감일 : {stringDate}</div>
                        </div>
                    )
            }</div>
            <div >
                <input id="0" class="input-hidden" value="0" name={props.taskId} type="radio" checked={progress === "0"} onChange={changeProgress} />
                <label for="0">
                    <img width="30px" src="/images/red.png" />
                </label>
                {/* <span class="up">Not Started</span> */}
                <input id="1" class="input-hidden" value="1" name={props.taskId} type="radio" checked={progress === "1"} onChange={changeProgress} />
                <label for="1">
                    <img width="30px" src="/images/yellow.png" />
                </label>
                <input id="2" class="input-hidden" value="2" name={props.taskId} type="radio" checked={progress === "2"} onChange={changeProgress} />
                <label for="2">
                    <img width="30px" src="/images/blue.png" />
                </label>
            </div>

        </div>
    )
}




export default TaskItem;