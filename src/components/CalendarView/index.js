import React, { Component, useEffect, useState } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'

const CalendarView = ({ tasks }) => {
  console.log("calendar rendering")
  console.log(tasks)
  console.log("props", tasks)
  //const [task, setTask] = useState(tasks)

  console.log("직접쓰은거어", [{
    title: 'zzz',
    backgroundColor: '#ff6f61',
    borderColor: '#ff6f61',
    start: '2021-01-28',
    end: '2021-01-29'
  },
  {
    title: 'zzzz',
    start: '2021-01-30',
    end: '2021-02-04'
  }])
  
  return (
    <div className="App">
      <FullCalendar
        defaultView="dayGridMonth"
        plugins={[dayGridPlugin]}
//         events ={ [{
//     title: 'zzz',
//     backgroundColor: '#ff6f61',
//     borderColor: '#ff6f61',
//     start: '2021-01-28',
//     end: '2021-01-29'
//   },
//   {
//     end: "2021-1-29",
//     start: "2021-1-30",
//     title: "zzzz"
//     }]
// }
        events={tasks}
      />
    </div>
  )
}

export default CalendarView;

