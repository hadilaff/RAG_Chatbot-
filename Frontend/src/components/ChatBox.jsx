import { useState } from 'react';
import axios from 'axios'; // Install axios if you haven't already
import Button from '../mini/Button';
import logoISI from '../assets/logoISI.png';

const ChatBox = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');

    const handleSend = async () => {
        if (input.trim()) {
            // Add the user's message to the chat box
            setMessages([...messages, { text: input, sender: 'user' }]);
            const userInput = input;
            setInput('');

            try {
                // Send the user's message to the backend
                const response = await axios.post('http://localhost:3000/chat', {
                    message: userInput
                });

                // Extract and add the backend's response to the chat box
                const responseMessages = response.data.messages;
                if (Array.isArray(responseMessages)) {
                    setMessages(prevMessages => [
                        ...prevMessages,
                        ...responseMessages.map((msg) => ({
                            text: msg.text,
                            sender: 'bot'
                        }))
                    ]);
                }
            } catch (error) {
                console.error('Error communicating with the backend:', error);
                setMessages(prevMessages => [
                    ...prevMessages,
                    { text: 'Failed to get a response. Please try again later.', sender: 'bot' }
                ]);
            }
        }
    };

    return (
        <div className="outer-div flex justify-center items-center h-screen bg-lightBlue">
            <div style={{ width: '61vw' }} className='bg-lightBlue rounded-xl h-5/6 w-9/12 absolute bottom-5'>
                <div className="chat-container flex flex-col justify-between rounded-xl bg-transparent h-full w-full">
                    <div className="messages overflow-y-auto flex-grow flex flex-col">
                        {messages.map((msg, index) => (
                            <div
                                key={index}
                                className={`message p-3 m-2 rounded-xl ${msg.sender === 'user' ? 'bg-white text-black self-end' : 'bg-white text-black self-start'}`}
                            >
                                {msg.text}
                            </div>
                        ))}
                    </div>
                    <div className="flex items-center w-full mt-2 mb-0">
                        <input
                            type="text"
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Type your message..."
                            className="flex-grow border border-gray-300 rounded-xl p-2"
                        />
                        <Button
                            text={"send"}
                            onClick={handleSend}
                            className={"px-4 py-2 rounded-xl text-white font-bold bg-blue hover:scale-105"}
                        ></Button>
                    </div>
                </div>
            </div>
            <div>
                <img src={logoISI} alt='logoISI' className="absolute top-0 left-0 w-40 h-25" />
            </div>
        </div>
    );
};

export default ChatBox;
