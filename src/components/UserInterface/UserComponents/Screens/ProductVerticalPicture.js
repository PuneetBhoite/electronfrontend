import Slider from "react-slick";
import { useNavigate } from "react-router-dom";
import { ServerURL,getData } from "../../../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";

var useStyles=makeStyles({
    slider:{
        display:'flex',
        flexDirection:'row'
    }

})


export default function ProductVerticalPicture(props){
    const useStyle=useStyles()
    var product=props.product
    var data=product.picture.split(",")
    var versettings = {
     
        speed: 500,
        slidesToShow:4,
        slidesToScroll: 1,
        rows:1,
      };
      var horsettings = {
     
        speed: 500,
        slidesToShow:1,
        slidesToScroll: 1,
        rows:1,
        arrows:false,
      };
      const [selectedImage,setSelectedImage]=useState('')
      const handleChange=(item)=>{setSelectedImage(item)}
      useEffect(function(){
        setSelectedImage(data[0])
      },[props])
const showVSlider=()=>{
    return data.map((item,i)=>{
        return(
       
            <div onClick={()=>{handleChange(item)}} style={{width:'100%',height:'100%',}} >
            <img src={`${ServerURL}/images/${item}`} style={{ width:'90%',height:'90%',rotate:'270deg'}}/>
           
            </div>
            
        )})}
        const showHSlider=()=>{
            return data.map((item,i)=>{
                return(
               
                    <div >
             <img src={`${ServerURL}/images/${selectedImage}`} style={{ width:'100%',height:'100%'}}/>
             
             </div>
                    
                )})}

       
     

    return(
       <div className={useStyle.slider}>
    <div style={{height:'50%',width:"50%",rotate:'90deg',marginTop:'20%'}} >

   
    <Slider {...versettings} >
        
    {showVSlider()}
    </Slider></div>
    <div style={{height:'50%',width:"50%"}} >

   
    <Slider {...horsettings} >
        
    {showHSlider()}
    </Slider></div>
    </div>
    )
}