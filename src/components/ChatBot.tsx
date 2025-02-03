import React, { useState, useEffect, useRef } from 'react';
import { X, Send, Mic, MicOff, Loader2 } from 'lucide-react';
import SpeechRecognition, { useSpeechRecognition } from 'react-speech-recognition';
import 'regenerator-runtime/runtime';

interface ChatBotProps {
  onClose: () => void;
  onRequestProspectus: () => void;
  initialMessage: string;
}

interface Message {
  type: 'user' | 'bot';
  text: string;
}

const ChatBot: React.FC<ChatBotProps> = ({ onClose, onRequestProspectus, initialMessage }) => {
  const [messages, setMessages] = useState<Message[]>([
    { type: 'bot', text: initialMessage }
  ]);
  const [input, setInput] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition
  } = useSpeechRecognition();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (transcript) {
      setInput(transcript);
    }
  }, [transcript]);

  const generateResponse = async (question: string): Promise<string> => {
    // Simulate AI response based on common property questions
    const responses: { [key: string]: string } = {
      'price': 'The property is listed at $12,500,000. This price reflects its prime location in Beverly Hills and its luxury amenities.',
      'bedroom': 'This luxury villa features 6 spacious bedrooms, including a master suite with a private terrace.',
      'bathroom': 'The property has 7.5 bathrooms, including en-suite bathrooms in all bedrooms.',
      'school': 'The property is near several prestigious schools, including Beverly Hills High School (0.5 miles) and Beverly Vista Middle School (0.8 miles).',
      'transport': 'Beverly Hills Station is 1.2 miles away, and LAX Airport is approximately 12 miles from the property.',
      'restaurant': 'There are numerous high-end restaurants nearby, including Spago Beverly Hills (0.4 miles) and Mastro\'s Steakhouse (0.6 miles).',
      'shopping': 'The famous Rodeo Drive is just 0.5 miles away, and Beverly Center is 1.5 miles from the property.',
      'size': 'The property spans 8,500 square feet of living space, situated on a generous lot.',
      'parking': 'The property includes a 4-car garage with additional driveway parking.',
      'pool': 'Yes, the property features an infinity pool with panoramic city views.',
      'security': 'The property is equipped with a state-of-the-art security system, including 24/7 monitoring.',
      'year': 'The property was built in 2020 and has been meticulously maintained since then.',
      'email': 'I\'ll be happy to send you a personalized prospectus. Please enter your email address.',
      'prospectus': 'I\'ll be happy to send you a personalized prospectus. Please enter your email address.',
    };

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Check for keywords in the question
    const questionLower = question.toLowerCase();
    for (const [keyword, response] of Object.entries(responses)) {
      if (questionLower.includes(keyword)) {
        return response;
      }
    }

    return 'I\'d be happy to help you with that. Would you like to receive a personalized prospectus with more details about the property?';
  };

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage = input.trim();
    setMessages(prev => [...prev, { type: 'user', text: userMessage }]);
    setInput('');
    setIsProcessing(true);
    resetTranscript();

    try {
      const response = await generateResponse(userMessage);
      setMessages(prev => [...prev, { type: 'bot', text: response }]);
    } catch (error) {
      setMessages(prev => [...prev, { type: 'bot', text: 'I apologize, but I encountered an error. Please try asking your question again.' }]);
    } finally {
      setIsProcessing(false);
    }
  };

  const toggleListening = () => {
    if (listening) {
      SpeechRecognition.stopListening();
    } else {
      setInput('');
      resetTranscript();
      SpeechRecognition.startListening({ continuous: true });
    }
  };

  return (
    <div className="fixed bottom-6 right-6 w-96 h-[500px] bg-white rounded-lg shadow-xl flex flex-col">
      <div className="p-4 bg-indigo-600 text-white rounded-t-lg flex justify-between items-center">
        <h3 className="font-semibold">Property Assistant</h3>
        <button onClick={onClose} className="hover:text-gray-200">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 p-4 overflow-y-auto">
        {messages.map((msg, idx) => (
          <div key={idx} className={`mb-4 ${msg.type === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block p-3 rounded-lg max-w-[80%] ${
              msg.type === 'user' 
                ? 'bg-indigo-600 text-white' 
                : 'bg-gray-100 text-gray-800'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        {isProcessing && (
          <div className="flex items-center space-x-2 text-gray-500">
            <Loader2 className="w-5 h-5 animate-spin" />
            <span>Thinking...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            placeholder={listening ? 'Listening...' : 'Type your message...'}
            className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {browserSupportsSpeechRecognition && (
            <button 
              onClick={toggleListening}
              className={`p-2 rounded-lg transition-colors ${
                listening 
                  ? 'bg-red-500 text-white hover:bg-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {listening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
            </button>
          )}
          <button 
            onClick={handleSend}
            disabled={!input.trim()}
            className={`p-2 rounded-lg transition-colors ${
              input.trim() 
                ? 'bg-indigo-600 text-white hover:bg-indigo-700' 
                : 'bg-gray-100 text-gray-400'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;