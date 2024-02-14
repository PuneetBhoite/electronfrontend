import Slider from "react-slick";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ServerURL,getData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import React from "react";
import { Stack } from "@mui/material";



export default function CircleComponentSlider({CircleSlider}){
    const theme = useTheme();
    const matches_xs = useMediaQuery(theme.breakpoints.down('xs'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));


    var settings = {
     
        speed: 500,
        slidesToShow:matches_sm?2:matches_md?4:7,
        slidesToScroll: 1,
        rows:matches_sm?2:1,
        arrows:matches_sm || matches_md?false:true,
       
        
       
      

     

      };




    
    
    return(
    
    <div style={{width:'75%',height:'50%'}} >

   
<Slider {...settings} >
    
{CircleSlider}
</Slider>

        
        </div>

    )
}