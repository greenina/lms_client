import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';


const ClassItem = (props) =>{
    return(
        <div>
            <Paper>
                <h3>수업명 : {props.className}</h3>
                <div>교수 : {props.instructor}</div>
            </Paper>
        </div>
    )
}

export default ClassItem;