import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import useRazorpay from "react-razorpay";
import LOGO from '../../../../assets/ELECTRON.gif'
import { useSelector } from 'react-redux';
import {postData} from '../../../../services/FetchNodeServices'
export default function PriceDisplayComponent({productcart,handleclick,buttontitle,status}){
    
var user=useSelector(state=>state.user)
var userData=Object.values(user)[0]
var originalAmount=productcart.reduce((p1,p2)=>{
    return p1+(p2.price*p2.qty)  
  },0)
  var actualAmount=productcart.reduce((p1,p2)=>{
    return p1+(p2.offerprice*p2.qty)
  },0)
  var yousave=originalAmount-actualAmount
 


  
 ///////////////////////////////////////////RAZOR/////////////////////////////////////////
 const [Razorpay] = useRazorpay();
 

 const options = {
   key: "rzp_test_GQ6XaPC6gMPNwH", // Enter the Key ID generated from the Dashboard
   amount: actualAmount*100 , // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
   currency: "INR",
   name: "Electron",
   description: "Test Transaction",
   image: LOGO,
    handler: async function (response) {
     alert(response.razorpay_payment_id);
     alert(response.razorpay_signature);
     var body={cart:productcart,user:userData,paymentstatus:response.razorpay_payment_id}
     var result=await postData('userinterface/order_submit',body)
     if(result.status)
     {alert('order Submitted')}
     else
     {alert('failed')}
   },
   prefill: {
     name: userData?.username,
     email: "youremail@example.com",
     contact: userData?.mobilenumber,
   },
   notes: {
     address: "Razorpay Corporate Office",
   },
   theme: {
     color: "#191717",
    
   },
 };
 const handlePayment = async () => {
 const rzp1 = new Razorpay(options);

 rzp1.on("payment.failed", function (response) {
   alert(response.error.code);
   alert(response.error.description);
   alert(response.error.source);
   alert(response.error.step);
   alert(response.error.reason);
   alert(response.error.metadata.payment_id);
 });

 rzp1.open();

};




 ///////////////////////////////////////////RAZOR/////////////////////////////////////////


  
    return(
        <div style={{display:'flex',justifyContent:'center',marginTop:'30%'}}>
    
           <Card style={{width:'80%',borderRadius:'20px'}}>
             <CardContent>
               <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <p>Price:</p>
                 <p>₹{originalAmount}</p>
               </div>
               <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <p>You Save:</p>
                 <p>-₹{yousave}</p>
               </div>
               <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <p>OfferPrice:</p>
                 <p>₹{actualAmount}</p>
               </div>
             
               <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                 <p>Total</p>
                 <p>₹{actualAmount}</p>
               </div>
               <div style={{display:"flex",flexDirection:'row',justifyContent:'center',width:"100%",marginTop:"5%"}}>
                
                <Button onClick={buttontitle=="Checkout"?handleclick:handlePayment}  size="small" style={{background:"rgb(18, 218, 168)",width:"80%",color:'black'}} >{buttontitle}</Button>
                   </div>
              
               
               
             </CardContent>
           </Card>



       </div>
    )
}