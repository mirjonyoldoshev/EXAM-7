import React, { useState } from "react";
import http from "../../../config";
import { Button, Form, Input, Modal } from "antd";
import { toast } from "react-toastify";

const App = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();  // Initialize the form instance

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields(); 
  };

  async function handleSubmit(value) {
    const response = await http.post('/api/users', value);
    if (response?.status === 201) {
      toast.success('User created successfully');
      form.resetFields(); 
      setIsModalOpen(false);
    } else {
      toast.error('Failed to create user');
      form.resetFields(); 
    }
  }

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Add Users
      </Button>
      <Modal
        footer={false}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form form={form} onFinish={handleSubmit}>
          <p>Enter user name</p>
          <Form.Item
            hasFeedback
            name="name"
            rules={[
              {
                required: true,
                message: "Please input user name!",
              },
            ]}
          >
            <Input placeholder="Enter user name" />
          </Form.Item>
          <p>Enter user job</p>
          <Form.Item
            name="job"
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input user job!",
              },
            ]}
          >
            <Input placeholder="Enter user job" />
          </Form.Item>
          <Button className="w-full" type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
    </>
  );
};

export default App;
