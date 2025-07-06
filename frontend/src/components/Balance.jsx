import axios from "axios";
import { useState , useEffect } from "react";

export const Balance = () => {
    const [balance, setBalance] = useState(0);
    useEffect(()=>{
        const fetchBalance = async()=>{
            try{
                const response = await axios.get(import.meta.env.VITE_BALANCE_URL,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }

                }).then((response) => {
                    setBalance(response.data.balance);
                });
                // Assuming the response contains a balance field
            }
            catch(e){
                console.error("Error fetching balance:", e);
            }
        }
        fetchBalance();
    },[balance])
    return <div className="flex">
        <div className="font-bold text-lg">
            {balance > 0 ? "Your Balance" : "No Balance"}
        </div>
        <div className="font-semibold ml-4 text-lg">
            Rs {balance}
        </div>
    </div>
}