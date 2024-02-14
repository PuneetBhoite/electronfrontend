import { Grid,TextField,Button,Avatar } from "@mui/material";
import { useState } from "react";
import { makeStyles } from "@mui/styles";
import { postData } from "../services/FetchNodeServices";
import Swal from "sweetalert2";
import Heading from "./projectComponents/Heading";
import categoryicon from "../../src/assets/category.png"




var useStyles=makeStyles({
    Main:{ 
        width:"100%",
        height:"100%",
        display:"flex",
        justifyContent:"center",
},

Box:{
    width:500,
    height:"30%",
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



export default function Adv(){
    const useStyle=useStyles()
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
            handleError("Input Adv Image","Image")
        }

        
        return error
     }


    const handleSubmit=async()=>{
  
  var error=validation()  
  console.log(errors)
 
  if(error==false)
  {
  var formData=new FormData()

 
    formData.append('image',image.bytes)

 
  var response=await postData('adv/submit_adv',formData)
  if(response.status)
  {
    Swal.fire({
      icon: 'success',
      title: 'Adv',
      text: response.message,
      toast:true
    })
  }
  else
  {
    Swal.fire({
      icon: 'error',
      title: 'Adv',
      text: response.message,
      toast:true
    })
  }


}
 }
 
 
 const handleReset =()=>{
  setImage({bytes:'',filename:''})
}

    







   


return(
   <div className={useStyle.Main}>
   <div className={useStyle.Box}>
    <Grid container  spacing={3} >
        <Grid item xs={12}>
            <Heading image={categoryicon} caption="Advertisement"  />

        </Grid>
       


        <Grid item xs={6} >
            <Button component="label"
            fullWidth
            variant="contained"
            onFocus={()=>handleError('',"image")}
            
            >
                <input onChange={handleImage}  hidden type="file" accept="images/*" multiple/>
               Adv Image

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