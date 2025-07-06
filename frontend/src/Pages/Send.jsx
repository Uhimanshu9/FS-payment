import { useState } from "react"
import { useParams  , useNavigate} from "react-router-dom";
import axios from "axios";


export const Send = () => {
  const { id } = useParams();
  const { name } = useParams();
  const navigate = useNavigate();



  const [amount, setAmount] = useState('')

  const amountChange = (e) => {
    setAmount(e.target.value)
  }
  const handleClick = async () => {
    try {
    
      const tranfer = await axios.post(import.meta.env.VITE_TRANSFER,
        {

          toUserId: id,
          amount: Number(amount)
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`
          }
        }


      )
      console.log('Transfer successful:', tranfer.data);
      navigate('/dashboard'); // Redirect to the dashboard after successful transfer
    }
    catch (error) {
      console.error('Transfer failed:', error.response?.data || error.message);
    }
  }

  return <div className="flex justify-center h-screen bg-gray-100">
    <div className="h-full flex flex-col justify-center">
      <div
        className="border h-min text-card-foreground max-w-md p-4 space-y-8 w-96 bg-white shadow-lg rounded-lg"
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h2 className="text-3xl font-bold text-center">Send Money to {name}</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-green-500 flex items-center justify-center">
              <span className="text-2xl text-white">{name[0].toUpperCase()}</span>
            </div>
            <h3 className="text-2xl font-semibold">{name.toUpperCase()}</h3>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                htmlFor="amount"
              >
                Amount (in Rs)
              </label>
              <input
                type="number"
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                id="amount"
                placeholder="Enter amount"
                value={amount}
                onChange={amountChange}
              />
            </div>
            <button className="justify-center rounded-md text-sm font-medium ring-offset-background transition-colors h-10 px-4 py-2 w-full bg-green-500 text-white"
              onClick={handleClick}>
              Initiate Transfer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
}