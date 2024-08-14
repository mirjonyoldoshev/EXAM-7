import React, { useEffect, useState } from 'react'
import http from '../../config/index.js'
import {Modal} from '../../components/ui'
import { Button, Pagination, Space, Spin, Tag } from 'antd'
import { toast, ToastContainer } from 'react-toastify'
import { Link } from 'react-router-dom'

function Home() {
  const [user, setUser] = useState([])
  const [total, setTotal] = useState([])
  const [page, setPage] = useState(1)
  const [load, setLoad] = useState(false)
  
  function handleChange(ev){
    setPage(ev)
  }

  async function handleDelete(id){
    const response = await http.delete(`https://reqres.in/api/users/${id}`)
    console.log(response);
    if(response.status == 204){
      toast.success('User deleted successfully', {autoClose: 1200})
      getAllUsers()
    }
  }
 
  async function getAllUsers(){
    setLoad(true)
    const response = await http.get(`/api/users?page=${page}`,)
    setUser(response?.data?.data)
    setTotal(response?.data)
    setTimeout(() => {
      setLoad(false)
    }, 400);
  }

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      render: (text) => <a>{text}</a>,
    },
    {
      title: 'Photo',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (text) => <img src={text} alt={text} style={{width: '50px'}} />,
    },
    {
      title: 'First Name',
      dataIndex: 'first_name',
      key: 'first_name',
    },
    {
      title: 'Last Name',
      dataIndex: 'last_name',
      key: 'last_name',
    },
    {
      title: 'Email',
      key: 'email',
      dataIndex: 'email',
      render: (text) => <a className='text-[blue]'>{text}</a>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <a className='text-[green]'>Invite {record.name}</a>
          <a className='text-[red]'>Delete</a>
        </Space>
      ),
    },
  ];

  useEffect(() => {
    getAllUsers()
  }, [page])

  return (
    <>
    <ToastContainer/>
      <div className='flex justify-end mb-4'>
        <Modal/>
      </div>
       {
        load ? <Spin className='mt-[200px]' tip="Loading" size="large">Loading</Spin>
        :
        <div className='flex gap-x-[300px] justify-center flex-wrap gap-y-[30px]'>
        {
          user?.map(e => {
            return (
              <div className='w-[200px] shadow-2xl p-[30px] rounded-lg relative h-[310px]'>
                <img className='h-[12 0px] w-full rounded-lg' src={e.avatar} alt="Avatar" />
                <h2 className='text-center text-[20px] font-[500]'>{e.first_name} {e.last_name}</h2>
                <h3 className='text-center text-[14px] font-[400]'>{e.email}</h3>
                <Link to={'singleuser'} onClick={() => localStorage.setItem('user_id', e.id)} className='block text-[#34ff8f] mt-[20px] text-center'>Wiev More</Link>
                <Button onClick={() => handleDelete(e.id)} type='primary' danger className='w-[100%] max-w-[150px] mt-[20px] absolute bottom-[10px] left-25'>Delete</Button>
              </div>
            )
          })
        }
     </div>
       }
      {
        load ? ''
        :
        <Pagination className='mt-[50px]' onChange={(e) => handleChange(e)} align="center" defaultCurrent={page} total={total?.total} defaultPageSize={6} />
      }
    </>
  )
}

export default Home