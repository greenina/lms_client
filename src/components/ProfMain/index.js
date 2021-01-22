import React from 'react';
import Calender from '../Calender';
import Classes from '../Classes';



const ProfMain = () => {
    return(
        <div>
            <h1>Professor Main Page</h1>
            캘린더랑 class들
            <Calender/>
            <Classes/>
        </div>
    );
}

export default ProfMain;