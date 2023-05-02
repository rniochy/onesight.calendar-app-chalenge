import React, {useContext, useEffect, useState} from 'react';
import { AppContext } from '../../pages/_app';
import styles from "../../styles/appointment.module.scss";
import fetchData from '../../util/axios';

const CreateAppointment = ({edit, id}) => {
    const {setAppoimentFile, eventDate, setRefreshPage} = useContext(AppContext);
    const [name, setName] = useState();
    const [note, setNote] = useState();

    async function saveEventHandler (e)  { 
         e.preventDefault();
         setAppoimentFile(false); 
        if(id){
        fetchData.put('/api/appointment/appointment',  {name, note, eventDate, id}).then(()=> {
            setRefreshPage(true)

        }) 
        } else {
    
          const res =  await fetchData.post('/api/appointment/appointment',  {name, note, eventDate}); 
          setRefreshPage(true)

        } 
    }
    const noteChangeHandler =(e) =>{
        setNote(e.target.value);
    }
    const nameChangeHandler =(e) =>{
        setName(e.target.value);
    }

    return (
        <div className={styles.appointment_container}>
             <form>
                <legend>Create new appointment</legend>
                <h3>{edit? '' : eventDate.month+"/"+eventDate.day+"/"+eventDate.year}</h3>
                <input 
                    onChange={nameChangeHandler} 
                    type="text" 
                    placeholder='Name'
                />
                <div className={styles.note_area}>

                    <label htmlFor="area">Notes</label>
                    <textarea 
                        onChange={noteChangeHandler} 
                        id='area'
                        >
                    </textarea>
                </div>
                <div className={styles.buttons}>
                <input onClick={saveEventHandler}   type="submit" value={edit ?"Edit":"Save"} />
                </div>
             </form>
        </div>
    );
}
export default CreateAppointment;
