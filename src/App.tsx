import React, { useState } from 'react';
import { 
  Home,
  BookOpen,
  Users,
  TrendingUp,
  User,
  Search,
  ChevronRight,
  MessageSquare,
  Shield,
  FileCheck,
  AlertCircle,
  BookOpen as BookIcon,
  Play,
  ArrowRight,
  Gavel,
  FileText,
  ScrollText,
  Phone,
  ThumbsUp,
  MessageCircle,
  Bell,
  Calendar,
  Heart,
  X,
  Send,
  Bot
} from 'lucide-react';

function ChatBot({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [messages, setMessages] = useState<Array<{ text: string; isUser: boolean }>>([
    { text: "Hi! I'm your legal assistant. How can I help you today?", isUser: false }
  ]);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages(prev => [...prev, { text: input, isUser: true }]);
    setInput('');

    // Simulate bot response
    setTimeout(() => {
      setMessages(prev => [...prev, {
        text: "I understand you need help. Let me connect you with the right resources or expert who can assist you better.",
        isUser: false
      }]);
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-end sm:items-center justify-center">
      <div className="bg-white w-full sm:w-[400px] sm:rounded-lg h-[600px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center">
            <Bot className="w-6 h-6 text-indigo-600 mr-2" />
            <h2 className="font-semibold">Legal Assistant</h2>
          </div>
          <button onClick={onClose} className="p-2">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message, i) => (
            <div
              key={i}
              className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[80%] rounded-lg p-3 ${
                  message.isUser
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                {message.text}
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <div className="p-4 border-t">
          <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Type your message..."
              className="flex-1 bg-transparent outline-none"
            />
            <button
              onClick={handleSend}
              className="ml-2 text-indigo-600"
              disabled={!input.trim()}
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function SearchBar() {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<Array<{
    title: string;
    type: string;
    description: string;
  }>>([]);
  const [isFocused, setIsFocused] = useState(false);

  // Simulate search results
  React.useEffect(() => {
    if (searchQuery.length > 2) {
      setResults([
        {
          title: "Marriage Laws in India",
          type: "Learn",
          description: "Comprehensive guide to marriage laws and regulations"
        },
        {
          title: "Legal Aid Services",
          type: "Action",
          description: "Connect with pro-bono lawyers and legal services"
        },
        {
          title: "Domestic Violence Protection",
          type: "Resource",
          description: "Understanding your rights and protective measures"
        }
      ]);
    } else {
      setResults([]);
    }
  }, [searchQuery]);

  return (
    <div className="sticky top-0 bg-white z-40 border-b border-gray-200">
      <div className="px-4 py-2">
        <div className="relative">
          <div className="flex items-center bg-gray-50 rounded-lg px-4 py-2">
            <Search className="w-5 h-5 text-gray-400 mr-2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setTimeout(() => setIsFocused(false), 200)}
              placeholder="Search for resources, laws, or help..."
              className="flex-1 bg-transparent outline-none"
            />
            {searchQuery && (
              <button 
                onClick={() => setSearchQuery('')}
                className="p-1"
              >
                <X className="w-4 h-4 text-gray-400" />
              </button>
            )}
          </div>

          {/* Results dropdown */}
          {isFocused && results.length > 0 && (
            <div className="absolute top-full left-0 right-0 bg-white mt-1 rounded-lg shadow-lg border border-gray-200 max-h-[60vh] overflow-y-auto">
              {results.map((result, i) => (
                <div 
                  key={i} 
                  className="p-3 border-b last:border-b-0 hover:bg-gray-50 cursor-pointer"
                  onClick={() => {
                    setSearchQuery('');
                    setIsFocused(false);
                  }}
                >
                  <div className="flex items-center mb-1">
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-indigo-100 text-indigo-800">
                      {result.type}
                    </span>
                  </div>
                  <h3 className="font-medium text-gray-900">{result.title}</h3>
                  <p className="text-sm text-gray-500">{result.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function TrendingPage() {
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Jagriti - Latest News and Trends</h1>
        <button className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
          <Bell className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      <div className="mb-6">
        <TrendingCard
          type="Alert"
          title="New Supreme Court guidelines on live-in relationships"
          time="2 hours ago"
        />
        <TrendingCard
          type="Update"
          title="Government launches new helpline for relationship counseling"
          time="4 hours ago"
        />
        <TrendingCard
          type="News"
          title="Delhi High Court's landmark judgment on interfaith marriages"
          time="Yesterday"
        />
      </div>

      <div className="mb-6">
        <h2 className="font-medium mb-4">Upcoming Events</h2>
        <div className="bg-white p-4 rounded-lg shadow-sm">
          <div className="flex items-center mb-3">
            <Calendar className="w-5 h-5 text-indigo-600 mr-2" />
            <h3 className="font-medium">Legal Awareness Workshop</h3>
          </div>
          <p className="text-sm text-gray-600 mb-2">Join our experts for a discussion on relationship rights</p>
          <p className="text-xs text-gray-500">Tomorrow, 6:00 PM IST</p>
        </div>
      </div>
    </div>
  );
}

function TrendingCard({ title, type, time }: {
  title: string;
  type: string;
  time: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg mb-3 shadow-sm">
      <div className="flex items-center mb-2">
        <span className={`text-xs font-medium px-2 py-1 rounded-full ${
          type === 'Alert' ? 'bg-red-100 text-red-800' :
          type === 'Update' ? 'bg-blue-100 text-blue-800' :
          'bg-green-100 text-green-800'
        }`}>
          {type}
        </span>
        <span className="text-xs text-gray-500 ml-2">{time}</span>
      </div>
      <p className="text-gray-900">{title}</p>
    </div>
  );
}

function ActionsPage() {
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Pehchaan & Suraksha - Actions for Safety</h1>
        <button className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
          <Search className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      <div className="mb-6">
        <ActionCard
          icon={Gavel}
          title="Contact Lawyer"
          description="Connect with verified legal experts"
        />
        <ActionCard
          icon={FileText}
          title="Agreement Templates"
          description="Access pre-approved legal documents"
        />
        <ActionCard
          icon={Shield}
          title="Safety Check"
          description="Run a background verification"
        />
        <ActionCard
          icon={Phone}
          title="Helpline"
          description="24/7 emergency support"
        />
      </div>
    </div>
  );
}

function ActionCard({ icon: Icon, title, description }: {
  icon: any;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg mb-3 shadow-sm">
      <div className="flex items-center">
        <div className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center mr-3">
          <Icon className="w-5 h-5 text-indigo-600" />
        </div>
        <div className="flex-1">
          <h3 className="font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
    </div>
  );
}

function CommunityPage() {
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Sahayata & Samvad - Community Support</h1>
        <button className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
          <Search className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-medium">Recent Discussions</h2>
          <button className="text-indigo-600 text-sm">New Post</button>
        </div>
        
        <CommunityPost 
          author="Advocate Priya"
          title="What are the legal requirements for live-in relationships in Delhi?"
          time="10 min ago"
          replies={12}
          likes={45}
        />
        <CommunityPost 
          author="Dr. Rajesh"
          title="Understanding domestic violence laws and protection orders"
          time="1 hour ago"
          replies={8}
          likes={32}
        />
        <CommunityPost 
          author="Meera Patel"
          title="Tips for maintaining healthy boundaries in relationships"
          time="2 hours ago"
          replies={15}
          likes={67}
        />
      </div>
    </div>
  );
}

function CommunityPost({ author, title, time, replies, likes }: { 
  author: string;
  title: string;
  time: string;
  replies: number;
  likes: number;
}) {
  return (
    <div className="bg-white p-4 rounded-lg mb-3 shadow-sm">
      <div className="flex items-center mb-3">
        <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center mr-3">
          <span className="text-indigo-600 font-semibold">{author[0]}</span>
        </div>
        <div>
          <h3 className="font-medium text-gray-900">{author}</h3>
          <p className="text-xs text-gray-500">{time}</p>
        </div>
      </div>
      <p className="text-gray-900 mb-3">{title}</p>
      <div className="flex items-center text-sm text-gray-600">
        <div className="flex items-center mr-4">
          <MessageCircle className="w-4 h-4 mr-1" />
          {replies}
        </div>
        <div className="flex items-center">
          <ThumbsUp className="w-4 h-4 mr-1" />
          {likes}
        </div>
      </div>
    </div>
  );
}

function LearnPage() {
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Adikaar - Learn your Rights</h1>
        <button className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
          <Search className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      <div className="mb-6">
        <h2 className="font-medium mb-4">Featured Courses</h2>
        <LearnCard
          title="Understanding Indian Marriage Laws"
          duration="45 mins"
          level="Beginner"
        />
        <LearnCard
          title="Rights in Live-in Relationships"
          duration="30 mins"
          level="Intermediate"
        />
        <LearnCard
          title="Domestic Violence Protection"
          duration="60 mins"
          level="Essential"
        />
      </div>

      <div className="mb-6">
        <h2 className="font-medium mb-4">Quick Guides</h2>
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <ScrollText className="w-5 h-5 text-indigo-600 mb-2" />
            <h3 className="font-medium text-sm mb-1">Legal Terms</h3>
            <p className="text-xs text-gray-500">Common legal terminology explained</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm">
            <Heart className="w-5 h-5 text-indigo-600 mb-2" />
            <h3 className="font-medium text-sm mb-1">Relationship Rights</h3>
            <p className="text-xs text-gray-500">Know your basic rights</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function LearnCard({ title, duration, level }: {
  title: string;
  duration: string;
  level: string;
}) {
  return (
    <div className="bg-white p-4 rounded-lg mb-3 shadow-sm">
      <div className="flex items-center mb-2">
        <BookIcon className="w-5 h-5 text-indigo-600 mr-2" />
        <h3 className="font-medium text-gray-900">{title}</h3>
      </div>
      <div className="flex items-center text-sm text-gray-500">
        <Play className="w-4 h-4 mr-1" />
        <span className="mr-3">{duration}</span>
        <span>{level}</span>
      </div>
    </div>
  );
}

function ProfilePage() {
  return (
    <div className="px-4 pt-4">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Swayam - Your Profile</h1>
        <button className="w-10 h-10 bg-indigo-50 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-indigo-600" />
        </button>
      </div>

      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex items-center mb-4">
          <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mr-4">
            <span className="text-2xl font-semibold text-indigo-600">A</span>
          </div>
          <div>
            <h2 className="font-medium text-lg">Anjali Singh</h2>
            <p className="text-sm text-gray-500">Verified Member</p>
          </div>
        </div>
        <div className="border-t border-gray-100 pt-4">
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Email</span>
            <span className="font-medium">anjali.s@example.com</span>
          </div>
          <div className="flex justify-between text-sm mb-2">
            <span className="text-gray-600">Phone</span>
            <span className="font-medium">+91 98765 43210</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Location</span>
            <span className="font-medium">New Delhi</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <button className="w-full p-4 text-left border-b border-gray-100">
          <div className="flex items-center">
            <Shield className="w-5 h-5 text-gray-400 mr-3" />
            <span>Privacy Settings</span>
          </div>
        </button>
        <button className="w-full p-4 text-left border-b border-gray-100">
          <div className="flex items-center">
            <Bell className="w-5 h-5 text-gray-400 mr-3" />
            <span>Notifications</span>
          </div>
        </button>
        <button className="w-full p-4 text-left text-red-600">
          <div className="flex items-center">
            <ArrowRight className="w-5 h-5 mr-3" />
            <span>Log Out</span>
          </div>
        </button>
      </div>
    </div>
  );
}

function App() {
  const [activeTab, setActiveTab] = useState('trending');
  const [isChatOpen, setIsChatOpen] = useState(false);
  
  const tabs = [
    { id: 'trending', icon: TrendingUp, label: 'Trending' },
    { id: 'actions', icon: Home, label: 'Actions' },
    { id: 'community', icon: Users, label: 'Community' },
    { id: 'learn', icon: BookOpen, label: 'Learn' },
    { id: 'profile', icon: User, label: 'Profile' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Bar */}
      <SearchBar />

      {/* Main Content */}
      <main className="pb-20">
        {activeTab === 'trending' && <TrendingPage />}
        {activeTab === 'actions' && <ActionsPage />}
        {activeTab === 'community' && <CommunityPage />}
        {activeTab === 'learn' && <LearnPage />}
        {activeTab === 'profile' && <ProfilePage />}
      </main>

      {/* Floating Chat Button */}
      <button
        onClick={() => setIsChatOpen(true)}
        className="fixed right-4 bottom-24 bg-indigo-600 text-white p-4 rounded-full shadow-lg"
      >
        <MessageSquare className="w-6 h-6" />
      </button>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
        <div className="flex justify-around">
          {tabs.map(({ id, icon: Icon, label }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex flex-col items-center py-2 px-4 ${
                activeTab === id ? 'text-indigo-600' : 'text-gray-600'
              }`}
            >
              <Icon className="w-6 h-6" />
              <span className="text-xs mt-1">{label}</span>
            </button>
          ))}
        </div>
      </nav>

      {/* Chatbot */}
      <ChatBot isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} />
    </div>
  );
}

export default App;