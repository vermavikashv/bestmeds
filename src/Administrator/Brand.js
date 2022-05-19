
import React, { useState,useEffect } from 'react'
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { postImageData,getData, postData } from '../FeatchNodeServices';
import {MenuItem,Select,FormControl,InputLabel} from '@mui/material'
import DisplayAllBrand from './DisplayAllBrand'
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

function Brand(props) {
    const classes = useStyles();
    const [categoryid,setcategoryid]=useState('');
    const [subcategoryid,setsubcategoryid]=useState('');
    const [BrandName,setBrandName]=useState('');
    const [Status,setStatus]=useState('');
    const [list,setList]=useState([])
    const [slist,setSlist]=useState([])
    const [BrandIcon,setBrandIconName]=useState({bytes:'',filename:"/pharmacy.png"});
    const handlesubIcon=(event)=>{
setBrandIconName({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }


    const handleChange = (event) => {
        fetchSubcategories(event.target.value);
      setcategoryid(event.target.value);
      // var result = await getData("subcategories/displaysubcategory",{categoryid:event.target.value})
      // setSlist(result.result)
      
    
    };

    const fetchCategories=async()=>{
      var result = await getData("categories/displaycategory")
      setList(result.result)
      // alert(JSON.stringify(result))
  }
 

  const fillCategory=()=>{
    return list.map((item)=>{
      return(
        <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
      )
    })
  }


  const handleChangesubcategory = (event) => {
    setsubcategoryid(event.target.value);
  };

  const fetchSubcategories=async(cid)=>{
    
    var result = await postData("subcategories/displaysubcategory",{categoryid:cid})
    setSlist(result.result)
    // alert(JSON.stringify(result))
    alert(categoryid)
}
useEffect(()=>{
    fetchCategories()
    // fetchSubcategories()
  },[]
)

const fillSubcategory=()=>{
  return slist.map((item)=>{
    return(
      <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    )
  })
}
    const handleSubmit=async()=>{
     var formData = new FormData()
     formData.append('categoryid',categoryid)
     formData.append('subcategoryid',subcategoryid)//****subcategoryname=req.body.subcategoryname in node***
     formData.append('brandname',BrandName)
     formData.append('brandicon',BrandIcon.bytes)
     formData.append('status',Status)
     var result = await postImageData("brand/savebrand",formData)
      //alert(result.result)*****  . ke baad wale result ko node status(200) se liye h****
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
      setcategoryid("")
      setsubcategoryid("")
      setBrandName("")
      setStatus("")
    } 

    const handleDisplayList=()=>{
      props.setViewContainer(<DisplayAllBrand/>)
     
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
            Brand Interface
          </Grid>
          <Grid item xs={6}>
<Button onClick={()=>handleDisplayList()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}}variant="contained" component="span" fullWidth>
   List Brand
  </Button>
</Grid>
          <Grid item xs={12}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={categoryid}
          displayEmpty
          label="Category"
          onChange={handleChange}
        >
<MenuItem value="" disabled>Select Category</MenuItem>
            
          {fillCategory()}
        </Select>
      </FormControl>
      </Grid>

      <Grid item xs={12}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"></InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subcategoryid}
          displayEmpty
          label="SubCategory"
          onChange={handleChangesubcategory}
        >

<MenuItem value="" disabled>Select Subcategory</MenuItem>
          {fillSubcategory()}
        </Select>
      </FormControl>
      </Grid>
          {/* <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Catagoryid" onChange={(event)=>setcategoryid(event.target.value)} fullWidth/>
          </Grid>

          
          <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="SubCatagoryid" onChange={(event)=>setsubcategoryid(event.target.value)} fullWidth/>
          </Grid> */}

          <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="BrandName" value={BrandName} onChange={(event)=>setBrandName(event.target.value)} fullWidth/>
          </Grid>

          
         <Grid item xs={12}>
                            <FormControl fullWidth>
                                    <InputLabel style={{ color: "#FFF" }} id="demo-simple-select-label">Status </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={Status}
                                        label="Status"
                                        onChange={(event)=>setStatus(event.target.value)}
                                    >
                                        <MenuItem value="Top Brands">Top Brands</MenuItem>
                                        <MenuItem value="Trending">Trending</MenuItem>
                                        <MenuItem value="Popular">Popular</MenuItem>
                                    </Select>
                                </FormControl>
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
  src={BrandIcon.filename}
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
<Button   onClick={()=>handleReset()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}} variant="contained" component="span" fullWidth>
    Reset
  </Button>
</Grid>

      </Grid>

        </div>
      
    </div>
  );
}

export default Brand;