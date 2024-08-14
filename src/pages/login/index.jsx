import { Button, Form, Input } from 'antd'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import http from '../../config/index.js'

function Login() {
  const navigate = useNavigate()
  async function handleSubmit(value){
    const response = await http.post('/api/login', value)
    if(response?.status == 200){
      localStorage.setItem('token', response?.data?.token)
      toast.success('Login successful', {autoClose: 1200})
      setTimeout(() => {
        navigate('/dashboard')
      }, 1500);
    }
  }

  return (
    <div>
      <ToastContainer/>
      <div className=' w-[500px] mx-auto mt-[200px] shadow-xl p-[40px]'>
         <h2 className='text-center text-[30px] font-[600] mb-4'>Login</h2>
          <Form onFinish={handleSubmit}>
            <Form.Item hasFeedback name='email' rules={[{
              required: true,
              type: 'email',
              message: 'Please input your email!',
            }]}>
              <Input placeholder='Enter your name'/>
            </Form.Item>
            <Form.Item hasFeedback rules={[{
              required: true,
              message: 'Please input your password!',
            }]} name='password'>
              <Input.Password placeholder='Enter your password'/>
            </Form.Item>
            <Button htmlType='submit' type='primary' className='block mx-auto'>
              Submit
            </Button>
            <hr  className='mt-[20px] mb-[20px]'/>
            <Link to={'/register'} className='block text-center text-[blue]'>
              Register
            </Link>
          </Form>
      </div>
    </div>
  )
}

export default Login