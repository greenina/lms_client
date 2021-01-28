import React, { useEffect } from 'react';
import { selectUserId, selectToken } from '../../redux/auth/auth.selectors'
import axios from 'axios';
import { useSelector } from "react-redux";
import { useState } from 'react';
import TaskItem from '../TaskItem'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Calender = () => {
    const [viewMode, setViewMode] = useState("every");
    const [everyTaskTimeline, setEveryTaskTimeline] = useState();
    const [assignmentTimeline, setAssignmentTimeline] = useState();
    const [quizTimeline, setQuizTimeline] = useState();

    var taskList = []

    var userId = useSelector(state => {
        return selectUserId(state)
    }
    );
    var token = useSelector(state => {
        return selectToken(state)
    }
    );

    const changeView = (e) =>{
        setViewMode(e.target.value);
    }
    const getDatafromServer = async () => {
        var res = await axios.post('http://192.249.18.245:8080/class/timeline', { userId: userId }, {
            headers: {
                'x-access-token': token
            },
            params: {
                userId: userId
            }
        })
        var assignments = res.data.assignments
        var quizes = res.data.quizes
        var everytask = res.data.everytask
        var assignmentInfo = assignments.map(element => <TaskItem type={element.type} progress={element.progress} taskId={element.assignmentId} taskName={element.assignmentName} dueDate={element.endTime} />)
        var quizInfo = quizes.map(element => <TaskItem type={element.type} progress={element.progress} taskId={element.quizId} taskName={element.quizName} dueDate={element.endTime} />)
        var everyInfo = everytask.map(element => <TaskItem progress={element.progress} taskId={element.assignmentId} taskName={element.assignmentName} dueDate={element.endTime} />)
        setEveryTaskTimeline(everyInfo);
        setAssignmentTimeline(assignmentInfo);
        setQuizTimeline(quizInfo)
        console.log("assignments",assignments)
        console.log("quizes",quizes)
        console.log("everytask",everytask)
    }
    useEffect(() => {
        getDatafromServer()
    }, [])


    return (
        <div>
            <h3>Assignments & Quizes</h3>
            <div>View Type</div>
            <input name="viewType" type="radio" value="every" onChange={changeView} /><span class="up">every tasks</span>&nbsp;&nbsp;
            <input value="assignment" name="viewType" type="radio"onChange={changeView} /> <span class="up">assignments</span>
            <input value="progress" name="viewType" type="radio"onChange={changeView} /> <span class="up">quizes</span>
            {viewMode==="every" ? <div>{everyTaskTimeline}</div> : (viewMode==="assignment"?<div>{assignmentTimeline}</div>:<div>{quizTimeline}</div>)}
        </div>)
}

export default Calender;