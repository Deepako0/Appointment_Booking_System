import './App.css';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Manager from './Components/Manager';
import Login from './Components/Login';
import UserRegistration from './Components/UserRegistration';
import CustomerPage from './Components/CustomerPage';
import Employee from './Components/Employee';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>} />
          <Route path='/register' element={<UserRegistration/>} />
          <Route path='/success' element={<CustomerPage/>} />
          <Route path='/admin' element={<Manager/>} />
          <Route path='/employee' element={<Employee/>} />
        </Routes>   
      </BrowserRouter>
      
      
      {/* Login Form */}
      {/* New user Registration Component */}
      {/* Customer care/ Contact Info Support Component */}
    </div>
  );
}

export default App;
