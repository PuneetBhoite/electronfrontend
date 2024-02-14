import { CardContent, Stack, Card } from "@mui/material"
import { CardMedia } from '@mui/material';
import { useState,useEffect } from "react";
import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function AllSearchedProductComponent(props){
  var navigate=useNavigate()
  var item=props.item
  const handleClick=(item)=>{
    navigate('/productpage',{state:{product:item}})
  }
  var picture=item.mainpicture
    return(
        
  <div style={{display:'flex',justifyContent:'center' }} onClick={()=>{handleClick(item)}}   >
  <Card  elevation={3} sx={{display:"flex",width:"85%",height:'auto',margin:5,background:"#141414",color:'white',borderRadius:'10px',cursor:'pointer' }}>
  
   <div >
    <CardMedia
    sx={{width:200,height:200,margin:'10px'}}
  image={`${ServerURL}/images/${picture}`} 
/>
 </div>
 <CardContent style={{display:'flex',flexDirection:'row',width:'100%'}} >
 <div style={{flexDirection:'column',width:'100%'}}>
  <div style={{color:'white',fontSize:'25',flexDirection:'row',width:'95%'}} >
    <p>{`${item.brandname}`} {`${item.productname}`} {`${item.modelno}`}</p>
    <div style={{display:'flex',flexDirection:'row',fontSize:'15px'}}><p style={{margin:'0'}}>Price: &#8377; <s>{item.price}</s></p></div> 
    <div style={{display:'flex',flexDirection:'row',fontSize:'20px'}}><p style={{margin:'0'}}>OfferPrice: &#8377; {item.offerprice}</p></div> 
              

   </div>
   
   </div>
  
  
    
      </CardContent>
     

       


  
  
    
 

  </Card>
  </div>
    )}
