import React from 'react'
import {BrowserRouter ,Route,Routes} from "react-router-dom"
import Catagories from './Administrator/Catagories'
import Subcategories from './Administrator/Subcategories'
import Brand from './Administrator/Brand'
import Product from './Administrator/Product'
import DisplayAllCategories from './Administrator/DisplayAllCategories'
import DisplayAllSubcategories from './Administrator/DisplayAllSubcategories'
import DisplayAllBrand from './Administrator/DisplayAllBrand'
import DisplayAllProduct from './Administrator/DisplayAllProduct'
import Login from './Administrator/Login'
import ProductShow from './UserInterface/ProductShow'

import Banner from './Administrator/Banner'
import DisplayAllBanner from './Administrator/DisplayAllBanner'
import Coupan from './Administrator/Coupan'
import DisplayAllCoupan from './Administrator/DisplayAllCoupan'
import AdminDashboard from './Administrator/AdminDashboard'
import ProductImages from './Administrator/ProductImages'
import DisplayProductImages from './Administrator/DisplayProductImages'
import Header from "./UserInterface/Header"
import Footer from "./UserInterface/Footer"
import Home from "./UserInterface/Home"
import SignUp from "./UserInterface/SignUp"
import SignIn from "./UserInterface/SignIn"
import  Productlist from "./UserInterface/Productlist"
import Proceedcart from "./UserInterface/Proceedcart"
import Filter from "./UserInterface/Filter"
import Showcart from "./UserInterface/Showcart"
import ShowCartReview from "./UserInterface/ShowCartReview"

function App(props) {
  return (
    <div >
      <BrowserRouter>
      <Routes>

      {<Route history={props.history} element={<Catagories/>} path="/categories" />}
    
      {/* <Catagories />*/}
      <Route history={props.history} element={<Subcategories/>} path="/subcategories" />
    
     {/*  <Subcategories />*/}
      <Route history={props.history} element={<Brand/>} path="/brand" />
    
      {/* <Brand /> */}
     <Route history={props.history} element={<DisplayAllCategories/>} path="/Displayallcategories" />
    
     <Route history={props.history} element={<DisplayAllSubcategories/>} path="/Displayallsubcategories" />

     <Route history={props.history} element={<DisplayAllBrand/>} path="/Displayallbrand" />

     <Route history={props.history} element={<Product/>} path="/product" />

     <Route history={props.history} element={<DisplayAllProduct/>} path="/Displayallproduct" />

     <Route history={props.history} element={<Login/>} path="/login" />
     <Route history={props.history} element={<Banner/>} path="/banner" />

     <Route history={props.history} element={<DisplayAllBanner/>} path="/Displayallbanner" />
     <Route history={props.history} element={<Coupan/>} path="/coupan" />

<Route history={props.history} element={<DisplayAllCoupan/>} path="/Displayallcoupan" />

     <Route history={props.history} element={<AdminDashboard/>} path="/admindashboard" />

     <Route history={props.history} element={<ProductImages/>} path="/productimages" />
     
     <Route history={props.history} element={<DisplayProductImages/>} path="/Displayproductimages" />

     <Route history={props.history} element={<Header/>} path="/header"/>

     <Route history={props.history} element={<Footer/>} path="/footer"/>

     <Route history={props.history} element={<Home/>} path="/home"/>
     <Route element={<SignUp/>} path="/signup"  history={props.history}/> 
      <Route element={<SignIn/>} path="/signin"   history={props.history}/>

      <Route element={<Productlist/>} path="/productlist"   history={props.history}/>
      <Route element={<ProductShow/>} path="/productshow"   history={props.history}/>
      <Route element={<Proceedcart/>} path="/proceedcart"   history={props.history}/>
      <Route element={<Showcart/>} path="/showcart"   history={props.history}/>
      <Route element={<ShowCartReview/>} path="/showcartreview"   history={props.history}/>

      <Route element={<Filter/>} path="/filter"   history={props.history}/>
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
