import React, { useState,useEffect } from 'react'
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import { Grid, TextField, Button, Avatar,InputLabel,FormControl,MenuItem,Select } from '@mui/material'
import { borderRadius } from '@mui/system';
import { getData,postImageData,postData } from '../FeatchNodeServices';
import { DropzoneArea } from 'material-ui-dropzone';
import Swal from "sweetalert2";
import DisplayAllCoupan from './DisplayAllCoupan';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  subdiv: {
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
const Input = styled('input')({
  display: 'none',
});
function Coupan(props) {
    const classes = useStyles();
    
    const [coupanstatus,setcoupanStatus] = useState('')
    const [uploadfiles,setFiles]= useState([])
    
      const handleImage=(files)=>{
       setFiles(files);
      }

      const handleDisplayList=()=>{
        props.setViewContainer(<DisplayAllCoupan/>)
       
           }
    
  
    const handleSubmit = async () => {
      
      var formData = new FormData()
      formData.append('coupanstatus',coupanstatus)
      uploadfiles.map((file,index)=>{
        formData.append("image"+index,file)
      })

      var result = await postImageData('coupan/savecoupan', formData)
      if(result.result)
      {
        Swal.fire({
          title: "BESTMEDS",
          text: 'coupan Submitted Successfully..',
          imageUrl: '/image.png',
          imageWidth: 150,
          imageHeight: 150,
          icon:'success'
        })
      }
      else
      {
        Swal.fire({
          title: "BESTMEDS",
          text: 'Fail To Submit coupan',
          imageUrl: '/image.png',
          imageWidth: 150,
          imageHeight: 150,
          icon:'error'
        })
      }
  
  
  
  
    }
    return (
  
      <div className={classes.root}>
    <style jsx>
      {`
        fieldset.MuiOutlinedInput-notchedOutline {
          border-color: white !important;
        }
        svg.MuiSvgIcon-root {
          color: white !important;
        }
        
        div.MuiOutlinedInput-input.MuiSelect-select{
          color:#FFF !important
        }
        
      `}
    </style>
        <div className={classes.subdiv}>
          <Grid container spacing={2} >
          <Grid item xs={6} style={{display:'flex',alignItems:'center', fontSize: 25, fontWeight: 'bold', color: '#FFF' }}>
          <img src="/category.png" style={{width:50,height:50}}/>
             Add coupan 
            </Grid>
            <Grid item xs={6}>
<Button onClick={()=>handleDisplayList()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}}variant="contained" component="span" fullWidth>
   List Coupan
  </Button>
</Grid>

            <Grid item xs={12}>
              <CssTextField variant="outlined" InputLabelProps={{
                style: { color: '#FFF' },
              }} inputProps={{ style: { color: "#FFF" } }} label="coupan Status" onChange={(event) => setcoupanStatus(event.target.value)} fullWidth />
  
            </Grid>

                      <Grid item xs={12}>
                        <DropzoneArea
                         acceptedFiles={['image/jpeg','image/png','image/bmp','image/jpg']}
                         filesLimit={6}
                         maxFileSize={500000}
                         onChange={handleImage}
                         

                        />


                      </Grid>

           
            <Grid item xs={6}>
              <Button onClick={() => handleSubmit()} style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Submit</Button>
  
            </Grid>
            <Grid item xs={6}>
              <Button style={{ background: '#FFF', color: '#7ed6df', fontWeight: 'bold' }} variant='contained' fullWidth>Reset</Button>
            </Grid>
  
          </Grid>
  
        </div>
  
      </div>
    );
  }
  
  export default Coupan;
  