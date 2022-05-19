import React, { useState,useEffect } from 'react'
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { postImageData,getData } from '../FeatchNodeServices';
import {MenuItem,Select,FormControl,InputLabel} from '@mui/material'
import DisplayAllSubcategories from './DisplayAllSubcategories'
import Swal from "sweetalert2"

const useStyles = makeStyles({
  root: {
    //color: 'blue', // 🔵
    
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  subdiv:{
      padding:10,
      background:'#7ed6df',
      marginTop:50,
      width:600,
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



function Subcategories(props) {
    const classes = useStyles();
    const [categoryid,setcategoryid]=useState('');
    const [subcategoryname,setsubcategoryname]=useState('');
    const [subcategorydesc,setsubcategorydesc]=useState('');
    const [list,setList]=useState([]);
    

    const handleChange = (event) => {
      setcategoryid(event.target.value);
    };

    const fetchCategories=async()=>{
      var result = await getData("categories/displaycategory")
      setList(result.result)
      // alert(JSON.stringify(result))
  }
  useEffect(
    function(){
        fetchCategories()
    },[]
  )

  const fillCategory=()=>{
    return list.map((item)=>{
      return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )
    })
  }

    const [subIcon,setsubIconName]=useState({bytes:'',filename:"/pharmacy.png"});
    const handlesubIcon=(event)=>{
setsubIconName({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }

    const handleSubmit=async()=>{
     var formData = new FormData()
     formData.append('categoryid',categoryid)
     formData.append('subcategoryname',subcategoryname)//****subcategoryname=req.body.subcategoryname in node***
     formData.append('subicon',subIcon.bytes)
     formData.append('subcategorydesc',subcategorydesc)
     var result = await postImageData("subcategories/savesubcategory",formData)
      //alert(result.result)
      //*****  . ke baad wale result ko node status(200) se liye h****
      if(result.result){
        Swal.fire({
       position: 'center',
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
      setcategoryid("")
      setsubcategoryname("")
      setsubcategorydesc("")
    }


    const handleDisplayList=()=>{
      props.setViewContainer(<DisplayAllSubcategories/>)
     
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
            SubCatagory Interface
          </Grid>

          <Grid item xs={6}>
<Button onClick={()=>handleDisplayList()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}}variant="contained" component="span" fullWidth>
   List Subcategory
  </Button>
</Grid>
          <Grid item xs={12}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Category</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryid}
          label="Category"
          onChange={handleChange}
        >
          {fillCategory()}
        </Select>
      </FormControl>
         
       

          </Grid>
          {/* <Grid item xs={12}>
          
              // <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Catagoryid"
             
              // onChange={(event)=>setcategoryid(event.target.value)} fullWidth/>
          </Grid> */}

          
          <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="SubCatagoryName" value={subcategoryname} onChange={(event)=>setsubcategoryname(event.target.value)} fullWidth/>
          </Grid>

          
          <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="SubCatagoryDesc" value={subcategorydesc} onChange={(event)=>setsubcategorydesc(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6} style={{justifyContent:'center',alignItems:'center'}}>
            
          <label htmlFor="contained-button-file">
  <Input onChange={(event)=>handlesubIcon(event)}accept="image/*" id="contained-button-file" multiple type="file" />
  <Button style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}} variant="contained" component="span" fullWidth>
    Upload
  </Button>
</label>

</Grid>
<Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<Avatar
  alt="Remy Sharp"
  src={subIcon.filename}
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
<Button  onClick={()=>handleReset()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}} variant="contained" component="span" fullWidth>
    Reset
  </Button>
</Grid>

      </Grid>


        </div>
      
    </div>
  );
}










export default Subcategories;