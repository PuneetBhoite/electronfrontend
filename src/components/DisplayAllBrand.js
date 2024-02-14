import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { ServerURL, getData } from "../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';





//Page style//

var useStyles=makeStyles({
  reportMain:{ 
      width:"100%",
      height:"100%",
      display:"flex",
      justifyContent:"center",
},

reportBox:{
  width:800,
  height:"Auto",
    background:'#b7b5bf',
    margin:15,
    padding:10,
    borderRadius:10,


    

},

Center:{display:"flex",
  justifyContent:"center",
  alignItems:"center",

},

Box:{
  width:500,
  height:"Auto",
    
    margin:15,
    padding:20,
    borderRadius:10,


    

},

Center2:{display:"flex",
    justifyContent:"center",
    alignItems:"center",
}}
)

//Page style//

export default function DisplayAllBrand(){
  var classes=useStyles()
  const useStyle=useStyles()
  var navigate=useNavigate()
  const [statusBtn,setStatusBtn]=useState(false)
  const[brandName,setBrandName]=useState('')
  const[categoryId,setCategoryId]=useState('')
  const [logo,setLogo]=useState({bytes:"",filename:""})
  const[categoryList,setCategoryList]=useState([])
  const [tempPicture,setTempPicture]=useState('')
  const [brandId,setBrandId]=useState('')
 

///////////////////////////////////////////////// COPIED CATEGORY FORM///////////////////////////////////////////////////////////////////////////////////////

//OPEN-CLOSE DIALOG BTN//
const [open,setOpen]=useState(false)
const handleOpen=(rowData)=>
{setOpen(true)
  setBrandId(rowData.brandid)
  setBrandName(rowData.brandname)
  setCategoryId(rowData.categoryid)
  setLogo({filename:`${ServerURL}/images/${rowData.logo}`,bytes:''})
  setTempPicture(`${ServerURL}/images/${rowData.logo}`)

}
const handleClose=()=>{
  setOpen(false)
}
//OPEN-CLOSE DIALOG BTN//

//HANDLE IMAGE//

const handleImage=(event)=>{setStatusBtn(true)
  setLogo({bytes:event.target.files[0] , 
                                     filename:URL.createObjectURL(event.target.files[0]) })}
//HANDLE IMAGE//
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
//IMAGE SAVE-CANCEL//
const SaveCancelBtn=()=>{
  return(
    <div  >
      <Button  variant="contained" onClick={handleEditPicture}  > Save</Button>
      &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
      <Button  variant="contained" onClick={handleCancel}> Cancel</Button>
    </div>
  )
}
//IMAGE SAVE-CANCEL//

//HANDLE IMAGE CANCEL//
const handleCancel=()=>{
  setStatusBtn(false)
  setLogo({filename:tempPicture,bytes:""})
  
}
//HANDLE IMAGE CANCEL//
 //VALIDATION//
 const validation=()=>{
  var error=false
  if(brandName.length==0){
      error=true
      handleError("Input brand name","brandName")
  }

  if (logo.filename.length==0)
  {
      error=true
      handleError("Select brand logo","logo")
  }
  return error
}
//VALIDATION//
 //HANDLE ERROR//
 const [errors,setErrors]=useState({})
  
 const handleError=(error,label)=>{
    setErrors((prev)=>({...prev,[label]:error}))
 }
 //HANDLE ERROR//
//EDIT PICTURE//
const handleEditPicture=async()=>{
  setStatusBtn(false)
    var error=validation()
    if(error==false){

   var formData=new FormData()
    formData.append("brandid",brandId)
    formData.append("logo",logo.bytes)
    var response=await postData("brand/edit_brand_logo",formData)
    if (response.status){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'logo updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          fetchAllBrand()
    }
   
    else{
        Swal.fire({
            position: 'center',
            icon: 'failed',
            title: 'brand not submitted',
            showConfirmButton: false,
            timer: 1500
          })
    }
}


}
//EDIT PICTURE//

//HANDLE SUBMIT//
const handleSubmit=async()=>{
  var error=validation()
  if(error==false){

 var body={brandname:brandName ,brandid:brandId,categoryid:categoryId}
  
  var response=await postData("brand/edit_brand_data",body)
  if (response.status){
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Brand updated successfully',
          showConfirmButton: false,
          timer: 1500
        })
        fetchAllBrand()
  }
  else{
      Swal.fire({
          position: 'center',
          icon: 'failed',
          title: 'Brand not submitted',
          showConfirmButton: false,
          timer: 1500
        })
  }
}


}
//HANDLE SUBMIT//
const brandForm=()=>{
  return(

    

  
  <div className={useStyle.Main}>
  <div className={useStyle.Box}>
   <Grid container  spacing={3} >
       
       <Grid item xs={12}>
           <TextField  value={brandName}
            onFocus={()=>handleError('','brandName')} error={errors.brandName} helperText={errors.brandName}
           onChange={(event)=>setBrandName(event.target.value)} fullWidth label="brand Name"/>
         

       </Grid>

       <Grid item xs={12} className={useStyle.Center}>
       <Button component="label" ><input onChange={handleImage}  hidden type="file" accept="images/*" multiple/>
            
          
          
       <Avatar src={logo.filename} variant="rounded" style={{width:200, height:200}}>
 
</Avatar>
</Button>

       </Grid>
       <Grid item xs={12} ><center>
       {statusBtn?<SaveCancelBtn/>:<></>}
       </center>
      
       </Grid>




       <Grid item xs={12}>
       <FormControl fullWidth >
       <InputLabel >Select Category</InputLabel>
       <Select
          
        value={categoryId}
        
         label="Select Category"
       onChange={(event)=>setCategoryId(event.target.value)}
       > {
           fillAllCategory()
       }
      
       </Select>
      
     </FormControl>

       </Grid>
       



       
   </Grid>

  </div>
  </div>
)

 
}





