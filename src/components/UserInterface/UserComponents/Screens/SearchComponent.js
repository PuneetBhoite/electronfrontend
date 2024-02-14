import SearchIcon from '@mui/icons-material/Search';
import { TextField } from "@mui/material"
import InputAdornment from '@mui/material/InputAdornment';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {postData} from '../../../../services/FetchNodeServices'


export default function Search(props){
  const [text,setText]=useState('')
  var navigate=useNavigate()
  const fetchRecord=async()=>{
    var result=await postData('userinterface/product_filter',{text})
    return result.data
  }
  const handleSearch=()=>{
    fetchRecord().then((response)=>{
      navigate('/page',{state:{result:response}})
    })
  }

    return(
        <div style={{margin:"2px",marginLeft:'5%',marginRight:'5%'}} >
<TextField
 onChange={(e)=>setText(e.target.value)}
 fullWidth
 variant="standard" 
 placeholder='What do you need ?'
 InputProps={{
    disableUnderline: true,
    endAdornment: (
      <InputAdornment position="end">
        <SearchIcon onClick={handleSearch} />
      </InputAdornment>
    )}}
 />
 
        </div>
    )
}