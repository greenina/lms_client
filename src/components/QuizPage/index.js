import React, {useEffect, useState } from 'react';
import {useSelector, useDispatch} from "react-redux";
import {selectToken, selectIsStudent, selectUserId, selectClassId} from '../../redux/auth/auth.selectors'
import axios from 'axios';
import {useLocation} from 'react-router';
import QuizList from './QuizList';
import DateTimePicker from 'react-datetime-picker'

const QuizPage = () => {
    const location = useLocation();
    const userId = location.state.userId;
    const classId = location.state.classId;
    const today = new Date();

    var [quizName, setQuizName] = useState('');
    var [quizContent, setQuizContent] = useState('');
    var [quizUrl, setQuizUrl] = useState('');
    var [quizList, setQuizList] = useState([]);
    var [openTime, setOpenTime] = useState(new Date());
    var [endTime, setEndTime] = useState(new Date());
    var [submit, setSubmit] = useState(false);

    var token = useSelector(state => {
        return selectToken(state)}
    );

    useEffect(() => {
        loadQuiz();
    }, [])
    useEffect(() => {
        loadQuiz()
    }, [submit])

    const changeHandler = (e) => {
        switch (e.target.name) {
            case 'quizName':
                setQuizName(e.target.value);
                break;
            case 'quizContent':
                setQuizContent(e.target.value);
                break;
            case 'quizUrl':
                setQuizUrl(e.target.value);
                break;
        }
        e.preventDefault();
    }

    const createQuiz = (e) => {
        axios.post(`http://192.249.18.203:8080/class/quiz/create`, {
            quizName: quizName,
            openTime: openTime,
            endTime: endTime,
            quizUrl: quizUrl,
            quizContent: quizContent
        }, {params: {
            userId: userId,
            classId: classId
        },
        headers: {
            'x-access-token': token
        }})
        .then((data) => {
            setQuizName('');
            setQuizContent('');
            setQuizUrl('');
            setSubmit(!submit);

        })
    }

    const loadQuiz = () => {
        console.log(userId);
        console.log(classId);
        axios.get(`http://192.249.18.203:8080/class/quiz/load`, {params: {
            userId: userId, 
            classId: classId
        },
        headers: {
            'x-access-token': token
        }})
            .then((data) => {
                console.log("response of load is ");
                console.log(data.data)
                setQuizList(data.data.quizes);
            })
            .catch((err) => {
                console.log(err);
            })
    }
    return (
        <div>
            quiz page
            <br/>
            <form>
                <label>
                    Quiz Name: 
                    <input type="text" name="quizName" onChange={changeHandler}/> 
                </label>
                <br/>
                <label>
                    Quiz Content: 
                    <input type="text" name="quizContent" onChange={changeHandler}/>
                </label>
                <br/>
                <label>
                    Open Time: 
                    <DateTimePicker onChange={setOpenTime} value={openTime}/>
                </label>
                <br/>
                <label>
                    End Time: 
                    <DateTimePicker onChange={setEndTime} value={endTime}/>
                </label>
                <br/>
                <label>
                    Quiz URL: 
                    <input type="text" name="quizUrl" onChange={changeHandler}/>
                </label>
            </form>
            <button onClick={createQuiz}>Create Quiz</button>

            <br/>
            <QuizList quizList={quizList}/>
        </div>
    )
}

export default QuizPage;