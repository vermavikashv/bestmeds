import React,{useState,useEffect,createRef} from 'react';
import { makeStyles } from "@material-ui/core"
import {FormControlLabel,FormLabel,FormControl,Radio,RadioGroup} from '@mui/material/';
 

import { Divider,Avatar,Button,Grid } from '@material-ui/core'; 
import Slider from '@mui/material/Slider';

const useStyles = makeStyles({
    root: {

        justifyContent: 'center',
        alignItems: 'center',
        display:'flex',        
        flexDirection:'column'
       

    },
    subdiv: {
      
        padding: 15,
        width: 250,
        marginTop: 50,
        height:550,
        border:'0.5px solid #95a5a6',
        borderRadius:5,
        margin:10,
        
    }
})


export default function Filter(props) {
    const classes = useStyles();





    return(
        <div>
            <div className={classes.subdiv}>
                <Grid style={{padding:10,fontWeight:"bolder"}}>
                    Filter
                </Grid>
                <Grid style={{width:"100%"}}>
                  <hr  />
                </Grid>

            <Grid item xs={12}>
                <div  style={{padding:10,fontWeight:"bolder"}}>Price</div>
              
            <Slider defaultValue={50} aria-label="Default" valueLabelDisplay="auto" />  
            <span  style={{padding:10}}>MIN</span><span style={{marginLeft:"150px",padding:10}}>MAX</span>
            </Grid>
            <Grid  style={{width:"100%"}}>
                  <hr />
                </Grid>
                <Grid >
                <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" style={{padding:10,fontWeight:"bolder"}}>Sort By</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
      <FormControlLabel value="female" control={<Radio />} label="Low to High" />
        <FormControlLabel value="male" control={<Radio />} label="High to Low" />
        <FormControlLabel value="other" control={<Radio />} label="Newest" />
        </RadioGroup>
        </FormControl>
                </Grid>
                <Grid  style={{width:"100%"}}>
                  <hr />
                </Grid>
                <Grid >
                <FormControl>
      <FormLabel id="demo-radio-buttons-group-label" style={{padding:10,fontWeight:"bolder"}}>Discount</FormLabel>
      <RadioGroup
        aria-labelledby="demo-radio-buttons-group-label"
        name="radio-buttons-group"
      >
        <FormControlLabel value="female" control={<Radio />} label="30%" />
        <FormControlLabel value="male"   control={<Radio />} label="50%" />
        <FormControlLabel value="other"  control={<Radio />} label="60%" />
        </RadioGroup>
        </FormControl>
                </Grid>
               
            </div>
        </div>
    )




}