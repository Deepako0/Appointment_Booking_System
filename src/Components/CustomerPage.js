import { useState, useEffect } from 'react';
import './CustomerPage.css'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import { useLocation, useNavigate } from 'react-router-dom';
import db from '../firebase';
import { nanoid } from 'nanoid';
import Appointment from './Appointment';
import { collection, query, where, getDoc, doc, setDoc } from "firebase/firestore";
import emailjs from '@emailjs/browser';
import  Button from '@mui/material/Button';
function CustomerPage() {
    const location = useLocation()
    const { id } = location.state
    const [reason, setReason] = useState(false)
    const [reason_, setReason_] = useState('Auto Body Repair')
    const [date, setDate] = useState(null);
    const [name, setName] = useState(null)
    const [email, setEmail] = useState(null)
    const [phone, setPhone] = useState(null)
    const [time, setTime] = useState(null)
    const [vinID, setVinID] = useState(null)
    const [vehicleMake, setVehicleMake] = useState(null)
    const [vehicleYear, setVehicleYear] = useState(null)
    const [vehicleModel, setVehicleModel] = useState(null)
    const [vehicleSubType, setVehicleSubType] = useState(null)
    const [vehicleType, setVehicleType] = useState('Sedan')

    let [customerData,setCustomerData] = useState({});

    const customerRef = doc(db, 'customers', id);

    function sendEmail(templateParams) {
        console.log(templateParams)
        emailjs.send('service_u8kmbra', 'template_a33t0vj', templateParams, 'McEzwIKGyATw0Uncq')
          .then((result) => {
              console.log(result) 
          }, (error) => {
              console.log(error.text);
          });
      }

    async function initailizeData(){
        let customerDataDoc = await getDoc(customerRef);
        let customerData = customerDataDoc.data();
        setCustomerData(customerData);
    }

    useEffect(()=>{
        initailizeData();
    },[])

    const handleChange = (event) => {
        if (event.target.value === 'Other')
            setReason(true)
        else
            setReason(false)
        setReason_(event.target.value)
    }

    const handleDate = (event) => {
        setDate(JSON.stringify(event).slice(1, 11))
         // today, now
        
    }

    const validateDate = () =>{
        var today = new Date()
        const d = new Date()
        if(date < d.toISOString().slice(0, 10)){
            return('You cannot select previous days')
        }
    }

    const navigate = useNavigate()

    const validateFields = () =>{
        if (!(reason_ && date && name && email && phone && time && vinID && vehicleMake && vehicleModel && vehicleSubType && vehicleType && vehicleYear))
            return "All fields are required" 

    }
    const validateData = () =>{
        if(validateDate()){
            alert(validateDate())
            return false
        }
        else if(validateFields()){
            alert(validateFields())
            return false
        }
        else{
            return true
        }        
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        const time_ = time?.split(':')
        // console.log(!(time_[0] >8 && time_[0] < 17))
        if(time_){
            if (!(time_[0] >8 && time_[0] < 17))
            {
                alert('Business is closed at chosen time')
                // console.log(time_[0])                
            }
            else{
            }
        }
        // console.log(validateDate())
        
        var auth = validateData()
        if (auth){
            let customerDataDoc = await getDoc(customerRef);
            let customerData = customerDataDoc.data();
            let appointmentData = {
                id: nanoid(5),
                reason_,
                date,
                name,
                email,
                phone,
                time,
                vinID,
                vehicleMake,
                vehicleModel,
                vehicleSubType,
                vehicleType,
                vehicleYear
            }
            let appointmentDatas = [];
            if (!customerData.hasOwnProperty('appointmentDatas')) {
                appointmentDatas = [appointmentData]
                alert('Check your mail for appointment ID')
            }
            else {
                appointmentDatas = [appointmentData, ...customerData?.appointmentDatas]
                alert('Check your mail for appointment ID')
            }
            customerData = { ...customerData, appointmentDatas };
            setCustomerData(customerData)
            setDoc(customerRef, customerData);
            const templateParams = {
                to_name:appointmentData.email,
                from_name:"Pete's Autobody",
                message: `Your appointment for your vehicle ${appointmentData.vehicleMake} is scheduled on ${appointmentData.date} ${appointmentData.time}. Your Appointment ID is ${appointmentData.id}. Please keep your appointment ID handy for future purposes. We will see on ${appointmentData.date}`
            }
            sendEmail(templateParams)
        }
        
        
    }

    const handleLogout = () =>{
        navigate('/')
    }

    return (
        <div className='bg_container'>
            <h1 className='header'>WELCOME TO PETE'S AUTOBODY APPOINTMENT PAGE</h1>
            <h3 className='header'>Note: Duplicate Appointments within 20 minutes are void</h3>
            <div className='btn-logout'>
                <Button onClick={handleLogout} variant="contained">Logout</Button><br/>
            </div>
            <Appointment customerRef={customerRef} customerData={customerData}/>
            <form>
                <div className="app-style">
                    <div className='form-style'>
                        <h1>Appointment Details</h1>
                        <div className='form-container'>
                            <label>REASON FOR VISIT</label><br />
                            <select className='dropdown' required onChange={handleChange} value={reason_}>
                                <option>Auto Body Repair</option>
                                <option>Collision Repair</option>
                                <option>Mechanical & Suspension Repair</option>
                                <option>Windshield Replacement</option>
                                <option>Hail Damage Repair</option>
                                <option>Paintless Dent Removal</option>
                                <option>Damage Analysis</option>
                                <option>Comprehensive Estimate</option>
                                <option>Lifetime Warranty</option>
                                <option>Scratch Removal</option>
                                <option>Dent Removal</option>
                                <option>Hassle Free Insurance Claim Handling</option>
                                <option>Uni-Body and Structural Repairs</option>
                                <option>Fiberglass Service & Repair</option>
                                <option>Other</option>
                            </select><br />
                            {reason &&
                                <textarea required placeholder='Describe the issue' className='issue' ></textarea>
                            }
                            <div>
                                <label for='name'>Name</label><br />
                                <input type='text' required onChange={(event) => setName(event.target.value)} id='name' value={name} />
                            </div>
                            <div>
                                <label for='email'>Email</label><br />
                                <input type='text' id='email' required onChange={(event) => setEmail(event.target.value)} value={email} />
                            </div>
                            <div>
                                <label for='name'>Phone</label><br />
                                <input type='text' id='phone' maxLength={10} required onChange={(event) => setPhone(event.target.value)} value={phone} />
                            </div>
                            <div>
                                <label>Service hours are only from 8AM to 5PM</label><br />
                                <input type='time' min="08:00" max="17:00" required step="1200" onChange={(event) => setTime(event.target.value)} value={time} />
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1>Vehicle Details</h1>
                        <input type='text' onChange={(event) => setVinID(event.target.value)} className='init' maxLength={17} required placeholder='VIN_ID' value={vinID} /><br />
                        <input type='text' onChange={(event) => setVehicleMake(event.target.value)} placeholder='Vehicle Make' value={vehicleMake} required /><br />
                        <input type='text' onChange={(event) => setVehicleYear(event.target.value)} placeholder='Vehicle Year' value={vehicleYear} required /><br />
                        <input type='text' onChange={(event) => setVehicleModel(event.target.value)} placeholder='Vehicle Model' value={vehicleModel} required /><br />
                        <input type='text' onChange={(event) => setVehicleSubType(event.target.value)} placeholder='Vehicle SubType' value={vehicleSubType} required />
                        <div className='type'>
                            <select className='opt' onChange={event => setVehicleType(event.target.value)} required>
                                <option value="Sedan">Sedan</option>
                                <option value="SUV">SUV</option>
                                <option value="Pickup Truck">Pickup Truck</option>
                                <option value="Mini Van">Mini Van</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                    <div>
                        <label className='text' for='appointment'> Pick an Appointment</label><br />
                        <Calendar onChange={handleDate} id='appointment' required />
                    </div>
                </div>
                <div className='btn-submit'>
                    <input type='submit' className='btn-style' onClick={(handleSubmit)} />
                </div>
            </form>
        </div>
    )
}

export default CustomerPage;

