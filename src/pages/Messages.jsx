import React from 'react'
import Iconbar from '../components/Iconbar'
import ChatCondense from '../components/ChatCondense'
const Messages = () => {
  return (
    <div className='flex flex-row'>
      <Iconbar/>
      <ChatCondense/>
    </div>
  )
}

export default Messages