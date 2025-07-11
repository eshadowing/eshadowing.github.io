import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Mic, MicOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import { trackUserBehavior } from '@/utils/tracking';
import BottomNav from '@/components/BottomNav';
import { useTranslation } from '@/lib/i18n';

// Extend Window interface for speech recognition
declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

interface Message {
  id: number;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface Topic {
  id: number;
  title: string;
  description: string;
  color: string;
}

const Chat = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSearchFocused, setIsSearchFocused] = useState(false);
  const recognitionRef = useRef<any>(null);
  const { t } = useTranslation();

  const predefinedTopics: Topic[] = [
    { id: 1, title: t('chat.topics.languageLearning'), description: t('chat.topics.languageLearningDesc'), color: "bg-blue-500" },
    { id: 2, title: t('chat.topics.codingHelp'), description: t('chat.topics.codingHelpDesc'), color: "bg-green-500" },
    { id: 3, title: t('chat.topics.careerAdvice'), description: t('chat.topics.careerAdviceDesc'), color: "bg-purple-500" },
    { id: 4, title: t('chat.topics.travelPlanning'), description: t('chat.topics.travelPlanningDesc'), color: "bg-orange-500" },
    { id: 5, title: t('chat.topics.healthFitness'), description: t('chat.topics.healthFitnessDesc'), color: "bg-red-500" },
    { id: 6, title: t('chat.topics.creativeWriting'), description: t('chat.topics.creativeWritingDesc'), color: "bg-pink-500" },
  ];

  useEffect(() => {
    // Track user behavior when chat page opens
    trackUserBehavior('open_chat');

    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        handleVoiceMessage(transcript);
        setIsListening(false);
      };

      recognitionRef.current.onerror = () => {
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    const welcomeMessage: Message = {
      id: Date.now(),
      text: `Great! Let's talk about ${topic.title}. ${topic.description}`,
      isUser: false,
      timestamp: new Date()
    };
    setMessages([welcomeMessage]);
  };

  const handleCustomTopic = () => {
    if (customTopic.trim()) {
      const newTopic: Topic = {
        id: Date.now(),
        title: customTopic,
        description: "Custom topic",
        color: "bg-gray-500"
      };
      handleTopicSelect(newTopic);
      setCustomTopic('');
    }
  };

  const handleVoiceMessage = (transcript: string) => {
    const userMessage: Message = {
      id: Date.now(),
      text: transcript,
      isUser: true,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMessage]);
    
    // Mock bot response
    setTimeout(() => {
      const responses = [
        "That's a fascinating perspective! Can you elaborate on that?",
        "I see what you mean. Tell me more about your experience with this.",
        "That's really interesting! What made you think about it that way?",
        "Great point! How do you think we could apply this in practice?",
        "I understand. What challenges have you faced with this topic?",
        "Excellent observation! How did you come to that conclusion?",
        "That sounds intriguing. Can you share more details about that?",
        "Very thoughtful! What's your next step with this idea?"
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      const botResponse: Message = {
        id: Date.now() + 1,
        text: randomResponse,
        isUser: false,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1500);
  };

  const handleVoiceInput = () => {
    // Track mic button press
    trackUserBehavior('press_mic');
    
    if (isListening) {
      recognitionRef.current?.stop();
      setIsListening(false);
    } else {
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCustomTopic();
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white fixed inset-0 flex justify-center">
      <div className="relative w-full max-w-sm mx-auto h-full flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm flex-shrink-0">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            {selectedTopic && (
              <>
                <div className={`w-2 h-2 rounded-full ${selectedTopic.color}`} />
                <h1 className="text-lg font-semibold">{selectedTopic.title}</h1>
              </>
            )}
            {!selectedTopic && <h1 className="text-lg font-semibold">{t('chat.title')}</h1>}
          </div>
          <div className="w-8" />
        </div>

        {/* Search Bar - Always visible */}
        <div className="p-4 border-b border-white/10 bg-black/10 flex-shrink-0">
          <div className="flex gap-2">
            <Input
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder={t('chat.enterTopic')}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              onKeyPress={handleKeyPress}
              onFocus={() => setIsSearchFocused(true)}
              onBlur={() => setTimeout(() => setIsSearchFocused(false), 200)}
            />
            <Button
              onClick={handleCustomTopic}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700"
              disabled={!customTopic.trim()}
            >
              {t('chat.start')}
            </Button>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto min-h-0">
          {(!selectedTopic || (selectedTopic && isSearchFocused)) ? (
            /* Popular Topics - Only show when no topic selected */
            <div className="p-4 space-y-3 pb-32 pb-safe">
              <h2 className="text-sm font-medium text-gray-300">{t('chat.popularTopics')}</h2>
              <div className="grid gap-3">
                {predefinedTopics.map((topic) => (
                  <div
                    key={topic.id}
                    onClick={() => handleTopicSelect(topic)}
                    className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20 hover:bg-white/15 transition-colors cursor-pointer"
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full ${topic.color} mt-1 flex-shrink-0`} />
                      <div className="flex-1">
                        <h3 className="font-medium text-white">{topic.title}</h3>
                        <p className="text-sm text-gray-300 mt-1">{topic.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            /* Messages - Show when topic is selected */
            <div className="p-4 space-y-4 pb-32 pb-safe">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-2xl px-4 py-2 ${
                      message.isUser
                        ? 'bg-blue-600 text-white'
                        : 'bg-white/10 backdrop-blur-sm text-white border border-white/20'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
              
              {isListening && (
                <div className="flex justify-center">
                  <div className="bg-red-600/20 backdrop-blur-sm text-white border border-red-500/30 rounded-xl px-4 py-2">
                    <p className="text-sm animate-pulse">{t('chat.listening')}</p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

      </div>
      <BottomNav 
        showMicButton={!!selectedTopic}
        isListening={isListening}
        onMicClick={handleVoiceInput}
      />
    </div>
  );
};

export default Chat;