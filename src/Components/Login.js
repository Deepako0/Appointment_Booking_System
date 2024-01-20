import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import db from '../firebase';
import { collection, getDocs } from "firebase/firestore";
import { TextField } from '@mui/material';
import Button from '@mui/material/Button';

function Login(){
    const [userName,setUserName] = useState('')
    const [password,setPassword] = useState('')  
    const [isManager,setIsManager] = useState(false)  
    let userNamePassword = []  
    const navigate = useNavigate()
    let res = []

    const Login = (doc) =>{
        if(res.find((element) => element === true)){
            console.log(1)
            navigate('/success', { state: {id:doc.id} })
        }
        else{
            console.log(`Executed`)
            alert("UserName or Password Incorrect")
        }
    }
    
    const authenticate = async() =>{
        const querySnapshot = await getDocs(collection(db, "customers"));       
        // console.log(querySnapshot)
        let idArray = []
        let obj = {}
        var doc_;
        
        
        querySnapshot.forEach((doc) =>{
            let userName_ = doc.data().userName
            let password_ = doc.data().password
            if(userName == 'emp' && password == 'petesautobody'){
                navigate('/employee')
            }
            else if(userName_ == userName && password_ == password){
                res.push(true)
                Login(doc)
                doc_ = doc
                // navigate('/success', { state: {id:doc.id} })
            }         
            else{
                res.push(false)
            }
        })
        Login(doc_)
        
        
    }
    const authenticateManager = async () =>{
        const querySnapshotManager = await getDocs(collection(db, "manager"));
        console.log(querySnapshotManager)
        querySnapshotManager.forEach((doc) =>{
            let userName_ = doc.data().userName
            let password_ = doc.data().password
            console.log(userName_)
            console.log(password_)
            if(userName_ == userName && password_ == password){
                console.log(`Passed`)
                navigate('/admin', { state: {id:doc.id} })
            }
            
        })
    }

       

    const validateForm = () =>{
        if(!userName && !password){
            return "UserName & Password Requried"
        }
        else if(userName === 'emp' && password === 'petesautobody'){
            navigate('/employee')
            return "Employee Login Success"
        }
        else if(!userName){
            return "UserName Required"
        }
        else if(!password){
            return "Password Required"
        }
    }

    const handleClick = () =>{
        
        if(validateForm()){
            alert(validateForm()) 
        }
        else{
            if(isManager){
                authenticateManager()
            }
            else{
                authenticate() 
            }
        }
        
        
    }
    



    return(
        <div className='container'>
            <div className='login-header'>
                <h1>Pete's Autobody Login Screen</h1><br/>
            </div>
            <div className='Login'>
                <TextField type='text' onInput={(event) => setUserName(event.target.value)} value={userName} id="outlined-basic" label="UserName" variant="filled" /><br/>
                <TextField margin="normal" type='password' onInput={(event) => setPassword(event.target.value)} id="outlined-basic" label="Password" variant="filled" value={password} />
                <div>
                    <input type='checkbox' onInput={(event) =>setIsManager(event.target.value)} value={isManager} />
                    <label>Login As Manager</label>
                </div>
                <Button className='lg-btn' onClick={handleClick} variant="contained">Login</Button><br/>
                <Link to="register" replace >For new User! Click Here</Link>
            </div>
        </div>
    )
}

export default Login;