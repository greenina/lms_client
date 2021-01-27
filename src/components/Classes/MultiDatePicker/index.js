import React, { useState, useEffect } from 'react';
import { DayPickerSingleDateController, CalendarDay } from 'react-dates';
import 'react-dates/initialize';
import 'react-dates/lib/css/_datepicker.css';

const MultiDatePickerCalendar = (props) => {
  const [dates, setDates] = useState([]);
  const handleChange = (date) => {
    const newDates = dates.includes(date)
      ? dates.filter((d) => !date.isSame(d))
      : [...dates, date];
    
    setDates(newDates);
    props.onChangeDate(newDates.map(dates => dates._d));
    //console.log(newDates)
  };
  return (
    <DayPickerSingleDateController
      numberOfMonths={1}
      onDateChange={handleChange}
      hideKeyboardShortcutsPanel
      noBorder
      monthFormat="YYYY년 MMMM"
      renderCalendarDay={(props) => {
        const { day, modifiers } = props;

        if (dates.includes(day)) {
          modifiers && modifiers.add('selected');
        } else {
          modifiers && modifiers.delete('selected');
        }

        return <CalendarDay {...props} modifiers={modifiers} />;
      }}
    />
  );
};
export default MultiDatePickerCalendar;