
import React, { useState, useRef, useEffect } from 'react';
import { Container, Box, TextField, Button, Typography } from '@mui/material';

function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const itemsEndRef = useRef(null);

  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    // Add user message
    setMessages((prevMessages) => [...prevMessages,{ text: inputText, isUser: true },]);
    setInputText('');

    // Simulate bot response (replace with actual bot logic)
    setTimeout(() => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: 'Bot response', isUser: false },
      ]);
    }, 500);
  };
  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  const scrollToBottom = () => {
    itemsEndRef.current?.scrollToBottom({ behavior: 'smooth' });
  };
  return (

    <div>
      <Box
        height={200}
        width={200}
        my={4}
        display="flex"
        alignItems="center"
        overflow="auto"
        
        
        sx={{ border: '2px solid grey' }}
      >
        <div>
          {messages.map((message, index) => (
            <div key={index} style={{ textAlign: message.isUser ? 'right' : 'left' }}>
              <span>{message.text}</span>
            </div>
          ))}
        </div>
      </Box>




      <div>

        <form onSubmit={handleFormSubmit}>
          <input
            type="text"
            value={inputText}
            onChange={handleInputChange}
            placeholder="Type a message..."
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>


  );
}

export default Chatbot;

