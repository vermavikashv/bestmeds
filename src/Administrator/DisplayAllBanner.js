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



export default function DisplayAllBanner(props) {
  var classes = useStyles()
  const [listbanner, setListbanner] = useState([])
  const [bannerid, setbannerId] = useState('')
   const [bannerstatus, setbannerStatus] = useState('')
  const [bannerpicture, setbannerPicture] = useState({ bytes: '', filename: '/image.png' })


  const fetchAllbanner = async () => {
    var result = await getData("banner/displayallbanner")
    setListbanner(result.result)
  }



  
  useEffect(function () {

    fetchAllbanner()

  }, [])

  
  const handleDeleteData = async (bannerid, bannerpicture) => {
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

        var body = { bannerid: bannerid, bannerpicture: bannerpicture }
        var result = await postData("banner/deletebanner", body)
        if (result.result)
          Swal.fire(
            'Deleted!',
            'banner has been deleted.',
            'success'
          )
      }
      else
        Swal.fire(
          'Deleted!',
          'Fail to Delete banner .',
          'error'
        )
      fetchAllbanner()
    })

  }
 

  
  function displayAll() {
    return (
      <MaterialTable
        title="List of banners"
        columns={[
          { title: 'banner Id', field: 'bannerid' },
          { title: 'banner Status', field: 'bannerstatus' },
          {
            title: 'Picture', field: 'bannerpicture',
            render: rowData => <img src={`${ServerURL}/images/${rowData.bannerpicture}`} style={{ width: 50, borderRadius: '50%' }} />
          },

        ]}
        data={listbanner}
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit Category ',
            // onClick: (event, rowData) => handleEdit(rowData)
          },
          {
            icon: 'delete',
            tooltip: 'Delete banner ',
             onClick: (event, rowData) => handleDeleteData(rowData.bannerid, rowData.bannerpicture)
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


