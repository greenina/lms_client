import React from 'react';
import {selectUserId, selectToken} from '../../redux/auth/auth.selectors'
import axios from 'axios';
import {useSelector} from "react-redux";
import { useState } from 'react';

const Calender = () =>{
    const [viewMode, setViewMode] = useState('timeline');
    
    var userId = useSelector(state => {
        return selectUserId(state)}
    );
    var token = useSelector(state => {
        return selectToken(state)}
    );
    const getDatafromServer = async() =>{
        var res = await  axios.post('http://192.249.18.245:8080/class/timeline',{userId:userId},{
            headers: {
                'x-access-token': token
            }
        }) 
        //var classes = [];
        var timeline = res.data.timeline
        console.log(timeline)
    }
    return(<div>Calender</div>)
}

export default Calender;