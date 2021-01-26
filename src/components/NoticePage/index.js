import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from 'react';
import NoticeList from './NoticeList';
import CreateNotice from './CreateNotice';

const NoticePage = () => {

    const [noticeList, setNoticeList] = useState([])

    useEffect(() =>{
        loadNotice();
    }, [])

    const loadNotice = () => {
        axios.get("http://192.249.18.169:8080/class/notice/load", {params: {
            userId: 'jinho123',
            classId: '202101611408144891h3F5J6DONQdhB4omUcu0iccQuJrdJHNm7DpgbEQD'
        }})
        .then((res) => {
            console.log(res.data.notices);
            setNoticeList(res.data.notices)
        })
    }

    return ( <div>
        <CreateNotice/>
        <NoticeList noticeList={noticeList} reRender={() => {loadNotice();}}/>
        </div>
    )
}

export default NoticePage;