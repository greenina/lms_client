import React, {useEffect, useState } from 'react';

const QuizList = ({quizList}) => {

    const loadList = () => {
        let i = 0;
        console.log(quizList);
        return quizList.map((quiz) => {
            console.log(quiz.quizName);
            i = i + 1;
            return <li key={i}>Name: {quiz.quizName},   Content: {quiz.quizContent},   Time:  {quiz.openTime} to {quiz.endTime}</li>
        })
    }

    return (
        <ul>
            {loadList()}
        </ul>
    )
}

export default QuizList;