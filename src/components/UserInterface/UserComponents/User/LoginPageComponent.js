import * as React from 'react';
import Button from '@mui/material/Button';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Dialog from '@mui/material/Dialog';
import { Input, Stack, TextField } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { useState,useEffect } from "react";
import { useNavigate } from 'react-router-dom';

export default function LoginPage({status,setStatus}) {
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    var navigate=useNavigate()
    var [mobilenumber,setMobileNumber]=useState('')
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
    
 
    const generateOTP=()=>{
        var otp=parseInt((Math.random()*8999)+1000)
        return otp
    }
    const onContinue =()=>{
        setStatus(false)
        var otp=generateOTP()
        alert(otp)
        navigate('/otp',{state:{otp:otp,mobilenumber:mobilenumber}})
        
        
    }

  const handleClose = () => {
   setStatus(false);
  };
  
  const handleCreate=()=>{
    navigate('/useraccount',{status:false})
  }

  return (
    
      <Dialog  open={status}  fullScreen={fullScreen} style={{background:'lightgrey',justifyContent:'center',display:"flex"}}     >
        <div style={{backgroundColor:'#191919',display:'flex',alignItems:'center',justifyContent:'right'}}>
           <div style={{margin:'10px',cursor:'pointer'}} onClick={handleClose} > <CloseIcon  /></div>
        </div>
        <DialogContent sx={{backgroundColor:'#191919',overflow:'hidden', width:'80vh',justifyContent:'center',display:"flex"}}>
          
           <Stack> 
            <DialogActions>
                <div style={{display:'flex',alignItems:'center',justifyContent:'center',border:"1px solid#ffffff",borderRadius:"2px"}}>
                <div  ><Button size='medium'  style={{color:'black',background:'rgb(18, 218, 168)',width:"30vh",margin:'2px'}}>Login</Button></div>
                <div  ><hr style={{rotate:"90deg",width:'60%'}}/>
                    <span style={{color:'white',border:"1px solid#ffffff",borderRadius:"5px",fontSize:10,padding:2}} >OR</span>
                    <hr style={{rotate:"90deg",width:'60%'}}/></div>
                <div ><Button onClick={handleCreate} onMouseEnter={handleEnter} onMouseLeave={handleLeave}  size='medium' style={{background:buttonbackground,color:textcolor,width:'30vh',margin:'2px'}}>Create Account</Button></div>
                </div>
            </DialogActions>
            <DialogContentText style={{justifyContent:'center',display:'flex'}} >
                <form style={{width:'95%',flexDirection:'column'}}>
                    <div style={{display:'flex',justifyContent:'center',}} >
                    <p style={{color:'white'}}>Please enter your Email ID or Phone number</p>
                    </div>
                    <div style={{alignItems:'center',display:'flex',width:'100%',height:"35%",justifyContent:'center',border:"1px solid#ffffff",borderRadius:"2px"}}>
                        <input  onKeyDown={(e) => {
                                if (e.key === "Enter")
                                    onContinue()
                                }}
                                onChange={(e)=>setMobileNumber(e.target.value)}   placeholder='Enter your Email ID or phone number' type='text' style={{fontSize:'18px',outline:'none',backgroundColor:'#191919',color:'white',height:'100%',width:'98%',paddingInline:'2px',border:'none'}} />
                      </div>

                      <div style={{display:'flex',justifyContent:'center',marginBottom:'20px',color:'white',fontSize:13}} >
                        <p>Keep me signed in</p>
                        </div>
                        
                    </form>
                   
            </DialogContentText>
            <DialogActions>
                <div style={{flexDirection:'column',display:'flex',alignItems:'center',justifyContent:'center',width:'100%'}}>
                <div>
                    <p style={{color:'white',fontSize:"13px"}} >By continuing you agree to our Terms of Use & Privacy Policy</p>
                </div>
                <div style={{width:'100%'}}>
                <Button onClick={onContinue} style={{background:"rgb(18, 218, 168)",borderRadius:'10px',width:"100%",color:'black',padding:15,fontSize:10,fontWeight:'bold'}}>Continue</Button>
                </div>
                </div>
            </DialogActions>
            </Stack>
            
       </DialogContent>
      
       
        
      </Dialog>
     
  )
}
