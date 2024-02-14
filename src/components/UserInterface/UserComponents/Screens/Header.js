import React from 'react';
import Search from'./SearchComponent'
import {AppBar,Toolbar,Box, AccordionDetails, Dialog, DialogContentText, CardContent,Card, DialogContent} from '@mui/material';
import LOGO from '../../../../assets/ELECTRON.gif'
import PersonIcon from '@mui/icons-material/Person';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState,useEffect } from "react";
import { ServerURL,getData } from '../../../../services/FetchNodeServices'
import { json, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import LoginPage from "../User/LoginPageComponent";
import { setSelectionRange } from '@testing-library/user-event/dist/utils';






export default function Header(props){
  var cart=useSelector(state=>state.mycart)
  var productcart=Object.values(cart)
  const theme = useTheme();
  const navigate=useNavigate()
  var [status,setStatus]=useState(false)
  var userData= JSON.parse(localStorage.getItem('user'))

///////////////////////////////////////////////////////HANDLES///////////////////////////////////////////////////////
  const [textcolor,setTextColor]=useState('white')
  const handleEnter=()=>{
      setTextColor('rgb(18, 218, 168)')
     
      
  
  }
  const handleLeave=()=>{
      setTextColor('white')
     
          }


  const handleClick=()=>{
    navigate('/home')
  }
  const handleMenu=(text)=>{
    navigate('/page',{state:{category:text}})
    window.location.reload(false)
      }

  const handleAccount=()=>{
    if(userData)
    {
      navigate('/myaccount')
    }
    else{
      setStatus(true)
    }
  }
  
///////////////////////////////////////////////////////HANDLES///////////////////////////////////////////////////////

////////////////////////////////////////////////////////DRAWER///////////////////////////////////////////////////////
const matches = useMediaQuery(theme.breakpoints.down('sm'));
  const[category,setCategory]=useState([])
  const fetchAllCategory=async()=>{
    var result=await getData('userinterface/display_all_category')
    setCategory(result.data)
  }
  useEffect(function(){
    
    fetchAllCategory()

 
  },[])
  
const [state, setState] = React.useState({
  
    left: false,
   
  });
  
  const toggleDrawer = (anchor, open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
    sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    role="presentation"
    onClick={toggleDrawer(anchor, false)}
    onKeyDown={toggleDrawer(anchor, false)}
  >
    <div  style={{background:"#030405",width:'100%',marginBottom:"20px",}}><img   src={LOGO} style={{borderRadius:'10px',width:'100', marginLeft:'5%'}}/></div>
    
      
   
        <List >   {category.map((text, index) => (
        <ListItem key={text.categoryid} onClick={()=>{handleMenu(text)}} disablePadding>
          <ListItemButton>
            <ListItemIcon >  
            <img src={`${ServerURL}/images/${text.image}`} style={{width:40}} />
            </ListItemIcon>
            <ListItemText primary={text.categoryname} />
          </ListItemButton>
        </ListItem>
      ))}</List>
    
  </Box>
  );

 ////////////////////////////////////////////////////////DRAWER///////////////////////////////////////////////////////



    return(<div>
        <Box sx={{ width:"100%"}}>
        <AppBar position="static">
          <Toolbar style={{background:"#030405",}} variant='dense'>
           <img onClick={handleClick} src={LOGO} style={{borderRadius:'10px',width:'100', marginLeft:'5%', cursor:'pointer'}}/>
{
matches?<></>:
           <div style={{marginLeft:'15%', width:'40%',background:'white',borderRadius:'5px'}}>
          <Search/>
           </div>
}

           <div style={{marginLeft:matches?'35%':'15%',width:"5%",display:'flex',alignItems:'center'}} >
           <div style={{display:'flex',flexDirection:"row"}}>
             {userData?.username}
            </div>
         <div>
        <Button  style={{color:'white'}} onClick={handleAccount} ><PersonIcon/></Button> 
           </div>
           {props.page=="cart"?<></>:<div  onMouseEnter={handleEnter} onMouseLeave={handleLeave}  >
          
       <Button onClick={() => navigate('/cart')} style={{color:textcolor}} ><Badge badgeContent={productcart.length} color="secondary"><ShoppingCartIcon /></Badge> </Button>
        </div>} 


           </div>
           
            
            
          </Toolbar>
         
        </AppBar>
        <div style={{display:'flex',flexDirection:'row',alignItems:'center',justifyContent:'center', color:'white'}}>
         <div  > {matches?<MenuIcon onClick={toggleDrawer('left', true)} style={{margin:'10px',cursor:"pointer"}} />:<></>}
         <React.Fragment key={'left'}>
         
         <Drawer anchor={'left'} open={state['left']} onClose={toggleDrawer('left', false)} 
         sx={{'.css-4t3x6l-MuiPaper-root-MuiDrawer-paper':{background:'#121212',color:"whitesmoke"}}}>
           {list('left')}
         </Drawer>
       </React.Fragment>
         </div>
  
     
         <div  style={{background:'white',borderRadius:'10px',width:'90%'}}>{matches?<Search />:<></>}</div>
         
          </div>
          
       </Box>
       <LoginPage status={status} setStatus={setStatus}  />
       </div>

       


     
    )
}