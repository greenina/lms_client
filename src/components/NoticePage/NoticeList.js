  
import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';
import { useSelector } from 'react-redux';
import { selectClassId, selectToken, selectUserId } from '../../redux/auth/auth.selectors';

const NoticeList = ({noticeList, reRender}) => {
    var userId = useSelector((state) => selectUserId(state));
    var classId = useSelector(state => selectClassId(state));
    const [submit, setSubmit] = useState(false);
    var token = useSelector(state => {
        return selectToken(state)}
    );

    useEffect(() => {
        reRender();
    }, [submit])

    const deleteNotice = (noticeid) => {
        axios.post('http://192.249.18.245:8080/class/notice/delete', {noticeId: noticeid}, {
            headers: {
                'x-access-token': token
            }, 
        params: {userId: userId, classId: classId}})
            .then((res) => {
                console.log(res);
                setSubmit(!submit);
            })
    }

    const loadList = () => {
        let i = 0;
        return noticeList.map((notice) => {
            i = i + 1;
            return <li key={i}>{notice.title} - {notice.content} <button onClick={() => {deleteNotice(notice.noticeId)}}>Delete</button></li>
        })
    }

    return (
        <ul>
            {loadList()}
        </ul>
    )
}

export default NoticeList;