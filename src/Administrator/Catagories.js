//#58B19F
import React, { useState } from 'react'
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { postImageData } from '../FeatchNodeServices';
import DisplayAllCategories from './DisplayAllCategories'
import Swal from "sweetalert2"

const useStyles = makeStyles({
  root: {
    //color: 'blue', // 🔵
  
    display:'flex',
    alignItems:'center',
    justifyContent:'center',
    
  },
  subdiv:{
      padding:10,
      background:'#7ed6df',
      marginTop:50,
       
 }
});

const CssTextField = styled(TextField)({
  
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      border: '1px solid #FFF',
      borderRadius:0
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

function Catagories(props) {
    const classes = useStyles();
    const [categoryName,setcategoryName]=useState('');
    const [Icon,setIconName]=useState({bytes:'',filename:"/pharmacy.png"});
    const handleIcon=(event)=>{
setIconName({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }

    const handleSubmit=async()=>{
     var formData = new FormData()
     formData.append('categoryname',categoryName)//****categoryname=req.body.categoryname in node***
     formData.append('icon',Icon.bytes)
     var result = await postImageData("categories/savecategory",formData)
      //alert(result.result)//
      //*****  . ke baad wale result ko node status(200) se liye h****
      if(result.result){
         Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your category has been saved',
        showConfirmButton: false,
        timer: 3000
      })
        }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'fail',
          title: 'fail to fill category',
          showConfirmButton: false,
          timer: 3000
        })
      }
    }


    const handleReset=()=>{
      setcategoryName("")

    }


    const handleDisplayList=()=>{
 props.setViewContainer(<DisplayAllCategories/>)

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
      <Grid container spacing={2}>
          <Grid item xs={6} style={{fontSize:20,fontWeight:"bold",color:'#FFF'}}>
            Catagory Interface 
          </Grid>
          <Grid item xs={6}>
<Button onClick={()=>handleDisplayList()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}}variant="contained" component="span" fullWidth>
   List Category
  </Button>
</Grid>
          
          <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Catagory" value={categoryName} onChange={(event)=>setcategoryName(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6} style={{justifyContent:'center',alignItems:'center'}}>
            
          <label htmlFor="contained-button-file">
  <Input onChange={(event)=>handleIcon(event)}accept="image/*" id="contained-button-file" multiple type="file" />
  <Button style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}} variant="contained" component="span" fullWidth>
    Upload
  </Button>
</label>

</Grid>
<Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<Avatar
  alt="Remy Sharp"
  src={Icon.filename}
  variant='rounded'
  sx={{ width: 56, height: 56 }}
/>
</Grid>
<Grid item xs={6}>
<Button onClick={()=>handleSubmit()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}}variant="contained" component="span" fullWidth>
    Submit
  </Button>
</Grid>
<Grid item xs={6}>
<Button onClick={()=>handleReset()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}} variant="contained" component="span" fullWidth>
    Reset
  </Button>
</Grid>

      </Grid>


        </div>
      
    </div>
  );
}

export default Catagories;



