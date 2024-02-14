import * as React from 'react';
import {AppBar,Toolbar,Box, Button,} from '@mui/material';

import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import { useState,useEffect } from 'react';
import Slider from "react-slick";
import { getData } from '../../../../services/FetchNodeServices';
import { useNavigate } from 'react-router-dom';


export default function MenuComponent({refresh,setRefresh}){
    var navigate=useNavigate()
    const theme = useTheme();
    const matches_xs = useMediaQuery(theme.breakpoints.down('xs'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));

  var settings = {
     
    speed: 500,
    slidesToShow:matches_md?4:6,
    slidesToScroll: 1,
    rows:1,
    arrows:false,
  
   
  }
  useEffect(function(){
    
    fetchAllCategory()

 
  },[])
  const[category,setCategory]=useState([])
  const fetchAllCategory=async()=>{
    var result=await getData('userinterface/display_all_category')
    setCategory(result.data)
  }
  const handleClick=(item)=>{
    navigate('/page',{state:{category:item}})
    window.location.reload(false)
    
  }

  const CategoryMenu=()=>{
    return category.map((item,i)=>{
      return(
        <div onClick={()=>{handleClick(item)}} style={{display:'flex',justifyContent:'center'}}><h5 style={{cursor:'pointer',color:'white',fontSize:matches_xs?6:matches_sm?8:matches_md?10:12,}}>{`${item.categoryname}`}</h5></div>
      )
    })
  }




    return(<div style={{width:"100%"}}>
      
        <AppBar position="static" >
          <Toolbar style={{background:"#121212"}} >
       
           <div style={{width:'100%',textAlign:'center'}}>
<Slider {...settings} >
    {CategoryMenu()}
    </Slider>

    </div>
        
          
            
            
          </Toolbar>
        </AppBar>
       
      </div>
       


     
    )
}