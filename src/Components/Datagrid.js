import { DataGrid, GridColDef, GridValueGetterParams } from '@mui/x-data-grid';
import Box from '@mui/material/Box';
import './Datagrid.css'
import { useEffect, useState } from 'react';

const columns = [
    { field: 'id', headerName: 'Appointment ID', width: 200 },
    {
        field: 'vinID',
        headerName: 'Vehicle ID',
        width: 200,
        editable: true,
    },
    {
        field: 'vehicleMake',
        headerName: 'Vehicle Make',
        width: 200        
    },
    {
        field: 'date',
        headerName: 'Appointment Date',
        width: 200,
        editable: true
    },
    {
        field: 'vehicleYear',
        headerName: 'Vehicle Year ',
        width: 100
    }
];


export default function Datagrid(props) {
    let [appointmentDatasArray,setAppointmentDatasArray] = useState(props.appointmentDatas)
    useEffect(()=>{
        setAppointmentDatasArray(props.appointmentDatas)
    },[JSON.stringify(props.appointmentDatas)])
    appointmentDatasArray = appointmentDatasArray?.filter(element => element !== undefined);
    return (
      <div className='table'> {appointmentDatasArray?.length>0 ? <Box sx={{ height: 400, width: '100%' }}>
      <DataGrid
        rows={appointmentDatasArray}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: {
              pageSize: 5,
            },
          },
        }}
        pageSizeOptions={[5]}
        disableRowSelectionOnClick
      />
    </Box>: <p>No Appointment Data available yet!!</p>}</div>
    );
  }



