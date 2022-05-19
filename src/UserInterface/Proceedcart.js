import React,{useEffect,useState} from 'react';
import {Button,TextField,Grid,Divider,MenuItem,InputLabel,Select,Box} from '@mui/material';
import { alpha, styled } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {useNavigate} from "react-router-dom"
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CartButton from './CartButton';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import Header from './Header';
import Footer from './Footer';
import { useDispatch } from 'react-redux';
import {postData,getData,ServerURL} from "../FeatchNodeServices"
import Slider from "react-slick";
import {FormControlLabel,FormLabel,FormControl,Radio,RadioGroup} from '@mui/material/';
import { useSelector } from 'react-redux';



const theme = createTheme();
const useStyles = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    subdiv: {
      
      padding: 10,
      width: 800,
     height:350,
      border:'0.5px solid lightgrey',
      borderRadius:10,
     
      margin:"30px 10px 0px 20px",
     background:"#fff"

 
  },
  pay:{
    padding: 10,
      width: 500,
     height:300,
      border:'0.5px solid lightgrey',
      borderRadius:10,
      margin:"10px 0px 0px 0px ",


  },
  promo:{
    padding: 10,
    width: 500,
   height:100,
    border:'0.5px solid lightgrey',
    borderRadius:10,
    margin:"30px 0px 0px 0px ",
  }
    
 
    
  });


  var bannersettings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };



  const CssTextField = styled(TextField)({
    '& .MuiOutlinedInput-root': {
      '& fieldset': {
        border: '1.5px solid #000',
        borderRadius: 0
      },
      '&:hover fieldset': {
        borderColor: '#000',
  
      },
      '&.Mui-focused fieldset': {
        borderColor: '#000',
  
      },
  
    },
  });
  const Input = styled('input')({
    display: 'none',
  });
