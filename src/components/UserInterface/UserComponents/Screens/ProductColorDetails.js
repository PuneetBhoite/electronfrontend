import { ServerURL,getData,postData } from "../../../../services/FetchNodeServices";
import { useState,useEffect } from "react";
import { Button} from "@mui/material";


export default function ProductColorDetails(props){

    var product=props.product
    const [selectedID,setSelectedID]=useState(product.productdetailsid)
    const[details,setDetails]=useState([])
    const fetchDetails=async(id)=>{
        var result=await postData('userinterface/display_productdetails_by_id',{productdetailsid:id})
        props.setProduct(result.data[0])
        setSelectedID(result.data[0].productdetailsid)
        props.setRefresh(!props.refresh)
    
        
      }
    const fetchAllDetails=async()=>{
      var result=await postData('userinterface/display_all_productdetails_by_productid',{productid:product.productid})
      setDetails(result.data)
      setSelectedID(result.data[0].productdetailsid)
    }
    useEffect(function(){
        fetchAllDetails()
      },[])

      const showDetails=()=>{
        return details.map((item)=>{
            return(
                <div onClick={()=>fetchDetails(item.productdetailsid)}>
                    <Button size="small" variant="outlined" style={{borderColor:selectedID==item.productdetailsid?'#12daa8':'gray',color:'white'}}>
                        {`${item.color}`}
                    </Button>
                </div>
            )
        })
      }
    
      return(<div style={{display:'flex',gap:20}}>
        {showDetails()}
        </div>
      )

}