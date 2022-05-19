import React,{useState,useEffect,createRef} from 'react';
import { makeStyles } from "@material-ui/core"
import {Grid,Divider} from '@mui/material';
import {postData,getData,ServerURL} from "../FeatchNodeServices"
import MenuItem from '@mui/material/MenuItem';
import Slider from "react-slick";
import Header from "../UserInterface/Header"
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIos from '@mui/icons-material/ArrowBackIos';
import Footer from './Footer'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import CartButton from './CartButton';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useMediaQuery from '@mui/material/useMediaQuery';//responsive 
import {useTheme } from '@mui/material/styles';



const useStyles = makeStyles({
    root: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection:'column'
       

    },
    subdiv: {
      
        padding: 10,
        width: "90%",
        marginTop: 50,
        height:320,
        border:'0.5px solid lightgrey',
        borderRadius:10,
        margin:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        flexDirection:'column',
        background:"#fff"
    }
})




  


  

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



  

export default function Home(props) {
    const classes = useStyles();
    var categoriesSlider=createRef()
    var brandsSlider=createRef()
    var productsSlider=createRef()

    var theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
 const [category,setCategory]=React.useState([])
 const [brand,setBrand]=React.useState([])
 const [product,setProduct]=React.useState([])
 const [products,setProducts]=React.useState([])
 const [refresh,setRefresh]=React.useState(false)
 const [subcategory,setSubCategory]=React.useState([])
 const [banner,setBanner]=React.useState([])
 const [coupan,setCoupan]=React.useState([])
 var dispatch=useDispatch()
 var navigate = useNavigate()

 var settings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: matches?2:4,
  slidesToScroll: 1,
 
};

var coupansettings = {
  dots: false,
  arrows: true,
  infinite: true,
  speed: 500,
  slidesToShow: matches?1:3,
  slidesToScroll: 1,
  autoplay: true,
  autoplaySpeed: 1000,
};

var Brandsettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: matches?2:4,
  slidesToScroll: 1,
 
};

var Productsettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 500,
  slidesToShow: matches?2:4,
  slidesToScroll: 1,
 
};
 
 const fetchAllCategories=async()=>{
  var result=await getData('categories/displayallcategories')
  setCategory(result.result)

 }

 const fetchAllBanner=async()=>{
  var result=await getData('banner/displayallbanner')
  setBanner(result.result)

 }


 const fetchAllCoupan=async()=>{
  var result=await getData('coupan/displayallcoupan')
  setCoupan(result.result)

 }


 const fetchAllBrand=async()=>{
  var result=await postData('brand/displaybrandsbystatus',{status:"Top Brands"})
  setBrand(result.result)

 }

 const fetchAllProduct=async()=>{
  var result=await postData('products/displayproductbystatus',{status:"trending",categoryid:50})
  setProduct(result.result)

 }

 const fetchAllProducts=async()=>{
  var result=await postData('products/displayproductbysubcategoryid',{salestatus:"Top Brand"})
  setProducts(result.result)

 }

 const fetchAllSubCategories=async(categoryid)=>{
  var result=await postData('subcategories/displaysubcategory',{categoryid:categoryid})
  setSubCategory(result.result)

 }

 useEffect(function(){
 fetchAllCategories()
 fetchAllBanner()
 fetchAllCoupan()
 fetchAllBrand()
 fetchAllProduct()
 fetchAllProducts()

 },[])


 const handleProductlist=(category)=>{
  navigate("/productlist",{state:{category:category}})

}
const showMainCategories=()=>{
return category.map((item,index)=>{
return (
<div>
<div className={classes.subdiv} onClick={()=>handleProductlist(item)}>
 
 <div style={{padding:10}}>
 <img src={`${ServerURL}/images/${item.icon}`} style={{width:150,height:150}}/>
 </div>
 <div style={{fontFamily:'Sarabun',fontSize:18,fontWeight:'bold'}}>
   {item.categoryname}  
 </div>    
</div>
</div>


)


})


}



const showMainBrand=()=>{
  return brand.map((item,index)=>{
  return (
  <div>
  <div className={classes.subdiv}>
   
   <div style={{padding:10}}>
   <img src={`${ServerURL}/images/${item.brandicon}`} style={{width:150,height:100}}/>
   </div>
      
  </div>
  </div>
  
  
  )
  
  
  })
  
  
  }

