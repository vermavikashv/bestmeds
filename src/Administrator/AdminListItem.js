import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import AssignmentIcon from '@mui/icons-material/Assignment';
import { propsToClassKey } from '@mui/styles';
import Catagories from './Catagories'
import Subcategories from './Subcategories'
import Brand from './Brand'
import Product from './Product'
import ProductImages from './ProductImages'
import Banner from './Banner'
import Coupan from './Coupan'



export default function  AdminListItem(props)  {

 const handleClick=(v)=>{

props.setViewContainer(v)

 }


  return(
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    <ListItemButton onClick={()=>handleClick(<Catagories  setViewContainer={props.setViewContainer}/>)}>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="Category" />
    </ListItemButton>
    <ListItemButton onClick={()=>handleClick(<Subcategories setViewContainer={props.setViewContainer} />)}>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Sub Category" />
    </ListItemButton>
    <ListItemButton onClick={()=>handleClick(<Brand setViewContainer={props.setViewContainer} />)}>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Brand" />
    </ListItemButton>
    <ListItemButton onClick={()=>handleClick(<Product setViewContainer={props.setViewContainer} />)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Product" />
    </ListItemButton>
    <ListItemButton onClick={()=>handleClick(<Banner setViewContainer={props.setViewContainer} />)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Banner" />
    </ListItemButton>

    <ListItemButton onClick={()=>handleClick(<Coupan setViewContainer={props.setViewContainer} />)}>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="coupan" />
    </ListItemButton>
  
    <ListSubheader component="div" inset>
      Saved reports
    </ListSubheader>
    <ListItemButton onClick={()=>handleClick(<ProductImages setViewContainer={props.setViewContainer} />)}>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="ProductImage" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Last quarter" />
    </ListItemButton>
    <ListItemButton>
      <ListItemIcon>
        <AssignmentIcon />
      </ListItemIcon>
      <ListItemText primary="Year-end sale" />
    </ListItemButton>
  </React.Fragment>

  )}