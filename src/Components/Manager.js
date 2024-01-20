import { DataGrid } from "@mui/x-data-grid"
import { useState, useEffect } from "react";
import db from '../firebase';
import './Manager.css'
import { collection, getDocs, doc, updateDoc } from "firebase/firestore";
import Datagrid from "./Datagrid";
import { TextField, Container } from "@mui/material";
import Button from '@mui/material/Button';
import Stack from "@mui/material/Stack";
import emailjs from '@emailjs/browser';
import { useNavigate } from "react-router-dom";


function Manager() {
    const [appointmentId, setAppointmentID] = useState('')
    const [appointmentDate, setAppointmentDate] = useState('')
    const [appointmentTime, setAppointmentTime] = useState('')
    const [vehicleMake, setVehicleMake] = useState('')
    const [appointmentDataArray, setAppointmentDataArray] = useState([])
    const navigate = useNavigate()
    let temp = [];

    useEffect(() => {
        console.log("1")
        getAppointmentData()
    }, [])
    

    const validateDate = () =>{
        var today = new Date()
        const d = new Date()
        if(appointmentDate < d.toISOString().slice(0, 10)){
            return('You cannot select previous days')
        }
    }

    function sendEmail(templateParams) {
        console.log(templateParams)
        emailjs.send('service_u8kmbra', 'template_a33t0vj', templateParams, 'McEzwIKGyATw0Uncq')
          .then((result) => {
              console.log(result) 
          }, (error) => {
              console.log(error.text);
          });
      }

    const getAppointmentData = async () => {
        const querySnapshot = await getDocs(collection(db, "customers"));
        querySnapshot.forEach((doc) => {
            temp = temp.concat(doc.data()?.appointmentDatas)
        })
        setAppointmentDataArray(temp)
    }

    const handleLogout = () =>{
        navigate('/')
    }

    const handleUpdate = async () => {
        const time_ = appointmentTime?.split(':')
        if(time_){
            if (!(time_[0] >8 && time_[0] < 17))
            {
                
                alert('Business is closed at chosen time')
                // console.log(time_[0])                
            }
            else if(validateDate()){
                alert(validateDate())
            }
            else if((appointmentId && appointmentDate && appointmentTime && vehicleMake) === null){
                alert("All Fields Are Required")
            }
            else{
                console.log(`Update`)
                const querySnapshot = await getDocs(collection(db, "customers"));
                console.log(querySnapshot)
                querySnapshot?.forEach((docs) => {
                    let appointmentDatas = docs.data().appointmentDatas;
                    docs.data().appointmentDatas?.forEach(async (appointment, index) => {
                        if (appointment.id == appointmentId) {
                            const templateParams = {
                                to_name:appointmentDatas[index].email,
                                from_name:"Pete's Autobody",
                                message: `Your appointment for your vehicle ${appointmentDatas[index].vehicleMake} has beed modified from ${appointmentDatas[index].date} to ${appointmentDate}. Please keep your appointment ID handy for future purposes. We will see on ${appointmentDate}`
                            }
                            appointmentDatas[index].time = appointmentTime;
                            appointmentDatas[index].date = appointmentDate;
                            appointmentDatas[index].vehicleMake = vehicleMake
                            // console.log({ ...doc.data(), appointmentDatas })
                            // await updateDoc(doc.id,{ ...doc.data(), appointmentDatas })
                            await updateDoc(doc(db, "customers", docs.id), { ...docs.data(), appointmentDatas });
                            getAppointmentData()
                            alert("Appointment Updated")
                            sendEmail(templateParams)
                        }
                })
    
                })
            }
        }
        
       
        
        

        
    }

    return (
        <div className="bg-container">
            <h1 id="header">Welcome to Pete's Autobody Manager </h1>
            <div className='btn-logout'>
                <Button onClick={handleLogout} variant="contained">Logout</Button><br/>
            </div>
            <Datagrid appointmentDatas={appointmentDataArray} />
            <Stack direction="row" marginTop={"80px"}  justifyContent="center" alignItems="center" spacing={2} >
                <TextField onChange={(event) => setAppointmentID(event.target.value)} id="outlined-basic" label="Appointment ID" variant="outlined" value={appointmentId} />
                <TextField onChange={(event) => setAppointmentDate(event.target.value)} type='date' id="outlined-basic" variant="outlined" value={appointmentDate} />
                <TextField onChange={(event) => setAppointmentTime(event.target.value)} type='time' id="outlined-basic" variant="outlined" value={appointmentTime} />
                <TextField onChange={(event) => setVehicleMake(event.target.value)} type='text' id="outlined-basic" label='vehicle Make' variant="outlined" value={vehicleMake} />
            </Stack>
            <div className="btn">
                <Button onClick={handleUpdate} variant="contained">Update</Button>
            </div>

        </div>
    )
}

export default Manager