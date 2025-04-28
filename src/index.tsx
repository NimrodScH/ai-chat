import React, { useState, useRef, useEffect } from 'react';
import './ChatWidget.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { motion, AnimatePresence } from 'framer-motion';
import { sendMessageToAI } from './http';

type PopChatProps = {
  contextData?: any;
  businessInfo?: string;
};

type Message = {
  role: 'user' | 'assistant';
  content: string;
};

export const PopChat: React.FC<PopChatProps> = ({
  contextData,
  businessInfo,
}) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [chatOpen, setChatOpen] = useState<boolean>(false);
  const textRef = useRef<HTMLInputElement>(null);
  const msgAreaRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const handleSend = async () => {
    if (textRef.current) {
      const newMessage = textRef.current.value.trim();
      if (newMessage) {
        const userMessage: Message = { role: 'user', content: newMessage };
        setMessages((prev) => [...prev, userMessage]);
        textRef.current.value = '';

        try {
          const aiReply = await sendMessageToAI(
            [...messages, userMessage],
            contextData,
            businessInfo,
          );
          const assistantMessage: Message = {
            role: 'assistant',
            content: aiReply,
          };
          setMessages((prev) => [...prev, assistantMessage]);
        } catch (error) {
          console.error('Error fetching AI reply:', error);
          setMessages((prev) => [
            ...prev,
            { role: 'assistant', content: '⚠️ Error fetching AI response' },
          ]);
        }
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSend();
    }
  };

  useEffect(() => {
    if (msgAreaRef.current) {
      msgAreaRef.current.scrollTop = msgAreaRef.current.scrollHeight;
    }
  }, [messages]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div id="chatCon" className={chatOpen ? 'open' : ''}>
      <AnimatePresence>
        {chatOpen && (
          <motion.div
            className="chat-box"
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: '100%', opacity: 0 }}
            transition={{ duration: 0.4, ease: 'easeInOut' }}
            style={{
              position: isMobile ? 'fixed' : 'absolute',
              top: isMobile ? 0 : 'auto',
              bottom: isMobile ? 0 : '3%',
              right: isMobile ? 0 : '3%',
              left: isMobile ? 0 : 'auto',
              width: isMobile ? '100%' : '20%',
              height: isMobile ? '100%' : '30rem',
              minWidth: isMobile ? 'auto' : '18rem',
              borderRadius: isMobile ? '0' : '1.5625rem',
              background: '#eee',
              zIndex: 9999,
            }}
          >
            <div className="header">
              Chat with me
              <button
                className="close-button"
                onClick={() => setChatOpen(false)}
              >
                x
              </button>
            </div>

            <div className="msg-area" ref={msgAreaRef}>
              {messages.map((msg, i) =>
                msg.role === 'user' ? (
                  <p key={i} className="left">
                    <span>{msg.content}</span>
                  </p>
                ) : (
                  <p key={i} className="right">
                    <span>{msg.content}</span>
                  </p>
                ),
              )}
            </div>

            <div className="footer">
              <input type="text" ref={textRef} onKeyDown={handleKeyDown} />
              <button onClick={handleSend}>
                <i className="fa fa-paper-plane" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* כפתור פתיחה */}
      <AnimatePresence>
        {!chatOpen && (
          <motion.div
            className="pop"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ duration: 0.4 }}
          >
            <p>
              <motion.img
                onClick={() => setChatOpen(true)}
                src="/blue_chat.png"
                alt="Chat"
                style={{ width: 60, height: 60, cursor: 'pointer' }}
              />
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PopChat;
