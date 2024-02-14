import { Button,Card,Dialog , Grid, List,Avatar, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText, Stack, Typography, CardContent,} from "@mui/material";
import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useNavigate } from "react-router-dom";
import ChangeHistoryIcon from '@mui/icons-material/ChangeHistory';
import { CardMedia } from '@mui/material';
import { useSelector } from "react-redux";

export default function PlusMinusComponent(props){

    useEffect(function(){
        setCount(props.value)
    },[props])
    const navigate=useNavigate()

    const[count,setCount]=useState(props.value)
    const handleAdd=()=>{
        {props.screen=="cart"?<></>:handleOpen()}
        var c=count+1
        setCount(c)
        props.onChange(c)
        
        

    }
    const handleMinus=()=>{
        var c=count-1
        if (c>=0)
        {
            setCount(c)
            props.onChange(c)
        }
    }

    const handleBuyNow=()=>{
        handleAdd()
        navigate('/cart')

    }
    const handleOpen=()=>{
        setOpen(true)
        setTimeout(()=>{setOpen(false)},500)
    }
    const [buttonbackground,setButtonBackground]=useState('')
    const [textcolor,setTextColor]=useState('white')
    const handleEnter=()=>{
        setButtonBackground('rgb(18, 218, 168)')
        setTextColor('black')
    
    }
    const handleLeave=()=>{
        setButtonBackground('')
        setTextColor('white')
    
    }
        
///////////////////////////////////////////////////////CART DIALOG///////////////////////////////////////////////////
var cart=useSelector(state=>state.mycart)
var productcart=Object.values(cart)
 const productSelected=()=>{
  return productcart.map((item)=>{
    var picture=item.picture.split(',')[0]
         return(
          <div style={{display:'flex',justifyContent:'center'}}>
          <Card  elevation={3} sx={{display:"flex",width:"100%",height:'75px',margin:"10px",background:"#121212",color:'white',borderRadius:'10px', }}>
          
           <div style={{alignItems:"center",display:'flex'}} >
            <CardMedia 
            sx={{width:50,height:50,margin:'10px'}}
          image={`${ServerURL}/images/${picture}`} 
        />
         </div>
         <CardContent style={{display:'flex',flexDirection:'row',width:'100%',alignItems:'center'}} >
         <div style={{display:'flex',flexDirection:'row',width:'150px'}}>
          <div style={{color:'Whitesmoke',fontSize:'15',flexDirection:'row',width:'75%'}} >
            <p>{`${item.productname}`} {`${item.modelno}`}</p>
  
           </div>
           <div style={{display:'flex',alignItems:'center'}}>
            <p>x {`${item.qty}`}</p>
           </div>
           
           </div>      
          </CardContent>        
          </Card>
          </div>
         )})
 }
const [open, setOpen] =useState(false);
const cartDialog=()=>{
  return(
    
   <Dialog open={open}
   
    sx={{".css-1t1j96h-MuiPaper-root-MuiDialog-paper" :{
      borderRadius:0
    },
       "& .MuiDialog-container": {
          alignItems: "flex-start",
          justifyContent:'right',
          marginTop:'15px',
          marginRight:'5px',
          
          
       },
       
       
    }}  >  
    <div >
<div style={{backgroundColor: '#030405',display:'flex',justifyContent:'center'}}>
<h5 style={{padding:0,margin:0,backgroundColor: 'transparent',color:'#121212'}}><ChangeHistoryIcon/></h5>
</div>

      <div style={{width:'Auto',backgroundColor: '#030405',margin:0,padding:0}}   >
      {productSelected()}
    </div>
    </div>    
    
    
      
   </Dialog>
  
    
  
  )
}




///////////////////////////////////////////////////////CART DIALOG///////////////////////////////////////////////////



    return(<div >
        <div>{cartDialog()}</div>
        {count==0?<div style={{display:"flex",flexDirection:'row',width:"100%",marginTop:"5%",gap:5}}>
            <Button onClick={handleAdd}   size="medium" style={{background:"rgb(18, 218, 168)",width:"35%",color:'black'}} >Add to cart</Button>
            <Button onMouseEnter={handleEnter} onMouseLeave={handleLeave} onClick={handleBuyNow} style={{background:buttonbackground,color:textcolor,width:"35%"}}>Buy Now</Button>
            </div>:(<div style={{marginTop:"5%",width:"100%",display:'flex',gap:20}}>
         
          <div style={{color:props.screen=="cart"?"#000":"#fff" ,display:'flex',justifyContent:'space-between',alignItems:'center',width:props.screen=="cart"?"40%":"25%" }}>  
          <Fab size="small" color="green" onClick={handleMinus} >
        <RemoveIcon />
      </Fab>{count} <Fab size="small" color="green" onClick={handleAdd} >
        <AddIcon />
      </Fab></div>
      {props.screen=="cart"?<></>:<Button onClick={()=>navigate('/home')} size="small" style={{background:"rgb(18, 218, 168)",width:"35%",color:'black'}} >Continue Shopping</Button>
       }
        
        </div>)}
      
        </div>
    )

}