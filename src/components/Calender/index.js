import React, { useEffect } from 'react';
import { selectUserId, selectToken } from '../../redux/auth/auth.selectors'
import axios from 'axios';
import { useSelector } from "react-redux";
import { useState } from 'react';
import TaskItem from '../TaskItem'
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Calender = () => {
    const [viewMode, setViewMode] = useState(true);
    const [taskTimeline, setTaskTimeline] = useState();

    var taskList = []

    var userId = useSelector(state => {
        return selectUserId(state)
    }
    );
    var token = useSelector(state => {
        return selectToken(state)
    }
    );
    const getDatafromServer = async () => {
        var res = await axios.post('http://192.249.18.245:8081/class/timeline', { userId: userId }, {
            headers: {
                'x-access-token': token
            }
        })
        var timeline = res.data.timeline
        var info = timeline.map(element => <TaskItem progress={element.progress}taskId={element.assignmentId} taskName={element.assignmentName} dueDate={element.endTime} />)
        setTaskTimeline(info);
        console.log("timeline", timeline)
    }
    useEffect(() => {
        getDatafromServer()
    }, [])


    return (
        <div>
            <h3>Assignments & Quizes</h3>
            <div>View Type</div>
            <input name="viewType" type="radio" value="true" /><span class="up">Timeline</span>&nbsp;&nbsp;
            <input value="false" name="viewType" type="radio" /> <span class="up">Progress</span>
            {viewMode ? <div>{taskTimeline}</div> : <div>진행상황</div>}
            {/* <DragDropContext>
                <Droppable droppableId="characters">
                    {(provided) => (
                        <ul className="characters">
                            ...
                        </ul>
                    )}
                </Droppable>
            </DragDropContext> */}
        </div>)
}

export default Calender;