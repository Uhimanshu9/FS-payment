import React from 'react'
import {  InputBox } from './InputBox'


export const User = ({...props}) => {
  return (
    <div className="flex">
      <div className="font-bold text-lg">
        User
      </div>
      <InputBox {...props} />
      <div>
        {}
      </div>
    </div>
    
    
  )
}
