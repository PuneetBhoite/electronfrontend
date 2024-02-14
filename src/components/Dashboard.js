import { Button, Grid, List,Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography,} from "@mui/material";
import Paper from '@mui/material/Paper';
import { makeStyles } from "@mui/styles";
import * as React from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {responsiveFontSizes } from '@mui/material/styles';
import Card from '@mui/material/Card';
import ViewCarouselIcon from '@mui/icons-material/ViewCarousel';
import AdUnitsIcon from '@mui/icons-material/AdUnits';
import CategoryIcon from '@mui/icons-material/Category';
import BrandingWatermarkIcon from '@mui/icons-material/BrandingWatermark';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import FeedIcon from '@mui/icons-material/Feed';
import { useLocation } from 'react-router-dom'
import { ServerURL } from "../services/FetchNodeServices";
import { Route,Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Category from "../components/Category";
import DisplayAllCategory from "../components/DisplayAllCategory";
import Brand from "../components/Brands";
import DisplayAllBrand from "../components/DisplayAllBrand";
import Products from "../components/Products";
import ProductDetails from "../components/ProductDetails";
import DisplayAllProducts from "../components/DisplayAllProducts";
import DisplayAllProductDetails from "../components/DisplayAllProductDetails";
import Banner from "../components/Banner";
import CategoryWiseBanner from "../components/CategoryWiseBanner";
import Adv from "./Adv";

var useStyles=makeStyles({
    Main:{ 
        background:'#0F0F0F',
    width: "100%",
    height: "Auto",
    display: 'flex',
  
        
    },
    LeftSide:{
        width: "100%",
        height: "Auto",
        background:"#7D7C7C",
        display:'flex',
        justifyContent:"center",
    },

    LeftSideContent:{
        marginTop:'10px',
        textAlign:'center',
        
        
       
        
      
      
    },
    
    RightSideContent:{
    
      display:"flex",
      justifyContent:"center",
      alignItems:"center",
    }
 

 
})





let theme = createTheme();
theme = responsiveFontSizes(theme);







export default function Dashboard(){
  var admin=JSON.parse(localStorage.getItem('ADMIN'))
  const useStyle=useStyles()
  const location = useLocation()
  var navigate=useNavigate()





  const listItems=[
    {title:"Advertisement",
    icon:<ViewCarouselIcon/>,
    path:'/dashboard/advertisement'

  },
    {title:"Banner",
    icon:<ViewCarouselIcon/>,
    path:'/dashboard/banner'

  },
  {title:"Category Banner",
    icon:<AdUnitsIcon/>,
    path:'/dashboard/categorywisebanner'

  },
  {title:"Category",
  icon:<CategoryIcon/>,
  path:'/dashboard/displayallcategory'

},
{title:"Brand",
icon:<BrandingWatermarkIcon/>,
path:'/dashboard/displayallbrand'

},
{title:"Product",
icon:<Inventory2Icon/>,
path:'/dashboard/products'

},
{title:"Product Details",
icon:<FeedIcon/>,
path:'/dashboard/displayallproductdetails'

},




]

    


    return(
<div className={useStyle.Main}  >
    
        <Grid container   >
        <ThemeProvider theme={theme}>
               <Grid item xs={2} className={useStyle.LeftSide}   >
                <div className={useStyle.LeftSideContent}>
                <Stack spacing={6}>
                <Button onClick={   () => navigate('/dashboard')}><Paper elevation={10}>
                <Card sx={{ minWidth: 180,background:'#CCC8AA' }} >

               <Typography variant="h6" color={'#0F0F0F'} >Dashboard</Typography></Card></Paper></Button>
               



               <div>
              <center> <Avatar sx={{width:80,height:80,alignSelf:'center'}} src={`${ServerURL}/images/${admin.picture}`}>
             
                    </Avatar></center>
                    <h5>{admin.username}</h5>
                    <h5>{admin.emailid}</h5>
                    </div>
                    
                    
                    
        
               <List >
                
                {listItems.map(item=>(
                   
                    <ListItemButton
                  onClick={() => navigate(item.path)}
                    key={item.title}>
                  
                        
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText>{item.title}</ListItemText>
                        
                    </ListItemButton>





                ))}



               </List>
       
                    
             


                  

               


                    
                    </Stack>




                    
                    </div>
                  
                 


           

               

            </Grid>
            </ThemeProvider>
            <Grid item xs={10} >
              <Routes>
                
    <Route element={<Category/>} path="/category"   />
    <Route element={<DisplayAllCategory/>} path="/displayallcategory"   />
    <Route element={<Brand/>} path="/brand"   />
    <Route element={<DisplayAllBrand/>} path="/displayallbrand"   />
    <Route element={<Products/>} path="/products"   />
    <Route element={<DisplayAllProducts/>} path="/displayallproducts"   />
    <Route element={<ProductDetails/>} path="productdetails"/>
    <Route element={<DisplayAllProductDetails/>} path="displayallproductdetails"/>
    <Route   element={<Banner/>} path='banner'/>
    <Route   element={<CategoryWiseBanner/>} path='categorywisebanner'/>
    <Route   element={<Adv/>} path='advertisement'/>
              </Routes>





            </Grid>

        </Grid>
        </div>


    )




}