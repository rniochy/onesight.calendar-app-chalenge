import mongoose from 'mongoose';

const Schema = mongoose.Schema
const AppointmentSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    note:{
        type: String,
        required: true,
    },
     approve:{
         type: Boolean,
         default: false
     },
     cancel: {
       type: Boolean,
       default: false  
     },
     eventDate: {
        day: { type: String},
        month: {type: String},
        year: {type: String}
    },
    },
        {
         timestamps: true
        }
);
 let Appointment = mongoose.models.Appointment || mongoose.model('Appointment', AppointmentSchema);
 export default Appointment; 