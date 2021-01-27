import React from 'react';
import axios from 'axios';
import {useState} from 'react';
import {useSelector, useDispatch} from "react-redux";
import {selectToken} from '../../redux/auth/auth.selectors'

const CreateNotice = ({classId, userId}) => {

    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [submit, setSubmit] = useState(false);

    var token = useSelector(state => {
        return selectToken(state)}
    );

    const createNotice = () => {
        console.log("pressed create notice button");
        axios.post(`http://192.249.18.203:8080/class/notice/create`, {title: noticeTitle, content: noticeContent}, {
            headers: {
                'x-access-token': token
            },
            params: {
                userId: userId,
                classId: classId
        }})
        .then((res) => {
            console.log(res);
            setSubmit(!submit);
        })
    }

    const changeHandler = (e) => {
        switch (e.target.name) {
            case 'title':
                setNoticeTitle(e.target.value);
                break;
            case 'context':
                setNoticeContent(e.target.value);
                break;
            
        }
    }

    return (
        <form>
            <br/>
            <label>
                notice title:
                <input type="text" name="title" onChange={changeHandler}/>
            </label>
            <br/>
            <label>
                notice context: 
                <input type="text" name="context" onChange={changeHandler}/>
            </label>
            <br/>
            <button onClick={createNotice}>Create Notice</button>

        </form>
    )
}

export default CreateNotice;