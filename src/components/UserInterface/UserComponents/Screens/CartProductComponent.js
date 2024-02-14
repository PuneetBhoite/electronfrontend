import PlusMinusComponent from "./PlusMinusComponent";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { CardMedia } from '@mui/material';
import { useSelector,useDispatch } from "react-redux";
import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";

export default function CartProductComponent({setCartRefresh,productcart,cartRefresh}){
    var dispatch=useDispatch()
    
    const handleQtyChange=(product,value)=>{
   
        if(value<=0)
        {
          dispatch({type:'DELETE_PRODUCT',payload:[product.productdetailsid,product]})
        }
        else{
          product['qty']=value
          dispatch({type:'ADD_PRODUCT',payload:[product.productdetailsid,product]})
        }
        setCartRefresh(!cartRefresh)
       
        
      }

    return productcart.map((item)=>{
      var picture=item.picture.split(',')[0]
           return(
       
  
  <div style={{display:'flex',justifyContent:'center'}}>
          <Card  elevation={3} sx={{display:"flex",width:"85%",height:'auto',margin:5,background:"whitesmoke",color:'white',borderRadius:'10px', }}>
          
           <div >
            <CardMedia
            sx={{width:200,height:200,margin:'10px'}}
          image={`${ServerURL}/images/${picture}`} 
        />
         </div>
         <CardContent style={{display:'flex',flexDirection:'row',width:'100%'}} >
         <div style={{flexDirection:'column',width:'70%'}}>
          <div style={{color:'black',fontSize:'25',flexDirection:'row',width:'95%'}} >
            <p>{`${item.brandname}`} {`${item.productname}`} {`${item.modelno}`}</p>
  
           </div>
           
           <div  >
            
            <PlusMinusComponent value={item?.qty} onChange={(value)=>handleQtyChange(item,value)} screen="cart" />
           </div>
           </div>
           <div style={{color:"black",width:'30%'}} >
           <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <p>Price:</p>
                            <p>₹{`${item.price*item.qty}`}</p>
                          </div>
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <p>Offer Price:</p>
                            <p>₹{`${item.offerprice*item.qty}`}</p>
                          </div>
  
            <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                            <p>Save:</p>
                            <p>₹{`${(item.price-item.offerprice)*item.qty}`}</p>
                          </div>
  
  
           </div>
          
            
              </CardContent>
             
       
               
  
  
          
          
            
         
        
          </Card>
          </div>
  
  
        
  
          )})}