import  React ,{useEffect,useState} from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { makeStyles } from '@mui/styles';
import { alpha, styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import 'react-phone-number-input/style.css'
import { getData,postDataImage,postData } from '../FeatchNodeServices';
import Link from '@mui/material/Link';
import PhoneInput from 'react-phone-number-input'
import OTPInput, { ResendOTP } from "otp-input-react";
import {useNavigate} from "react-router-dom"
import { useTheme } from '@mui/material/styles';
import  useMediaQuery from '@mui/material/useMediaQuery';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import Swal from 'sweetalert2';
import { useDispatch } from 'react-redux';




const theme = createTheme();
const useStyles = makeStyles({
    root: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
         background:'#ecf0f1',
      height:"100%"
    },
    subdiv: {
   
        background:'white',
        padding: 20,
      width: "60%",
      margin: 100,
      // border:"1px solid black",
      boxShadow:"5px 5px 15px 15px grey",
      borderRadius:"15px"

      
  
    },
  });

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
export default function SignUp(props) {

    var navigate=useNavigate()
    var location=useLocation();
    var mobile= location.state.mobile
    var classes=useStyles()
    const [emailid,setEmailId]=useState('')
    const [firstname,setFirstName]=useState('')
    const [lastname,setLastName] = useState('')
    const [OTP, setOTP] =useState('');
  const [phone,setPhone]=useState(mobile)   
  const [message,setMessage]=useState('')
  const[gotp,setGotp]= useState('')
  var dispatch = useDispatch()
  
  const generateOtp=()=>{
    var otp= parseInt(Math.random()*8999)+1000;
    return(otp)
  }  
 
  useEffect (function(){
   var t= generateOtp()
   setGotp(t)
   alert(t)
  },[])

  var theme=useTheme();
  const matches=useMediaQuery(theme.breakpoints.up('md'));// media query for responsiveness
  

 const handleSubmit=async()=>{
   var result= await postData('users/adduser',{email:emailid,mobile:phone,firstname:firstname,lastname:lastname})
   console.log(result.result)

if(result.result && OTP==gotp){
  dispatch({type:"ADD_USER",payload:[phone,result.data[0]]})
  navigate("/showcartreview")
  Swal.fire({
    position: 'top-middle',
    icon: 'success',
    title: 'You Are Register Successfully',
    showConfirmButton: true,
    timer: 5000
})
}else{
  Swal.fire({
    position: 'top-middle',
    icon: 'error',
    title: 'You Are not Register Successfully',
    showConfirmButton: true,
    timer: 5000
})
}

 }

 const checkOtp = async () => {
  if(OTP==gotp){

     Swal.fire({
      position: 'top-middle',
      icon: 'success',
    title: 'OTP is Verified Successfully',
      showConfirmButton: true,
      timer: 5000
    })
  
  }else{
    if(OTP===" "){
  Swal.fire({
    position: 'top-middle',
    icon: 'error',
    title: 'Enter OTP ',
    showConfirmButton: true,
    timer: 5000
  })
}else{
  Swal.fire({
    position: 'top-middle',
    icon: 'error',
    title: 'Invalid OTP ',
    showConfirmButton: true,
    timer: 5000
  })
}

}

}
  

  return ([
      <div style={{position:"sticky"}}> <Header /></div>,
     <div className={classes.root}>
         <div className={classes.subdiv}>
         <Grid  container spacing={2}>
        <Grid item xs={12} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>


        {matches?  <Grid item xs={6}>
      <Grid item xs={12}>
       <img src='/signinimage.png' width="100%" height="200%"/>
         </Grid>
         </Grid>:<></>}

         <Grid item xs={6} style={{marginLeft:"50px"}}>

         <Grid item xs={12} >
           <Grid style={{ fontFamily:'Poppins',textAlign: 'left', fontWeight: "bolder", fontSize: 24, paddingTop: 20 }}>
          Create Account
           </Grid>
           </Grid>

           
         <Grid container spacing={2} style={{padding:"10px"}}>

          <Grid item xs={12} lg={6} style={{marginTop:2,padding:5}}>
            <CssTextField fullWidth variant="standard" label="FIRST NAME"  onChange={(event) => setFirstName(event.target.value)} />
          </Grid>

          <Grid item xs={12} lg={6} style={{marginTop:2,padding:5}}>
            <CssTextField fullWidth variant="standard" label="LAST NAME"  onChange={(event) => setLastName(event.target.value)} />
          </Grid>
           <Grid item xs={12} lg={6} style={{marginTop:2,padding:5,color:'#000'}}>
            <CssTextField fullWidth onChange={(event) => setEmailId(event.target.value)} label="EMAIL ID" variant="standard" />
          </Grid>
          <Grid item xs={12}  lg={6} style={{marginTop:2,padding:5}}>
            <CssTextField type="number"  fullWidth variant="standard" label="MOBILE" value={mobile} />
           
          </Grid>
          </Grid>
          <Grid item xs={12} style={{fontSize:20,fontWeight:"500",fontFamily:'Poppins',marginTop:5}}>
                VERIFYING NUMBER

          </Grid>
          <Grid item xs={12} style={{fontSize:20,fontWeight:"lighter",fontFamily:'Poppins'}}>
                We have sent 6 digit OTP on <span style={{fontWeight:"bold"}}>+91{mobile}</span>

          </Grid>

          <Grid item xs={12} style={{marginTop:5 }}>
            <OTPInput value={OTP} onChange={setOTP} autoFocus OTPLength={4} otpType="number" disabled={false} secure />
            <ResendOTP  onResendClick={() => console.log("Resend clicked")} />
            </Grid>

             <Grid style={{ alignItems: 'center', justifyContent: 'center',marginTop:5,paddingTop:5 }}>
             <Button fullWidth  variant="contained" style={{borderRadius:5,color:'#fff',background:'#000'}} onClick={()=>handleSubmit()}>Verify</Button>
             </Grid>

            </Grid>
        </Grid>
        </Grid>
        </div>
        </div>,


        <div><Footer/></div>

      
   ] )
}