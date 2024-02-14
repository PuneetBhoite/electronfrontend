import Slider from "react-slick";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ServerURL,getData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import React from "react";


export default function AdvSlider({adv}){
    const theme = useTheme();
    const matches_xs = useMediaQuery('(min-width:450px)')


    var settings = {
        infinite: true,
        speed: 500,
        slidesToShow: matches_xs?2:1,
        slidesToScroll: 1,
        arrows:false,
        
        
       
      

     

      };



const showAdvSlider=()=>{
return adv.map((item,i)=>{
    return( <div>
       <img src={`${ServerURL}/images/${item.picture}`} style={{width:'98%',height:'100%',margin:"5px"}}/>
       </div>)
  
})
}

    
    
    return(
    
    <div style={{width:matches_xs?'65%':"80%",height:'50%'}} >

   
<Slider {...settings} >
    
{showAdvSlider()}
</Slider>

        
        </div>

    )
}