///////////////////////////////////////////////// COPIED CATEGORY FORM///////////////////////////////////////////////////////////////////////////////////////



//DISPLAY DIALOG//
const showBrandDialog=()=>{
  return(
   <Dialog open={open} >


    <DialogTitle>
      Update Brand
    </DialogTitle>
    <DialogContent>
      {brandForm()}
    </DialogContent>
    <DialogActions>
      <Button onClick={handleSubmit}  >
       Edit Data 
      </Button>
      <Button onClick={handleClose}>
        Close
      </Button>
    </DialogActions>

   </Dialog>
  )
}
//DISPLAY DIALOG//



//HANDLE DELETE//
const handleDelete=(rowData)=>{
  

  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!'
  }).then(async(result) => {
    if (result.isConfirmed) {
      var body=await postData("brand/delete_brand",{brandid:rowData.brandid})
      if(body.status){
      Swal.fire(
        'Deleted!',
        'Your category has been deleted.',
        'success'
      )
      fetchAllBrand()
    }}
    else{
    Swal.fire(
      'Failed',
      'Operation Failed',
      'error'
    )}
  })
}
//HANDLE DELETE//

//BRAND FETCH//
const[brand,setBrand]=useState([])
const fetchAllBrand=async()=>{
  var response=await getData('brand/display_all_brand')
  setBrand(response.data)
}
useEffect (function(){
  fetchAllBrand()
},[])
 //BRAND FETCH//


//BRANDS DISPLAY TABLE//
function displayBrand(){
   
  return (
    <MaterialTable
      title="Brands List"
      columns={[
        { title: 'Brand id', field: 'brandid' },
        { title: 'Category', field: 'categoryname' },
        { title: 'Brand Name', field: 'brandname' },
        { title: 'Logo', render:(rowData)=><img src={`${ServerURL}/images/${rowData.logo}`} width={100}/> },
        
      ]}
      data={brand}        
      actions={[
        {
          icon: 'edit',

          tooltip: 'Edit Brand',
          onClick: (event, rowData) => handleOpen(rowData)
        },
        {
          icon: 'delete',

          tooltip: 'Delete Brand',
          onClick: (event, rowData) => handleDelete(rowData)
        }
        ,
        {
          icon: 'add',

          tooltip: 'Add New Brand',
          isFreeAction:true,
          onClick: (event) => navigate("/dashboard/brand")
        }
      ]}
    />
  )
    }
//BRANDS DISPLAY TABLE//

 
return(
  <div className={classes.reportMain}>
    <div className={classes.reportBox}>
    {displayBrand()}
    {showBrandDialog()}
   
    </div>
  </div>
)


}