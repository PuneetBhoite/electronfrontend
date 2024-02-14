import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import { Input, Stack, TextField} from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { useLocation, useNavigate } from 'react-router-dom';
import { postData } from '../../../../services/FetchNodeServices';
import { useDispatch } from 'react-redux';



export default function OtpPage(props) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    var navigate=useNavigate()
    var dispatch=useDispatch()
    var location=useLocation()  
    var userData= JSON.parse(localStorage.getItem('user'))
    var oldOtp=location.state.otp  
    var mobilenumber=location.state.mobilenumber

    var otpArray= new Array(4)
    otpArray.fill('')

    const handleCheckOtp=async()=>{
        var otp=otpArray.join('')
        if (otp==oldOtp)
        {
            
            var result=await postData('userdetails/check_account',{mobilenumber:mobilenumber})
            if(result.status)
            {
                dispatch({type:'ADD_USER',payload:[result.data[0].mobilenumber,result.data[0]]})
                navigate('/useraccount',{state:{mobilenumber:mobilenumber,user:result.data,status:result.status}})
                localStorage.setItem('user',JSON.stringify(result.data[0]))
            }
            else
            {
                
                navigate('/useraccount',{state:{mobilenumber:mobilenumber,status:result.status,user:[]}})
                
            }
        }
        else
        {
            alert('invalid OTP')
        }


    }
 
  const handleClose = () => {
   navigate('/cart')
  };

  const handleotp1=()=>{
    if(document.getElementById('one').value.length==1)
    {
        document.getElementById('two').focus() 
        otpArray[0]=document.getElementById('one').value
    }
  }

  const handleotp2=()=>{
    if(document.getElementById('two').value.length==1)
    {
        document.getElementById('three').focus() 
        otpArray[1]=document.getElementById('two').value
    }

  }
  const handleotp3=()=>{
    if(document.getElementById('three').value.length==1)
    {
        document.getElementById('four').focus() 
        otpArray[2]=document.getElementById('three').value
    }

  }
  const handleotp4=()=>{
    if(document.getElementById('four').value.length==1)
    {
       
        otpArray[3]=document.getElementById('four').value
    }

  }



  return (
    
      <Dialog  open={true}  fullScreen={fullScreen} style={{background:'lightgrey',justifyContent:'center',display:"flex"}}     >
        <div style={{backgroundColor:'#191919',display:'flex',alignItems:'center',justifyContent:'right'}}>
           <div style={{margin:'10px',cursor:'pointer'}} onClick={handleClose} > <CloseIcon  /></div>
        </div>
        <DialogContent sx={{backgroundColor:'#191919',overflow:'hidden', width:'80vh',justifyContent:'center',display:"flex"}}>
          
           <Stack> 
            <DialogContentText style={{justifyContent:'center',display:'flex'}} >
                <form style={{width:'100%',flexDirection:'column'}}>
                    <div style={{justifyContent:'center',display:'flex'}}>
                   <p style={{color:'white',fontWeight:'bold'}}>VERIFY WITH OTP</p>
                    </div>
                    <div style={{justifyContent:'center',display:'flex'}}>
                    <p style={{color:'white',fontSize:'12px'}}>sent to +91{mobilenumber}</p>
                    </div>

                    <div style={{display:'flex',justifyContent:'center',marginTop:'20px'}}>
                     <div style={{justifyContent:"space-between",display:'flex',width:'40%'}}>
                        <div style={{background:"grey",width:'20%',border:"1px solid#ffffff",borderRadius:'5px'}}><TextField size='small' onKeyUp={handleotp1} id="one" /></div>
                        <div style={{background:"grey",width:'20%',border:"1px solid#ffffff",borderRadius:'5px'}}><TextField size='small' onKeyUp={handleotp2} id="two" /></div>
                        <div style={{background:"grey",width:'20%',border:"1px solid#ffffff",borderRadius:'5px'}}><TextField size='small' onKeyUp={handleotp3} id="three" /></div>
                        <div style={{background:"grey",width:'20%',border:"1px solid#ffffff",borderRadius:'5px'}}><TextField size='small' onKeyUp={handleotp4} id="four" /></div>
                    </div>
                    </div>
        
                   
                   
                   
                        
                    </form>
                   
            </DialogContentText>
            <DialogActions>
                <div style={{flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
                <div>
                    <p style={{color:'white',fontSize:"15px",fontWeight:'bolder'}} >Didn't Receive Your OTP? </p>
                </div>
                <div style={{width:'100%',marginTop:'20px'}}>
                <Button onClick={handleCheckOtp} style={{background:"rgb(18, 218, 168)",borderRadius:'10px',width:"100%",color:'black',padding:15,fontSize:10,fontWeight:'bold'}}>Submit</Button>
                </div>
                </div>
            </DialogActions>
            </Stack>
            
       </DialogContent>
      
       
        
      </Dialog>
     
  )
}
