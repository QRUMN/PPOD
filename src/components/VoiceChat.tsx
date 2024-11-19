import React, { useState, useEffect } from 'react';
import { Mic, MicOff, Volume2, VolumeX } from 'lucide-react';
import { useStore } from '../store/useStore';

export const VoiceChat: React.FC = () => {
  const [isListening, setIsListening] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const addMessage = useStore((state) => state.addMessage);

  useEffect(() => {
    if (!navigator.mediaDevices?.getUserMedia) {
      console.error('Voice chat requires microphone access');
      return;
    }

    let mediaRecorder: MediaRecorder | null = null;
    const chunks: Blob[] = [];

    const setupVoiceChat = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        mediaRecorder = new MediaRecorder(stream);

        mediaRecorder.ondataavailable = (e) => {
          chunks.push(e.data);
        };

        mediaRecorder.onstop = () => {
          const blob = new Blob(chunks, { type: 'audio/webm' });
          addMessage({
            id: Date.now().toString(),
            sender: 'User',
            content: '[Voice message]',
            timestamp: new Date(),
            type: 'voice',
            isUserMessage: true,
          });
        };
      } catch (err) {
        console.error('Error accessing microphone:', err);
      }
    };

    if (isListening) {
      setupVoiceChat();
    }

    return () => {
      if (mediaRecorder?.state === 'recording') {
        mediaRecorder.stop();
      }
    };
  }, [isListening, addMessage]);

  const toggleMicrophone = () => {
    setIsListening(!isListening);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <div className="flex flex-col space-y-4" role="region" aria-label="Voice chat controls">
      <div className="flex items-center justify-center space-x-4">
        <button
          onClick={toggleMicrophone}
          className={`p-4 rounded-full transition-colors ${
            isListening 
              ? 'bg-red-500 text-white hover:bg-red-600' 
              : 'bg-primary-100 dark:bg-primary-900 text-primary-700 dark:text-primary-100 hover:bg-primary-200 dark:hover:bg-primary-800'
          }`}
          aria-label={isListening ? 'Stop recording' : 'Start recording'}
        >
          {isListening ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
        </button>

        <button
          onClick={toggleMute}
          className={`p-4 rounded-full transition-colors ${
            isMuted 
              ? 'bg-gray-500 text-white hover:bg-gray-600' 
              : 'bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-600'
          }`}
          aria-label={isMuted ? 'Unmute audio' : 'Mute audio'}
        >
          {isMuted ? <VolumeX className="w-6 h-6" /> : <Volume2 className="w-6 h-6" />}
        </button>
      </div>

      <div 
        className="text-sm text-center text-gray-600 dark:text-gray-300"
        aria-live="polite"
      >
        {isListening ? 'Recording...' : 'Click microphone to start'}
      </div>
    </div>
  );
};