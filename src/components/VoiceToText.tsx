import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff, Send } from 'lucide-react';
import { motion } from 'framer-motion';

interface VoiceToTextProps {
  onTranscript: (text: string) => void;
  onSend?: () => void;
  className?: string;
}

export const VoiceToText: React.FC<VoiceToTextProps> = ({ 
  onTranscript, 
  onSend,
  className = '' 
}) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);

  useEffect(() => {
    // Initialize speech recognition
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onstart = () => {
        setIsListening(true);
      };

      recognitionRef.current.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
            // Check for send command
            if (transcript.toLowerCase().trim() === 'send' && onSend) {
              onSend();
              stopListening();
              return;
            }
          } else {
            interimTranscript += transcript;
          }
        }

        const currentTranscript = finalTranscript || interimTranscript;
        setTranscript(currentTranscript);
        onTranscript(currentTranscript);
      };

      recognitionRef.current.onerror = (event: SpeechRecognitionErrorEvent) => {
        console.error('Speech recognition error:', event.error);
        stopListening();
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, [onTranscript, onSend]);

  const toggleListening = () => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  };

  const startListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.start();
        setTranscript('');
      } catch (error) {
        console.error('Error starting speech recognition:', error);
      }
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (error) {
        console.error('Error stopping speech recognition:', error);
      }
    }
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <motion.button
        onClick={toggleListening}
        whileTap={{ scale: 0.95 }}
        className={`p-3 rounded-full transition-all ${
          isListening
            ? 'bg-secondary-500 text-white'
            : 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600'
        }`}
        aria-label={isListening ? 'Stop recording' : 'Start recording'}
      >
        {isListening ? (
          <motion.div
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          >
            <MicOff className="w-6 h-6" />
          </motion.div>
        ) : (
          <Mic className="w-6 h-6" />
        )}
      </motion.button>

      <input
        type="text"
        value={transcript}
        onChange={(e) => {
          setTranscript(e.target.value);
          onTranscript(e.target.value);
        }}
        placeholder={isListening ? 'Listening... Say "send" to send message' : 'Click the microphone to speak'}
        className="flex-1 p-3 border border-gray-300 dark:border-gray-600 rounded-lg
                 bg-white dark:bg-gray-700 text-gray-900 dark:text-white
                 placeholder-gray-500 dark:placeholder-gray-400
                 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
      />

      {transcript && onSend && (
        <motion.button
          whileTap={{ scale: 0.95 }}
          onClick={() => {
            onSend();
            stopListening();
            setTranscript('');
          }}
          className="p-3 bg-primary-500 text-white rounded-full hover:bg-primary-600
                   transition-colors"
          aria-label="Send message"
        >
          <Send className="w-6 h-6" />
        </motion.button>
      )}

      {!('SpeechRecognition' in window || 'webkitSpeechRecognition' in window) && (
        <p className="text-sm text-red-500">
          Voice input is not supported in your browser.
        </p>
      )}
    </div>
  );
};