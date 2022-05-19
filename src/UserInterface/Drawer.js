import * as React from 'react';
import Box from '@mui/material/Box';
//import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export default function Drawer() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
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
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem button key={text}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={text} />
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {['left', 'right', 'top', 'bottom'].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}


//sinh in
import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { makeStyles } from '@mui/styles';
// import { alpha, styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import 'react-phone-number-input/style.css'
// import { getData,postDataImage,postData } from '../FeatchNodeServices';
// import Link from '@mui/material/Link';
// import PhoneInput from 'react-phone-number-input'
// import {useNavigate} from "react-router-dom"
// const theme = createTheme();
// const useStyles = makeStyles({
//     root: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     subdiv: {
//       background:'#ecf0f1',
//       padding: 20,
//       width: 1100,
//       marginTop: 50,
//       borderRight:10,
 
  
//     },
//   });
//   const CssTextField = styled(TextField)({
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         border: '1.5px solid #000',
//         borderRadius: 0
//       },
//       '&:hover fieldset': {
//         borderColor: '#000',
  
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: '#000',
  
//       },
  
//     },
//   });
//   const Input = styled('input')({
//     display: 'none',
//   });
// export default function CustomerLogin() {
//     var navigate=useNavigate()
//     var classes=useStyles()
//   const [phone,setPhone]=React.useState('')   
//   const [message,setMessage]=React.useState('')  
  

// //   const handleSubmit = async() => {
// //    var result=await postData('admin/checkcustomermobilelogin',{phone:phone})
// //    if(result.result)

// //    {
// //      localStorage.setItem("SES_CUSTOMER",JSON.stringify(result.data))
// //      navigate("/customerdashboard")
// // }
// //    else
// //    {
// //    setMessage("Invalid AdminId/Password.....")
// // }
  
// // };
 
  

//   return (
//      <div className={classes.root}>
//          <div className={classes.subdiv}>
//          <Grid container spacing={2}>
//                  <Grid item xs={12} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>

//        <Grid item xs={12}>
//        <img src='/signin.png' width="100%" />
//          </Grid>
         
//          <Grid item xs={12} style={{padding:10}}>
//            <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 24, paddingTop: 20 }}>
//              Sign In/Sign Up
//            </Grid>
//            <Grid style={{ fontFamily:'Poppins', fontWeight: "300", fontSize: 20, paddingTop: 10 }}>
//              Sign up or Sign in to access your orders,special offers,health tips or more!!
//            </Grid>

         
//             <Grid style={{paddingTop:10,margin:10}}>
//           <CssTextField variant="standard" type="number"  label="Phone No." onChange={(event) => setPhone(event.target.value)} fullWidth />
            
//           </Grid> 
//              <Grid style={{ alignItems: 'center', justifyContent: 'center',marginTop:5,paddingTop:5 }}>
//              <Button fullWidth  variant="contained" style={{borderRadius:5,color:'#fff',background:'#000'}} onClick={()=>navigate('/signup')}>USE OTP</Button>
//              </Grid>

//             </Grid>
//         </Grid>
//         </Grid>
//         </div>
//         </div>

      
//   )
// }

// sign up

import * as React from 'react';
// import Button from '@mui/material/Button';
// import TextField from '@mui/material/TextField';
// import { makeStyles } from '@mui/styles';
// import { alpha, styled } from '@mui/material/styles';
// import Grid from '@mui/material/Grid';
// import { createTheme, ThemeProvider } from '@mui/material/styles';
// import 'react-phone-number-input/style.css'
// import { getData,postDataImage,postData } from '../FeatchNodeServices';
// import Link from '@mui/material/Link';
// import PhoneInput from 'react-phone-number-input'
// import OTPInput, { ResendOTP } from "otp-input-react";
// import {useNavigate} from "react-router-dom"
// const theme = createTheme();
// const useStyles = makeStyles({
//     root: {
//       display: 'flex',
//       alignItems: 'center',
//       justifyContent: 'center'
//     },
//     subdiv: {
   
//         background:'#ecf0f1',
//         padding: 20,
//       width: 1100,
//       marginTop: 50,
      
  
//     },
//   });

