import React, { useContext, useEffect, useState } from 'react';
import fetchData from '../../util/axios';
import {useRouter} from "next/router";
import styles from '../../styles/appointment-detail.module.scss';
import CreateAppointment from '../../components/createappointment';
import { AppContext } from '../_app';

const Appointmentdetails = ({data}) => {
    const router = useRouter()
    const id = router.query.id
    const [appointment, setAppoiment] = useState([]);
    const {appoimentFile, setRefreshPage, setAppoimentFile, refreshPage} = useContext(AppContext);

    useEffect(()=>{
         setAppoiment(JSON.parse(data));
         setAppoimentFile(false);
         refreshPage ?update() : ''
         setRefreshPage(false);
    },[refreshPage])

    const update = ()=>{
        router.reload()
    }

    const removeHandler = async () => {
        await fetchData.delete('/api/appointment/appointment', {data: {id}});
        router.push('/');
    }
    const editeHandler = async () =>{
        setAppoimentFile(true);
     
    }

    return (
        <div className={styles.content}>
            <article className={styles.appointment_detail}>
                <div className={styles.content_detail}>
                    <h3>{appointment.name}</h3>
                    <label>Note</label>
                    <p>{appointment.note}</p>
                </div>
                <div className={styles.content_button}>
                    <input type="button" onClick={editeHandler} value="edit"/>
                    <input type="button" onClick={removeHandler} value="remove"/>
                </div>
            </article>
            <div className={ appoimentFile ? 'appoiment_field' : 'appoiment_field_hide'}>
                  { 
                    <CreateAppointment id={id} edit={true}/> 
                 }
            </div> 
        </div>
    );
}
    export async function getServerSideProps(context){
        const id = context.params.id
        const res = await fetchData.patch('/api/appointment/appointment', {id});
        const appointment = JSON.stringify(res.data.appointment); 
        return {
            props: {
                data: appointment
            }
        }
    }
export default Appointmentdetails;
