import './UserRegistration.css'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import {doc, setDoc} from "firebase/firestore";
import db from '../firebase';
import { nanoid } from 'nanoid'
import {collection, addDoc} from 'firebase/firestore'
import { TextField } from '@mui/material';

function UserRegistration(){
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')
    const [confirmPassword,setConfirmPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [email,setEmail] = useState('')
    const [street1,setStreet1] = useState('')
    const [street2,setStreet2] = useState('')
    const [city,setCity] = useState('')
    const [zip,setZip] = useState('')
    const [license,setLicense] = useState('')
    const [dob,setDob] = useState('')
    const [gender,setGender] = useState('')
    const [state,setState] = useState('')


    const checkPassword = () =>{
        if(password === confirmPassword){
            return true
        }
        else 
            return false
    }   
    
    const checkFields = () =>{
        const match = checkPassword()
        if(!firstName && !lastName && !userName && !password &&!confirmPassword && !phoneNumber && !email && !street1 && !street2 && !city && !zip && !license){
            return "Fill the form properly"
        }
        else if(!match){
            return 'Password and the confirm password should be same'
        }
        else
            return "Success"
        
    }

    const validate = async () =>{
        if(checkFields() === "Success"){
            const dataRef = await addDoc(collection(db,'customers'),{
                id: nanoid(4),
                firstName,
                lastName,
                userName,
                password,
                phoneNumber,
                email,
                street1,
                street2,
                city,
                zip,
                license
            })
            alert("Profile Successfully Created")
        }
        else{
            alert(checkFields())
        }
    }

   
        
    return(
        <>
        <h1 className='user-header'>Pete's autobody welcomes our new customers</h1>
        <div className="reg">
                <div>
                <input className='box-style' type="text" value={firstName} placeholder="FirstName" onInput={(event) => setFirstName(event.target.value)} /><br/>
                <input type="text" placeholder="LastName" value={lastName} onInput={(event) => setLastName(event.target.value)}/><br/>
                <input type="text" placeholder='UserName' value={userName} onInput={(event) => setUserName(event.target.value)} /><br/>
                <input type="password" placeholder='Password' value={password} onInput={(event) => setPassword(event.target.value)} /><br/>
                <input type="password" placeholder='Confirm Password' value={confirmPassword} onInput={(event) => setConfirmPassword(event.target.value)}/><br/>
                <input type="text" placeholder="Enter Phone Number" maxlength="10" value={phoneNumber} onInput={(event) => setPhoneNumber(event.target.value)}/><br/> 
                <input type="email" placeholder='Enter E-mail' value={email} onInput={(event) => setEmail(event.target.value)} /><br/>
                <input type='text' placeholder='street 1' value={street1} onInput={(event) => setStreet1(event.target.value)} /><br/>
                <input type='text' placeholder='street 2'  value={street2} onInput={(event) => setStreet2(event.target.value)} /><br/>
                <input type='text' placeholder='city' value={city} onInput={(event) => setCity(event.target.value)} /><br/>
                <input type='text' placeholder='state' value={state} onInput={(event) => setState(event.target.value)} /><br/>
                <input type='text' placeholder='ZIP' maxlength="5" value={zip} onInput={(event) => setZip(event.target.value)} /><br/>
                <input type='text' placeholder='Drivers License Number' maxlength="13" value={license} onInput={(event) => setLicense(event.target.value)} /><br/>
                <div className='lb-container'>
                    <label htmlFor="dob" className='lb'>Enter date of Birth:</label>
                    <input type='date' id="dob" placeholder='Date Of Birth' value={dob} onInput={(event) => setDob(event.target.value)} /><br/>
                </div>

                <div className='lb-container'>
                    <label htmlFor="gender" className='lb'>Gender:</label>
                    <select id="gender" value={gender} onChange={(event) =>setGender(event.target.value)} className='opt-gender'>
                    <option>Male</option>
                    <option>Female</option>
                    <option>Other</option>
                    </select>
                </div>
                
                <button type="submit" className='btn-create' onClick={validate}>Create Account</button><br/>
                <Link className='link' to='/' replace>Already have an account? Login!.</Link>
            </div>
            
        </div>
        </>
    )
}

export default UserRegistration;