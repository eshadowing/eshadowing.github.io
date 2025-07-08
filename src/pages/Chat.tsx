import { useState, useRef, useEffect } from 'react';
import { ArrowLeft, Send, Plus, Mic, MicOff, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

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

const predefinedTopics: Topic[] = [
  { id: 1, title: "Language Learning", description: "Practice conversations in different languages", color: "bg-blue-500" },
  { id: 2, title: "Coding Help", description: "Get help with programming questions", color: "bg-green-500" },
  { id: 3, title: "Career Advice", description: "Discuss career goals and professional development", color: "bg-purple-500" },
  { id: 4, title: "Travel Planning", description: "Plan your next adventure", color: "bg-orange-500" },
  { id: 5, title: "Health & Fitness", description: "Discuss wellness and fitness goals", color: "bg-red-500" },
  { id: 6, title: "Creative Writing", description: "Brainstorm ideas and improve your writing", color: "bg-pink-500" },
];

const Chat = () => {
  const navigate = useNavigate();
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isListening, setIsListening] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.webkitSpeechRecognition || window.SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event) => {
        const transcript = event.results[0][0].transcript;
        setNewMessage(transcript);
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
    speakText(welcomeMessage.text);
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

  const speakText = async (text: string) => {
    if (!apiKey) {
      setShowApiKeyInput(true);
      return;
    }

    try {
      const response = await fetch('https://api.elevenlabs.io/v1/text-to-speech/9BWtsMINqrJLrRacOk9x', {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey
        },
        body: JSON.stringify({
          text: text,
          model_id: 'eleven_multilingual_v2',
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5
          }
        })
      });

      if (response.ok) {
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        audio.play();
      }
    } catch (error) {
      console.error('Error with text-to-speech:', error);
    }
  };

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: Date.now(),
        text: newMessage,
        isUser: true,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      
      // Mock bot response
      setTimeout(() => {
        const responses = [
          "That's a fascinating perspective! Can you elaborate on that?",
          "I see what you mean. Tell me more about your experience with this.",
          "That's really interesting! What made you think about it that way?",
          "Great point! How do you think we could apply this in practice?",
          "I understand. What challenges have you faced with this topic?"
        ];
        
        const randomResponse = responses[Math.floor(Math.random() * responses.length)];
        const botResponse: Message = {
          id: Date.now() + 1,
          text: randomResponse,
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
        speakText(botResponse.text);
      }, 1000);
    }
  };

  const handleVoiceInput = () => {
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
      if (customTopic && !selectedTopic) {
        handleCustomTopic();
      } else {
        handleSendMessage();
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="relative w-full max-w-sm mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
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
            {!selectedTopic && <h1 className="text-lg font-semibold">AI Chat</h1>}
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setShowApiKeyInput(!showApiKeyInput)}
            className="text-white hover:bg-white/10"
          >
            <Volume2 className="w-4 h-4" />
          </Button>
        </div>

        {/* API Key Input */}
        {showApiKeyInput && (
          <div className="p-4 bg-black/40 border-b border-white/10">
            <div className="space-y-2">
              <label className="text-xs text-gray-300">ElevenLabs API Key for voice</label>
              <Input
                type="password"
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your ElevenLabs API key..."
                className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 text-xs"
              />
            </div>
          </div>
        )}

        {/* Search Bar - Always visible */}
        <div className="p-4 border-b border-white/10 bg-black/10">
          <div className="flex gap-2">
            <Input
              value={customTopic}
              onChange={(e) => setCustomTopic(e.target.value)}
              placeholder={selectedTopic ? "Type your message..." : "Enter a topic or search..."}
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
              onKeyPress={handleKeyPress}
            />
            {!selectedTopic ? (
              <Button
                onClick={handleCustomTopic}
                size="sm"
                className="bg-blue-600 hover:bg-blue-700"
              >
                <Plus className="w-4 h-4" />
              </Button>
            ) : (
              <div className="flex gap-1">
                <Button
                  onClick={handleVoiceInput}
                  size="sm"
                  className={`${isListening ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
                >
                  {isListening ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
                </Button>
                <Button
                  onClick={() => {
                    setNewMessage(customTopic);
                    setCustomTopic('');
                    setTimeout(handleSendMessage, 100);
                  }}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            )}
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto">
          {!selectedTopic ? (
            /* Popular Topics - Only show when no topic selected */
            <div className="p-4 space-y-3">
              <h2 className="text-sm font-medium text-gray-300">Popular Topics</h2>
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
            <div className="p-4 space-y-4">
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
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Chat;