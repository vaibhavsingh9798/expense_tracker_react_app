import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const VerifyEmail = () =>{
    const API = 'AIzaSyDe422vlAnqibSzAxFe3D3N7eFp2hQxxbg'
    let URL = `https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${API}`

    const navigate = useNavigate()
    const token = JSON.parse(localStorage.getItem('token'))
  
     const handleVerifyEmail = async (e) =>{
         e.preventDefault();
        let payload = {
            idToken:token,
            requestType:'VERIFY_EMAIL'
        }

        try{
         let response = await fetch(`${URL}`,{
            method:'POST',
            body: JSON.stringify(payload),
            headers: {'Content-Type': 'application/json'}
         })
         console.log('res',response)
         if(response.ok){
           navigate('/profile')
         }
        }catch(err){
            console.error(err);
        }
     }
    return(
       
            <div className="flex flex-col justify-center items-center h-screen">
                <div className="text-2xl text-gray-500 font-extrabold "> Verify User Email </div>
                <div className="mt-7">
                <button className="text-xl font-mediu rounded-md border-2 border-blue-500 p-3 bg-blue-500 text-white" onClick={handleVerifyEmail}>Verify</button>
                </div>
            </div>
    )
}

export default VerifyEmail;