//   const CssTextField = styled(TextField)({
//     '& .MuiOutlinedInput-root': {
//       '& fieldset': {
//         border: '1.5px solid #000',
//         borderRadius: 0
//       },
//       '&:hover fieldset': {
//         borderColor: '#000',
  
//       },
//       '&.Mui-focused fieldset': {
//         borderColor: '#000',
  
//       },
  
//     },
//   });
// export default function CustomerLogin() {
//     var navigate=useNavigate()
//     var classes=useStyles()
//     const [emailid,setEmailId]=React.useState('')
//     const [firstname,setFirstName]=React.useState('')
//     const [lastname,setLastName] = React.useState('')
//     const [OTP, setOTP] =React.useState('');
//   const [phone,setPhone]=React.useState('')   
//   const [message,setMessage]=React.useState('')  
  

// //   const handleSubmit = async() => {
// //    var result=await postData('admin/checkcustomermobilelogin',{phone:phone})
// //    if(result.result)

// //    {
// //      localStorage.setItem("SES_CUSTOMER",JSON.stringify(result.data))
// //      navigate("/customerdashboard")
// // }
// //    else
// //    {
// //    setMessage("Invalid AdminId/Password.....")
// // }
  
// // };
 
  

//   return (
//      <div className={classes.root}>
//          <div className={classes.subdiv}>
//          <Grid container spacing={2}>
//          <Grid item xs={12} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
//         <Grid item xs={6}>
//       <Grid item xs={12}>
//        <img src='/signin.png' width="100%"/>
//          </Grid>
//          </Grid>



//          <Grid item xs={6} style={{marginLeft:60}}>
        
//          <Grid item xs={12}>
//            <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 24, paddingTop: 20 }}>
//           Create Account
//            </Grid>
//            <Grid container spacing={2} style={{padding:10}}>
         
//            <Grid item xs={12}  lg={6}style={{marginTop:2,padding:5,color:'#000'}}>
//             <CssTextField fullWidth onChange={(event) => setEmailId(event.target.value)} label="EMAIL ID" variant="outlined" />
//           </Grid>

//           <Grid item xs={12} lg={6} style={{marginTop:2,padding:5}}>
//             <CssTextField fullWidth variant="outlined" label="FIRST NAME"  onChange={(event) => setFirstName(event.target.value)} />
//           </Grid>

//           <Grid item xs={12} style={{marginTop:2,padding:5}}>
//             <CssTextField fullWidth variant="outlined" label="LAST NAME"  onChange={(event) => setLastName(event.target.value)} />
//           </Grid>
//           </Grid>
//           <Grid item xs={12} style={{fontSize:20,fontWeight:"500",fontFamily:'Poppins',marginTop:5}}>
//                 VERIFYING NUMBER

//           </Grid>
//           <Grid item xs={12} style={{fontSize:12,fontWeight:"500",fontFamily:'Poppins'}}>
//                 We have sent 6 digit OTP on

//           </Grid>

//           <Grid item xs={12} style={{marginTop:5 }}>
//             <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={6} otpType="number" disabled={false} secure />
//             <ResendOTP onResendClick={() => console.log("Resend clicked")} />
//             </Grid>

//              <Grid style={{ alignItems: 'center', justifyContent: 'center',marginTop:5,paddingTop:5 }}>
//              <Button fullWidth  variant="contained" style={{borderRadius:5,color:'#fff',background:'#000'}} onClick={()=>navigate('/verifypassword')}>Verify</Button>
//              </Grid>
//              </Grid>

//             </Grid>
//         </Grid>
//         </Grid>
//         </div>
//         </div>

      
//   )
// }



