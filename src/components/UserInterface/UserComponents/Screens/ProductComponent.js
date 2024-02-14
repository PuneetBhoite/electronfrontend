import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { ServerURL,getData } from "../../../../services/FetchNodeServices";
import React from "react";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { useState } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import ProductPageComponent from "./ProductPageComponent";



export default function ProductComponentSlider({data,title,setRefresh,refresh}){
  const theme = useTheme();
  const matches_xs = useMediaQuery(theme.breakpoints.down('xs'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
  var navigate=useNavigate()

    var settings = {
     
        speed: 500,
        slidesToShow:matches_md?2:4,
        slidesToScroll: 1,
        rows:1,
        arrows:matches_md?false:true
        
      };
     

const handleClick=(item)=>{
  navigate('/productpage',{state:{product:item}})
  window.location.reload(false)
}

const showSlider=()=>{
return data.map((item,i)=>{
    return(
        
    <div onClick={()=>{handleClick(item)}} style={{display:'flex',justifyContent:'center'}} >
      
       

<Card style={{width:'95%',height:'60%',background:'#151515',borderRadius:'10px',cursor:'pointer'}} elevation={5}>
      
      <img src={`${ServerURL}/images/${item.productpicture}`} style={{width:'90%' ,margin:'10px',display:'flex'}}/>
  
      <CardContent>
        <div style={{color:'white',fontSize:matches_md?"20px":"25px",height:"30px"}}>
        {`${item.productname}`}
        </div>      
      </CardContent>
      <CardContent>
        <Typography variant="p" fontSize={matches_md?"12px":"15px"} color="whitesmoke"    >

       <p>Price: <s>{`${item.price}`}</s></p>
       <div >
        Offerprice: {`${item.offerprice}`}
       </div>
        </Typography></CardContent>
     
    </Card>
   
        
    </div>
    
       
       )
  
})
}

    
    
    return(
    
    <div style={{width:'80%',height:'100%'}} >

   <div style={{margin:'15px',color:'white',fontSize:'30px'}}>{title}</div>
<Slider {...settings} >
    
{showSlider()}
</Slider>
        </div>
        

    )
}