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


export default function Product(){
    const useStyle=useStyles()
    const[categoryId,setCategoryId]=useState('')
    const[brandId,setBrandId]=useState('')
    const[categoryList,setCategoryList]=useState([])
    const[brandList,setBrandList]=useState([])
    const[productName,setProductName]=useState('')
    const [picture,setPicture]=useState({bytes:"",filename:""})
    const handlePicture=(event)=>{setPicture({bytes:event.target.files[0] , 
        filename:URL.createObjectURL(event.target.files[0]) })}

//ErrorHandle//
const [errors,setErrors]=useState({})
const handleError=(error,label)=>{
setErrors((prev)=>({...prev,[label]:error}))
}//ErrorHandle//
//Validation//
const validation=()=>{
var error=false
if(productName.length==0){
error=true
handleError("Input Product name","productName")
}
if(categoryId.length==0){
    error=true
    handleError("Input category name","categoryId")
    }
    
if(brandId.length==0){
        error=true
        handleError("Input Brand name","brandId")
        }

if (picture.filename.length==0)
{
error=true
handleError("Select brand image","picture")
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
formData.append('productname',productName)
formData.append('picture',picture.bytes)
formData.append('categoryid',categoryId)
formData.append('brandid',brandId)

var response=await postData('product/submit_product',formData)
if(response.status)
{
Swal.fire({
icon: 'success',
title: 'Product',
text: response.message,
toast:true
})
}
else
{
Swal.fire({
icon: 'error',
title: 'Product',
text: response.message,
toast:true
})
}

handleReset()
}


}
//SubmitHandle//
//Reset Handle//
const handleReset =()=>{
setProductName('')
setPicture({bytes:'',filename:''})
setCategoryId('')
setBrandId('')


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

//Category Change to fill brand//
const handleCategoryChange=(event)=>{
    setCategoryId(event.target.value)
    fetchBrandsByCategory(event.target.value)
}

const fetchBrandsByCategory=async(cid)=>{
    var result=await postData("product/fetch_brands_by_category",{categoryid:cid})
    setBrandList(result.data)
}
//Category Change to fill brand//

//Brand DD filling//
const fillBrands=()=>{
    return brandList.map((item)=>{
        return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
    })

  }
//Brand DD filling//



//Form//
    return(
        
   <div className={useStyle.Main}>
   <div className={useStyle.Box}>
    <Grid container  spacing={3} >
        <Grid item xs={12}>
        <Heading image={categoryicon} caption="New Product" link="/displayallproducts" />
        </Grid>

        <Grid item xs={12}>
        <FormControl fullWidth >
        <InputLabel >Select Category</InputLabel>
        <Select
           onFocus={()=>handleError('','categoryId')} error={errors.categoryId}
         value={categoryId}
         
          label="Select Category"
        onChange={handleCategoryChange}
        > {
            fillAllCategory()
        }
       
        </Select>
        <FormHelperText><div style={{color:"red"}}>{errors.categoryId}</div></FormHelperText>
      </FormControl>

        </Grid>

        

        <Grid item xs={12}>
        <FormControl fullWidth >
        <InputLabel >Select Brand</InputLabel>
        <Select
           onFocus={()=>handleError('','brandId')} error={errors.brandId}
         value={brandId}
         
          label="Select Brand"
        onChange={(event)=>setBrandId(event.target.value)}
        > {
            fillBrands()
        }
       
        </Select>
        <FormHelperText><div style={{color:"red"}}>{errors.brandId}</div></FormHelperText>
      </FormControl>

        </Grid>
        
        <Grid item xs={12}>
            <TextField  value={productName}
            onFocus={()=>handleError('','productName')} error={errors.productName} helperText={errors.productName}
            onChange={(event)=>setProductName(event.target.value)} fullWidth label="Product Name"/>
          
 
        </Grid>

        <Grid item xs={6} className={useStyle.Center}>
           
        <Avatar src={picture.filename} variant="rounded" style={{width:200, height:200}}>
  
</Avatar>
        </Grid>





        <Grid item xs={6} className={useStyle.Center2} >
            <Button component="label"
           
            variant="contained"
            onFocus={()=>handleError('',"picture")}
            
            >
                <input onChange={handlePicture}  hidden type="file" accept="images/*" multiple/>
          Product picture

            </Button>
          
           
        

        </Grid>
        <Grid item xs={12}> <center><div style={{color:"red"}}> {errors.picture}</div></center></Grid>


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