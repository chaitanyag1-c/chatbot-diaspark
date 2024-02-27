import React, { useState,useEffect } from 'react';
import {  Box, TextField, Button,  } from '@mui/material';
import axios from 'axios';
import './chatbot.css' 

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [options, setOptions] = useState([]);
  const [selectedOption, setSelectedOption] = useState([]);

  useEffect(() => {
    const fetchOptions = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data = await response.json();
       // console.log(option[0].name)

        setOptions(data);
      } catch (error) {
        console.error('Error fetching options:', error);
      }
    };

    fetchOptions();
  }, []); 

  
  const handleButtonClick = (data) => {
    setSelectedOption(data); 
  
   // const botResponse = `You selected: ${data.name}`;

    // Update messages state to include user message and bot response
    setMessages((prevMessages) => [
      ...prevMessages,
      { text: data.name, type: 'user' }, // User message
     // { text: botResponse, type: 'bot' }, // Bot response
    ]);
  };

  // useEffect(() => {
  //   const intialMsg = `I am Diaspark Support ChatBot. I would be more than happy to help you `
  //   setMessages((prevMessages) => [...prevMessages,{ text: intialMsg, type: 'bot' },]);
  // }, []);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };
  const sendRequest = () =>{
    axios.get(`http://diaspark.supportchatbot:5002/sales/sales/test`)
    .then(res => {
      const persons = res.data;
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
    setMessages((prevMessages) => [...prevMessages,{ text: input, type: 'user' },]);
    
    console.log(input)

    if (input === 'api')
    {
      sendRequest()

    }
    else{
      const bot_response = getStaticResponse(input)
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: bot_response, type: 'bot' },
        ]);
      }, 500,setInput(''));
      
  }
   
  
  };

  const handleKeyDown =(event)=>
  {
    if(event.key === 'Enter'){
      console.log('enter press here! ')
      handleSubmit()
    }
  }
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
        <div
              style={{
                padding: '8px',
                marginBottom: '8px',
                borderRadius: '8px',
                backgroundColor:   '#b77c3c',
                color:  'white',
                maxWidth: '40%',
              }}
            >
          I am Diaspark Support ChatBot. I would be more than happy to help you
          </div>
          <div>
      <div    style={{
                padding: '8px',
                marginBottom: '8px',
                borderRadius: '8px',
                backgroundColor:   '#b77c3c',
                color:  'white',
                maxWidth: '40%',
              }}>
          
           
            {options.map((option, index) => (
           <button 
           key={index}
           value={option}
           onClick={() => handleButtonClick(option)}
           className={selectedOption === option ? 'active-button' : ''}
           >{option.name}</button>
          ))}
 
        </div>
{/* 
        {selectedOption && (
          <div style={{ marginTop: '10px' }}>
           {selectedOption.id}
           {selectedOption.name}
          </div>
        )} */}
  
      </div>

          {/* <div
              style={{
                padding: '8px',
                marginBottom: '8px',
                borderRadius: '8px',
                backgroundColor:   '#b77c3c',
                color:  'white',
                maxWidth: '40%',
              }}
            >
            <ul style={{listStyleType: 'none',margin:'10px'}}>
          <li><Button style={{color:'white',background:'#1d5242'}}>Request </Button></li>
          <li><Button style={{color:'white',background:'#1d5242'}} >Send </Button></li>
          </ul>
          </div> */}
       
        {messages.map((message, index) => (
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
              {message.text}
            </div>
          </div>
        ))}
        
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