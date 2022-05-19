import React,{useEffect} from 'react';
import { styled, alpha,useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import {Box ,Button,Grid,Divider,Badge} from '@mui/material';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import {postData,getData,ServerURL} from "../FeatchNodeServices"
import { useSelector } from 'react-redux';
import Popover from '@mui/material/Popover';
import useMediaQuery from '@mui/material/useMediaQuery';//responsive 

import ShoppingCart from '@mui/icons-material/ShoppingCart';
import Person from '@mui/icons-material/Person';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import {Navigate, useNavigate} from "react-router-dom"
import { height } from '@mui/system';

import SwipeableDrawer from '@mui/material/SwipeableDrawer';

import List from '@mui/material/List';

import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';




const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(1),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

export default function Header() {
  var theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.down('md'));
  console.log(matches)
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

  // alert(listproducts)


 const [category,setCategory]=React.useState([])
 const [subcategory,setSubCategory]=React.useState([])
 const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

 


  //////popover//////

  

  const [panchorEl, setPAnchorEl] = React.useState(null);//cart pop hover

  const handlePopoverOpen = (event) => {
    setPAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setPAnchorEl(null);
  };

  const openp = Boolean(panchorEl);

  
  const ProductShowCart = () => {
    return listproducts.map((item,index) => {

      return (<>
      {index<2?<>
        <Grid container spacing={2} style={{ marginBottom: "10px" }} >
          <Grid item xs={8}>
            <span style={{ fontWeight: "lighter", letterSpacing: 2 }}>{item.productname}</span>

          </Grid>
          <Grid item xs={4} >
            <span style={{ fontWeight: "lighter", letterSpacing: 2, display: "flex", justifyContent: "right" }}>&#8377; {item.price} x {item.qty} </span>

          </Grid>
        </Grid>

      </>:<></>}
      </>)

    })
  }


  const cartPop=()=>{

    return (
      <div>
        
        <Popover
          id="mouse-over-popover"
          sx={{
            pointerEvents: 'none',
          }}
          open={openp}
          anchorEl={panchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          onClose={handlePopoverClose}
          disableRestoreFocus
        >
          <div style={{width:400,padding:20}}>
          <Grid  container spacing={2}>
            <Grid item xs={8}>
              <span style={{fontWeight:"lighter", letterspacing:2}}>Order Summary</span>

            </Grid>

            <Grid item xs={4}>
              <span style={{fontWeight:"lighter", display:"flex",justifyContent:"right"}}>({keys})Items</span>

            </Grid>

            {ProductShowCart()}
            <Grid item xs={8}></Grid>
            {keys>2?
            <Grid item xs={4}>{`+${keys-2} More Items`}</Grid>:<></>}
            <Grid item xs={8}><div style={{display:'flex',flexDirection:'column'}}><div style={{color:'orange'}}>Total Amount &#8377; {`${(totalamount-offeramount).toFixed(2)}`}</div><div style={{color:'green'}}>You Save &#8377; {`${offeramount.toFixed(2)}`}</div></div></Grid>
            <Grid item xs={4}></Grid>
          </Grid>
          </div>
          
        </Popover>
      </div>
    );
  }
  



  /////////
  
  
  const handleClick = (event,categoryid) => {
    setAnchorEl(event.currentTarget);
    // alert(categoryid)
    fetchAllSubCategories(categoryid)
    
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

 const fetchAllCategories=async()=>{
  var result=await getData('categories/displayallcategories')
  setCategory(result.result)

 }

 const fetchAllSubCategories=async(categoryid)=>{
  var result=await postData('subcategories/displaysubcategory',{categoryid:categoryid})
  setSubCategory(result.result)

 }
 useEffect(function(){
fetchAllCategories()

 },[])


//  const handleSideMenu= ()=>{
//    return <Drawer/>
//  }

const showMainCategories=()=>{
return category.map((item,index)=>{
return (<>
  {index<=3?
  <div style={{marginRight:50}}>
  <Button
   id="basic-button"
   aria-controls={open ? 'basic-menu' : undefined}
   aria-haspopup="true"
   aria-expanded={open ? 'true' : undefined}
   onClick={(event)=>handleClick(event,item.categoryid)}
    style={{color:'#000'}}>{item.categoryname}</Button>
  </div>:<></>}</>)


})


}

// const handleSideMenu=()=>{
//   return category.map((item,index)=>{
//   return (<>
//     {index<=3?
//     <div style={{marginRight:50}}>
//     <Button
//      id="basic-button"
//      aria-controls={open ? 'basic-menu' : undefined}
//      aria-haspopup="true"
//      aria-expanded={open ? 'true' : undefined}
//      onClick={(event)=>handleClick(event,item.categoryid)}
//       style={{color:'#000'}}>{item.categoryname}</Button>
//     </div>:<></>}</>)
  
  
//   })
  
  
//   }



const showSubCategories=()=>{
  return subcategory.map((item)=>{
  return (
    
    <MenuItem >{item.subcategoryname}</MenuItem >
    )
  
  
  })
  
  
  }

  const nextAppbar=()=>{
return category.map((item,index)=>{
  
  return <>{index>=4?
  <div style={{marginRight:40,color:
  "#FFF",marginTop:12}}>
    {item.categoryname}
  </div>:<></>
  }</>
})
  }


  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {category.map((item, index) => (
          <ListItem button key={item.categoryname}>
            <ListItemIcon>
             
            </ListItemIcon>
            <ListItemText primary={item.categoryname} />
          </ListItem>
        ))}
      </List>
      </Box>
  );

 

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
    <Box sx={{ flexGrow: 1 }}>
      <AppBar color="inherit" position="sticky">
        <Toolbar>
        {matches?<><div> <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            
          >

            <MenuIcon onClick={toggleDrawer('left',true)} />
          </IconButton></div></>:<></>}
          <div>
            <img src='/logo.png' width="75"/>
          </div>
          {matches?<></>:<>
          <div  style={{display:'flex',justifyContent:'center', width:'65%' }}>
          {showMainCategories()}
          <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        
        MenuListProps={{
          'aria-labelledby': 'basic-button',
        }}
      >
        {showSubCategories()}
      </Menu>
          </div>
          </>}
          <div style={{width:"280px",display:"flex",justifyContent:"center",margin:"auto"}}>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase
              placeholder="Search Here.."
              inputProps={{ 'aria-label': 'search' }}
            />
          </Search>
          </div>
          <div style={{display:"flex",flexDirection:"row"}}>
          <Badge badgeContent={keys} color="secondary">
           <ShoppingCart onClick={()=>navigate('/showcart')} color="action" 
            aria-owns={open ? 'mouse-over-popover' : undefined}
            aria-haspopup="true"
            onMouseEnter={handlePopoverOpen}
            onMouseLeave={handlePopoverClose}/>
            
          </Badge>
          <Person style={{marginLeft:40}} />
          
         </div>
         {cartPop()}
        </Toolbar>
      </AppBar>
      {matches?<></>: <div style={{height:50, width:"100%",background:"#000",display:'flex',flexDirection:"row",justifyContent:"center",alignContent:"center"}}>
      {nextAppbar()}
      </div>}
      <div>
      <React.Fragment key={'left'}>
          
          <SwipeableDrawer
            anchor={'left'}
            open={state['left']}
            onClose={toggleDrawer('left', false)}
            onOpen={toggleDrawer('left', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>
      </div>
    </Box>
  </Grid>
  
    


    {/* <Grid item xs={3} style={{marginLeft:100}}>
    <img src='/logo.png'  width='35' />
      <span style={{fontSize:'25px',color:'#00cec9'}}>estMeds</span>.com
      
    </Grid>
    <Grid item xs={6} >
    <span style={{color:'#999999'}}>Bestmeds.com, India Ki Pharmacy, is brought to you by the Dadha & Company – one of India’s
         most trusted pharmacies, with over 100 years’ experience in dispensing quality medicines.</span>
    </Grid>

    <Grid item xs={12} style={{display:'flex', justifyContent:'center'}}>
            <Divider style={{ background:'#FFF', width:1300}} />
          </Grid>

          <Grid item xs={2.5}  style={{marginLeft:80}}>
            <p><b>COMPANY</b></p>
            <p>About Bestmeds</p>
            <p>Customers Speak</p>
            <p>In the News</p>
            <p>Career</p>
            <p>Terms and Conditions</p>
            <p>Privacy Policy</p>
            <p>Fees and Payments Policy</p>
            <p>Shipping and Delivery Policy</p>
            <p>Return, Refund and Cancellation Policy</p>
            <p>Contact</p>
            
</Grid>

<Grid item xs={2}>
            <p><b>SHOPPING</b></p>
            <p>Browse by A-Z</p>
            <p>Browse by Manufacturers</p>
            <p>Health Articles</p>
            <p>Offers / Coupons</p>
            <p>FAQs</p>            
</Grid>

<Grid item xs={2}  style={{marginLeft:40}}>

  <p><b>CATEGORY</b></p>
  {showMainCategories()}
  
</Grid>

<Grid item xs={2}  >
            <p><b>SOCIAL</b></p>
            <p>Patients Alike</p>
            <p>Facebook</p>
            <p>Twitter</p>
            <p>Instagram</p>
            <p>Youtube</p>   
            <p>Refer & Earn</p>         
</Grid>

<Grid item xs={2.5} >
            <p><b>SUBSCRIBE TO OUR NEWSLETTER</b></p>
            <div>Get a free subscription to our health and </div>
            <div>fitness tip and stay  tuned to our latest  </div>
            <div>offers</div>
    
               
                 <img src='/3.jpeg'  width='100' />
                 
                 <img src='/4.jpeg'  width='100' />
              
              
</Grid> */}



</Grid>
);
}