import React, { useState,useEffect } from 'react';
import { Form, Input, Modal, Button ,Alert,Space} from "antd";
import axios from "axios"
import { showAlert } from "./Alert";

const ModalDemo = ({ visible, onCancel, onConfirm,sendDataToParent }) => {
    const [form] = Form.useForm()

    const handleOk = () => {
   
    form.submit()
    onCancel()
  };

  const handleCancel = () => {
    onCancel()
  };

const onFinish = async (value) => {
    //e.preventDefault();
      const response = await fetch(`http://diaspark.supportchatbot:5002/chatbot_option/chatbot_option/add_prospect_enquiry?name=${value.name}&company_name=${value.cname}&phone_no=${value.p_no}&email=${value.email}&message=${value.message}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        sendDataToParent(data)
        if (data.result === 'success') {
          showAlert.success(data.message);
  
        } else {
          showAlert.error(data.message)
        }
      }
    
    
  };

  return (
    <Modal
    title={<img src="https://www.luxare.com/static/media/logo.73b907d42e58413b55af893af16718e2.svg" alt="title image"
             
             />}
      visible={visible}
      onCancel={handleCancel}
      onOk={handleOk}
        style={{ textAlign:'center',color:'#1d5242',maxHeight:'300px',maxwidth:'300px',height:'100%',width:'40%'}}
        footer={[
         
          <Button key="submit" type="primary"  
          onClick={handleOk} 
          style={{ marginLeft:"auto",marginRight:"auto",display:"block", backgroundColor:'#1d5242'}}
          >Send
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
                >   <h3 style={{paddingBottom:'5px' ,color:'#1d5242'}}>
                  BRINGING POSSIBILITIES TO REALITY: REQUEST A PRODUCT DEMO
                </h3>
                    <Form.Item
                        className="my-4"
                        label="Name"
                        name="name"
                        maxwidth='300px'
                        rules={[{ required: true, message: 'Please enter your name' }]}
                        labelCol={{span:8}}
                   
                    >
                        <Input id="name"/>
                       
                    </Form.Item>
                    <Form.Item
                        className="my-4"
                        label="Company Name"
                        name="cname"
                        rules={[{ required: true, message: 'Please enter your company name' }]}
                        labelCol={{span:8}}
                      
                    >
                        <Input id="cname"/>
                       
                    </Form.Item>
                    <Form.Item
                        className="my-4"
                        label="Phone No"
                        name="pnumber"
                        rules={[{ required: true, message: 'Please enter your phone number' }]}
                        labelCol={{span:8}}
                   
                    >
                        <Input id="pnumber"/>
                       
                    </Form.Item>
                    <Form.Item
                        className="my-4"
                        label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please enter your email' }]}
                        labelCol={{span:8}}
                      
                    >
                        <Input id="email"/>
                       
                    </Form.Item>
                    <Form.Item
                        className="my-4"
                        label="Message"
                        name="message"
                        rules={[{ required: true, message: 'Please enter your message' }]}
                        labelCol={{span:8}}
                   
                    >
                        <Input id="message"/>
                       
                    </Form.Item>
                    

                </Form>
    </Modal>
  );
};

export default ModalDemo;
