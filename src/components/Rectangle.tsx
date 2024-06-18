import React, { useState } from 'react';
import MessageList from './MessageList';
import MessageInput from './MessageInput';
import { InputType } from 'zlib';                                   //libreria inutile
import { Messaggio } from './types';
import ChatGPT from './MessageChatGPT';
import { colorePrincipale } from './Sidebar';

const Rectangle: React.FC = () => {
  const [message, setMessage] = useState<string>('');
  const [messageArray, setMessageArray] = useState<Messaggio[]>([]);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => { 
    setMessage(e.target.value);
  };

  const handleSendMessage = async() => {
    if (message.trim()) {
      let inArray: Messaggio = { text: message, sender: true };
      setMessageArray((state) => [...state, inArray]);
      let x : Messaggio|null = await ChatGPT(message)
      if(x != null)
        setMessageArray((state) => [...state, x])
      
      setMessage('');
    }
  };
  
  return (
    <div className="chat-container flex-1 h-screen p-4 bg-white">
      <div className="chat-box">
        <h1 className="chat-header">Chat</h1>
        <p className="chat-subheader">Lista Messaggi.</p>
        <MessageList 
          messages={messageArray} 
        />
        <MessageInput 
          message={message}
          handleInputChange={handleInputChange}
          handleSendMessage={handleSendMessage}
        />
        <i className={"fas fa-comment-alt absolute top-4 right-4 text-"+cambiaColore(colorePrincipale)+"-500"}></i>
      </div>
    </div>
  );
};
function cambiaColore(n:number):string{
  let coloreSelezionato:string=""
  switch(n)
  {
    case 1: coloreSelezionato="red"; break;
    case 2: coloreSelezionato="green"; break;
    case 3: coloreSelezionato="purple"; break;
    case 4: coloreSelezionato="yellow"; break;
    default: coloreSelezionato="blue"; break;
  }
  return coloreSelezionato
}
export default Rectangle;
