import axios from "axios";
const ServerURL="http://localhost:5000"
const postData=async(url,body)=>{
    try{
        var response=await axios.post(`${ServerURL}/${url}`,body)
        var data=response.data
        return data
    }
    catch(e){
        return null
    }
}
const getData=async(url)=>{
    try{
        var response=await axios.get(`${ServerURL}/${url}`)
        var data=response.data
        return data
    }
    catch(e){
        return null
    }
    }



export{ServerURL,postData,getData}