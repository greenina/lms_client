import React, { Component, useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';

import ClassPage from '../ClassPage'
import ClassList from './ClassList';
import {selectToken, selectIsStudent, selectUserId} from '../../redux/auth/auth.selectors';
import ClassCard from './ClassCard'
import './style.css';


const Classes = () =>{
    var [classId, setClassId] = useState('');
    var [className, setClassName] = useState('');
    var [classInstructor, setClassInstructor] = useState('');
    var [classesInfo, setClassesInfo] = useState([{className: "hello world", classId: "hello world", instructor: "hello world"}]);

    var token = useSelector(state => {
        return selectToken(state)}
    );

    var userId = useSelector(state => {
        return selectUserId(state)}
    );

    const changeClassPage = (classid) => {
        setClassId(classid);
        const class_ = classesInfo.filter((classinfo) => {
            return classinfo.classId === classid
        })
        setClassName(class_[0].className);
        setClassInstructor(class_[0].instructor);
    }

    const getClassInfo = () => {
        axios.get('http://192.249.18.169:8080/class/get', {
            params: {
                userId: userId
            },
            headers: {
                'x-access-token': token
            }
        })
            .then((res) => {
                console.log(res);
                setClassesInfo(res.data.classes);
                setClassId(res.data.classes[0].classId);
                setClassName(res.data.classes[0].className);
                setClassInstructor(res.data.classes[0].instructor)
            })
    }

    useEffect(() => {
        getClassInfo();
    }, [])

    return (
        <div>
            <ClassList classesInfo={classesInfo} changeClassPage={changeClassPage} id="classlist"/>
            <ClassCard className={className} classInstructor={classInstructor} id="classcard"/>
            <ClassPage classId={classId} id="classpage"/>
        </div>



    )
}



export default Classes;