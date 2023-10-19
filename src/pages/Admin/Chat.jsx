import React from 'react'
import Chatlist from '../../components/admin/Chatlist'
import AdminChat from '../../components/admin/AdminChat'
import Navbar from '../../components/admin/Navbar'

function AdminChatBox() {
  return (
    <>
    <Navbar/>

    <div className='flex'>
        <AdminChat/>
    </div>
    </>
  )
}

export default AdminChatBox