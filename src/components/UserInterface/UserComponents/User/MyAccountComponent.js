import { Button, Grid } from "@mui/material";
import Header from "../Screens/Header"
import MenuComponent from "../Screens/MenuComponent"
import { makeStyles } from "@mui/styles";
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import LocalShippingIcon from '@mui/icons-material/LocalShipping';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import ChecklistRtlIcon from '@mui/icons-material/ChecklistRtl';
import DevicesOtherIcon from '@mui/icons-material/DevicesOther';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from "react-router-dom";
var useStyles=makeStyles({
    Main:{ 
        background:'#0F0F0F',
    width: "100%",
    height: "100%",
    },})
export default function MyAccount(){
    const useStyle=useStyles()
    const navigate=useNavigate()   
    
  const Items=[
    {title:"My Profile",
    subtitle:'Edit your basic details',
    icon:<AccountCircleIcon/>,
    

  },
    {title:"My Address",
    subtitle:'Manage your saved addresses',
    icon:<HomeIcon/>,
   

  },
  {title:"My Orders",
  subtitle:'View, track, cancel orders and buy again',
    icon:<LocalShippingIcon/>,
    

  },
  {title:"My Rewards",
  subtitle:'Exclusive offers and loyalty rewards for you',
  icon:<EmojiEventsIcon/>,
  

},
{title:"My Wishlist",
subtitle:'Have a look at your favourite products',
icon:<ChecklistRtlIcon/>,


},
{title:"My Device & Plans",
subtitle:'Manage your device and plans',
icon:<DevicesOtherIcon/>,


},
{title:"My Service Request",
subtitle:'Manage Complaints, feedback,service request',
icon:<SupportAgentIcon/>,
},
{title:"Logout",
subtitle:'Logout from device',
icon:<LogoutIcon/> ,
click:(()=>handleLogout())
}

]
////////////////////////////////////////////////////////HANDLE////////////////////////////////////////////////////////////
const handleLogout=()=>{
  localStorage.clear()
  navigate('/home')  
}
////////////////////////////////////////////////////////HANDLE////////////////////////////////////////////////////////////

    return(<div className={useStyle.Main} >
        <Header/>
        <MenuComponent/>
    
<div style={{color:'white'}} ><h2 style={{marginLeft:'5%'}}>My Account</h2> </div>
<div style={{display:'flex', justifyContent:'center'}}>
<Grid container style={{width:"90%",display:'flex'}}>
{Items.map(item=>( <Grid item xs={4} >
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',}}>
 <Button onClick={item.click} variant="outlined"  style={{borderRadius:'10px', borderColor:'white',backgroundColor:"#0F0F0F",width:'80%',color:'whitesmoke',margin:'5%'}} >
                <div style={{display:'flex',justifyContent:"left",width:"100%"}}>
                <div style={{marginRight:'auto',fontSize:'35',margin:"10px",display:'flex',justifyContent:'center',alignItems:'center'}}>{item.icon}</div>
                <div style={{width:'80%',display:'flex',flexDirection:'column',}}>
                <p style={{fontSize:'16',margin:'1px',marginBottom:"0" ,marginRight:'auto'}}>{item.title}</p>
                
                <p style={{fontSize:'8',margin:'1px',marginRight:'auto'}}>{item.subtitle} </p>
                </div>
                </div></Button>
            

        </div></Grid>))}
      








        </Grid>
        </div>
        </div>
       
        

    )
    
}