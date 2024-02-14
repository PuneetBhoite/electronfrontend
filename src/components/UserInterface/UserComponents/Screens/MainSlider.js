import Slider from "react-slick";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ServerURL,getData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import React from "react";



export default function MainSlider({banner}){
    const theme = useTheme();



    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
    autoplaySpeed: 3000,
        
       
      

     

      };



const showSlider=()=>{
return banner.map((item,i)=>{
    return( <div >
       <img src={`${ServerURL}/images/${item.picture}`} style={{width:'100%',height:'100%'}}/>
       </div>)
  
})
}

    
    
    return(
    
    <div style={{width:'100%',height:'50%'}} >

   
<Slider {...settings} >
    
{showSlider()}
</Slider>

        
        </div>

    )
}