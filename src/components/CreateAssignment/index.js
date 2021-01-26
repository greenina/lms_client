import React, { useState } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import {
    DatePicker,
    TimePicker,
    DateTimePicker,
    MuiPickersUtilsProvider,
  } from '@material-ui/pickers';

const CreateAssignment = () => {
    const today = new Date();
    var [assignmentName, setAssignmentName] = useState('');
    var [openTime, setOpenTime] = useState(today);
    var [endTime, setEndTime] = useState(today);
    var [instruction, setInstruction] = useState('');

    return (
        <div>
            <h1>Create Assignment. 학생들을 울려라~~~</h1>

            <form>
                <label>
                    Assignment Name: 
                    <input type="text" name="assignmentName"/>
                </label>
                <label>
                    open Time: 
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <DateTimePicker value={openTime} onChange={setOpenTime} />
                    </MuiPickersUtilsProvider>
                </label>
            </form>

        </div>
        
    )
}

export default CreateAssignment;