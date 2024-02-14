import { Button,Card,Dialog , Grid, List,Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, CardContent,} from "@mui/material";
import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import parse from 'html-react-parser';
import PlusMinusComponent from "./PlusMinusComponent";
import { useDispatch,useSelector } from "react-redux";
import ProductColorDetails from "./ProductColorDetails";
import React from 'react';
import { useNavigate } from "react-router-dom";



export default function ProductDescription(props){
    
    var dispatch=useDispatch()
    const navigate=useNavigate()
    var cart=useSelector(state=>state.mycart)
    var keys=Object.keys(cart)
    var product=props.product
    if(keys.length==0)
    {product['qty']=0}
    else{
      
      if(keys.includes(product.productdetailsid +""))
      {product=cart[product.productdetailsid +""]}
      else{
        product['qty']=0
      }
    }
   
    const handleQtyChange=(product,value)=>{
     
      if(value<=0)
      {
        dispatch({type:'DELETE_PRODUCT',payload:[product.productdetailsid,product]})
      }
      else{
        product['qty']=value
        dispatch({type:'ADD_PRODUCT',payload:[product.productdetailsid,product]})
      }
      props.setRefresh(!props.refresh)
    }


    
    return(

        <List >
               <div><h2>{product.brandname} {product.productname} {product.modelno} ({product.color})</h2></div>
               <div style={{marginBottom:'5%'}}>
               <div style={{display:'flex',flexDirection:'row'}}><h4 style={{margin:'0'}}>Price: &#8377; <s>{product.price}</s></h4></div> 
               <div style={{display:'flex',flexDirection:'row'}}><h4 style={{margin:'0'}}>OfferPrice: &#8377; {product.offerprice}</h4></div> 
               </div>
               <div  >
                  <ProductColorDetails setProduct={props.setProduct} product={product} setRefresh={props.setRefresh} refresh={props.refresh}  />      
                </div > 
                <div>
                  <PlusMinusComponent onChange={(value)=>handleQtyChange(product,value)} value={product.qty} /> 
                  </div> 
                
                <div style={{fontFamily:"sans-serif",width:'100%',display:'flex',justifyContent:"center"}}>
                <Card elevation={3} style={{width:'90%',margin:"20px",background:"#121212",color:'whitesmoke',borderRadius:'10px'}} > 
                <CardContent>
                {parse(product.description)}
                </CardContent>
                </Card> 
                </div>
                

               </List>


    )
}






