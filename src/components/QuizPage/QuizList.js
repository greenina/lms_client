import React, {useEffect, useState } from 'react';
import {
    Button,
    Card,
    CardHeader,
    CardContent,
    CardActions,
    TextField,
    Typography,
  } from "@material-ui/core"
import './style.css'

const QuizList = ({quizList}) => {

    const loadList = () => {
        let i = 0;
        console.log(quizList);
        return quizList.map((quiz) => {
            console.log(quiz.quizName);
            i = i + 1;
            return <Card className="my-card" elevation={5}>
                <CardHeader title={quiz.quizName} className="card-header" />
                <CardContent className="my-card-content">
                    <div>Content: {quiz.quizContent}</div>
                    <div>Time:  {quiz.openTime} to {quiz.endTime}</div>
                    <div>URL: {quiz.quizUrl}</div>
                </CardContent>
            </Card>
            // return <li key={i}>Name: {quiz.quizName},   Content: {quiz.quizContent},   Time:  {quiz.openTime} to {quiz.endTime}</li>
        })
    }

    return (
        <div className = 'assignments'>
            {loadList()}
        </div>
    )
}

export default QuizList;