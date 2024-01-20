import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';
import Datagrid from "./Datagrid";
import { Button, Stack, TextField } from "@mui/material";
import Textarea from '@mui/joy/Textarea';
import emailjs from '@emailjs/browser';
import './Employee.css'
import { useNavigate } from "react-router-dom";

function Employee(){

    let temp = [];
    const [appointmentDataArray, setAppointmentDataArray] = useState([])
    const [appointmentId, setAppointmentId] = useState(null)
    const [quotedPrice, setQuotedPrice] = useState(null)
    const [issues, setIssues] = useState(null)
    const navigate = useNavigate()

    function sendEmail(templateParams) {
        console.log(templateParams)
        emailjs.send('service_u8kmbra', 'template_a33t0vj', templateParams, 'McEzwIKGyATw0Uncq')
          .then((result) => {
              console.log(result) 
          }, (error) => {
              console.log(error.text);
          });
      }

    const handleUpdate = () =>{
        if((appointmentId || quotedPrice || issues) != null){
            appointmentDataArray.forEach((element) =>{
                if(appointmentId === element?.id){
                    const templateParams = {
                        to_name:element.email,
                        from_name:"Pete's Autobody",
                        message: `Your Quoted Price for your vehicle ${element.vehicleMake} ${element.vehicleYear} is ${quotedPrice} dollars. The issues that we found are ${issues} on ${element.date}`
                    }
                    sendEmail(templateParams)
                } 
            })
            alert('Diagnosed Mail sent Succeed')
        }
        else{
            alert("All Fields Required")
        }
       
    }
   
    const getAppointmentData = async () => {
        const querySnapshot = await getDocs(collection(db, "customers"));
        querySnapshot.forEach((doc) => {
            temp = temp.concat(doc.data()?.appointmentDatas)
            // console.log(doc.data().license)
        })
        setAppointmentDataArray(temp)
    }
    
    const handleLogout = () =>{
        navigate('/')
    }

    useEffect(() => {
        getAppointmentData()
    }, [])
    
    return(
        <div className='emp-container'>
            <h1 className="emp-header">Pete's Autobody Employee Dashboard</h1>
            <div className='btn-logout'>
                <Button onClick={handleLogout} variant="contained">Logout</Button><br/>
            </div>
            <Datagrid appointmentDatas={appointmentDataArray} />
            <Stack direction="row" marginTop={"100px"} justifyContent="center" alignItems="center" spacing={14} >
                <TextField type='text' id="outlined-basic" variant="outlined" label='Appointment ID' onInput={(event) => setAppointmentId(event.target.value)} value={appointmentId} />
                <TextField type='number' id="outlined-basic" variant="outlined" label="Quoted Price" onInput={(event) => setQuotedPrice(event.target.value)} value={quotedPrice} />
                <Textarea placeholder="Type the issues you found" onInput={(event) => setIssues(event.target.value)} value={issues} />

            </Stack>
            <div className="btn-send">
                <Button onClick={handleUpdate} variant="contained">Send</Button>
            </div>

        </div>
    )
}

export default Employee;