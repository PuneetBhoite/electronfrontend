import { Grid,TextField,Button,Avatar,FormControl,InputLabel,Select,MenuItem, } from "@mui/material";
import { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { getData, postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import Heading from "./projectComponents/Heading";
import categoryicon from "../../src/assets/category.png"
import FormHelperText from '@mui/material/FormHelperText';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel'
import FormLabel from '@mui/material/FormLabel';
import * as React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DropzoneArea } from 'material-ui-dropzone';




//Page Style//
var useStyles=makeStyles({
    Main:{ 
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"center",
},

Box:{
    width:800,
    height:"Auto",
      margin:15,
      padding:20,
      borderRadius:10,
      background:'#b7b5bf',


      

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


export default function ProductDetails(){


    const useStyle=useStyles()
    const[categoryId,setCategoryId]=useState('')
    const[brandId,setBrandId]=useState('')
    const[productId,setProductId]=useState('')
    const[categoryList,setCategoryList]=useState([])
    const[brandList,setBrandList]=useState([])
    const[productList,setProductList]=useState([])
    const[files,setFiles]=useState([])
    const[modelNo,setModelNo]=useState('')
    const[color,setColor]=useState('')
    const[stock,setStock]=useState('')
    const[price,setPrice]=useState('')
    const[status,setStatus]=useState('')
    const[hsn,setHsn]=useState('')
    const[offerPrice,setOfferPrice]=useState('')
    const [description, setDescription] = useState('');

        

//ErrorHandle//
const [errors,setErrors]=useState({})
const handleError=(error,label)=>{
setErrors((prev)=>({...prev,[label]:error}))
}//ErrorHandle//
//Validation//
const validation=()=>{
var error=false

if(categoryId.length==0){
    error=true
    handleError("Input category name","categoryId")
    }
    
if(brandId.length==0){
        error=true
        handleError("Input Brand name","brandId")
        }

if(productId.length==0){
            error=true
            handleError("Select Product name","productId")
            }       
if(modelNo.length==0){
                error=true
                handleError("Input Model number","modelNo")
                }
if(color.length==0){
                    error=true
                    handleError("Input color","color")
                    }
if(stock.length==0){
                        error=true
                        handleError("Input Stock","stock")
                        }

if(price.length==0){
                            error=true
                            handleError("Input Price","price")
                            }
 if(offerPrice.length==0){
                                error=true
                                handleError("Input Offer Price","offerPrice")
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
formData.append('productid',productId)
formData.append('categoryid',categoryId)
formData.append('brandid',brandId)
formData.append('modelno',modelNo)
formData.append('color',color)
formData.append('stock',stock)
formData.append('price',price)
formData.append('offerprice',offerPrice)
formData.append("status",status)
formData.append("hsn",hsn)
formData.append("description",description)
files.map((file,index)=>{
    formData.append('picture'+index, file)
})


var response=await postData('productdetail/submit_product_details',formData)
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

setCategoryId('')
setBrandId('')
setProductId('')
setModelNo('')
setColor('')
setStock('')
setPrice('')
setOfferPrice('')
setStatus('')
setHsn('')
setDescription('')



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



//Brand Change to fill product//
const handleBrandChange=(event)=>{
    setBrandId(event.target.value)
    fetchProductsByBrand(event.target.value)
}

const fetchProductsByBrand=async(bid)=>{
    var result=await postData("productdetail/fetch_products_by_brand",{brandid:bid,categoryid:categoryId})
    setProductList(result.data)
}
//Brand Change to fill product//

//Brand DD filling//
const fillProducts=()=>{
    return productList.map((item)=>{
        return <MenuItem value={item.productid}>{item.productname}</MenuItem>
    })

  }
//Brand DD filling//



//Form//
    return(
        
   <div className={useStyle.Main}>
   <div className={useStyle.Box}>
    <Grid container  spacing={3} >
        <Grid item xs={12}>
        <Heading image={categoryicon} caption="Product Details" link="/dashboard/displayallproductdetails" />
        </Grid>

        <Grid item xs={6}>
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

        

        <Grid item xs={6}>
        <FormControl fullWidth >
        <InputLabel >Select Brand</InputLabel>
        <Select
           onFocus={()=>handleError('','brandId')} error={errors.brandId}
         value={brandId}
         
          label="Select Brand"
        onChange={handleBrandChange}
        > {
            fillBrands()
        }
       
        </Select>
        <FormHelperText><div style={{color:"red"}}>{errors.brandId}</div></FormHelperText>
      </FormControl>

        </Grid>
        
        <Grid item xs={12}>
        <FormControl fullWidth >
        <InputLabel >Select Product</InputLabel>
        <Select
           onFocus={()=>handleError('','productId')} error={errors.productId}
         value={productId}
         
          label="Select Product"
        onChange={(event)=>setProductId(event.target.value)}
        > {
            fillProducts()
        }
       
        </Select>
        <FormHelperText><div style={{color:"red"}}>{errors.productId}</div></FormHelperText>
      </FormControl>
          
        </Grid>

        <Grid item xs={4}>
        <TextField  value={modelNo}
            onFocus={()=>handleError('','modelNo')} error={errors.modelNo} helperText={errors.modelNo}
            onChange={(event)=>setModelNo(event.target.value)} fullWidth label="Model No."/>

        </Grid>

        <Grid item xs={4}>
        <TextField  value={color}
            onFocus={()=>handleError('','color')} error={errors.color} helperText={errors.color}
            onChange={(event)=>setColor(event.target.value)} fullWidth label="Color"/>

        </Grid>

        <Grid item xs={4}>
        <TextField  value={stock}
            onFocus={()=>handleError('','stock')} error={errors.stock} helperText={errors.stock}
            onChange={(event)=>setStock(event.target.value)} fullWidth label="Stock"/>

        </Grid>


        <Grid item xs={6}>
        <TextField  value={price}
            onFocus={()=>handleError('','price')} error={errors.price} helperText={errors.price}
            onChange={(event)=>setPrice(event.target.value)} fullWidth label="Price"/>

        </Grid>


        <Grid item xs={6}>
        <TextField  value={offerPrice}
            onFocus={()=>handleError('','offerPrice')} error={errors.offerPrice} helperText={errors.offerPrice}
            onChange={(event)=>setOfferPrice(event.target.value)} fullWidth label="Offer Price"/>

        </Grid>


        <Grid item xs={6}>
        <FormControl fullWidth >
        <InputLabel >Status</InputLabel>
        <Select
           
         value={status}
          label="Status"
          onChange={(event)=>setStatus(event.target.value)} 

        > 

        <MenuItem value={'offer'}>Offer</MenuItem>
        <MenuItem value={'Deal of the day'}>Deal of the day</MenuItem>
        <MenuItem value={'Sale'}>Sale</MenuItem>
        <MenuItem value={'Highlights'}>Highlights</MenuItem>
        <MenuItem value={'Festive deals'}>Festive Deals</MenuItem>
        <MenuItem value={'discountinue'}>Discountinue</MenuItem>
       
        </Select>
      </FormControl>

        </Grid>

        <Grid item xs={6}>
        <TextField  value={hsn}
            onFocus={()=>handleError('','hsn')} error={errors.hsn} helperText={errors.hsn}
            onChange={(event)=>setHsn(event.target.value)} fullWidth label="HSN Code"/>



            
</Grid>

<Grid item xs={12}>
   <InputLabel>Enter Description</InputLabel>

<ReactQuill  theme="snow" value={description} onChange={setDescription} />
</Grid>












        <Grid item xs={12}  >
          
        <DropzoneArea
      
  acceptedFiles={['image/*']}
  dropzoneText={"Drag and drop an image here or click"}
  onChange={(files) => setFiles(files)}
  filesLimit={7}
  

  
/>



           





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