import React from 'react'
import { Heading } from '../components/Heading'
import { SubHeading } from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const signupUrl = import.meta.env.VITE_SIGNUP_URL;


export const Signup = () => {
    const [First_name, setFirst_name] = React.useState('')
    const [Last_name, setLast_name] = React.useState('')
    const [username, setUsername] = React.useState('')
    const [password, setPassword] = React.useState('')


    const FnameChange = (e) => {
        setFirst_name(e.target.value)
    }
    const LnameChange = (e) => {
        setLast_name(e.target.value)
    }
    const usernameChange = (e) => {
        setUsername(e.target.value)
    }
    const passwordChange = (e) => {
        setPassword(e.target.value)
    }
    const navigate = useNavigate();

    const handleSignup = async () => {
        try {
            const response = await axios.post(signupUrl, {
                firstName: First_name,
                lastName: Last_name,
                username: username,
                password: password
            });
            navigate("/signin");
            // Handle success (e.g., navigate to another page, show a message)
            console.log('Signup successful:', response.data);
        } catch (error) {
            // Handle error (e.g., show error message)
            console.error('Signup failed:', error.response?.data || error.message);
        }
    };


    return (
        <>
            <div className="bg-white h-screen flex justify-center items-center">
                <div className="flex flex-col justify-center bg-white rounded-lg shadow-lg w-80 p-4">
                    <Heading label={`Sign up`} />
                    <SubHeading label={`Create your Paytm account to get started.`} />
                    <InputBox placeholder='Doe' label={`First Name`} type={`text`} value={First_name} onChange={FnameChange} />
                    <InputBox placeholder='Smith' label={`Last Name`} type={'text'} value={Last_name} onChange={LnameChange} />
                    <InputBox placeholder='Enter your username' label={`username`} type={'text'} value={username} onChange={usernameChange} />
                    <InputBox placeholder='Enter your password' label={`Password`} type={'password'} value={password} onChange={passwordChange} />
                    <div className="pt-4">
                        <Button label={"Sign up"} onClick={handleSignup} />
                    </div>
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
                </div>
            </div>
        </>
    )

}