export default function Proceedcart() {
  var  products=useSelector((state)=>state.product)
  var keys=Object.keys(products).length
  var listproducts = Object.values(products);

    var navigate=useNavigate()

    var totalamount = listproducts.reduce(calculateamount,0)

    var offeramount = listproducts.reduce(offeramount,0)
  
    function calculateamount(p,n){
     return (p+(n.price*n.qty))
    }
  
    function offeramount(p,n){
      return(p+(n.offerprice*n.qty))
    }
  

    var classes=useStyles()
    var dispatch=useDispatch()
    const [age, setAge] = React.useState('');
    const [banner,setBanner]=React.useState([])

    // const ProductShowCart = () => {
    //   return listproducts.map((item,index) => {
  
    //     return (<>
    //     <div style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 16, paddingTop: 20,marginTop:"30px"}}>
    //        {item.productname}
    //        </div>
    //        <div style={{color:"green"}}>only some product left</div>
    //        <div >company Name</div>
    //         <div> {/*&#8377; 978 <s style={{color:'#ff4757'}}>&#8377;1022 </s>*/} {item.offerprice>0?item.price-item.offerprice:item.price}</div> 
    //        <div style={{marginLeft:"280px",display:"flex",justifyContent:"flex-end"}} > 
    //   <FormControl >
    //     <InputLabel id="demo-simple-select-label">Qty:{listproducts.map((item)=> item.qty)}</InputLabel>
    //     <Select
    //     style={{width:"100px"}}
    //       labelId="demo-simple-select-label"
    //       id="demo-simple-select"
    //       value={age}
    //       label="Age"
    //       onChange={handleChange}
    //     >
    //       <MenuItem value={10}>Ten</MenuItem>
    //       <MenuItem value={20}>Twenty</MenuItem>
    //       <MenuItem value={30}>Thirty</MenuItem>
    //     </Select>
    //   </FormControl>
    // </div>
    // <Grid >
    //   <span>Delivery Between This month </span> 
    // <Box sx={{ '& button': { m: 1 } }} style={{marginLeft:"160px" ,padding:"10px"}}>
    //     <Button variant="contained" >
    //       remove
    //     </Button>
    //     <Button variant="contained" >
    //       Save For Later
    //     </Button>
    //     </Box>
    //     </Grid>
    //     </>)
  
    //   })
    // }

    const ProductShowCart = () => {
      return listproducts.map((item,index) => {
  
        return (<>
        {item.productname}
        </>)
  
      })
    }


  const handleChange = (event) => {
    setAge(event.target.value);
  };


  const fetchAllBanner=async()=>{
    var result=await getData('banner/displayallbanner')
    setBanner(result.result)
  
   }


   useEffect(function(){
    
    fetchAllBanner()
    
   
    },[])


  const showMainBanner=()=>{
    return banner.map((item)=>{
    return (
    <div>
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center',marginRight:"50px"}}>
     
     
     <img src={`${ServerURL}/images/${item.bannerpicture}`} style={{width:"900px",height:"260px",marginTop:"5px"}}/>
     </div>
        
    
    </div>
    )
    })
    }




    return([
      <div style={{width:'95%',margin:"auto",marginTop:"20px"}} >
        <Slider {...bannersettings}>
        {showMainBanner()}
        </Slider>
        </div>,
        <div>
          {ProductShowCart()}
        </div>,
        
      <div style={{display:"flex",flexDirection:"row"}}>
        
        <div className={classes.subdiv}>
         <Grid container spacing={2}>
           
           <Grid item xs={4}>
             <div style={{color:"#000",fontWeight:"bold",fontSize:24}}>Product
             </div>
             <Grid style={{padding:"10px",margin:"20px",}}>
             <img src='/Dettol.jpg' width="100px" height="100px"/>
             </Grid>
             </Grid>
             <Grid item xs={8}  >
             <div style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 16, paddingTop: 20,marginTop:"30px"}}>
           Dr Reckeweg R 4 Diarrhoea Drops 22 Ml
           </div>
           <div style={{color:"green"}}>only some product left</div>
           <div >company Name</div>
           <div> &#8377; 978 <s style={{color:'#ff4757'}}>&#8377;1022 </s> </div>
           <div style={{marginLeft:"280px",display:"flex",justifyContent:"flex-end"}} > 
      <FormControl >
        <InputLabel id="demo-simple-select-label">Qty:{listproducts.map((item)=> item.qty)}</InputLabel>
        <Select
        style={{width:"100px"}}
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Age"
          onChange={handleChange}
        >
          <MenuItem value={10}>Ten</MenuItem>
          <MenuItem value={20}>Twenty</MenuItem>
          <MenuItem value={30}>Thirty</MenuItem>
        </Select>
      </FormControl>
    </div>
    <Grid >
      <span>Delivery Between This month </span> 
    <Box sx={{ '& button': { m: 1 } }} style={{marginLeft:"160px" ,padding:"10px"}}>
        <Button variant="contained" >
          remove
        </Button>
        <Button variant="contained" >
          Save For Later
        </Button>
        </Box>
        </Grid>


            </Grid>
            <Grid  item xs={12} style={{padding:"10px"}}>
           <Divider />
           </Grid>
           <Grid item xs={6} style={{fontWeight:"bolder",fontSize:18}}> ADD MORE ITEMS </Grid>
           <Grid item xs={2}  style={{fontWeight:"bolder",fontSize:18,color:"black"}}><Divider orientation="vertical" /></Grid>
           <Grid item xs={4}  style={{fontWeight:"bolder",fontSize:24,color:"black"}}>+</Grid>
           </Grid>
         </div>
         <div>
         <div className={classes.promo}>
           <Grid style={{color:"#000",fontWeight:"lighter",fontSize:20}}>ApplyPromo/BMS SuperCash</Grid>
           <Grid>
           <FormControl>
      
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
      <FormControlLabel value="female" control={<Radio />} label="Apply Promo Code" />
      </RadioGroup>
        </FormControl>
           </Grid>
         </div>
        <div className={classes.pay}>
         <Grid container spacing={2}>
           <Grid item xs={6}>
         <div style={{color:"#000",fontWeight:"bold",fontSize:20}}>Payment Detail
             </div>
             <Grid style={{padding:"10px"}}>MRP Total</Grid>
             <Grid style={{padding:"10px"}}>Bestmeds Discount</Grid>
             <Grid style={{padding:"10px"}}>Total Amount</Grid>
</Grid>
         
         <Grid item xs={6}>
         <div style={{padding:"12px"}}>
             </div>
             <Grid style={{padding:"10px",marginLeft:"160px"}}>975</Grid>
             <Grid style={{padding:"10px",marginLeft:"160px"}}>520</Grid>
             <Grid style={{padding:"10px",marginLeft:"160px"}}>1222</Grid>
             
</Grid>
<Grid item xs={12} varient="container">Total Saving </Grid>
         </Grid>
         

         </div>
       
         </div>
      </div>
    ])



}