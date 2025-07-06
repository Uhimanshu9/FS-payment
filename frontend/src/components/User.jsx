import { useState } from "react"
import { Button } from "./Button"
import { useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom" ;


function User({user}) {
  
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/send/${user._id}/${user.firstName}`);
        console.log(`Send money to ${user.firstName} ${user.lastName}`);
    }

    return <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName?.[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-full">
                <div>
                    {user.firstName || "Unknown"} {user.lastName || "User"}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button  onClick={handleClick} label={"Send Money"} />
        </div>
    </div>
}

export const Users = () => {
    const [users, setUsers] = useState([]);
    const [filter , setFilter] = useState("");

    useEffect(() => {
      const fetchUsers = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_GET_USER_URL}?filter=${filter}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem('token')}`
            }
          });
          setUsers(response.data.user);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
      
      fetchUsers();
     
      
    }, [filter]);
    //  console.log("Fetching users with filter:", filter);
      console.log("useEffect called user:", users);



    return <>
        <div className="font-bold mt-6 text-lg">
            Users
        </div>
        <div className="my-2">
            <input type="text" onChange={(e) => setFilter(e.target.value)} placeholder="Search users..." className="w-full px-2 py-1 border rounded border-slate-200"></input>
        </div>
        <div>
            {users.map(user => <User key={user._id} user={user} />)}
        </div>
    </>
}

