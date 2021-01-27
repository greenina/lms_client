import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsStudent } from '../../redux/auth/auth.selectors';
import Calender from '../Calender';
import Classes from '../Classes';



const MainPage = () => {

    var isStudent = useSelector(state =>selectIsStudent(state))
    return(
        <div>
            <h1>{isStudent?"Student":"Instructor"} Main Page</h1>
            캘린더랑 class들
            <div>
                <Calender/>
                <Classes/>
            </div>
            
        </div>
    );
}

export default MainPage;