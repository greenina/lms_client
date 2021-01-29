import React, { useEffect, useState } from 'react'
import {useSelector, useDispatch} from "react-redux";
import axios from 'axios';
import {useHistory} from 'react-router';
import './style.css';

import ClassPage from '../ClassPage'
import ClassList from './ClassList';
import {selectToken, selectIsStudent, selectUserId} from '../../redux/auth/auth.selectors';
import ClassCard from './ClassCard'
import { BrowserRouter, Switch, Route} from 'react-router-dom';
import Assignments from '../Assignments/index';
import CreateClass from '../CreateClass';
import JoinClass from '../JoinClass';


const Classes = () =>{
    const history = useHistory();
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
        if(classid === "createClass") {
            return history.push('/main/classes/createclass');
        } else if(classid === "joinClass") {
            return history.push('/main/classes/joinclass');
        }
        setClassId(classid);
        const class_ = classesInfo.filter((classinfo) => {
            return classinfo.classId === classid
        })
        setClassName(class_[0].className);
        setClassInstructor(class_[0].instructor);
    }

    const getClassInfo = () => {
        axios.get('http://192.249.18.203:8080/class/get', {
            params: {
                userId: userId
            },
            headers: {
                'x-access-token': token
            },
            params: {
                userId: userId
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
            <Switch>
                <Route path="/main/classes" exact={true} render={() => <ClassPage classId={classId} id="classpage"/>}/>
                <Route path="/main/classes/assignments" exact={true} component={Assignments}/>
                <Route path="/main/classes/createclass" exact={true} component={CreateClass}/>
                <Route path="/main/classes/joinclass" exact={true} component={JoinClass}/>
            </Switch>
        </div>



    )
}



export default Classes;