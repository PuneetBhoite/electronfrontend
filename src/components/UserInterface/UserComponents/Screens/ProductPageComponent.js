import { Button, Grid, List, Paper, Stack, TextField, Typography } from "@mui/material";
import Header from "./Header"
import MenuComponent from "./MenuComponent";
import { useLocation } from "react-router-dom";
import { makeStyles } from "@mui/styles";
import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery'
import ProductVerticalPicture from "./ProductVerticalPicture"
import ProductDescription from "./ProductDescription";
import ProductComponentSlider from "./ProductComponent";




var useStyles=makeStyles({
Main:{ 
    background:'#0F0F0F',
width: "100%",
height: "Auto",
},

leftSide:{
  margin:"10%",
  display:'flex',
  justifyContent:'center',
  alignItems:'center'
},
Picture:{
  width:'100%',
  height:'100%'
}





}

)


export default function ProductPageComponent(props){
  var location=useLocation()
  var p=location.state.product
  const [product,setProduct]=useState(p)
  const [refresh,setRefresh]=useState(false)
    const useStyle=useStyles()
    const theme = useTheme();
    const matches_xs = useMediaQuery(theme.breakpoints.down('xs'));
    const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));

    const[category,setCategory]=useState([])
    const fetchSelectedCategory=async()=>{
      var result=await postData('userinterface/display_all_productdetails_by_categoryid',{categoryid:product.categoryid})
      setCategory(result.data)
    }
    useEffect(function(){
      {fetchSelectedCategory()}
       
    },[])


    return(
        <div className={useStyle.Main} >
<Grid container  >
  <Grid item xs={12}><Header/></Grid>
  <Grid item xs={12}>{matches_sm?<></>:<MenuComponent  />}</Grid>
      
               <Grid item xs={6} >
                
                  <div className={useStyle.leftSide}>
                <div className={useStyle.Picture} >
               <ProductVerticalPicture product={product}/>
               </div>
               </div>
                </Grid>




                <Grid item xs={6}  style={{width:'100%',color:"whitesmoke",display:'flex',justifyContent:'center'}} >
                 
             <div style={{marginTop:'2%',width:'70%' }} >
            <ProductDescription setRefresh={setRefresh} refresh={refresh} setProduct={setProduct} product={product} />
             
             </div>
            

               </Grid>
                
                </Grid>

                <Grid container >
                    <Grid item xs={12}  >
                      <div style={{display:"flex",justifyContent:"center",width: "100%",height: "auto",marginBottom:'2%'}}>
                        <ProductComponentSlider   data={category} />
                      </div>
                   
                    </Grid>

                </Grid>
               
        </div>
       
    )
}