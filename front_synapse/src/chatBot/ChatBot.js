import { useState, useRef, useEffect } from 'react';
import { GoogleGenerativeAI } from "@google/generative-ai";
import chatbotLogo from "../assets/perfil.png";
import './chatBot.css';


const API_KEY = "AIzaSyDc_rQT3kOXYymk7MuFEGglD8HwW7566Ug";

function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { text: "Hola, soy Synapse AI. ¿En qué puedo ayudarte con tu hogar?", sender: "bot" }
  ]);

  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  
  // Referencia para auto-scroll al final del chat
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

const handleSendMessage = async () => {
  if (!input.trim()) return;

  const userMessage = { text: input, sender: "user" };
  setMessages((prev) => [...prev, userMessage]);
  setInput("");
  setIsLoading(true);

  try {
    // Intentamos con la versión v1beta y el modelo 1.5-pro que es más robusto ante errores 404
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: input }]
          }],
        }),
      }
    );

    const data = await response.json();

    if (data.error) {
      throw new Error(data.error.message);
    }

    if (!data.candidates || data.candidates.length === 0) {
      throw new Error("La IA no devolvió ninguna respuesta. Revisa tu cuota en Google AI Studio.");
    }

    const botText = data.candidates[0].content.parts[0].text;
    setMessages((prev) => [...prev, { text: botText, sender: "bot" }]);
  } catch (error) {
    console.error("Error detallado:", error);
    setMessages((prev) => [
      ...prev,
      { text: "Error de configuración: " + error.message, sender: "bot" },
    ]);
  } finally {
    setIsLoading(false);
  }
};

  return (
    <>
      {/* VENTANA DEL CHAT*/}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Asistente Synapse</span>
            <button onClick={() => setIsOpen(false)}>✕</button>
          </div>
          
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.sender}`}>
                {msg.text}
              </div>
            ))}
            {isLoading && <div className="message bot">Escribiendo...</div>}
            <div ref={messagesEndRef} />
          </div>

          <div className="chat-input-area">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Escribe tu duda..."
            />
            <button onClick={handleSendMessage}>Enviar</button>
          </div>
        </div>
      )}

      {/* BOTÓN FLOTANTE */}
      <div className="btn-chatBot" onClick={() => setIsOpen(!isOpen)}>
        <img src={chatbotLogo} alt="Chatbot" />
      </div>
    </>
  );
}

export default ChatBot;