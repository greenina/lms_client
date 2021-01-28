import React, { useEffect } from 'react';
import { selectUserId, selectToken } from '../../redux/auth/auth.selectors'
import axios from 'axios';
import { useSelector } from "react-redux";
import { useState } from 'react';
import TaskItem from '../TaskItem'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { addHours, addDays, addWeeks, startOfWeek } from 'date-fns';
import CalendarView from '../CalendarView';

const Calender = () => {
    const [viewMode, setViewMode] = useState("every");
    const [everyTaskTimeline, setEveryTaskTimeline] = useState();
    const [assignmentTimeline, setAssignmentTimeline] = useState();
    const [quizTimeline, setQuizTimeline] = useState();
    const [alltasks, setAllTasks] = useState([{
        title: 'zzz',
        backgroundColor: '#ff6f61',
        borderColor: '#ff6f61',
        start: '2021-01-28',
        end: '2021-01-29'
    },
    {
        title: 'zzzz',
        start: '2021-01-30',
        end: '2021-02-04'
    }]);

    var userId = useSelector(state => {
        return selectUserId(state)
    }
    );
    var token = useSelector(state => {
        return selectToken(state)
    }
    );

    const changeView = (e) => {
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
        var cassignments = assignments.map(element => {
            var info = new Object();
            info.title = element.assignmentName;
            console.log(element.openTime)
            var sdate = (new Date(element.openTime))
            var edate = (new Date(element.endTime))
            info.start = sdate.getFullYear() + '-0' + String(parseInt(sdate.getMonth()) + 1) + '-' + ("0" + sdate.getDate()).slice(-2);
            console.log("info.start ", info.start)
            info.end = edate.getFullYear() + '-0' + String(parseInt(sdate.getMonth()) + 1) + '-' + ("0" + edate.getDate()).slice(-2);
            console.log(info.start, info.end)
            return info
        })
        var cquizes = quizes.map(element => {
            var info = new Object();
            info.title = element.quizName;
            var sdate = (new Date(element.openTime))
            var edate = (new Date(element.endTime))
            info.backgroundColor = '#ff6f61';
            info.borderColor = '#ff6f61';
            info.start = sdate.getFullYear() + '-0' + String(parseInt(sdate.getMonth()) + 1) + '-' + ("0" + sdate.getDate()).slice(-2);
            info.end = edate.getFullYear() + '-0' + String(parseInt(sdate.getMonth()) + 2) + '-' + ("0" + edate.getDate()).slice(-2);
            return info
        })
        setAllTasks(cassignments.concat(cquizes));
        console.log("all", alltasks)
        var assignmentInfo = assignments.map(element => <TaskItem type={element.type} progress={element.progress} taskId={element.assignmentId} taskName={element.assignmentName} dueDate={element.endTime} />)
        var quizInfo = quizes.map(element => <TaskItem type={element.type} progress={element.progress} taskId={element.quizId} taskName={element.quizName} dueDate={element.endTime} />)
        var everyInfo = everytask.map(element => <TaskItem progress={element.progress} taskId={element.assignmentId} taskName={element.assignmentName} dueDate={element.endTime} />)
        setEveryTaskTimeline(everyInfo);
        setAssignmentTimeline(assignmentInfo);
        setQuizTimeline(quizInfo)
        console.log("assignments", assignments)
        console.log("quizes", quizes)
        console.log("everytask", everytask)
    }
    useEffect(() => {
        getDatafromServer()
    }, [])


    return (
        <div>
            <h3>Assignments & Quizes</h3>
            <div>View Type</div>
            <input name="viewType" type="radio" value="every" onChange={changeView} checked = {viewMode==='every'}/><span class="up">every tasks</span>&nbsp;&nbsp;
            <input value="assignment" name="viewType" type="radio" onChange={changeView} checked = {viewMode==='assignment'}/> <span class="up">assignments</span>
            <input value="quiz" name="viewType" type="radio" onChange={changeView} checked = {viewMode==='quiz'}/> <span class="up">quizes</span>
            <input value="calender" name="viewType" type="radio" onChange={changeView} checked = {viewMode==='calender'}/> <span class="up">calender</span>
            {viewMode === "every" ? <div>{everyTaskTimeline}</div> : (viewMode === "assignment" ? <div>{assignmentTimeline}</div> : (viewMode==='calender'?<CalendarView tasks={alltasks} />:<div>{quizTimeline}</div>))}
        </div>)
}

export default Calender;