////////////////showcartreview////////////////////
import React, { useState, useEffect } from 'react';
import { styled, alpha } from '@mui/material/styles';
import { Box, Button, Badge, Grid, TextField } from '@mui/material';
import { makeStyles } from "@material-ui/core"
import { getData, postDataImage, postData, ServerURL } from '../FeatchNodeServices';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Divider } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartButton from './CartButton';
import Header from "./Header"
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import ListItem from '@mui/material/ListItem';
import Footer from "./Footer"
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import axios from 'axios';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontFamily: 'Crimson',
    background: '#f6f6f7',
    flexDirection: 'column'

  },
  subdiv: {

    padding: 20,
    width: 1200,
    marginTop: 50,
  },
  one: {

    padding: 20,
    width: '95%',
    marginTop: 10,
    background: '#fff',
    borderRadius: '8px',


  },
  two: {

    padding: 20,
    width: '100%',
    background: '#fff',
    height: 100,
    borderRadius: '20px',
    fontFamily: 'Poppins',
    marginLeft: 20,

  },
  three: {
    borderRadius: '20px',
    padding: 20,
    marginTop: 20,
    width: '95%',
    background: '#fff',
    paddingLeft: 50,
    // height:200,
    fontFamily: 'Poppins',
    marginLeft: 20,
  },
  four: {
    textAlign: 'left',
    paddingLeft: 20,
    fontFamily: 'Poppins',
    marginLeft: 20,
  },
});
var bannersettings = {
  dots: false,
  arrows: false,
  infinite: true,
  speed: 1500,
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
let searchTimer;
export default function ShowCartReview() {
  const classes = useStyles();
  var month = ["JANUARY", "FEBRUARY", "MARCH", "APRIL", "MAY", "JUNE", "JULY", "AUGUST", "SEPTEMBER", "OCTOBER", "NOVEMBER", "DECEMBER"]
  var date = new Date()
  var newdate = new Date()
  newdate.setDate(date.getDate() + 3)

  var dispatch = useDispatch()
  const user = JSON.parse(localStorage.getItem("USER"))
  console.log(user)
  const [allAddress, setAllAddress] = React.useState([])
  const [refresh, setRefresh] = React.useState(false)
  const [banner, setBanner] = React.useState([])
  const [address, setAddress] = useState('')
  const [pincode, setPincode] = useState('')
  const [ustate, setUState] = useState('')
  const [city, setCity] = useState('')
  const [firstname, setFirstName] = useState(user.firstname)
  const [lastname, setLastName] = useState(user.lastname)
  const [emailid,setEmailid]=useState('')
  const [landmark, setLandmark] = useState('')
  const [mobileno, setMobileno] = useState(user.mobileno)
  const [dmobileno, setDMobileno] = useState('')

  var products = useSelector((state) => state.product)
  var keys = Object.keys(products).length
  var listproducts = Object.values(products)
  var uaddress = useSelector((state) => state.user)
  var keys = Object.keys(uaddress).length
  var listaddress = Object.values(uaddress)
  var navigate = useNavigate()

  var totalamount = listproducts.reduce(calculatetotal, 0)


  var offeramount = listproducts.reduce(calculateoffer, 0)


  const getCityAndStateFromZipcode = async (zipcode) => {
    const result = await getData('api/' + zipcode)
    if (result.status) {
      setCity(result.data.Region)
      setUState(result.data.State)
    } else {
      setCity('')
      setUState('')
    }
  }

  const debounce = (zipcode) => {
    if (searchTimer) {
      clearTimeout(searchTimer);
    }
    searchTimer = setTimeout(() => {
      getCityAndStateFromZipcode(zipcode || 1);
    }, 2000);
  };

  function calculatetotal(p, n) {
    return (p + (n.price * n.qty))
  }

  function calculateoffer(p, n) {
    return (p + (n.offerprice * n.qty))
  }

  const handleQtyChange = (value, item) => {
    item['qty'] = value
    if (value > 0) {
      dispatch({ type: 'ADD_PRODUCT', payload: [item.productid, item] })

    }
    else {
      dispatch({ type: 'DEL_PRODUCT', payload: [item.productid] })
    }

    setRefresh(!refresh)
  }

  const fetchAllAddress = async () => {
    const body = {
      mobileno: user.mobileno
    }
    const result = await postData('users/getAddress', body)
    if (result.result) {
      setAllAddress(result.data)
    } else {
      setAllAddress([])
    }
  }

  const handleSubmit = async () => {
    var body = { mobileno: mobileno, pincode: pincode, city: city, state: ustate, firstname: firstname, lastname: lastname,emailid:emailid, address: address, landmark: landmark, dmobileno: dmobileno }
    console.log(body)
    var result = await postData('users/addaddress', body)
    if (result.result) {
      fetchAllAddress()
    }
  }

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });
  const list = (anchor) => (

    <Box
      sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 400 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        <div style={{ display: 'flex', justifyContent: 'center', fontWeight: 'bold', fontSize: 20, fontFamily: 'Poppins' }}>
          Add Address
        </div>

        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="Pincode" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} variant="standard" onChange={(event) => {
            setPincode(event.target.value)
            debounce(event.target.value)

          }} fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-around', padding: 10 }}>
          <CssTextField label="City" InputLabelProps={{ style: { color: '#000' } }} value={city} InputProps={{ readOnly: city.length ? true : false }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setCity(event.target.value)} variant="standard" />
          <CssTextField label="State" InputLabelProps={{ style: { color: '#000' } }} value={ustate} InputProps={{ readOnly: ustate.length ? true : false }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setUState(event.target.value)} variant="standard" />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="FIRSTNAME" InputLabelProps={{ style: { color: '#000' } }} value={firstname} inputProps={{ style: { color: "#000" } }} onChange={(event) => setFirstName(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="LASTNAME" InputLabelProps={{ style: { color: '#000' } }} value={lastname} inputProps={{ style: { color: "#000" } }} onChange={(event) => setLastName(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="EMAILID" InputLabelProps={{ style: { color: '#000' } }} value={emailid} inputProps={{ style: { color: "#000" } }} onChange={(event) => setEmailid(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="Address" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setAddress(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="Landmark" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setLandmark(event.target.value)} variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label="PHONE NUMBER" InputLabelProps={{ style: { color: '#000' } }} InputProps={{ readOnly: true }} value={mobileno} inputProps={{ style: { color: "#000" } }} onChange={(event) => setMobileno(event.target.value)} type="tel" variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'left', padding: 10 }}>
          <CssTextField label=" DELIVER PHONE NUMBER" InputLabelProps={{ style: { color: '#000' } }} inputProps={{ style: { color: "#000" } }} onChange={(event) => setDMobileno(event.target.value)} type="tel" variant="standard" fullWidth />
        </div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button onClick={handleSubmit} style={{ background: '#000' }} variant='contained' >Save Address</Button>
        </div>
      </List>
    </Box>
  );
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


  const showCartItems = () => {
    return listproducts.map((item, index) => {
      return (<>
        <div style={{ display: 'flex', justifyContent: 'left', marginTop: 10, padding: 20 }}>
          <img src={`${ServerURL}/images/${item.picture}`} style={{ width: 50, height: 50 }} />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'right', fontFamily: 'Poppins', marginLeft: 10, marginTop: 10 }}>
            <div>{item.productname}</div>
            <div style={{ fontSize: 10, fontWeight: 100 }}><i>Only {item.stock} left in stock</i></div>
            <div style={{ fontSize: 10, fontWeight: 100 }}>Mfr:{item.brandname}</div>
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'row', color: "#ef4281", fontWeight: 'bold', fontFamily: 'Crimson Pro', marginTop: 20, fontSize: 20, marginLeft: 50 }}>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 14, color: '#000' }}>&#8377;  {item.offerprice > 0 ? ((item.price - item.offerprice)).toFixed(2) : (item.price).toFixed(2)} x {item.qty}</div>

            <div>&#8377;  {item.offerprice > 0 ? ((item.price - item.offerprice) * item.qty).toFixed(2) : (item.price * item.qty).toFixed(2)}</div>
          </div>
          <div style={{ marginLeft: 'auto' }}><CartButton value={item.qty} onChange={(value) => handleQtyChange(value, item)} /></div>
        </div>

        <div style={{ fontSize: 16, fontFamily: 'Poppins', marginTop: 50, display: 'flex', justifyContent: 'space-between' }}>
          Delivery between {month[date.getMonth()]} {date.getDate()}-{month[newdate.getMonth()]} {newdate.getDate()}
          <div style={{display:'flex',justifyContent:'right'}}>
             Qty
            </div>

          <div>
            <Button style={{ marginRight: 7, color: 'grey', background: '#f2f2f2' }} >REMOVE</Button>
            <Button style={{ marginLeft: 5, color: 'grey', background: '#f2f2f2' }} >SAVE FOR LATER</Button>
          </div>
        </div>
      </>)
    })


  }

  const showAllAddress = () => {
    return allAddress.map((item, index) => {
      return (<>
        <div>
          {item.firstname}{item.lastname}
        </div>
        <div>
          {item.address},{item.landmark}
        </div>
        <div>
          {item.mobileno},{item.dmobileno}
        </div>

      </>)
    })
  }

  const fetchAllBanners = async () => {
    var result = await getData('banner/displayallbanner')
    setBanner(result.result)
  }

  const showAllBanners = () => {
    return banner.map((item, index) => {
      return (
        <img src={`${ServerURL}/images/${item.bannerpicture}`} />
      )
    })
  }
  useEffect(function () {
    fetchAllBanners()
     fetchAllAddress()

  }, [])

  const handleUser = () => {
    navigate("/finalcartreview")


  }


  return (
    <>
      <Header style={{ width: '100%' }} />
      <div className={classes.root}>

        <div className={classes.subdiv}>
          <Grid container spacing={2}>

            <Grid item xs={7}>
              <div style={{ fontSize: 28, fontWeight: 'bold', fontFamily: 'Poppins', }}>
                ORDER SUMMARY
              </div>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', }}>
                <div style={{ width: '100%' }}>
                  <Slider {...bannersettings}  >
                    {showAllBanners()}
                  </Slider>
                </div>
              </div>
              <div className={classes.one} >
                <div style={{ fontFamily: 'Poppins',justifyContent:'space-between',display:'flex' }}>
                  DELIVERY ADDRESS
                  <Button variant="text" style={{color:'#ef4281'}} onClick={toggleDrawer('right', true)}>+ Add new address</Button>
                </div>
                {/* {showAllAddress()}
               */}
              </div>
              <div className={classes.one} >
                <div style={{ fontFamily: 'Poppins' }}>
                  PRODUCTS
                </div>
                {showCartItems()}
              </div>

            </Grid>

            <Grid item xs={5} >
              <div className={classes.two}>
                <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: 'grey' }}>
                  APPLY PROMOCODE / NMS SUPERCASH
                </div>
              </div>

              <div className={classes.three}>
                <div style={{ fontFamily: 'Poppins', alignItems: 'left', color: 'grey' }}>
                  PAYMENT DETAILS
                </div>
                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                  <div>MRP Total</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {totalamount}</div>
                </div>
                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                  <div>Total Amount</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {totalamount - offeramount}</div>
                </div>

                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: '#32ff7e', alignItems: 'left' }}>
                  <div>You Save</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {offeramount}</div>
                </div>

                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}>
                  <div>Amount Pay</div><div style={{ marginLeft: 'auto', paddingLeft: 60 }}>&#8377; {totalamount - offeramount}</div>
                </div>



                <div style={{ display: 'flex', marginTop: 20, fontFamily: 'Poppins', fontWeight: '400', color: 'grey', alignItems: 'left' }}></div>
                <Button variant='contained' style={{ background: '#000', color: '#fff' }}> Proceed </Button>
              </div>




              <div className={classes.four} style={{ fontFamily: 'Poppins', fontWeight: 'bold', color: 'grey', alignItems: 'left', fontSize: 10, marginTop: 5 }}>
                Bestmeds is a technology platform to facilitate transaction of business. The products and services are offered for sale by the sellers. The user authorizes the delivery personnel to be his agent for delivery of the goods. For details read Terms & Conditions
              </div>
            </Grid>
          </Grid>
        </div>
        <Footer />
        <React.Fragment key={'left'}>

          <SwipeableDrawer
            anchor={'right'}
            open={state['right']}
            onClose={toggleDrawer('right', false)}
            onOpen={toggleDrawer('right', true)}
          >
            {list('left')}
          </SwipeableDrawer>
        </React.Fragment>

      </div>
    </>
  )

}