//devices
  const showMainProduct=()=>{
    return product.map((item,index)=>{
    return (
    <div>
    <div className={classes.subdiv}>
     
     <div style={{padding:10}}>
     <img src={`${ServerURL}/images/${item.picture}`} style={{width:180,height:150}}/>
     </div>
     <div style={{fontFamily:'Sarabun',fontSize:18}}>
   {item.productname}  
 </div> 
        
    </div>
    </div>
    
    
    )
    
    
    })
    
    
    }

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



    const showProducts=()=>{
      return products.map((item,index)=>{
      return (
      <div>
      <div className={classes.subdiv} >
       
       <div style={{padding:10}}>
       <img onClick={()=>navigate("/productshow",{state:{product:item}})}    src={`${ServerURL}/images/${item.picture}`} style={{width:180,height:150}}/>
       </div>
       <div style={{fontFamily:'Sarabun',fontSize:18,fontWeight:'bold'}}>
     {item.productname} 
     
   </div> 
   <div style={{width:240,fontFamily:'Sarabun',fontWeight:500,display:'flex',justifyContent:'left'}}>
    {item.offerprice>0?<div style={{display:'flex',flexDirection:'column'}}><div>Price: &#8377; {item.offerprice}</div><div>MRP:<s style={{color:'#ff4757'}}>&#8377; {item.price}</s> </div><div style={{color:'#2ed573'}}>You Save:&#8377; {item.price-item.offerprice}  </div></div>:<></>}
     </div>
     <div style={{width:240,fontFamily:'Sarabun',fontWeight:500,display:'flex',justifyContent:'left'}}>
<CartButton value={0} onChange={(value)=>handleQtyChange(value,item)}/>
       </div>

      </div>
      </div>
      
      
      )
     })
      }


const showMainBanner=()=>{
  return banner.map((item)=>{
  return (
  <div>
  <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
   
   
   <img src={`${ServerURL}/images/${item.bannerpicture}` } width="100%"/>
   </div>
      
  
  </div>
  )
  })
  }


  const showMainCoupan=()=>{
    return coupan.map((item)=>{
    return (
    <div >
    <div style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
     
     
    
     <img src={`${ServerURL}/images/${item.coupanpicture}`} style={{width:"416px",height:"214px",marginTop:"5px",borderRadius:10}} width="100"/>
     </div>
        
    
    </div>
    )
    })
    }


const showSubCategories=()=>{
  return subcategory.map((item)=>{
  return (
    
    <MenuItem>{item.subcategoryname}</MenuItem>
    )
  
  
  })
  
  
  }

return(<div style={{background:"#f3f3f3"}}>
        <div style={{width:'100%'}} >
        <Header />
        </div>
       
        <div style={{width:'95%',margin:"auto",marginTop:"20px"}} >
        <Slider {...bannersettings}>
        {showMainBanner()}
        </Slider>
        </div>

        <div style={{width:'95%',margin:"auto",marginTop:"20px"}} >
        <Slider {...coupansettings}>
        {showMainCoupan()}
        </Slider>
        </div>

        {/* coupan */}
        {/* <div style={{display:'flex',flexDirection:'row',margin:"auto" }}>

        <span style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
   
   
   <img src="/delivercoupan.jpg" style={{width:"370px",height:"260px",marginTop:"25px",marginRight:'70px',marginLeft:"120px",borderRadius:'20px'}}/>
   </span>

   <span style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
   
   
   <img src="/delivercoupan35.jpg" style={{width:"370px",height:"260px",marginTop:"25px",marginRight:'70px',borderRadius:'20px'}}/>
   </span>

   <span style={{display:'flex',flexDirection:'row',justifyContent:'center'}}>
   
   
   <img src="/delivercoupan60.jpg" style={{width:"370px",height:"260px",marginTop:"25px",borderRadius:'20px'}}/>
   </span>

   </div> */}


         {/* category tag */}
         <div style={{fontSize:24,display:'flex',justifyContent:"center",fontWeight:'bold',marginTop:"20px"}}>Shop By Category</div>
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
       
        <ArrowBackIos onClick={()=>categoriesSlider.current.slickPrev()} style={{ cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
        <div style={{ width:'90%' }}>
          <Slider {...settings}  ref={categoriesSlider}>
              {showMainCategories()}
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
       
        <ArrowForwardIosIcon onClick={()=>categoriesSlider.current.slickNext()} style={{cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
      
    
     
        </div> 

{/* ////////////////////////////// */}



{/* Brand tag */}
<div style={{fontSize:24,display:'flex',justifyContent:"center",fontWeight:'bold',marginTop:"20px"}}>Top Brands</div>
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
       
        <ArrowBackIos onClick={()=>brandsSlider.current.slickPrev()} style={{ cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
        <div style={{ width:'90%' }}>
          <Slider {...Brandsettings}  ref={brandsSlider}>
              {showMainBrand()}
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
       
        <ArrowForwardIosIcon onClick={()=>brandsSlider.current.slickNext()} style={{cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
      
    
     
        </div> 
        {/* ////////////////////////////// */}


        {/* Devices tag */}
<div style={{fontSize:24,display:'flex',justifyContent:"center",fontWeight:'bold',marginTop:"20px"}}>Trending Devices</div>
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
       
        <ArrowBackIos onClick={()=>productsSlider.current.slickPrev()} style={{ cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
        <div style={{ width:'90%' }}>
          <Slider {...Productsettings}  ref={productsSlider}>
              {showMainProduct()}
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
       
        <ArrowForwardIosIcon onClick={()=>productsSlider.current.slickNext()} style={{cursor: "pointer",fontSize:42,color:'#95a5a6'}} />
        </div>
      
    
     
        </div> 
        {/* ////////////////////////////// */}


        {/* All Product */}
        <div style={{fontSize:24,display:'flex',justifyContent:"center",fontWeight:'bold',marginTop:"20px"}}>Products</div>
        <div style={{display:'flex',flexWrap:'wrap',justifyContent:'center'}}>
         {showProducts()}
        </div>
        
        
        <div style={{marginTop:"20px",marginBottom:'20px'}}>
       
  <Divider  style={{background:'#000', marginTop:"20px",marginBottom:'20px',marginLeft:'20px'}}/>

    <Footer/>
    </div> 
    </div>)

}
