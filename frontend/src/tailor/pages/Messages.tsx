import { useState } from 'react';
import {
  Search,
  Send,
  Paperclip,
  Image as ImageIcon,
  Smile,
  MoreVertical,
  Phone,
  Video,
  Info,
  Check,
  Clock,
} from 'lucide-react';

const Messages = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedChat, setSelectedChat] = useState(1);
  const [message, setMessage] = useState('');

  const conversations = [
    {
      id: 1,
      name: 'Fatou Ndiaye',
      lastMessage: 'Bonjour, je voudrais commander un boubou pour la Tabaski',
      time: '10:30',
      unread: 2,
      avatar: '/avatars/fatou.jpg',
      isOnline: true,
    },
    {
      id: 2,
      name: 'Aminata Diallo',
      lastMessage: 'Merci pour le service, je suis très satisfaite !',
      time: 'Hier',
      unread: 0,
      avatar: '/avatars/aminata.jpg',
      isOnline: false,
    },
    {
      id: 3,
      name: 'Moussa Sarr',
      lastMessage: 'Les mesures vous conviennent ?',
      time: 'Lundi',
      unread: 0,
      avatar: '/avatars/moussa.jpg',
      isOnline: true,
    },
  ];

  const messages = [
    {
      id: 1,
      sender: 'client',
      content: 'Bonjour, je voudrais commander un boubou pour la Tabaski',
      time: '10:30',
      status: 'read',
    },
    {
      id: 2,
      sender: 'tailor',
      content: 'Bonjour Fatou ! Bien sûr, je serai ravi de vous aider. Avez-vous déjà une idée du modèle que vous souhaitez ?',
      time: '10:32',
      status: 'read',
    },
    {
      id: 3,
      sender: 'client',
      content: 'Oui, j\'ai vu un modèle dans votre galerie que j\'aime beaucoup. C\'est le boubou traditionnel en bazin riche.',
      time: '10:35',
      status: 'read',
    },
    {
      id: 4,
      sender: 'tailor',
      content: 'Excellent choix ! Ce modèle est très apprécié. Avez-vous déjà vos mesures ou souhaitez-vous que je vous guide pour les prendre ?',
      time: '10:37',
      status: 'read',
    },
    {
      id: 5,
      sender: 'client',
      content: 'Je n\'ai pas mes mesures. Pouvez-vous m\'aider à les prendre ?',
      time: '10:40',
      status: 'delivered',
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'read':
        return <Check className="w-4 h-4 text-[#00853F]" />;
      case 'delivered':
        return <Check className="w-4 h-4 text-gray-400" />;
      case 'sending':
        return <Clock className="w-4 h-4 text-gray-400" />;
      default:
        return null;
    }
  };

  return (
    <div className="h-[calc(100vh-4rem)] flex">
      {/* Conversations List */}
      <div className="w-80 border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Rechercher une conversation..."
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-[#00853F]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        <div className="flex-1 overflow-y-auto">
          {conversations.map((conversation) => (
            <button
              key={conversation.id}
              onClick={() => setSelectedChat(conversation.id)}
              className={`w-full p-4 flex items-center space-x-3 hover:bg-gray-50 ${
                selectedChat === conversation.id ? 'bg-[#d9f3e5]' : ''
              }`}
            >
              <div className="relative">
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <img
                    src={conversation.avatar}
                    alt={conversation.name}
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
                {conversation.isOnline && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-gray-900 truncate">
                    {conversation.name}
                  </h3>
                  <span className="text-xs text-gray-500">{conversation.time}</span>
                </div>
                <p className="text-sm text-gray-500 truncate">
                  {conversation.lastMessage}
                </p>
              </div>
              {conversation.unread > 0 && (
                <span className="flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-[#00853F] rounded-full">
                  {conversation.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                <img
                  src={conversations.find((c) => c.id === selectedChat)?.avatar}
                  alt=""
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              {conversations.find((c) => c.id === selectedChat)?.isOnline && (
                <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white rounded-full" />
              )}
            </div>
            <div>
              <h2 className="text-sm font-medium text-gray-900">
                {conversations.find((c) => c.id === selectedChat)?.name}
              </h2>
              <p className="text-xs text-gray-500">
                {conversations.find((c) => c.id === selectedChat)?.isOnline
                  ? 'En ligne'
                  : 'Dernière connexion il y a 2h'}
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Phone className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Video className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Info className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.sender === 'tailor' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[70%] rounded-lg p-3 ${
                  msg.sender === 'tailor'
                    ? 'bg-[#00853F] text-white'
                    : 'bg-gray-100 text-gray-900'
                }`}
              >
                <p className="text-sm">{msg.content}</p>
                <div className="flex items-center justify-end mt-1 space-x-1">
                  <span className="text-xs opacity-75">{msg.time}</span>
                  {msg.sender === 'tailor' && getStatusIcon(msg.status)}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Message Input */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2">
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Paperclip className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <ImageIcon className="w-5 h-5" />
            </button>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Écrivez votre message..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#00853F] focus:border-[#00853F]"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
            </div>
            <button className="p-2 text-gray-400 hover:text-gray-500">
              <Smile className="w-5 h-5" />
            </button>
            <button className="p-2 text-white bg-[#00853F] rounded-lg hover:bg-[#00853F]">
              <Send className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Messages; 