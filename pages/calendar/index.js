import React, { useEffect, useState } from 'react';
import { useContext } from "react";
import { AppContext } from "../_app";
import styles from '../../styles/calendardata.module.scss'; 
import fetchData from '../../util/axios';

const  CalendarData = ()=> {
    const {setAppoimentFile, setEventDate, cancel, approve, appointment} = useContext(AppContext);
    const [dayList, setDayList] = useState();
    const [monthName, setmonthName] = useState();
    const [yearName, setYearName] = useState();
    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth()+1;
    const currentDay = date.getDate();
    const monthNames = ['January', 'February', 'March',  'April', 'May',
    'June', 'july', 'August',  'September', 'October', 'November', 'December'];
    
    useEffect(()=>{
        calendar();
    }, [cancel, approve])
    

    
    const handlerClickEvent = (e) =>{
        setEventDate({day:e.currentTarget.getAttribute('value'),month:month,year:year})
        setAppoimentFile(true); 
    }

      async function calendar () {
        const res = await fetchData.get('/api/appointment/appointment');
        const  appointment = res.data.appointments;
        let amountDaysInMonth = new Date(year, month, 0).getDate()
        let amountDaysAtWeek = new Date(year, month-1, 1).getDay()
         
        setmonthName(monthNames[month-1])
        setYearName(year)
        // setDatetDisplay(currentDay)   

        let gaps;
        if(amountDaysAtWeek === 0){
             gaps = 6
        } else {
             gaps = amountDaysAtWeek -1
        }
        const daysArr = []
        
        for(let day = -gaps + 1; day <= amountDaysInMonth; day++){
            let days = React.createElement('li', {}, day)

             if(day <= 0){
                days = React.createElement('li', {key:day}, "")
                daysArr.push(days)
             } else if (day === currentDay && month === date.getMonth()+1 && year === date.getFullYear() ){
                days = React.createElement('li', {value: day, key:day,  className: `${styles.active}`, onClick:handlerClickEvent}, day)
                daysArr.push(days)        
             } else  {
                    const elem = appointment.find((elem )=> elem.eventDate.day === day+"" && elem.eventDate.year === year+""  && elem.eventDate.month === month+"")
                    if(elem){
                        if(elem.approve){
                            days = React.createElement('li', {value: day, key:day , className:`${styles.approve}`,  onClick:handlerClickEvent}, day)
                            daysArr.push(days)      
                        }
                        if(elem.cancel){
                            days = React.createElement('li', {value: day, key:day , className:`${styles.cancel}`,  onClick:handlerClickEvent}, day)
                            daysArr.push(days)      
                        }
                    } else {
                        days = React.createElement('li', {value: day, key:day ,  onClick:handlerClickEvent}, day)
                        daysArr.push(days)      
                    }
             }

        }
           setDayList(React.createElement('ul', {className: `${styles.days_of_week}`}, daysArr))
    }
    return (
       <section className={styles.calendarData}>
            <p style={{textAlign: "center"}}>{`${monthName +' '+ yearName}`} </p>
            <ul className={styles.weekdays}>
                <li>Mo</li>
                <li>Tu</li>
                <li>We</li>
                <li>Th</li>
                <li>Fr</li>
                <li>Sa</li>
                <li>Su</li>
            </ul> 
            <div className={styles.days_of_week_conatiner}>
               <ul>
               {dayList}
                </ul> 
            </div>  
        </section>
    )
}
export default CalendarData;