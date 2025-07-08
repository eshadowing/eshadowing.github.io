import { useState } from 'react';
import { ArrowLeft, Send, Plus, MessageCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';

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

const mockMessages: Message[] = [
  { id: 1, text: "Hello! I'm here to help you with your chosen topic. What would you like to discuss?", isUser: false, timestamp: new Date() },
];

const Chat = () => {
  const navigate = useNavigate();
  const [currentView, setCurrentView] = useState<'topics' | 'chat'>('topics');
  const [selectedTopic, setSelectedTopic] = useState<Topic | null>(null);
  const [customTopic, setCustomTopic] = useState('');
  const [messages, setMessages] = useState<Message[]>(mockMessages);
  const [newMessage, setNewMessage] = useState('');

  const handleTopicSelect = (topic: Topic) => {
    setSelectedTopic(topic);
    setCurrentView('chat');
    setMessages([
      { id: 1, text: `Great! Let's talk about ${topic.title}. ${topic.description}`, isUser: false, timestamp: new Date() }
    ]);
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
        const botResponse: Message = {
          id: Date.now() + 1,
          text: "That's an interesting point! Tell me more about your thoughts on this.",
          isUser: false,
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botResponse]);
      }, 1000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  if (currentView === 'topics') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
        <div className="relative w-full max-w-sm mx-auto h-screen overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/')}
              className="text-white hover:bg-white/10"
            >
              <ArrowLeft className="w-4 h-4" />
            </Button>
            <h1 className="text-lg font-semibold">Choose a Topic</h1>
            <div className="w-8" />
          </div>

          <div className="p-4 space-y-6">
            {/* Custom Topic Input */}
            <div className="space-y-3">
              <h2 className="text-sm font-medium text-gray-300">Create Custom Topic</h2>
              <div className="flex gap-2">
                <Input
                  value={customTopic}
                  onChange={(e) => setCustomTopic(e.target.value)}
                  placeholder="Enter your topic..."
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-400"
                  onKeyPress={(e) => e.key === 'Enter' && handleCustomTopic()}
                />
                <Button
                  onClick={handleCustomTopic}
                  size="sm"
                  className="bg-blue-600 hover:bg-blue-700"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Predefined Topics */}
            <div className="space-y-3">
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
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white">
      <div className="relative w-full max-w-sm mx-auto h-screen flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-white/10 bg-black/20 backdrop-blur-sm">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setCurrentView('topics')}
            className="text-white hover:bg-white/10"
          >
            <ArrowLeft className="w-4 h-4" />
          </Button>
          <div className="flex items-center gap-2">
            <div className={`w-2 h-2 rounded-full ${selectedTopic?.color}`} />
            <h1 className="text-lg font-semibold">{selectedTopic?.title}</h1>
          </div>
          <div className="w-8" />
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
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

        {/* Input */}
        <div className="p-4 border-t border-white/10 bg-black/20 backdrop-blur-sm">
          <div className="flex gap-2">
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="bg-white/10 border-white/20 text-white placeholder:text-gray-400 flex-1"
              onKeyPress={handleKeyPress}
            />
            <Button
              onClick={handleSendMessage}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 p-2"
            >
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chat;