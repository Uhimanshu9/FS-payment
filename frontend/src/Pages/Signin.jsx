import React from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/Input'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
export const Signin = () => {
  const [username, setUsername] = React.useState('')
  const [password, setPassword] = React.useState('')

  const usernameChange = (e) => {
    setUsername(e.target.value)
  }
  const passwordChange = (e) => {
    setPassword(e.target.value)
  }

  const navigate = useNavigate();
  const handleClick = async () =>{
    try {
      const response = await axios.post(import.meta.env.VITE_SIGNIN_URL, {
        username: username,
        password: password
      });
      // Handle success (e.g., navigate to another page, show a message)
      console.log('Signin successful:', response.data);
      navigate("/send");
    } catch (error) {
      // Handle error (e.g., show error message)
      console.error('Signin failed:', error.response?.data || error.message);
    }
  }



  return (
    <>
      <div className="bg-white h-screen flex justify-center items-center">
        <div className="flex flex-col justify-center bg-white rounded-lg shadow-lg w-80 p-4">
          <Heading label={`Sign in`} />
          <SubHeading label={`Sign in to your Paytm account `} />
          <InputBox placeholder='Enter your username' label={`Username`} type={'text'} value={username} onChange={usernameChange} />
          <InputBox placeholder='Enter your password' label={`Password`} type={'password'} value={password}
            onChange={passwordChange} />
          <div className="pt-4">
            <Button label={"Sign in"} onClick={handleClick} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </>
  )
}
