import React from 'react';
import { useSelector } from 'react-redux';
import { selectIsStudent } from '../../redux/auth/auth.selectors';
import Calender from '../Calender';
import Classes from '../Classes';
import NavBar from '../NavBar';
import {useLocation} from 'react-router';
import { BrowserRouter, Switch, Route} from 'react-router-dom';

const MainPage = () => {
    const location = useLocation();

    var isStudent = useSelector(state =>selectIsStudent(state))
    return(
        <div>
            {/* <h1>{isStudent?"Student":"Instructor"} Main Page</h1>
            캘린더랑 class들
            <div>
                <Calender/>
                <Classes/>
            </div> */}
            <NavBar />
            <Switch>
                <Route path="/main/classes" component={Classes}/>
            </Switch>
        </div>
    );
}

export default MainPage;