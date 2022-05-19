import React, { useEffect, useState } from "react"
import MaterialTable from "@material-table/core";
import { Grid, TextField, Button, Avatar,InputLabel,FormControl,MenuItem,Select } from '@mui/material'
import { styled, makeStyles } from '@mui/styles';
import { ServerURL,getData,postDataImage,postData } from '../FeatchNodeServices';
import Swal from "sweetalert2";
const Input = styled('input')({
  display: 'none',
});
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 900,
    marginTop: 50

  },

  croot: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  csubdiv: {
    background: '#7ed6df',
    padding: 20,
    width: 700,
    marginTop: 50

  },
});
const CssTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1.5px solid #FFF',
      borderRadius: 0
    },
    '&:hover fieldset': {
      borderColor: '#FFF',

    },
    '&.Mui-focused fieldset': {
      borderColor: '#FFF',

    },

  },
});



export default function DisplayAllCoupan(props) {
  var classes = useStyles()
  const [listcoupan, setListcoupan] = useState([])
  const [coupanid, setcoupanId] = useState('')
   const [coupanstatus, setcoupanStatus] = useState('')
  const [coupanpicture, setcoupanPicture] = useState({ bytes: '', filename: '/image.png' })


  const fetchAllcoupan = async () => {
    var result = await getData("coupan/displayallcoupan")
    setListcoupan(result.result)
  }



  
  useEffect(function () {

    fetchAllcoupan()

  }, [])

  
  const handleDeleteData = async (coupanid, coupanpicture) => {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then(async (result) => {
      if (result.isConfirmed) {

        var body = { coupanid: coupanid, coupanpicture: coupanpicture }
        var result = await postData("coupan/deletecoupan", body)
        if (result.result)
          Swal.fire(
            'Deleted!',
            'coupan has been deleted.',
            'success'
          )
      }
      else
        Swal.fire(
          'Deleted!',
          'Fail to Delete coupan .',
          'error'
        )
      fetchAllcoupan()
    })

  }
 

  
  function displayAll() {
    return (
      <MaterialTable
        title="List of coupans"
        columns={[
          { title: 'coupan Id', field: 'coupanid' },
          { title: 'coupan Status', field: 'coupanstatus' },
          {
            title: 'Picture', field: 'coupanpicture',
            render: rowData => <img src={`${ServerURL}/images/${rowData.coupanpicture}`} style={{ width: 50, borderRadius: '50%' }} />
          },

        ]}
        data={listcoupan}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category ',
            // onClick: (event, rowData) => handleEdit(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete coupan ',
             onClick: (event, rowData) => handleDeleteData(rowData.coupanid, rowData.coupanpicture)
          }
        ]}
      />
    )
  }


  return (
    <div className={classes.root}>
      <div className={classes.subdiv}>
        {displayAll()}
       
      </div>
    </div>

  )

}


