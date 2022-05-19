import React, { useState,useEffect } from 'react'
import {  styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import {Grid,TextField,Button,Avatar} from '@mui/material'
import { postImageData,getData, postData } from '../FeatchNodeServices';
import {MenuItem,Select,FormControl,InputLabel} from '@mui/material'
import DisplayProductImages from './DisplayProductImages'
// import Dropzone from 'react-dropzone';
import {DropzoneArea} from 'material-ui-dropzone'

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

export default function ProductImages(props) {
    const classes = useStyles();
    const [open,setOpen]= useState(false)
    const [uploadFiles,setFiles]=useState([])
    const [categoryid,setcategoryid]=useState('');
    const [subcategoryid,setsubcategoryid]=useState('');
    const [brandid,setBrandid]=useState('');
    const [productid,setProductId]=useState('');
    const [image,setImage]=useState([])
    const [list,setList]=useState([])
    const [clist,setClist]=useState([])
    const [slist,setSlist]=useState([])
    const [productlist,setProductList]=useState([])

//      const handleOpen=()=> {
       
//             setOpen(true)
        
//     }

//     const handleClose=()=> {
       
//         setOpen(false)
    
// }
  const handleSave=(files)=>{
      setFiles(files)

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
fetchAllProducts(event.target.value)
};



const fillBrand=()=>{
return slist.map((item)=>{
return(
  <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
)
})
}

const fetchAllProducts=async(bid)=>{
    //alert(bid)

    var result = await postData("products/displayallproductimages",{brandid:bid,subcategoryid:subcategoryid})
    setProductList(result.result)
    

}

const handleChangeproduct = async(event) => {
    setProductId(event.target.value)
    
    };

const fillproduct=()=>{
    return productlist.map((item)=>{
    return(
      <MenuItem value={item.productid}>{item.productname}</MenuItem>
    )
    })
    }


    const handleSubmit=async()=>{
        var formData = new FormData()
        formData.append('categoryid',categoryid)
        formData.append('subcategoryid',subcategoryid)//****subcategoryname=req.body.subcategoryname in node***
        formData.append('brandid',brandid)
        formData.append('productid',productid)
        uploadFiles.map((file, index) => {
          formData.append("images" + index, file)
      })
    

        var result = await postImageData("productimages/saveproductimages",formData)
        alert(result.result)//*****  . ke baad wale result ko node status(200) se liye h****
  
      }

      const handleReset=()=>{
        setcategoryid("")
  setsubcategoryid("")
  setBrandid("")
  setProductId("")
  setImage("")
      }

      const handleDisplayList=()=>{
        props.setViewContainer(<DisplayProductImages/>)
       
           }


    return(  <div className={classes.root}>
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
   List ProductImage
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
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Product</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={productid}
          label="Product"
          onChange={(event)=>handleChangeproduct(event)}
        >
          {fillproduct()}
        </Select>
      </FormControl>
      </Grid>

      <Grid item xs={12}>
{/* <Button 
// onClick={handleOpen}
>
                  
                </Button> */}
                <DropzoneArea
                    //open={open}
                   onChange={handleSave}
                    acceptedFiles={['image/jpeg', 'image/png', 'image/bmp']}
                    //showPreviews={true}
                    maxFileSize={5000000}
                    filesLimit={6}
                   //onClose={handleClose}
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
    )

}