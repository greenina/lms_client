import React, { Component, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import {useHistory, useLocation} from 'react-router';
import {LectureItem} from '../ClassItem'
import {selectToken, selectUserId} from '../../redux/auth/auth.selectors';
import './style.css'

const ClassPage = ({classId}) => {
    const location = useLocation();
    console.log(classId);
    var [lecturesInfo, setLecturesInfo] = useState('');
    const [uploadLecture, setUploadLecture] = useState(true);

    var token = useSelector(state => {
        return selectToken(state)}
    );

    const userId = useSelector(state =>{
        return selectUserId(state);
    })

    useEffect(() => {
        getDatafromServer()
    }, [])

    useEffect(() => {
        getDatafromServer();
    }, [uploadLecture])

    useEffect(()=>{
        getDatafromServer();
    },[classId])

    const getDatafromServer = () =>{
        axios.get('http://192.249.18.203:8080/class/info', {
            headers: {
                'x-access-token': token
            },
            params: {
                classId: classId, 
                userId: userId
            }})
            .then((res) => {
                var dates = res.data.classInfo.dates.sort((a,b) => {
                    return new Date(a.scheduled_for).getTime() - 
                        new Date(b.scheduled_for).getTime()
                });
                var lectures = res.data.classInfo.lectures;

                setLecturesInfo(dates.map(element => <LectureItem setUploadLecture={setUploadLecture} uploadLecture={uploadLecture} classId={classId} lectureDate = {element} lectures = {lectures.filter((lecture) => {
                    return new Date(lecture.lectureDate).getTime() === new Date(element).getTime()
                })}/>))
            })
    }
    return(
    <div id="classpage">
        {lecturesInfo}
    </div>
    );
}

export default ClassPage;