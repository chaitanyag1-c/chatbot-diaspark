import React, { useState,useEffect } from 'react';
import {  Box, TextField, Button,  } from '@mui/material';
import { useStateWithCallbackLazy } from 'use-state-with-callback';
import axios from 'axios';


const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useStateWithCallbackLazy('');
  useEffect(() => {
    const intialMsg = `I am Diaspark Support ChatBot. I would be more than happy to help you `
    setMessages((prevMessages) => [...prevMessages,{ text: intialMsg, type: 'bot',subtype: 'text' },])

    setMessages((prevMessages) => [...prevMessages,{ text: 'Here are some things i can help you with', type: 'bot',subtype: 'text' },])

    setMessages((prevMessages) => [...prevMessages,{ text: 'Support Enquiry', type: 'bot',subtype:'option' },])
    setMessages((prevMessages) => [...prevMessages,{ text: 'Track Support Enquiry', type: 'bot',subtype:'option' },])
    setMessages((prevMessages) => [...prevMessages,{ text: 'Product Demo', type: 'bot',subtype:'option' },])
  }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const sendRequest = () =>{
    axios.get(`http://diaspark.supportchatbot:5002/sales/sales/test`)
    .then(res => {
      const persons = res.data;
      console.log(persons)
      setMessages((prevMessages) => [...prevMessages,{ text: persons[0].name, type: 'bot' },]);
    }) 
  }
  const getStaticResponse = (input) =>{
    if (input.includes('Hi') || input.includes('Hello'))
    {
      return 'Howdy How may i Help you?'
    }
    else if (input.includes('How are you') )
    {
      return 'I feel good helping you.'
    }
    else
    {
      return `Sorry ,I can't Understand`
    }
   }
  const handleSubmit = () => {
    //setMessages([...messages, { text: input, type: 'user' }]);
    console.log(input)
    setMessages((prevMessages) => [...prevMessages,{ text: input, type: 'user',subtype: 'text' },]);
    


    if (input === 'api')
    {
      sendRequest()

    }
    else{
      const bot_response = getStaticResponse(input)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: bot_response, type: 'bot' ,subtype: 'text'},
        ]);
      }, 500,()=>{setInput('')});
      
  }
   
  
  };
  const handleOptionButtonClick = (event)=>{
    const value = event.target.innerText
    console.log(value)
    setInput(value,() => {
      handleSubmit();
   })
    //handleSubmit
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
                backgroundColor: message.type === 'user' ? '#1d5242' : '#b77c3c',
                color: message.type === 'user' ? 'white' : 'white',
                maxWidth: '70%',
              }}
            >
              {message.subtype === 'text' ?

              message.text
              :
              <button style={{backgroundColor:'#1d5242',color:'white',borderRadius:'10px',cursor:'pointer'}} onClick={handleOptionButtonClick}> {message.text} </button>
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
      </Box>
    </div>
  );
};

export default Chatbot;