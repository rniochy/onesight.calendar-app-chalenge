import connect from "../../../database/connnect";
import Appointment from "../../../database/models/appointment.model";

connect();

export default async (req, res)=>{
    const {method} = req;
    const {name, note, eventDate, id, approve, cancel} = req.body;

    switch(method){
        case 'POST':
            try {
                if(name && note){
                    const appointment = new Appointment({name, note, eventDate});
                    await appointment.save();
                    return res.send({name});
                }
                return res.status(400).send({})
            }catch(err){
                return res.status(500).send({msg: "Wasn't possivel create"})
             }
        
        case 'GET': 
            try {
                const appointments  = await Appointment.find({});
                return res.send({appointments});
            }catch(err){
                return res.status(400).send({msg: "Wasn't possible get appointments"})
            }
        case 'PATCH': 
            try {
                const appointment  = await Appointment.findById({_id:id});
                return res.send({appointment});
            }catch(err){
                return res.status(400).send({msg: "Wasn't possible get appointments"})
            }
        case 'DELETE': 
            try {
                await Appointment.deleteOne({_id: id});
                return res.send({id});
            }catch(err){
                return res.status(400).send({msg: "Wasn't possivel delete appointments"})
            }
        case 'PUT': 
            try {
                if(name && note){
                    await Appointment.updateOne({_id: id}, {$set: {name, note}});
                    return res.send(true);
                } else if(name){
                    await Appointment.updateOne({_id: id}, {$set: {name}});
                    return res.send(true);
                }else if(id){
                    await Appointment.updateOne({_id: id}, {$set: {approve, cancel}});
                    return res.send(true);
                } else {
                    await Appointment.updateOne({_id: id}, {$set: {note}});
                    return res.send(true);
                }
            }catch(err){
                return res.status(400).send({msg: "Wasn't possible update appointments"})
            }
        
    }
} 