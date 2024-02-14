import { CardContent,Card, Grid, TextField, CardActions } from "@mui/material";
import Button from '@mui/material/Button';
import { useSelector,useDispatch } from "react-redux";
import Header from "../Screens/Header";
import Swal from "sweetalert2";
import { postData } from "../../../../services/FetchNodeServices";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PriceDisplayComponent from "../Screens/PriceDisplayComponent";
import { useNavigate } from "react-router-dom";


export default function UserDetailsComponent(props){
   var dispatch=useDispatch()
   var cart=useSelector(state=>state.mycart)
   var productcart=Object.values(cart)
   var location=useLocation()
   var navigate=useNavigate()
   var number=location.state?.mobilenumber
   var userData=location.state?.user
   var status=location.state?.status
  
 ////////////////////////////////////////////////LEFT SIDE////////////////////////////  
  const showAddress=()=>{
    return(<div style={{width:'100%'}} >
      <Card style={{background:'whitesmoke',border:'1px solid#121212'}}>
        <CardContent>
          <p>{userData[0].username}</p>
          <p> +91 {userData[0].mobilenumber}</p>
          <p>{userData[0].address}</p>
          <p>{userData[0].pincode}</p>
        </CardContent>
        <CardActions style={{justifyContent:'center',display:"flex"}}>
        {productcart.length==0?<Button sx={{color:'black',border:'1px solid#121212'}}
        onClick={() =>navigate('/home')} >
            Select this address
          </Button>:<></>}
        </CardActions>
      </Card>
    </div>)
  }
 ////////////////////////////////////////////////LEFT SIDE////////////////////////////  


 ////////////////////////////////////////////////vALIDATION/////////////////////////////////////////////////////// 
  const [errors,setErrors]=useState({})
  const handleError=(error,label)=>{
     setErrors((prev)=>({...prev,[label]:error}))
  }
  const validation=()=>{
     var error=false
        if(emailid.length==0){
            error=true
            handleError("Input Email ID","emailid")
        }
        if(username.length==0){
                error=true
                handleError("Input First Name","username")
            }
        if(lastname.length==0){
          error=true
          handleError("Input Last Name","lastname")
      }
        if(address1.length==0){
          error=true
          handleError("Input Address","address1")
        }

       

     
     return error
  }
 ////////////////////////////////////////////////vALIDATION/////////////////////////////////////////////////////// 


/////////////////////////////////////////////////haNDLE SUBMIT////////////////////////////////////////////////////
const [username,setUserName]=useState('')
const [middlename,setMiddleName]=useState('')
const [lastname,setLastName]=useState('')
const [emailid,setEmailID]=useState('')
const [mobilenumber,setMobileNumber]=useState(number)
const [address1,setAddress1]=useState('')
const [address2,setAddress2]=useState('')
const [pincode,setPincode]=useState('') 
const handleSubmit=async()=>{
  
    var error=validation()  
    console.log(errors)
   
    if(error==false)
    {
   var body={emailid:emailid,mobilenumber:mobilenumber,username:`${username}${middlename}${lastname}`,pincode:pincode,address:`${address1}${address2}`}
    var response=await postData('userdetails/submit_userdetails',body)
    if(response.status)
    {
      Swal.fire({
        icon: 'success',
        title: 'Details',
        text: response.message,
        toast:true
      })
      dispatch({type:"ADD_USER",payload:[mobilenumber,body]})
      localStorage.setItem('user',JSON.stringify(body))
      {productcart==0?navigate('/home'):navigate('/cart')}
      
    
    }
    else
    {
      Swal.fire({
        icon: 'error',
        title: 'Details',
        text: response.message,
        toast:true
      })
    }
  
  
  }
   }
/////////////////////////////////////////////////haNDLE SUBMIT////////////////////////////////////////////////////
    

return(
       <div style={{background:'grey'}}>
        <Header/>
        <Grid container>
            
            <Grid item xs={9}>
              {status?<div style={{display:'flex',justifyContent:'left',alignItems:'center',margin:'10%'}}>
                <div style={{width:'70%'}}>{showAddress()}</div></div> :
              
            <div style={{display:'flex',justifyContent:'center',flexDirection:'column'}}>
                <div style={{width:'80%',justifyContent:'center',display:'flex'}}>
                    <h4>Continue Checkout</h4>
                </div>
            <div style={{margin:'20px',width:'80%',flexDirection:'row',display:'flex'}} >
                <TextField onFocus={()=>handleError('','username')} error={errors.username} helperText={errors.username}
                 onChange={(event)=>setUserName(event.target.value)} 
                  fullWidth label='First Name' sx={{margin:'10px',}} />
                <TextField
                 onChange={(event)=>setMiddleName(event.target.value)} 
                  fullWidth label='Middle Name' sx={{margin:'10px',}} />
                <TextField onFocus={()=>handleError('','lastname')} error={errors.lastname} helperText={errors.lastname}
                onChange={(event)=>setLastName(event.target.value)} 
                fullWidth label='Last Name' sx={{margin:'10px',}} />
            </div>
            <div style={{margin:'20px',width:'80%',flexDirection:'row',display:'flex'}} >
                <TextField 
                onFocus={()=>handleError('','emailid')} error={errors.emailid} helperText={errors.emailid}
                 onChange={(event)=>setEmailID(event.target.value)} 
                 fullWidth label='Enter Email ID' sx={{margin:'10px',}}      />
                <TextField  value={mobilenumber}
                onFocus={()=>handleError('','mobilenumber')} error={errors.mobilenumber} helperText={errors.mobilenumber}
                 onChange={(event)=>setMobileNumber(event.target.value)} 
                fullWidth label='Enter Mobile Number' sx={{margin:'10px',}}      />
            </div>
            <div style={{margin:'20px',width:'80%',flexDirection:'row',display:'flex'}}>
                <TextField onFocus={()=>handleError('','address1')} error={errors.address1} helperText={errors.address1}
                 onChange={(event)=>setAddress1(event.target.value)}
                  fullWidth style={{margin:'10px'}} label="Address 1"  />
                <TextField 
                 onChange={(event)=>setAddress2(event.target.value)}
                 fullWidth style={{margin:'10px'}} label="Address 2" />
            </div>

            <div style={{margin:'20px',width:'80%',flexDirection:'row',display:'flex'}}>
            <TextField fullWidth style={{margin:'10px'}} label="State" />
                <TextField fullWidth style={{margin:'10px'}} label="City " />
                <TextField  onChange={(event)=>setPincode(event.target.value)}
                 fullWidth style={{margin:'10px'}} label="Pincode" />
             </div>

             <div style={{margin:'20px',width:'80%',display:'flex',justifyContent:'center'}} >
             <Button onClick={handleSubmit} size="medium" style={{background:"rgb(18, 218, 168)",width:"50%",color:'black'}} >Save details</Button>
             </div>

        </div>
               }


            </Grid> 
        {status?<Grid item xs={3}  >
        {productcart.length==0?<></>: <PriceDisplayComponent status={status} productcart={productcart} buttontitle={'Proceed to Payment'} />}
       </Grid>:<></>}    
     

        </Grid>
        
       </div>
    )
}