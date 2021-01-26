import React from 'react';
import axios from 'axios';
import {useState} from 'react';

const CreateNotice = () => {

    const [noticeTitle, setNoticeTitle] = useState('');
    const [noticeContent, setNoticeContent] = useState('');
    const [submit, setSubmit] = useState(false);

    const createNotice = () => {
        console.log("pressed create notice button");
        axios.post('http://192.249.18.169:8080/class/notice/create', {title: noticeTitle, content: noticeContent}, {params: {
            userId: 'jinho123',
            classId: "202101611408144891h3F5J6DONQdhB4omUcu0iccQuJrdJHNm7DpgbEQD"
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