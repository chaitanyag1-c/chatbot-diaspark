import React, { useState,useEffect } from 'react';
import {  Box, TextField  } from '@mui/material';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import axios from 'axios';
import { Button, Modal, Form, Input, Radio } from "antd";
import  ModalChatbot  from "./Modal";
import  ModalOrderTrack  from "./ModalOrderTrack";
import ModalDemo from './ModalDemo'



const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useStateWithCallbackLazy('');
  const [options, setOptions] = useState([]);
  const [currentFeature,setCurrentFeature] = useState('')
  const [modalVisible, setModalVisible] = useState(false);
  const [modalOrderTrackVisible, setModalOrderTrackVisible] = useState(false);
  const [modalDemoVisible, setModalDemoVisible] = useState(false);

  const [orderpick, setorderpick] = useState(false);
  const [orderentry, setorderentry] = useState(false);
  const [orderqc, setorderqc] = useState(false);
  const [orderack, setorderack] = useState(false);
  const [orderacc, setorderacc] = useState(false);
  const [receivedLoginData, setReceivedLoginData] = useState(null);


  
  useEffect(() => {
    const intialMsg = `I am Diaspark Support ChatBot Hackie. I would be more than happy to help you `
    setMessages((prevMessages) => [...prevMessages,{ text: intialMsg, type: 'bot',subtype: 'text' },])

    setMessages((prevMessages) => [...prevMessages,{ text: 'Here are some things i can help you with', type: 'bot',subtype: 'text' },])

    const fetchOptions = async () => {
      try {
        const response = await fetch('http://diaspark.supportchatbot:5002/chatbot_option/chatbot_option/get_chatbot_options?option_type=intital_options');
        const data = await response.json();
       // console.log(option[0].name)

        setOptions(data);
        // options.map((option)=>{
        //   setMessages((prevMessages) => [...prevMessages,{ text: option.name, type: 'bot',subtype:'option', },])
        // }) 
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
    
  }, []);

  useEffect(() => {
    drawOptions()
    setOptions([])
 },[options]);

 const handleDataFromChild = (data) => {
  console.log('Data:', data);
if(data.result == 'success')
  {
    setReceivedLoginData(data);
        setMessages((prevMessages) => [...prevMessages,{ text: `Hi ${data.data.user.first_name}, Please enter your Order #`, type: 'bot' ,subtype: 'text'},]);
        setCurrentFeature('Cancel Order')
  }
};
 const drawOptions = () =>{
  options.map((option)=>{
    setMessages((prevMessages) => [...prevMessages,{ text: option.option_value, type: 'bot',subtype:'option', },])
  }) 
  
 }
 const handleCancelModal = () => {
  // Close the modal when Cancel is clicked
  setModalVisible(false);
};

const handleConfirmModal = () => {
  // Handle the logic when Confirm is clicked (e.g., cancel the order)
  setModalVisible(false);
};
const handleTrackCancelModal = () => {
  // Close the modal when Cancel is clicked
  setModalOrderTrackVisible(false);
};
const handleTrackConfirmModal = () => {
  // Handle the logic when Confirm is clicked (e.g., cancel the order)
  setModalOrderTrackVisible(false);
};
const handleDemoCancelModal = () => {
  // Close the modal when Cancel is clicked
  setModalDemoVisible(false);
};
const handleDemoConfirmModal = () => {
  // Handle the logic when Confirm is clicked (e.g., cancel the order)
  setModalDemoVisible(false);
};
  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const sendSupportRequest = () =>{
    axios.get(`http://diaspark.supportchatbot:5002/chatbot_option/chatbot_option/get_chatbot_options?option_type=support_enquiry`)
    .then(res => {
      const data =  res.data;
       setOptions(data);
       drawOptions()
    }) 
  }
  const getStaticBotResponse = (input) =>{
    if (input.includes('Hi') || input.includes('Hello'))
    {
      return 'Howdy How may i Help you?'
    }
    else if (input.includes('How are you') )
    {
      return 'I feel good helping you.'
    }
    else if (input.includes('Support Enquiry') )
    {
      
      
    }
    else
    {
      return `Sorry ,I can't Understand`
    }
   }
  const handleSubmit = () => {
    //setMessages([...messages, { text: input, type: 'user' }]);
    setMessages((prevMessages) => [...prevMessages,{ text: input, type: 'user',subtype: 'text' },]);
    getBotResponse(input)
  };

  const getBotResponse = (input) =>{
    if(currentFeature == '')
    {

          if (input === 'Support Enquiry')
          {
            sendSupportRequest()
          }
          else if (input === 'Schedule a Meeting')
          {
            const currentDate = new Date();
            const tommorowDate = new Date();
            const dayaftertommDate = new Date();
            tommorowDate.setDate(currentDate.getDate() + 1);
            dayaftertommDate.setDate(currentDate.getDate() + 2);
            setMessages((prevMessages) => [...prevMessages,{ text: 'Please select a preffered date.', type: 'bot',subtype:'text', },])
            setMessages((prevMessages) => [...prevMessages,{ text: currentDate.toDateString(), type: 'bot',subtype:'date', },])
            setMessages((prevMessages) => [...prevMessages,{ text: tommorowDate.toDateString(), type: 'bot',subtype:'date', },])
            setMessages((prevMessages) => [...prevMessages,{ text: dayaftertommDate.toDateString(), type: 'bot',subtype:'date', },])
            setCurrentFeature('Schedule a Meeting')
          }
          else if (input === 'Product Demo')
          {
            setModalDemoVisible(true);
            setMessages((prevMessages) => [...prevMessages,{ text: 'Please select the feature you want to understand', type: 'bot' ,subtype: 'text'},]);
            setMessages((prevMessages) => [...prevMessages,{ text: 'Criteria Working', type: 'bot' ,subtype: 'option'},]);
            setMessages((prevMessages) => [...prevMessages,{ text: 'Order Creation', type: 'bot' ,subtype: 'option'},]);
            setMessages((prevMessages) => [...prevMessages,{ text: 'Report', type: 'bot' ,subtype: 'option'},]);
            setMessages((prevMessages) => [...prevMessages,{ text: 'Generate auto order', type: 'bot' ,subtype: 'option'},]);
          }
          else if(input === 'Cancel Order')
          {
            //add modal code here
            setModalVisible(true);
          }
          else if(input === 'Order Tracking')
          {
            setModalVisible(true);
            setMessages((prevMessages) => [...prevMessages,{ text: 'Hi, Please enter your Order#', type: 'bot' ,subtype: 'text'},]);
            setCurrentFeature('Order Tracking')
            

          }
          else if(input === 'Track Support Enquiry')
          {
            setMessages((prevMessages) => [...prevMessages,{ text: 'Hi, Please enter your Ticket Number#', type: 'bot' ,subtype: 'text'},]);
            setCurrentFeature('Track Support Enquiry')
          }   
          else{
            const bot_response = getStaticBotResponse(input)
            setTimeout(() => {
              setMessages((prevMessages) => [
                ...prevMessages,
                { text: bot_response, type: 'bot' ,subtype: 'text'},
              ]);
            }, 500);
            setInput('')  
        }
    }
    else 
    {
      if (currentFeature == 'Track Support Enquiry')
      {
        sendTrackEnquiry(input)
      }
      else if(currentFeature == 'Schedule a Meeting')
      {
        setMessages((prevMessages) => [...prevMessages,{ text: 'Please select a preferred Time.', type: 'bot',subtype:'text', },])
        setMessages((prevMessages) => [...prevMessages,{ text: '5:00 PM - 6:00 PM', type: 'bot',subtype:'button', },])
        setMessages((prevMessages) => [...prevMessages,{ text: '6:00 PM - 7:00 PM', type: 'bot',subtype:'button', },])
        setMessages((prevMessages) => [...prevMessages,{ text: '7:00 PM - 8:00 PM', type: 'bot',subtype:'button', },])
        setCurrentFeature('Schedule a Meeting1')
      }
      else if(currentFeature == 'Schedule a Meeting1')
      {
        setMessages((prevMessages) => [...prevMessages,{ text: `Thank you. We have sent an email regarding the same.Our representatives Chaitanya Galande and Virendra Jadhav will assist with you at ${input} in the meeting.`, type: 'bot',subtype:'text', },])
        setCurrentFeature('')
      }
      else if(currentFeature == 'Order Tracking')
      {
        sendOrderTrackingEnquiry(input)
      }
      else if(currentFeature == 'Cancel Order')
      {
        sendOrderCancelEnquiry(input)
      }
    }  
  }
  const sendOrderCancelEnquiry = () =>{
    const trans_no = input
    axios.get(`http://chatbot.diaspark:5000/order_track?trans_no=${trans_no}`)
    .then(res => {
      const data =  res.data;
      if(data.result == 'error') 
      {
        setMessages((prevMessages) => [...prevMessages,{ text: data.message+' Please check your order number again', type: 'bot' ,subtype: 'text',errormsg:true},]);
      }
      else
      {
        
          //handle code here
        setModalOrderTrackVisible(true);
        setCurrentFeature('')
        
      }
      
    }) 
    setInput('')
    setCurrentFeature('')
  }
  const sendOrderTrackingEnquiry = ()=>{
    const trans_no = input
    axios.get(`http://chatbot.diaspark:5000/order_track?trans_no=${trans_no}`)
    .then(res => {
      const data =  res.data;
      if(data.result == 'error') 
      {
        setMessages((prevMessages) => [...prevMessages,{ text: data.message+' Please check your order number again', type: 'bot' ,subtype: 'text',errormsg:true},]);
      }
      else
      {
        
        setorderpick(data.data.orders[0].orderpickstatus_flag)
        setorderentry(data.data.orders[0].orderentrycomplete_flag)
        setorderqc(data.data.orders[0].orderqcstatus_flag)
        setorderack(data.data.orders[0].orderacksent_flag)
        setorderacc(data.data.orders[0].accountreviewed_flag)
        setModalOrderTrackVisible(true);
        setCurrentFeature('')
        
      }
      
    }) 
    setInput('')
    setCurrentFeature('')
  }
  const sendTrackEnquiry = (input) =>{
    const ticket_value = input
    axios.get(`http://chatbot.diaspark:5000/track_support_enquiries?trans_no=${ticket_value}`)
    .then(res => {
      const data =  res.data;
      if(data.result == 'error') 
      {
        setMessages((prevMessages) => [...prevMessages,{ text: data.message+' Plesae check your ticket number again', type: 'bot' ,subtype: 'text',errormsg:true},]);
      }
      else
      {
        const bot_response_text = `Your ticket number ${data.data.enquiry.trans_no} has been ${data.data.enquiry.acknowledgement} and will be completed by ${data.data.enquiry.estimation_completion_date}`

        setMessages((prevMessages) => [...prevMessages,{ text: bot_response_text, type: 'bot' ,subtype: 'text'},]);
        setMessages((prevMessages) => [...prevMessages,{ text: 'Thank You:)', type: 'bot' ,subtype: 'text'},]);
      }
      
    }) 
    setInput('')
    setCurrentFeature('')
  }
  const handleOptionButtonClick = (msg)=>{
    
  
    setInput(msg);
  
    setMessages((prevMessages) => [...prevMessages,{ text: msg, type: 'user',subtype: 'text' },])
    setInput('')
    getBotResponse(msg)
  }

  const handleKeyDown =(event)=>
  {
    if(event.key === 'Enter'){
      console.log('enter press here! ')
      handleSubmit()
    }
  }
  const listMessages= messages.map((message,index)=>{
            return(
            <div
              key={index}
              style={{
              marginBottom: '8px',
              display: 'flex',
              justifyContent: message.type === 'user' ? 'flex-end' : 'flex-start',
            }}
            >
            <div
              style={{
                padding: '8px',
                borderRadius: '8px',
                backgroundColor: message.type === 'user'  ? '#1d5242' : '#b77c3c',
                color: message.type === 'user' ? 'white' : 'white',
                maxWidth: '70%',
              }}
            >
              { 
             message.subtype === 'text'?  
             message.text 
             :
            
            <Button style={{backgroundColor:'#1d5242',color:'white',borderRadius:'20px',cursor:'pointer'}} onClick={()=>handleOptionButtonClick(message.text)}> {message.text} </Button> 
  }
            </div>
          </div>
            )
        })
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100vh',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: `url('https://assets-global.website-files.com/5a9ee6416e90d20001b20038/6289efcc9a52f65ff46e8400_white-gradient.png')`,
        backgroundSize: 'cover' 
      }}
    >



      <div
        style={{
          flexGrow: 1,
          overflowY: 'auto',
          padding: '16px',
        }}
      >
        <div
         style={{
          marginBottom: '8px',
          display: 'flex',
          justifyContent:  'center',
        }}
        >
        <img src="https://www.luxare.com/static/media/logo.73b907d42e58413b55af893af16718e2.svg" alt="LogoImg" title="Logo" />
        </div>
      
    
       {listMessages}
       
      </div>
      <Box
        style={{
          display: 'flex',
          padding: '8px',
          borderTop: '1px solid #f0f0f0',
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'white',
          zIndex: 1000,
        }}
      >
        <TextField
          style={{ flexGrow: 1, marginRight: '8px' }}
          variant="outlined"
          placeholder="Type your message..."
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
        />
        <Button variant="contained" color="primary" onClick={handleSubmit} style={{background: '#1d5242'}}>
          Send
        </Button>
        <ModalChatbot visible={modalVisible} onCancel={handleCancelModal} onConfirm={handleConfirmModal} 
        sendDataToParent={handleDataFromChild}
        />
        
        <ModalOrderTrack visible={modalOrderTrackVisible} onCancel={handleTrackCancelModal} onConfirm={handleTrackConfirmModal} 
        orderPickFlag = {orderpick}
        orderEntryFlag = {orderentry}
        orderQcFlag ={orderqc}
        orderAcksendFlag ={orderack}
        orderAccAppFlag ={orderacc}
        />
        <ModalDemo
        visible={modalDemoVisible} onCancel={handleDemoCancelModal} onConfirm={handleDemoConfirmModal} 
        />
      </Box>
    </div>
  );
};

export default Chatbot;