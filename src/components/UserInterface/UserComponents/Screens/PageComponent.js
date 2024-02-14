import { Button, Card, CardMedia, Grid, List, Paper, Stack, TextField, Typography } from "@mui/material";
import Header from "./Header"
import MenuComponent from "./MenuComponent";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";
import { json, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import AllProductPageComponent from "./AllProductPageComponent";
import AllSearchedProductComponent from "./AllSearchedProducts";
export default function(){
  const theme = useTheme();
  const matches_xs = useMediaQuery(theme.breakpoints.down('xs'));
  const matches_sm = useMediaQuery(theme.breakpoints.down('sm'));
  const matches_md = useMediaQuery(theme.breakpoints.down('md'));
    var location=useLocation()
    var data=location?.state?.result
    var c=location.state.category
    const [selectedcategory,setSelectedCategory]=useState(c)
    const[category,setCategory]=useState([])
    const fetchSelectedCategory=async()=>{
      var result=await postData('userinterface/display_all_productdetails_by_categoryid',{categoryid:selectedcategory.categoryid})
      setCategory(result.data)
    }


    var b=location.state.brand
    const [ selectedBrand,setSelectedBrand]=useState(b)
    const[brand,setBrand]=useState([])
    const fetchSelectedBrand=async()=>{
        var result=await postData('userinterface/display_all_productdetails_by_brandid',{brandid:selectedBrand.brandid})
        setBrand(result.data)
      }

    useEffect(function(){
        {c?fetchSelectedCategory():b?
        fetchSelectedBrand():<></>}
     
      },[])

      const searchedProducts=()=>{
        return data.map((item)=>{
          return<AllSearchedProductComponent item={item}  />
        })
      }

    return(
        <div style={{background:'#121212'}}>
         <Header  />
{matches_sm?<></>:
  <div style={{textAlign:"center",width:'100%',cursor:'pointer'}}><MenuComponent /></div>}
            <Grid container >
                <Grid item xs={3} > 
                
                </Grid>

                <Grid item xs={9} >
                <div>
              {c?<><AllProductPageComponent product={category}    />
              </>:b?<><AllProductPageComponent product={brand}/>
              </>:searchedProducts()}
               
                </div>
                </Grid>
               

            </Grid>
        </div>
    )
}