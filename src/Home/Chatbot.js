import React, { useState } from 'react';
import axios from 'axios';
import { supabase } from '../supabaseClient';
import styles from '../Style/chatbot.module.css';

function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([{ text: "Hi! How can I help you today?", sender: "bot" }]);
  const [userInput, setUserInput] = useState('');

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const handleInputChange = (e) => {
    setUserInput(e.target.value);
  };

  const handleSendMessage = async () => {
    if (userInput.trim()) {
      setMessages([...messages, { text: userInput, sender: "user" }]);
      
      const userMessage = userInput.toLowerCase();
      setUserInput(''); // Clear input field
  
      // Define the custom keyword mappings for food types
      const keywordMapping = {
        coffee: "Desserts",
        cake: "Desserts",
        chicken: "Fast Food",
        fries: "Fast Food",
        burger: "Fast Food",
        sushi: "Japanese",
        taco: "Mexican",
      };
  
      // Check if the question is general (non-food-related) by looking for an exact match in the `CHATBOT` table
      const { data: chatbotData, error: chatbotError } = await supabase
        .from('CHATBOT')
        .select('answer')
        .ilike('question', `%${userMessage}%`)
        .single();
  
      if (!chatbotError && chatbotData) {
        // If there's a match in the CHATBOT table, use that response
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: chatbotData.answer, sender: "bot" },
        ]);
        return;
      }
  
      // If no direct match, check for food keywords
      let foodType = null;
      Object.keys(keywordMapping).forEach((keyword) => {
        if (userMessage.includes(keyword)) {
          foodType = keywordMapping[keyword];
        }
      });
  
      if (foodType) {
        // If a match is found in keyword mapping, fetch from Supabase
        const { data, error } = await supabase
          .from('FOOD_PLACES')
          .select('food_place_name')
          .eq('food_place_type', foodType);
  
        if (error) {
          console.error("Error fetching food places from Supabase:", error);
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: "I'm having trouble finding recommendations right now. Please try again later.", sender: "bot" },
          ]);
        } else if (data.length > 0) {
          const placeNames = data.map((place) => place.food_place_name).join(", ");
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `Here are some places for ${foodType} that might interest you: ${placeNames}`, sender: "bot" },
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: `I'm sorry, I couldn't find any places that serve ${foodType}.`, sender: "bot" },
          ]);
        }
      } else {
        // If no keyword match, fallback to OpenAI
        const openAIResponse = await fetchOpenAIResponse(userMessage);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: openAIResponse, sender: "bot" },
        ]);
      }
    }
  };
  
 

  // Function to call OpenAI's API
  const fetchOpenAIResponse = async (userMessage) => {
  try {
    const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
    const response = await axios.post(
      'https://api.openai.com/v1/chat/completions',
      {
        model: "gpt-3.5-turbo",
        messages: [
          { role: "system", content: "You are an assistant that categorizes food requests into general types like 'Fast Food', 'Desserts', 'Mexican', and 'Japanese' based on keywords." },
          { role: "user", content: userMessage }
        ],
        max_tokens: 50,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${apiKey}`,
        },
      }
    );

    // Get the response from OpenAI
    const openAIResponse = response.data.choices[0].message.content.trim();
    return openAIResponse;
  } catch (error) {
    console.error("Error fetching response from OpenAI:", error);
    return "I'm having trouble understanding that request. Please try again.";
  }
};

  

  return (
    <div className={styles.chatbotContainer}>
      {/* Chat Bubble */}
      <div className={styles.chatBubble} onClick={toggleChat}>
        💬
      </div>

      {/* Chat Area */}
      {isOpen && (
        <div className={styles.chatArea}>
          <div className={styles.chatHeader}>
            <h3>Chat with us</h3>
            <button onClick={toggleChat} className={styles.closeButton}>✖</button>
          </div>
          <div className={styles.chatMessages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={msg.sender === "bot" ? styles.botMessage : styles.userMessage}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className={styles.chatInputContainer}>
            <input
              type="text"
              placeholder="Type your message..."
              className={styles.chatInput}
              value={userInput}
              onChange={handleInputChange}
              onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
            />
            <button className={styles.sendButton} onClick={handleSendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chatbot;
