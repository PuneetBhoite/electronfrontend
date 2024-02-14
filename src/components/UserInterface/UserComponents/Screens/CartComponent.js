import { Grid, Paper, Stack, TextField } from "@mui/material";
import Header from "./Header"
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import { makeStyles } from "@mui/styles";
import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import Checkbox from '@mui/material/Checkbox';
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from "react-redux";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { useNavigate } from "react-router-dom";
import LoginPage from "../User/LoginPageComponent";
import CartProductComponent from "./CartProductComponent";
import PriceDisplayComponent from "./PriceDisplayComponent";





var useStyles=makeStyles({
Main:{ 
    backgroundColor:"#403d39",
    height:'100%'

},


})


export default function CartComponent(props){
    const useStyle=useStyles()
    var navigate=useNavigate()
    var [status,setStatus]=useState(false)
   
    
   var cart=useSelector(state=>state.mycart)
   var productcart=Object.values(cart)
   const [cartRefresh,setCartRefresh]=useState(false)
  const handleclick=()=>{
    var userData=JSON.parse(localStorage.getItem('user'))
    if(userData){
      navigate('/useraccount',{state:{mobilenumber:userData?.mobilenumber,user:[userData],status:true}})
    }
    else
    {
      setStatus(true)
    }
    
  }
   

/////////////////////////////////////////////EMPTY CART////////////////////////////////////////////////////////////////////////////////  

const emptyPage=()=>{
  return(
<div style={{display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center',width:'100%',height:'100%'}}>

<ProductionQuantityLimitsIcon style={{fontSize:'100px'}}/>

  <p style={{fontSize:'20'}}> Your cart is empty</p>
  <div style={{border:"1px solid#000",background:'white',borderRadius:'20px'}}>
  <Button size="medium" style={{color:'black',margin:'2'}} onClick={()=>navigate('/home')} >Explore Products </Button>
  </div>

</div>
  )
}
        
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  


    return(
        <div className={useStyle.Main} >
<Header page={"cart"} /> 
{productcart.length==0?emptyPage():<Grid container style={{height:'Auto'}} >
      
      <Grid item xs={9} style={{height:'Auto'}} >
       <div style={{display:'flex',justifyContent:"left",marginLeft:'5%', }}><h2>YOUR CART</h2></div>
     <div >
     <CartProductComponent setCartRefresh={setCartRefresh} productcart={productcart} cartRefresh={cartRefresh} />
</div>
       </Grid>


       <Grid item xs={3}  >
           <PriceDisplayComponent productcart={productcart} handleclick={handleclick} buttontitle={"Checkout"} />
       </Grid>
       <LoginPage status={status} setStatus={setStatus}  />  
       </Grid>}


               
        </div>
       
    )
}