import { useState,useEffect } from "react";
import MaterialTable from "@material-table/core";
import { ServerURL, getData } from "../services/FetchNodeServices";
import { makeStyles } from "@mui/styles";
import { Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { Grid,TextField,Button,Avatar } from "@mui/material";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";


//Page style//

var useStyles=makeStyles({
  reportMain:{ 
      width:"100%",
      height:"Auto",
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


    

}
})

//Page style//



export default function DisplayAllCategory(){
  var navigate=useNavigate()
  var classes=useStyles()

  ////////////////////////////////////////////////////////////COPIED CATEGORY FORM////////////////////////////////////////////////////////////////////////////
  const useStyle=useStyles()
  const [categoryId,setCategoryId]=useState('')
  const [categoryName,setCategoryName]=useState("")
  const [tempPicture,setTempPicture]=useState('')
  const [statusBtn,setStatusBtn]=useState(false)

  //HANDLE IMAGE//
  const [image,setImage]=useState({bytes:"",filename:""})
  const handleImage=(event)=>{setStatusBtn(true)
    setImage({bytes:event.target.files[0] , 
                                       filename:URL.createObjectURL(event.target.files[0]) })}
  //HANDLE IMAGE//


  //HANDLE ERROR//
   const [errors,setErrors]=useState({})
  
   const handleError=(error,label)=>{
      setErrors((prev)=>({...prev,[label]:error}))
   }
   //HANDLE ERROR//



   //VALIDATION//
   const validation=()=>{
      var error=false
      if(categoryName.length==0){
          error=true
          handleError("Input category name","categoryName")
      }

      if (image.filename.length==0)
      {
          error=true
          handleError("Select category image","image")
      }
      return error
   }
   //VALIDATION//



//HANDLE SUBMIT//
 const handleSubmit=async()=>{
      var error=validation()
      if(error==false){
 
     var body={categoryname:categoryName ,categoryid:categoryId}
      
      var response=await postData("category/edit_category_data",body)
      if (response.status){
          Swal.fire({
              position: 'center',
              icon: 'success',
              title: 'Category updated successfully',
              showConfirmButton: false,
              timer: 1500
            })
            fetchAllCategory()
      }
      else{
          Swal.fire({
              position: 'center',
              icon: 'failed',
              title: 'Category not submitted',
              showConfirmButton: false,
              timer: 1500
            })
      }
  }


}
//HANDLE SUBMIT//



//EDIT PICTURE//
const handleEditPicture=async()=>{
  setStatusBtn(false)
    var error=validation()
    if(error==false){

   var formData=new FormData()
    formData.append("categoryid",categoryId)
    formData.append("image",image.bytes)
    var response=await postData("category/edit_category_picture",formData)
    if (response.status){
        Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Image updated successfully',
            showConfirmButton: false,
            timer: 1500
          })
          fetchAllCategory()
    }
   
    else{
        Swal.fire({
            position: 'center',
            icon: 'failed',
            title: 'Category not submitted',
            showConfirmButton: false,
            timer: 1500
          })
    }
}


}
//EDIT PICTURE//



//HANDLE IMAGE CANCEL//
const handleCancel=()=>{
  setStatusBtn(false)
  setImage({filename:tempPicture,bytes:""})
  
}
//HANDLE IMAGE CANCEL//



//IMAGE SAVE-CANCEL//
const SaveCancelBtn=()=>{
  return(
    <div>
      <Button onClick={handleEditPicture} > Save</Button>
      <Button onClick={handleCancel}> Cancel</Button>
    </div>
  )
}
//IMAGE SAVE-CANCEL//



  //MAIN POPUP FORM//
const categoryForm=()=>{
  return(
    
   <div className={useStyle.Main}>
   <div className={useStyle.Box}>
    <Grid container  spacing={3} >


      
    <Grid item xs={12} style={{display:"flex",justifyContent:'right',alignItems:"center"}}    >
    {statusBtn?<SaveCancelBtn/>:<></>}
      <Button component="label" 
           
            
           onFocus={()=>handleError('',"image")}
           
           >
               <input onChange={handleImage}  hidden type="file" accept="images/*" multiple/>
               

          
          
       <Avatar src={image.filename} variant="square" sx={{width:100,height:100}} >
 
</Avatar> </Button>
       </Grid>

        <Grid item xs={12}>
            <TextField  value={categoryName}
            onFocus={()=>handleError('','categoryName')} error={errors.categoryName} helperText={errors.categoryName}
            onChange={(event)=>setCategoryName(event.target.value)} fullWidth label="category Name"/>

        </Grid>

        
   



        
    </Grid>

   </div>
   </div>
  )
}
//MAIN POPUP FORM//





 







///////////////////////////////////////////////// COPIED CATEGORY FORM///////////////////////////////////////////////////////////////////////////////////////


//OPEN-CLOSE DIALOG BTN//
  const [open,setOpen]=useState(false)
  const handleOpen=(rowData)=>
  {setOpen(true)
    setCategoryId(rowData.categoryid)
    setCategoryName(rowData.categoryname)
    setImage({filename:`${ServerURL}/images/${rowData.image}`,bytes:''})
    setTempPicture(`${ServerURL}/images/${rowData.image}`)
  
  }
  const handleClose=()=>{
    setOpen(false)
  }
  //OPEN-CLOSE DIALOG BTN//
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
      var body=await postData("category/delete_category",{'categoryid':rowData.categoryid})
      if(body.status){
      Swal.fire(
        'Deleted!',
        'Your category has been deleted.',
        'success'
      )
      fetchAllCategory()
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



//DISPLAY DIALOG//
  const showCategoryDialog=()=>{
    return(
     <Dialog open={open}>


      <DialogTitle>
        Update Category
      </DialogTitle>
      <DialogContent>
        {categoryForm()}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleSubmit}>
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



//CATEGORY FETCH//
  const[category,setCategory]=useState([])
  const fetchAllCategory=async()=>{
    var response=await getData('category/display_all_category')
    setCategory(response.data)
  }
  useEffect (function(){
    fetchAllCategory()
  },[])
  //CATEGORY FETCH//



  //CATEGORY DISPLAY TABLE//
 function displayCategory(){
   
        return (
          <MaterialTable
            title="Category List"
            columns={[
              { title: 'Categoryid', field: 'categoryid' },
              { title: 'Category Name', field: 'categoryname' },
              { title: 'image', render:(rowData)=><img src={`${ServerURL}/images/${rowData.image}`} width={100}/> },
              
            ]}
            data={category}        
            actions={[
              {
                icon: 'edit',

                tooltip: 'Edit Category',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',

                tooltip: 'Delete Category',
                onClick: (event, rowData) => handleDelete(rowData)
              }
              ,
              {
                icon: 'add',

                tooltip: 'Add Category',
                isFreeAction:true,
                onClick: (event) => navigate("/dashboard/category")
              }
            ]}
          />
        )
          }
  //CATEGORY DISPLAY TABLE//


  
return(
  <div className={classes.reportMain}>
    <div className={classes.reportBox}>
    {displayCategory()}
    {showCategoryDialog()}
    </div>
  </div>
)


}
