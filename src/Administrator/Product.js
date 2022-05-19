
import React, { useState,useEffect } from 'react'
import {  styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { postImageData,getData, postData } from '../FeatchNodeServices';
import {MenuItem,Select,FormControl,InputLabel} from '@mui/material'
import DisplayAllProduct from './DisplayAllProduct'
import Swal from 'sweetalert2';
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

function Product(props) {
    const classes = useStyles();
    const [categoryid,setcategoryid]=useState('');
    const [subcategoryid,setsubcategoryid]=useState('');
    const [brandid,setBrandid]=useState('');
    const [productname,setProductname]=useState('');
    const [productdesc,setProductDesc]=useState('');
    const [price,setPrice]=useState('');
    const [offerprice,setOfferprice]=useState('');
    const [offertype,setOffertype]=useState('');
    const [stock,setStock]=useState('');
    const [salestatus,setSalestatus]=useState('');
    const [rating,setRating]=useState('');
    
    const [productid,setProductid]=useState('');
    const [Status,setStatus]=useState('');
    const [list,setList]=useState([])
    const [clist,setClist]=useState([])
    const [slist,setSlist]=useState([])
    const [pictureIcon,setPictureIconName]=useState({bytes:'',filename:"/pharmacy.png"});
    const handlesubIcon=(event)=>{
setPictureIconName({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
    }


    const handleChange = async(event) => {
      setcategoryid(event.target.value);
      var result = await postData("subcategories/displaysubcategory",{categoryid:event.target.value})
      setClist(result.result)
      
    
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


  const handleChangesubcategory = async(event) => {
    setsubcategoryid(event.target.value);
    var result = await postData("brand/displaybrand",{subcategoryid:event.target.value})
    setSlist(result.result)
  };

useEffect(()=>{
    fetchCategories()
  },[]
)

const fillSubcategory=()=>{
  return clist.map((item)=>{
    return(
      
      <MenuItem value={item.subcategoryid}>{item.subcategoryname}</MenuItem>
    )
  })
}

const handleChangebrand = async(event) => {
  setBrandid(event.target.value)

};



const fillBrand=()=>{
return slist.map((item)=>{
  return(
    <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
  )
})
}


    const handleSubmit=async()=>{
     var formData = new FormData()
     formData.append('categoryid',categoryid)
     formData.append('subcategoryid',subcategoryid)//****subcategoryname=req.body.subcategoryname in node***
     formData.append('brandid',brandid)
     formData.append('productname',productname)
     formData.append('description',productdesc);
     formData.append('price',price);
     formData.append('offerprice',offerprice);
     formData.append('offertype',offertype);
     formData.append('stock',stock);
     formData.append('status',Status)
     formData.append('salestatus',salestatus);
     formData.append('rating',rating);
     formData.append('picture',pictureIcon.bytes)
     
     var result = await postImageData("products/saveproduct",formData)
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
setBrandid("")
setProductname("")
setProductDesc("")
setPrice("")
setOfferprice("")
setOffertype("")
setStock("")
setSalestatus("")
setRating("")
setStatus("")
      // setsubcategoryname("")
      // setsubcategorydesc("")
    }


    const handleDisplayList=()=>{
      props.setViewContainer(<DisplayAllProduct/>)
     
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
            Products Interface
          </Grid>

          <Grid item xs={6}>
<Button onClick={()=>handleDisplayList()} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}}variant="contained" component="span" fullWidth>
   List Product
  </Button>
</Grid>
          <Grid item xs={6}>
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

      <Grid item xs={6}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">SubCategory</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={subcategoryid}
          label="SubCategory"
          onChange={handleChangesubcategory}
        >
          {fillSubcategory()}
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Brand</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={brandid}
          label="Brand"
          onChange={handleChangebrand}
        >
          {fillBrand()}
        </Select>
      </FormControl>
      </Grid>
      <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Product Name" value={productname} onChange={(event)=>setProductname(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Product Desc" value={productdesc} onChange={(event)=>setProductDesc(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Price" value={price} onChange={(event)=>setPrice(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="OfferPrice" value={offerprice} onChange={(event)=>setOfferprice(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="OfferType"  value={offertype} onChange={(event)=>setOffertype(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Stock" value={stock} onChange={(event)=>setStock(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Status" value={Status} onChange={(event)=>setStatus(event.target.value)} fullWidth/>
          </Grid>
          
          <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Sales Status" value={salestatus} onChange={(event)=>setSalestatus(event.target.value)} fullWidth/>
          </Grid>
          <Grid item xs={6}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Rating" value={rating} onChange={(event)=>setRating(event.target.value)} fullWidth/>
          </Grid>


      
          {/* <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="Catagoryid" onChange={(event)=>setcategoryid(event.target.value)} fullWidth/>
          </Grid>

          
          <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="SubCatagoryid" onChange={(event)=>setsubcategoryid(event.target.value)} fullWidth/>
          </Grid> */}

          
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
  src={pictureIcon.filename}
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

export default Product ;