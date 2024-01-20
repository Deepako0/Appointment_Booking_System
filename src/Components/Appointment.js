import { getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import Datagrid from "./Datagrid";


function Appointment(props) {

    return (
        <div className="">
            <Datagrid appointmentDatas={props.customerData.appointmentDatas}/>
        </div>
    )
}

export default Appointment