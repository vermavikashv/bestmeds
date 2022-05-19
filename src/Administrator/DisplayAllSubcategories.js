import React, { useState, useEffect } from 'react'
import MaterialTable from "@material-table/core"
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { getData,ServerURL } from '../FeatchNodeServices';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import {Grid,TextField,Button,Avatar,Divider} from '@mui/material'
import {postData, postImageData } from '../FeatchNodeServices';
import Swal from "sweetalert2"
import {MenuItem,Select,FormControl,InputLabel} from '@mui/material'

const useStyles = makeStyles({
    root: {
      //color: 'blue', // 🔵
      background:'#FFF',
      display:'flex',
      alignItems:'center',
      justifyContent:'center'
    },
    subdiv:{
        padding:10,
        background:'#7ed6df',
        marginTop:50,
        width:1000,
   },
   croot: {
    //color: 'blue', // 🔵
    background:'#FFF',
    display:'flex',
    alignItems:'center',
    justifyContent:'center'
  },
  csubdiv:{
      padding:10,
      background:'#7ed6df',
      marginTop:50,
      width:600,
 },
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





export default function DisplayAllSubcategories(props) {
    const classes = useStyles();
    const[list,setList] = useState([])
    const [open,setOpen] =useState(false)
    const [openButton,setButtonOpen] =useState(false)
    const [tempIcon,setTempicon]=useState('')
    const [uploadbtn,setUploadbtn]=useState()


    
const[categoryId,setcategoryId]=useState()
const[subcategoryId,setsubcategoryId]=useState()
const [subcategorydesc,setsubcategoryDesc]=useState('');
    const [subcategoryName,setsubcategoryName]=useState('');
    const [Icon,setIconName]=useState({bytes:'',filename:"/pharmacy.png"});
    const handleIcon=(event)=>{
        setButtonOpen(true)
setIconName({bytes:event.target.files[0],filename:URL.createObjectURL(event.target.files[0])})
setUploadbtn(false)


    }

    const handleSubmit=async()=>{
      // var formData = new FormData()
      // formData.append('categoryname',categoryName)//****categoryname=req.body.categoryname in node***
      // formData.append('categoryid',categoryId)
      // // var result = await postImageData("categories/editcategorydata",formData)
      //  alert(result.result)
      var body= {categoryid:categoryId,subcategoryid:subcategoryId,subcategoryname:subcategoryName,description:subcategorydesc}
    var result = await postData("subcategories/editsubcategorydata",body)
    //alert(result.result)//*****  . ke baad wale result ko node status(200) se liye h****
if(result.result){ Swal.fire({
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

    // const handleChange = (event) => {
    //   setsubcategoryId(event.target.value);
    // };

    const fetchSubcategories=async()=>{
      var result = await getData("subcategories/displayallsubcategory")
      setList(result.result)
      // alert(JSON.stringify(result))
  }
  useEffect(
    function(){
        fetchSubcategories()
    },[]
  )

  // const fillSubcategory=()=>{
  //   return list.map((item)=>{
  //     return(
  //       <MenuItem value={item.subcategoryId}>{item.subcategoryName}</MenuItem>
  //     )
  //   })
  // }

    const handleIconSave=async()=>{
      var formData = new FormData()
      formData.append('categoryid',categoryId)
     formData.append('subcategoryid',subcategoryId)//****categoryname=req.body.categoryname in node***
     formData.append('description',subcategorydesc)
     formData.append('icon',Icon.bytes)
     var result = await postImageData("subcategories/editsubcategoryicon",formData)
      if(result.result){ Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your image has been saved',
        showConfirmButton: false,
        timer: 3000
      })
        }
      else{
        Swal.fire({
          position: 'top-end',
          icon: 'error',
          title: 'fail to fill image',
          showConfirmButton: false,
          timer: 3000
        })
      }
      setOpen(false)
      setUploadbtn(true)
      fetchCategories()
      setButtonOpen(false)
    }
    
    const handleCancel=()=>{
        setButtonOpen(false)
        setIconName({bytes:"",filename:`${ServerURL}/images/${tempIcon}`})
        setUploadbtn(true)
    }

    const handleOpen=(rowData)=>{
      setcategoryId(rowData.categoryid)
      setsubcategoryId(rowData.subcategoryid)
        setsubcategoryName(rowData.subcategoryname)
        setsubcategoryDesc(rowData.description)
        setIconName({bytes:"",filename:`${ServerURL}/images/${rowData.icon}`})
        setTempicon(rowData.icon)
        setOpen(true)
        setUploadbtn(true)
    }

    const handleClose=()=>{
        setOpen(false)
        fetchCategories()
        setButtonOpen(false)
        setUploadbtn(true)
    }

    const fetchCategories=async()=>{
        var result = await getData("subcategories/displaysubcategory")
        setList(result.result)
    }
    const handleDelete=async()=>{
      
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        }).then(async(result) => {
          if (result.isConfirmed) {
            var dresult = await postData("subcategories/deletesubcategory",{subcategoryid:subcategoryId})
      if(dresult.result)
            Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
            )
          }
        })
      fetchCategories()
    }
    


    /**********Dialog START********* */
    const showDialog=()=>{
        return(
          
        <div>
        
        <Dialog
          open={open}
          onClose={handleClose}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          
          <DialogContent>
          <div className={classes.croot}>
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
        <div className={classes.csubdiv}>
        <Grid container spacing={2}>
          <Grid item xs={12} style={{fontSize:20,fontWeight:"bold",color:'#FFF'}}>
            SubCatagory Interface
          </Grid>

          <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="CatagoryId" value={categoryId} InputProps={{readOnly:true}} onChange={(event)=>setcategoryId(event.target.value)} fullWidth/>
          </Grid>
         
          <Grid item xs={12}>
          
               <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="SubCatagoryName" value={subcategoryName}
             
          onChange={(event)=>setsubcategoryName(event.target.value)} fullWidth/>
          </Grid>


          
          

          
          <Grid item xs={12}>
              <CssTextField container="outlined" InputLabelProps={{style:{color:'#FFF'}}}  inputProps={{style:{color:'white'}}}label="SubCatagoryDesc" value={subcategorydesc} onChange={(event)=>setsubcategoryDesc(event.target.value)} fullWidth/>
          </Grid>

          <Grid item xs={12}>
<Button onClick={handleSubmit} style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}}variant="contained" component="span" fullWidth>
    Edit Data
  </Button>
</Grid>
<Grid item xs={12} >
  <Divider  style={{background:'#FFF'}}/>
</Grid>


          <Grid item xs={6} style={{justifyContent:'center',alignItems:'center'}}>
            
          {uploadbtn?<div> <label htmlFor="contained-button-file">
  <Input onChange={(event)=>handleIcon(event)}accept="image/*" id="contained-button-file" multiple type="file" />
 <Button style={{background:'#FFF',color:'#3498db',fontWeight:'bold'}} variant="contained" component="span" fullWidth>
    Upload
  </Button>
</label></div>:<div></div>}

{openButton?<div><Button onClick={handleIconSave} style={{color:'#FFF',fontWeight:'bold'}} component="span" >
    save
  </Button>
  <Button onClick={handleCancel} style={{color:'#FFF',fontWeight:'bold'}} component="span" >
    cancel
  </Button></div>:<div></div>}

</Grid>
<Grid item xs={6} style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
<Avatar
  alt="Remy Sharp"
  src={Icon.filename}
  variant='rounded'
  sx={{ width: 56, height: 56 }}
/>
</Grid>


      </Grid>

        </div>
      
    </div>
          </DialogContent>
          <DialogActions>
            
            <Button onClick={handleClose} autoFocus>
              close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
  
// alert([subcategoryId, subcategoryName, categoryId,subcategorydesc] )

);
    }
    /**********Dialog END********* */

     useEffect(
        function(){
            fetchCategories()
        },[]
     )


    function display() {
        return (
            <MaterialTable
                title="LIST SUBCATEGORY"
                columns={[
                    { title: 'Category Id', field: 'catname' },
                    { title: 'SubCategory Id', field: 'subcategoryid' },
                    { title: 'SubCategory Name', field: 'subcategoryname' },
                    { title: 'SubCategory Icon', field: 'icon' ,
                    render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 80, borderRadius: '25%'}}/>
                },
                { title: 'SubCategory Desc', field: 'description' },
                ]}
                data={list}
                actions={[
                    {
                        icon: 'edit',
                        tooltip: 'edit user',
                        onClick: (event, rowData) => handleOpen(rowData)
                    },
                    {
                      icon: 'delete',
                      tooltip: 'delete user',
                      onClick: (event, rowData) => handleDelete(rowData)
                  }
                ]}
            />
        )
    }
    
    return (<div>
         <div className={classes.root}>
        <div className={classes.subdiv}>

        {display()}
        {showDialog()}

</div>
</div>

    </div>)
}