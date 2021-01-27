  
import React from 'react';
import axios from 'axios';
import {useEffect, useState} from 'react';

const NoticeList = ({noticeList, reRender}) => {

    const [submit, setSubmit] = useState(false);
    
    useEffect(() => {
        reRender();
    }, [submit])

    const deleteNotice = (noticeid) => {
        axios.post('http://192.249.18.169:8080/class/notice/delete', {noticeId: noticeid}, {params: {userId: 'jinho123', classId: "202101611408144891h3F5J6DONQdhB4omUcu0iccQuJrdJHNm7DpgbEQD"}})
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