import  React,{useState,useEffect,createRef} from 'react';
import {Button,TextField,Grid,Divider} from '@mui/material';
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
import { useLocation } from 'react-router-dom';
import { ServerURL,postData } from '../FeatchNodeServices';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



const theme = createTheme();
const useStyles = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    },
    imagediv:{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      margin:10,
      padding:20,
    }
    
  });



  var settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
   
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
export default function ProductShow(props) {
    var navigate=useNavigate()
    var imagesSlider=createRef()
    var classes=useStyles()
    var dispatch=useDispatch()
    const [refresh,setRefresh]=React.useState(false)
    const[listimage,setListImages]=useState([])
   
    var location=useLocation()
    var product=location.state.product
    const[image,setImage]=useState(product.picture)
const [productinfo,setProductinfo]=useState([])


const fetchProductDetails=async()=>{
var result=await postData('products/fetchproductdetails',{productid:product.productid})
setProductinfo(result.result);

}





    const fetchProductImages=async()=>{
var body={productid:product.productid}
var result= await postData('productimages/fetchproductimages',body)
if(result.result)
{
  setListImages(result.result)
}
    }

    const handleChangePicture=(pic)=>{
      setImage(pic)
    }


    const showImagesList=()=>{
      return listimage.map((item,index)=>{
      return (
      <div>
      <div className={classes.imagediv} >
       
       <div style={{padding:10}}>
       <img onMouseOver={()=>handleChangePicture(item.image)} src={`${ServerURL}/images/${item.image}`} style={{width:50,height:50,cursor:'pointer'}}/>
       </div>
          
      </div>
      </div>
      
      
      )
      
      
      })
      
      
      }

      useEffect(function(){
       fetchProductImages()
       fetchProductDetails()
      
      },[])

    const handleQtyChange=(value,item)=>{
      item['qty']=value
      if(value>0)
      {
        dispatch({type:"ADD_PRODUCT",payload:[item.productid, item]})
      }
      else{
        dispatch({type:"DEL_PRODUCT",payload:[item.productid]})
      }
    
      setRefresh(!refresh)
    }


    


    return (
        <div className={classes.root}>
          <div style={{width:'100%'}} >
        <Header />
        </div>
            
            <Grid container spacing={2} style={{padding:"20px"}}>
                <Grid item xs={12} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                
                <Grid item xs={6} style={{display:'flex',justifyContent:'center',flexDirection:"column"}}>
       
                  <div style={{display:'flex',justifyContent:'center',alignItems:"center"}}>
                  <img src={`${ServerURL}/images/${image}`} width="400" height="400"/> 
                  </div>

        {/* category tag */}
        
        <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 50,
                paddingBottom: 50,
              }}
            >
       
        <ArrowBackIos onClick={()=>imagesSlider.current.slickPrev()} style={{ cursor: "pointer",fontSize:24,color:'#95a5a6'}} />
        </div>
        <div style={{ width:'60%' }}>
         <Slider {...settings}  ref={imagesSlider}>
              {showImagesList()}
        </Slider>
        </div>

        <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                paddingTop: 50,
                paddingBottom: 50,
              }}
            >
       
        <ArrowForwardIosIcon onClick={()=>imagesSlider.current.slickNext()} style={{cursor: "pointer",fontSize:24,color:'#95a5a6'}} />
        </div>
      
    
     
        </div> 

{/* ////////////////////////////// */}
         </Grid>
         

         <Grid item xs={6} style={{marginRight:"40px"}}>
           <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 20, paddingTop: 20}}>
           {product.productname}
           <div>{productinfo.map((item)=>{
             return ( <div style={{fontSize:"15px",fontWeight:"lighter"}}>{item.categoryname}</div>)
           })}</div>
           <div style={{ fontFamily:'Poppins', fontSize:16}}> {product.categoryname} {product.subcategoryname}</div>
           </Grid>
           <Grid style={{marginTop:"20px"}} >
           <FavoriteBorderIcon/>
           </Grid>
           <Grid style={{padding:"10px"}}>
           <Divider />
           </Grid>

           <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 24, paddingTop: 20}}>
           <span>BestPrice*</span><span style={{color:"#ef4281",fontWeight:'bold',fontFamily:'Crimson Pro'}}>&#8377; {product.price-product.offerprice}</span>
          <div style={{fontSize:12,fontWeight:"lighter",padding:"10px"}}>
          <del>MRP  &#8377;{product.price}</del><span style={{color:'#378f30'}}> GET {((product.offerprice*100)/product.price).toFixed(1)}% OFF</span>
          <div>(inclusive of all taxes)</div>
          
          <div>*Deliver charges if applicable will be applied checkout</div>
          </div>
           </Grid>
           <Grid>
               <CartButton value={0} onChange={(value)=>handleQtyChange(value,product)} />
           </Grid>

           <Grid style={{padding:"10px"}}>
           <Divider />
           </Grid>
           <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 14, paddingTop: 20}}>
          Check Availability & Expiry
           </Grid>
           <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 14, paddingTop: 20}}>
          <span style={{marginRight:'10px'}}>PINCODE:</span>
          <CssTextField variant="standard" input type="number" maxlength="6"  />
          <ArrowForwardIcon  style={{marginRight:'10px'}}/>
           </Grid>
</Grid>
</Grid>
</Grid>
<div style={{width:'100%'}} >
        <Footer />
        </div>

        </div>)










}