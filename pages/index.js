import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { AppContext } from "./_app";
import fetchData from "../util/axios";
import CalendarData from "./calendar"
import CreateAppointment from "../components/createappointment";
import Displayappointment from "../components/displayappointment";
import styles from '../styles/index.module.scss'
import { useRouter } from "next/router";

export default function  Calendar({data}) {
    const router = useRouter()
    const {appoimentFile, setRefreshPage, refreshPage, appointment, setAppointment} = useContext(AppContext);

    useEffect(()=>{
        setAppointment(JSON.parse(data))
        refreshPage ? update() : ''
        setRefreshPage(false)
    }, [refreshPage]); 

    const update = ()=>{
        router.reload()
    }
    return ( 
        <> 
            <div className={styles.container}>
                <div className={styles.calendarContainer}>
                        {appointment ?  <CalendarData appointments={appointment}/> : ''}
                        <div className={ appoimentFile ? 'appoiment_field' : 'appoiment_field_hide'}>
                            { 
                                <CreateAppointment  edit={false}/> 
                            }
                        </div>   
                </div>
                <aside>
                {
                    appointment && appointment.length > 0 ? 
                    appointment.map((elem, index)=> <Displayappointment dataAppointment={elem} key={index}/>)
                    : ''
                 }
                </aside>
            </div>
        </>
        );    
}

export async function getServerSideProps() { 
   const res = await fetchData.get('/api/appointment/appointment');
   const  appointment = JSON.stringify(res.data.appointments);

    return { props: { data:appointment } }
  }