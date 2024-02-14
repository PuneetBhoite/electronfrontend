import { Grid,TextField,Button,Avatar,FormControl,InputLabel,Select,MenuItem, } from "@mui/material";
import { useState,useEffect } from "react";
import { makeStyles } from "@mui/styles";
import Swal from "sweetalert2";
import Heading from "./projectComponents/Heading";
import categoryicon from "../../src/assets/category.png";
import { getData, postData } from "../services/FetchNodeServices";
import FormHelperText from '@mui/material/FormHelperText';


var useStyles=makeStyles({
    Main:{ 
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"center",
},

Box:{
    width:500,
    height:"45%",
      background:'#b7b5bf',
      margin:15,
      padding:20,
      borderRadius:10,


      

},

Center:{display:"flex",
    justifyContent:"center",
    alignItems:"center",

}
})



export default function CategoryWiseBanner(){
    const useStyle=useStyles()
    const[categoryList,setCategoryList]=useState([])
    const[brandList,setBrandList]=useState([])
    const[categoryId,setCategoryId]=useState('')
    const[brandId,setBrandId]=useState('')
    const [image,setImage]=useState({bytes:"",filename:""})
    const handleImage=(event)=>{setImage({bytes:event.target.files[0] , 
                                         filename:URL.createObjectURL(event.target.files[0]) })}

  

     const [errors,setErrors]=useState({})
     const handleError=(error,label)=>{
        setErrors((prev)=>({...prev,[label]:error}))
     }
     const validation=()=>{
        var error=false
        if(image.filename.length==0){
            error=true
            handleError("Input  Image","Image")
        }

        
        return error
     }


    const handleSubmit=async()=>{
  
  var error=validation()  
  console.log(errors)
 
  if(error==false)
  {
  var formData=new FormData()
  formData.append('categoryid',categoryId)
  formData.append('brandid',brandId)

 
    formData.append('image',image.bytes)

 
  var response=await postData('categorywisebanner/submit_categorywisebanner',formData)
  if(response.status)
  {
    Swal.fire({
      icon: 'success',
      title: 'Picture',
      text: response.message,
      toast:true
    })
  
  }
  else
  {
    Swal.fire({
      icon: 'error',
      title: 'Picture',
      text: response.message,
      toast:true
    })
  }


}
 }
 
 
 const handleReset =()=>{
  setImage({bytes:'',filename:''})
}

    
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
const handleBrandChange=(event)=>{
    setBrandId(event.target.value)
   
}







   


return(
   <div className={useStyle.Main}>
   <div className={useStyle.Box}>
    <Grid container  spacing={3} >
        <Grid item xs={12}>
            <Heading image={categoryicon} caption=" Category Wise Banner"  />

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






        <Grid item xs={6} >
            <Button component="label"
            fullWidth
            variant="contained"
            onFocus={()=>handleError('',"image")}
            
            >
                <input onChange={handleImage}  hidden type="file" accept="images/*" multiple/>
              Picture

            </Button>
            <div> {errors.image}</div>
           
        

        </Grid>
        <Grid item xs={6} className={useStyle.Center}>
           
        <Avatar src={image.filename} variant="rounded"  >
  
</Avatar>
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

}