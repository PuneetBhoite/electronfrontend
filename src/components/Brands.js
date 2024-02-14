import { Grid,TextField,Button,Avatar,FormControl,InputLabel,Select,MenuItem } from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { getData, postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import Heading from "./projectComponents/Heading";
import categoryicon from "../../src/assets/category.png"
import FormHelperText from '@mui/material/FormHelperText';




//Page Style//
var useStyles=makeStyles({
    Main:{ 
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"center",
},

Box:{
    width:500,
    height:"Auto",
      background:'#b7b5bf',
      margin:15,
      padding:20,
      borderRadius:10,


      

},

Center:{display:"flex",
    justifyContent:"center",
    alignItems:"center",

}
,

Center2:{display:"flex",
    justifyContent:"center",
    alignItems:"center",
   

}
})
//Page Style//


export default function Brand(){
    const useStyle=useStyles()
    const[categoryId,setCategoryId]=useState('')
    const[categoryList,setCategoryList]=useState([])
    const[brandName,setBrandName]=useState('')
    const [logo,setLogo]=useState({bytes:"",filename:""})
    const handleImage=(event)=>{setLogo({bytes:event.target.files[0] , 
        filename:URL.createObjectURL(event.target.files[0]) })}

//ErrorHandle//
const [errors,setErrors]=useState({})
const handleError=(error,label)=>{
setErrors((prev)=>({...prev,[label]:error}))
}//ErrorHandle//
//Validation//
const validation=()=>{
var error=false
if(brandName.length==0){
error=true
handleError("Input brand name","brandName")
}
if(categoryId.length==0){
    error=true
    handleError("Input category name","categoryId")
    }

if (logo.filename.length==0)
{
error=true
handleError("Select brand image","logo")
}

return error
}
//Validation//
//SubmitHandle//
const handleSubmit=async()=>{

var error=validation()  
console.log(errors)

if(error==false)
{
var formData=new FormData()
formData.append('brandname',brandName)
formData.append('logo',logo.bytes)
formData.append('categoryid',categoryId)
var response=await postData('brand/submit_brand',formData)
if(response.status)
{
Swal.fire({
icon: 'success',
title: 'Brand',
text: response.message,
toast:true
})
}
else
{
Swal.fire({
icon: 'error',
title: 'Brand',
text: response.message,
toast:true
})
}


}
}
//SubmitHandle//
//Reset Handle//
const handleReset =()=>{
setBrandName('')
setLogo({bytes:'',filename:''})
setCategoryId('')


}
//Reset Handle//
//Fetch Category//
const fetchAllCategory=async()=>{
    var result=await getData('category/display_all_category')
    setCategoryList(result.data)
}
useEffect(function(){
    fetchAllCategory()
},[])
//Fetch Category//
//Filling Category in DD//

const fillAllCategory=()=>{
    return categoryList.map((item)=>{
        return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
    })

  }
//Filling Category in DD//





//Form//
    return(
        
   <div className={useStyle.Main}>
   <div className={useStyle.Box}>
    <Grid container  spacing={3} >
        <Grid item xs={12}>
        <Heading image={categoryicon} caption="New brand" link="/dashboard/displayallbrand" />
        </Grid>
        <Grid item xs={12}>
            <TextField  value={brandName}
            onFocus={()=>handleError('','brandName')} error={errors.brandName} helperText={errors.brandName}
            onChange={(event)=>setBrandName(event.target.value)} fullWidth label="brand Name"/>
          
 
        </Grid>

        <Grid item xs={6} className={useStyle.Center}>
           
        <Avatar src={logo.filename} variant="rounded" style={{width:200, height:200}}>
  
</Avatar>
        </Grid>





        <Grid item xs={6} className={useStyle.Center2} >
            <Button component="label"
           
            variant="contained"
            onFocus={()=>handleError('',"logo")}
            
            >
                <input onChange={handleImage}  hidden type="file" accept="images/*" multiple/>
               Brand logo

            </Button>
          
           
        

        </Grid>

    <Grid item xs={12}> <center><div style={{color:"red"}}> {errors.logo}</div></center></Grid>

        <Grid item xs={12}>
        <FormControl fullWidth >
        <InputLabel >Select Category</InputLabel>
        <Select
           onFocus={()=>handleError('','categoryId')} error={errors.categoryId}
         value={categoryId}
         
          label="Select Category"
        onChange={(event)=>setCategoryId(event.target.value)}
        > {
            fillAllCategory()
        }
       
        </Select>
        <FormHelperText><div style={{color:"red"}}>{errors.categoryId}</div></FormHelperText>
      </FormControl>

        </Grid>
        

        <Grid item xs={6}>
            <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            >Submit

            </Button>

        </Grid>
        <Grid item xs={6}>
            <Button
            onClick={handleReset}
            fullWidth
            variant="contained"
            >Reset

            </Button>

        </Grid>



        
    </Grid>

   </div>
   </div>
)

//Form//

    










}