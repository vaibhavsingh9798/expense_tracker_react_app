import { useEffect, useState } from "react";


const Profile = () =>{
    const [isCompleteMode,setIsCompeleteMode] = useState(false)
    const [profileDetails,setProfileDetails] = useState({fullName:'',photoUrl:''})

    const API_KEY = 'AIzaSyDe422vlAnqibSzAxFe3D3N7eFp2hQxxbg'
    let UPDATE_URL = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`
    let GET_URL = `https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=${API_KEY}`

    const token = JSON.parse(localStorage.getItem('token'))

    const handleUpdate = async (e) =>{
         e.preventDefault();
         const payload = {
            idToken:token,
            displayName:profileDetails.fullName,
            photoUrl:profileDetails.photoUrl,
            deleteAttribute:[],
            returnSecureToken:false,
         }
          try{
            let response = await fetch(`${UPDATE_URL}`,{
                method:'POST',
                body: JSON.stringify(payload),
                headers: {'Content-Type': 'application/json'}
            })
             if(response.ok)
             alert('success')
          }catch(err){
            console.error(err)
          }
    }

    const  fetchProfile = async ()=>{
        try{
          let response = await fetch(`${GET_URL}`,{
            method:'POST',
            body:JSON.stringify({idToken:token}),
            headers:{'Content-Type':'application/json'}
          })
          if(response.ok){
            let data = await response.json()
            let {displayName,photoUrl} = data.users[0]
            setProfileDetails({fullName:displayName,photoUrl:photoUrl})
          }
        }catch(err){
            console.error(err)
        }
    }

    useEffect(()=>{
       fetchProfile()
    },[])

     const lander = () =>{
        return(
            <div>
            <div className="flex justify-between">
                 <div className="ml-4 italic">Welcome to Expense Tracker!!!</div>
                 <div className="mr-4 px-3 italic bg-stone-200 rounded-lg">Your profile is incomplete. <button className="text-blue-500" onClick={()=> setIsCompeleteMode(true)}> Complete now</button></div> 
            </div>  
              <div className="border-b border-gray-500 my-4"></div>
              </div>
        )
     } 

     const completeProfile = ()=>{
            return(
                <div>
                <div className="flex justify-between">
                     <div className="ml-4 italic">Winner never quite, Quitters never win.</div>
                     <div className="mr-4 px-3 italic bg-stone-200 rounded-lg w-96">Your profile is 64% completed.A complete Profile has higher chances of landing job. <button className="text-blue-500" onClick={()=> setIsCompeleteMode(true)}> Complete now</button></div>  
                </div> 
                <div className="border-b border-gray-500 my-2"></div>
                <div className="fixed right-1 w-2/3 mt-4">
                    <div className="flex justify-between ">
                        <div className="text-xl font-bold">Contact Details</div>
                        <div className="mr-14 p-1 text-red-500 border-2 border-red-500 rounded-md" onClick={() => setIsCompeleteMode(!isCompleteMode)}><button>Cancel</button></div>
                    </div>
                    <div className="mt-4 flex justify-evenly">
                        <div className="flex">
                         <img src='https://www.svgrepo.com/show/512317/github-142.svg' alt="logo" className="h-7 w-7 mr-3" />
                         <div className="font-mono font-semibold">
                         Full Name:
                        <input type="text" name='fullName' value={profileDetails.fullName} className="ml-2 px-12 border-3 bg-gray-100" onChange={(e) => setProfileDetails({...profileDetails,[e.target.name]:e.target.value})}/>
                        </div>
                        </div>
                          <div className="flex">
                         <img src='https://www.svgrepo.com/show/502714/internet.svg' alt="logo" className="h-7 w-7 mr-3" />
                         <div className="font-mono font-semibold">
                         Profile Photo URL:
                        <input type="text" name='photoUrl' value={profileDetails.photoUrl} className="ml-2 px-12 border-3 bg-gray-100" onChange={(e) => setProfileDetails({...profileDetails,[e.target.name]:e.target.value})} />
                        </div>
                        </div>
                    </div>
                    <button className="mt-6 p-1 text-white bg-red-400 rounded-md" onClick={handleUpdate}>Update</button>
                    <div className="border-b border-gray-500 my-4"></div>
                </div>
                </div> 
            )
     }

    return(
        <div>
          {!isCompleteMode && lander()}
          {isCompleteMode && completeProfile()}
        </div>
    )
}

export default Profile;