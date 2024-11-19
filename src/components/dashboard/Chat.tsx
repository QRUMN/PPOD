import React, { useState, useEffect, useRef } from 'react';
import { Send, Volume2, VolumeX, Settings } from 'lucide-react';
import { VoiceToText } from '../VoiceToText';
import { motion, AnimatePresence } from 'framer-motion';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

export const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputText, setInputText] = useState('');
  const [isSpeakingResponse, setIsSpeakingResponse] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [volume, setVolume] = useState(1);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if ('speechSynthesis' in window) {
      synthRef.current = window.speechSynthesis;
      sendWelcomeMessage();
    }

    return () => {
      if (synthRef.current) {
        synthRef.current.cancel();
      }
    };
  }, []);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const sendWelcomeMessage = () => {
    const welcomeMessage: Message = {
      id: Date.now().toString(),
      text: "Hello! I'm your AI assistant for practicing safe online dating interactions. How can I help you today?",
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
    if (isSpeakingResponse) {
      speakResponse(welcomeMessage.text);
    }
  };

  const handleSend = async () => {
    if (inputText.trim() && !isProcessing) {
      setIsProcessing(true);
      
      // Cancel any ongoing speech
      if (currentUtteranceRef.current) {
        synthRef.current?.cancel();
      }

      // User message
      const userMessage: Message = {
        id: Date.now().toString(),
        text: inputText,
        isUser: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, userMessage]);
      setInputText('');

      // Natural conversation delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // AI response
      const response: Message = {
        id: (Date.now() + 1).toString(),
        text: "I understand your concern. When dating online, it's important to maintain clear boundaries and trust your instincts. Would you like to practice some safe communication strategies?",
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, response]);
      
      if (isSpeakingResponse) {
        await speakResponse(response.text);
      }
      
      setIsProcessing(false);
    }
  };

  const speakResponse = async (text: string) => {
    if (!synthRef.current || !isSpeakingResponse) return;

    return new Promise<void>((resolve) => {
      const utterance = new SpeechSynthesisUtterance(text);
      currentUtteranceRef.current = utterance;

      utterance.volume = volume;
      utterance.rate = 0.9;
      utterance.pitch = 1;

      utterance.onend = () => {
        currentUtteranceRef.current = null;
        resolve();
      };

      utterance.onerror = () => {
        currentUtteranceRef.current = null;
        resolve();
      };

      synthRef.current?.speak(utterance);
    });
  };

  const handleVoiceInput = (text: string) => {
    setInputText(text);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
      <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
          Safe Dating Practice Chat
        </h2>
        
        <div className="flex items-center gap-2">
          <button
            onClick={() => {
              if (currentUtteranceRef.current) {
                synthRef.current?.cancel();
              }
              setIsSpeakingResponse(!isSpeakingResponse);
            }}
            className={`p-2 rounded-lg transition-colors ${
              isSpeakingResponse
                ? 'bg-primary-500 text-white'
                : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300'
            }`}
            aria-label={isSpeakingResponse ? 'Mute responses' : 'Unmute responses'}
          >
            {isSpeakingResponse ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
          </button>
          
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-24 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            aria-label="Voice volume"
          />
        </div>
      </div>

      <div className="h-[500px] overflow-y-auto p-4">
        <div className="space-y-4">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.isUser
                      ? 'bg-primary-500 text-white'
                      : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                  }`}
                >
                  {message.text}
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          <div ref={messagesEndRef} />
        </div>
      </div>

      <div className="p-4 border-t border-gray-200 dark:border-gray-700">
        <VoiceToText
          onTranscript={handleVoiceInput}
          onSend={handleSend}
          className="mb-2"
        />
        
        <div className="flex gap-2">
          <input
            type="text"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder="Type your message..."
            className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                     bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                     focus:ring-2 focus:ring-primary-500 focus:border-transparent"
            disabled={isProcessing}
          />
          <button
            onClick={handleSend}
            disabled={!inputText.trim() || isProcessing}
            className="p-3 bg-primary-500 text-white rounded-lg hover:bg-primary-600
                     transition-colors disabled:opacity-50"
          >
            {isProcessing ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              >
                <Settings className="w-6 h-6" />
              </motion.div>
            ) : (
              <Send className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};