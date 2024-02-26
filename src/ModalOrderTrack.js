
// ModalComponent.js
import React, { useState,useEffect } from 'react';
import { Form, Input, Modal, Button ,Alert,Space ,Timeline} from "antd";
import axios from "axios"
import { showAlert } from "./Alert";

const ModalOrderTrack = ({ visible, onCancel, onConfirm ,orderPickFlag,orderEntryFlag,orderQcFlag,orderAcksendFlag,orderAccAppFlag }) => {
      const [form] = Form.useForm()
    useEffect(
      ()=>{
        console.log(orderPickFlag)
      },[orderPickFlag]
    )
    const handleOk = () => {
   
    onCancel()
  };

  const handleCancel = () => {
    onCancel()
  };

const onFinish = async (value) => {
    //e.preventDefault();
      const response = await fetch(`http://diaspark.supportchatbot:5002/login?login=${value.username}&password=${value.pwd}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
  
        if (data.result === 'success') {
          showAlert.success('Login successful');
  
        } else {
          showAlert.error(data.message)
        }
      }
    
    
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
          > Close
          </Button>
        ]}
    >
          <Timeline>
    <Timeline.Item color= {orderPickFlag == 'Y'? 'green':'blue' }  >Picked</Timeline.Item>
    <Timeline.Item color={orderEntryFlag == 'Y'? 'green':'blue' } >Order Entry</Timeline.Item>
    <Timeline.Item color={orderQcFlag == 'Y'? 'green':'blue' }>
    Quality Check
    </Timeline.Item>
    <Timeline.Item color ={orderAcksendFlag == 'green'? 'red':'blue' }>
      Acknowledgement send
    </Timeline.Item>
    <Timeline.Item color = {orderAccAppFlag == 'Y'? 'green':'blue' }>
      Accounting Approved 
    </Timeline.Item>
  </Timeline>

    </Modal>
  );
};

export default ModalOrderTrack;
