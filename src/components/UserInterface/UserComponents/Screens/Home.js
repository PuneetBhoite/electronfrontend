import { Stack, TextField } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Header from "./Header"
import MenuComponent from "./MenuComponent";
import MainSlider from "./MainSlider";
import { makeStyles } from "@mui/styles";
import AdvSlider from "./AdvComponent";
import CircleComponentSlider from "./CircleComponent";
import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import ProductComponentSlider from "./ProductComponent";
import ProductVerticalPicture from "./ProductVerticalPicture";
import { useNavigate } from "react-router-dom";





var useStyles=makeStyles({
Main:{ 
    backgroundColor:'#121212',




},
MainSlider:{
    display:"flex",
justifyContent:"center",
width: "100%",
height: "Auto",
marginBottom:'2%'
}
,
MainProducts:{
  display:"flex",
justifyContent:"center",
width: "100%",
height: "auto",
marginBottom:'2%'
},
AdvSlider:{
    display:"flex",
justifyContent:"center",
width: "100%",
height: "Auto",
marginBottom:'2%',

},
CircleComponentSlider:{
    display:"flex",
justifyContent:"center",
width: "100%",
height: "Auto",
marginBottom:'2%'
}

})


export default function Home(){
    const useStyle=useStyles()
    var navigate=useNavigate()
    const theme = useTheme();
    const matches_xs = useMediaQuery(theme.breakpoints.down('xs'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
    const matches_md = useMediaQuery(theme.breakpoints.down('md'));

    
    const[banner,setBanner]=useState([])
    const fetchAllBanners=async()=>{
      var result=await getData('userinterface/fetch_all_banners')
      setBanner(result.data)
    }

    
    const[adv,setAdv]=useState([])
    const fetchAllAdv=async()=>{
      var result=await getData('userinterface/fetch_all_adv')
      setAdv(result.data)
    }
   
    const[category,setCategory]=useState([])
    const fetchAllCategory=async()=>{
      var result=await getData('userinterface/display_all_category')
      setCategory(result.data)
    }

    const handleClick=(item)=>{
      navigate('/page',{state:{category:item}})
    }
const CategorySlider=()=>{
  return category.map((item,i)=>{
      return(
      
      <div >
        <div style={{display:'flex',justifyContent:'center',cursor:'pointer'}} onClick={()=>{handleClick(item)}} >
         <img src={`${ServerURL}/images/${item.image}`} style={{width:matches_xs?"30%":matches_sm?"50%":'80%'}}  /></div>
         <div style={{display:'flex',justifyContent:'center'}}><h5 style={{color:'white',fontSize:matches_xs?6:matches_sm?8:matches_md?10:12,}}>{`${item.categoryname}`}</h5></div>
         </div>
         
         )
    
  })
  }

  

  const[brand,setBrand]=useState([])
  const fetchAllBrand=async()=>{
    var result=await getData('userinterface/display_all_brand')
    setBrand(result.data)
  }
  const handleBrand=(item)=>{
    navigate('/page',{state:{brand:item}})
  }
  const BrandSlider=()=>{
    return brand.map((item,i)=>{
        return(
        
        <div >

          <div style={{display:'flex',justifyContent:'center',cursor:'pointer'}} onClick={()=>{handleBrand(item)}} >
           <img src={`${ServerURL}/images/${item.logo}`} style={{width:matches_xs?"30%":matches_sm?"50%":'80%'}}/></div>
           <div style={{display:'flex',justifyContent:'center'}}><h5 style={{color:'white',fontSize:matches_xs?6:matches_sm?8:matches_md?10:12,}}>{`${item.brandname}`}</h5></div>
         </div>
           
           )
      
    })
    }



    const[dod,setDOD]=useState([])
    const fetchAllDOD=async()=>{
      var result=await postData('userinterface/display_all_productdetails_by_status',{status:'Deal of the day'})
      setDOD(result.data)
    }

    const[fd,setFD]=useState([])
    const fetchAllFD=async()=>{
      var result=await postData('userinterface/display_all_productdetails_by_status',{status:'Festive deals'})
      setFD(result.data)
    }


    

    


    
    useEffect(function(){
      fetchAllBanners()
      fetchAllAdv()
      fetchAllCategory()
      fetchAllDOD()
      fetchAllBrand()
      fetchAllFD()
   
    },[])




    return(
        <div className={useStyle.Main} >
<Header  />
{matches_sm?<></>:
  <div ><MenuComponent /></div>}

<div className={useStyle.MainSlider}>
<MainSlider banner={banner}/>
</div>

<div className={useStyle.AdvSlider}>
    <AdvSlider adv={adv}/>
</div>

<div className={useStyle.CircleComponentSlider} >
    <CircleComponentSlider CircleSlider={CategorySlider()}  />
</div>

<div className={useStyle.MainProducts} >
   <ProductComponentSlider data={dod} title={'Deal of the Day'}  />
</div>

<div className={useStyle.MainProducts} >
   <ProductComponentSlider data={fd} title={'Festive Deals'}  />
</div>
<div className={useStyle.CircleComponentSlider} >
    <CircleComponentSlider CircleSlider={BrandSlider()}  />
</div>



        </div>
       
    )
}