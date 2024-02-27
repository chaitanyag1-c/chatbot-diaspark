
// ModalComponent.js
import React, { useState,useEffect } from 'react';
import { Form, Input, Modal, Button ,Alert,Space} from "antd";
import axios from "axios"
import { showAlert } from "./Alert";

const ModalChatbot = ({ visible, onCancel, onConfirm,sendDataToParent }) => {
    const [form] = Form.useForm()

    const handleOk = () => {
   
    form.submit()
    onCancel()
    //form.resetFields()
  };

  const handleCancel = () => {
    onCancel()
  };

const onFinish = async (value) => {
    //e.preventDefault();
      const response = await fetch(`http://chatbot.diaspark:5000/login?login=${value.username}&password=${value.pwd}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        sendDataToParent(data)
        if (data.result === 'success') {
          showAlert.success('Login successful');
  
        } else {
          showAlert.error(data.message)
        }
      }
    
      form.resetFields()
  };

  return (
    <Modal
    title={<img src="https://www.luxare.com/static/media/logo.73b907d42e58413b55af893af16718e2.svg" alt="title image"
             style={{maxHeight:'150px',maxWidth:'150px',height:'100%',width:'100%'}}/>}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
        style={{ textAlign:'center',color:'#1d5242',maxHeight:'300px',maxWidth:'300px',height:'100%',width:'40%'}}
        footer={[
         
          <Button key="submit" type="primary"  
          onClick={handleOk} 
          style={{ marginLeft:"auto",marginRight:"auto",display:"block", backgroundColor:'#1d5242'}}
          >Login
          </Button>
        ]}
    >
         <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    autoComplete="off"
                    mode="vertical"
                    className="scr-from"
                    onFinish={onFinish}
                >
                    <Form.Item
                        className="my-4"
                        label="username"
                        name="username"
                   
                    >
                        <Input id="name"/>
                       
                    </Form.Item>
                    <Form.Item
                        className="my-4"
                        label="Password"
                        name="pwd"
                        
                      
                    >
                        <Input.Password id="pwd"/>
                       
                    </Form.Item>

                </Form> 
    </Modal>
  );
};

export default ModalChatbot;
