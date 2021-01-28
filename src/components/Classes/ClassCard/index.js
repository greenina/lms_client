import React, { useState, useEffect} from 'react';
import {Card, Button} from 'react-bootstrap';
import './style.css'
const ClassCard = ({className, classInstructor}) => {
    return (
        <Card id="classcard">
            <Card.Body>
                <Card.Title id="cardtitle">{className}</Card.Title>
                <Card.Text id="classinstructor">
                 Instructor: {classInstructor}
                </Card.Text>
                <div>
                <Button className="classmenu" variant="outline-dark">Lecture Content</Button>
                <br/>
                <Button className="classmenu" variant="outline-dark">Notice</Button>
                <br/>
                <Button className="classmenu" variant="outline-dark">Assignment</Button>
                <br/>
                <Button className="classmenu" variant="outline-dark">Quiz</Button>
                </div>


            </Card.Body>
        </Card>
    )
}

export default ClassCard;