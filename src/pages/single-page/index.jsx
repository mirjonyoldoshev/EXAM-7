import React, { useEffect, useState } from 'react'
import http from '../../config/index'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'


function index() {
  const [data, setData] = useState({})
  const navigate = useNavigate()

  async function getUser(){
    const response = await http.get(`/api/users/${localStorage.getItem('user_id')}`)
    setData(response?.data?.data)
  }


  useEffect(() => {
    getUser()
  }, [])
  
  return (
    <>
      <Button onClick={() => navigate('/dashboard')}>
        GO BACK
      </Button>
       <div className='w-[200px] shadow-2xl p-[30px] rounded-lg relative h-[260px] mx-auto mt-[20px] '>
                <img className='h-[12 0px] w-full rounded-lg' src={data?.avatar} alt="Avatar" />
                <h2 className='text-center text-[20px] font-[500]'>{data?.first_name} {data?.last_name}</h2>
                <h3 className='text-center text-[14px] font-[400]'>{data?.email}</h3>
       </div>
    </>
  )
}

export default index