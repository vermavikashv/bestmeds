

var axios = require('axios')
var ServerURL = "http://localhost:5000"

const getData=async(url)=>{
    try{
        var response= await fetch(`${ServerURL}/${url}`)// its your choice you want to use or not method ,mode ,headers in getData
        var result= await response.json()
        return result
     }
     catch(e){
         return null
     }

}

const postData=async(url,body)=>{
    
    try{
        var response= await fetch(`${ServerURL}/${url}`,{method:'POST',
      
        mode:'cors',
        headers:{"content-type":"application/json;charset=utf-8"},
        body: JSON.stringify(body),  // stringify is used for not data loose we send data one platform to another platform
    })// its your choice you want to use or not method ,mode ,headers in getData
        const result= await response.json()
        return result
    }
    catch(e){
        return null
    }
   }
const postImageData=async(url,formData)=>{
 try{
    var response= await axios.post(`${ServerURL}/${url}`,formData,{headers:{"content-type":"multipart/form-data"}})
    var result= await response.data
    return result
 }
 catch(e){
     return null
 }
}
export {postData,postImageData,getData,ServerURL}

//**********note***********//
// if we used axios.post then we also used formdata 
// we are use both fetch and axios.post and axios.get