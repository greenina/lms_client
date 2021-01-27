import React from 'react';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {useEffect, useState} from 'react';
import NoticeList from './NoticeList';
import {selectToken, selectIsStudent, selectUserId, selectClassId} from '../../redux/auth/auth.selectors'
import CreateNotice from './CreateNotice';

const NoticePage = ({classId, userId, isStudent}) => {

    const [noticeList, setNoticeList] = useState([])

    var classId = useSelector(state => {
        return selectClassId(state)}
    );

    var token = useSelector(state => {
        return selectToken(state)}
    );

    var userId = useSelector(state => {
        return selectUserId(state)
    })

    useEffect(() =>{
        loadNotice();
    }, [])

    const loadNotice = () => {
        axios.get(`http://192.249.18.203:8080/class/notice/load`, {
            headers: {
                'x-access-token': token
            },
            params: {
                userId: userId,
                classId: classId
        }
    })
        .then((res) => {
            console.log(res.data.notices);
            setNoticeList(res.data.notices)
        })
    }

    return ( <div>
        <CreateNotice userId={userId} classId={classId}/>
        <NoticeList noticeList={noticeList} reRender={() => {loadNotice();}}/>
        </div>
    )
}

export default NoticePage;