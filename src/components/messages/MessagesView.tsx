import React, { useState } from 'react';
import { 
  Search, 
  Send, 
  Sparkles, 
  ArrowLeft, 
  Users, 
  CheckCheck, 
  Paperclip, 
  Smile, 
  Bot
} from 'lucide-react';
import { Conversation, ChatMessage, UserProfile } from '../../types';

interface MessagesViewProps {
  conversations: Conversation[];
  currentUser: UserProfile;
  onSendMessage: (conversationId: string, text: string) => void;
  onAskAiMentorInChat: (conversationId: string, topic: string) => void;
}

export const MessagesView: React.FC<MessagesViewProps> = ({
  conversations,
  currentUser,
  onSendMessage,
  onAskAiMentorInChat
}) => {
  const [selectedConvId, setSelectedConvId] = useState<string | null>(conversations[0]?.id || null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  const activeConversation = conversations.find((c) => c.id === selectedConvId) || conversations[0];

  const handleSend = () => {
    if (!messageInput.trim() || !activeConversation) return;
    onSendMessage(activeConversation.id, messageInput.trim());
    setMessageInput('');
  };

  const filteredConversations = conversations.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200/90 dark:border-slate-800 overflow-hidden flex flex-col h-[calc(100vh-170px)] sm:h-[620px] min-h-[480px] transition-colors">
      {/* Mobile/Compact Viewport: Show either list or active chat */}
      <div className="flex-1 flex overflow-hidden">
        {/* LEFT COLUMN: Conversations List */}
        <div
          className={`w-full md:w-80 border-r border-slate-200 dark:border-slate-800 flex flex-col bg-slate-50/50 dark:bg-slate-900/50 ${
            selectedConvId ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* Search bar */}
          <div className="p-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search messages & teams..."
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-transparent dark:border-slate-700"
              />
            </div>
          </div>

          {/* Conversations Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-slate-100 dark:divide-slate-800/80">
            {filteredConversations.map((conv) => {
              const isSelected = activeConversation?.id === conv.id;
              return (
                <div
                  key={conv.id}
                  onClick={() => setSelectedConvId(conv.id)}
                  className={`p-3.5 flex items-start gap-3 cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-sky-50/80 dark:bg-slate-800 border-l-4 border-sky-500' 
                      : 'hover:bg-slate-100/70 dark:hover:bg-slate-800/60'
                  }`}
                >
                  <div className="relative shrink-0">
                    {conv.type === 'team' ? (
                      <div className="w-10 h-10 rounded-2xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300 flex items-center justify-center text-lg font-bold shadow-2xs">
                        {conv.avatar || '👥'}
                      </div>
                    ) : (
                      <img
                        src={conv.avatar}
                        alt={conv.name}
                        className="w-10 h-10 rounded-2xl object-cover ring-1 ring-slate-200 dark:ring-slate-700"
                      />
                    )}
                    {conv.unreadCount > 0 && (
                      <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-orange-500 text-white text-[9px] font-extrabold flex items-center justify-center ring-2 ring-white dark:ring-slate-900">
                        {conv.unreadCount}
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">{conv.name}</h4>
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 shrink-0">{conv.lastMessageTime}</span>
                    </div>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate mt-0.5">{conv.lastMessage}</p>
                    <span className="text-[9px] text-sky-600 dark:text-sky-400 font-semibold">{conv.subtitle}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* RIGHT COLUMN: Active Chat Thread */}
        {activeConversation ? (
          <div
            className={`flex-1 flex flex-col bg-white dark:bg-slate-900 ${
              selectedConvId ? 'flex' : 'hidden md:flex'
            }`}
          >
            {/* Thread Header */}
            <div className="px-4 py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <button
                  onClick={() => setSelectedConvId(null)}
                  className="md:hidden p-1.5 -ml-1 text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>
                {activeConversation.type === 'team' ? (
                  <div className="w-8 h-8 rounded-xl bg-orange-100 dark:bg-orange-950/60 text-orange-600 dark:text-orange-300 flex items-center justify-center font-bold">
                    {activeConversation.avatar || '👥'}
                  </div>
                ) : (
                  <img
                    src={activeConversation.avatar}
                    alt={activeConversation.name}
                    className="w-8 h-8 rounded-xl object-cover"
                  />
                )}
                <div>
                  <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">{activeConversation.name}</h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">{activeConversation.subtitle}</p>
                </div>
              </div>

              {/* AI Mentor in-chat action */}
              <button
                onClick={() => onAskAiMentorInChat(activeConversation.id, `Advice for ${activeConversation.name}`)}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-sky-50 dark:bg-sky-950/50 hover:bg-sky-100 dark:hover:bg-sky-900/60 text-sky-700 dark:text-sky-300 text-[11px] font-bold border border-sky-200 dark:border-sky-800 transition-colors"
                title="Ask Gemini AI for collaboration or task advice"
              >
                <Bot className="w-3.5 h-3.5 text-orange-500" />
                <span className="hidden sm:inline">AI Advice</span>
              </button>
            </div>

            {/* Chat Messages Stream */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50/40 dark:bg-slate-950/40">
              {activeConversation.messages.map((msg) => {
                const isMe = msg.isMe || msg.senderId === currentUser.id;

                if (msg.isAiAdvice) {
                  return (
                    <div
                      key={msg.id}
                      className="p-3.5 rounded-2xl bg-gradient-to-r from-sky-50 to-orange-50 dark:from-sky-950/40 dark:to-orange-950/40 border border-sky-200 dark:border-sky-800 text-xs text-slate-700 dark:text-slate-200 my-2 shadow-2xs space-y-1"
                    >
                      <div className="flex items-center gap-1.5 text-orange-600 dark:text-orange-400 font-bold text-[11px]">
                        <Sparkles className="w-3.5 h-3.5" />
                        <span>TeamBuilders AI Mentor Suggestion</span>
                      </div>
                      <p className="text-xs text-slate-800 dark:text-slate-200 whitespace-pre-line leading-relaxed">{msg.text}</p>
                      <span className="text-[9px] text-slate-400 dark:text-slate-500 block text-right">{msg.timestamp}</span>
                    </div>
                  );
                }

                return (
                  <div
                    key={msg.id}
                    className={`flex items-end gap-2 ${isMe ? 'justify-end' : 'justify-start'}`}
                  >
                    {!isMe && (
                      <img
                        src={msg.senderAvatar}
                        alt={msg.senderName}
                        className="w-6 h-6 rounded-full object-cover shrink-0 mb-1"
                      />
                    )}
                    <div
                      className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-xs leading-relaxed ${
                        isMe
                          ? 'bg-sky-500 text-white rounded-br-xs shadow-xs font-medium'
                          : 'bg-white dark:bg-slate-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-slate-700 rounded-bl-xs shadow-2xs'
                      }`}
                    >
                      {!isMe && (
                        <span className="block text-[10px] font-bold text-sky-700 dark:text-sky-300 mb-0.5">
                          {msg.senderName}
                        </span>
                      )}
                      <p className="whitespace-pre-line">{msg.text}</p>
                      <div
                        className={`text-[9px] mt-1 flex items-center justify-end gap-1 ${
                          isMe ? 'text-sky-100' : 'text-slate-400 dark:text-slate-500'
                        }`}
                      >
                        <span>{msg.timestamp}</span>
                        {isMe && <CheckCheck className="w-3 h-3" />}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Message Input Box */}
            <div className="p-3 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  value={messageInput}
                  onChange={(e) => setMessageInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') handleSend();
                  }}
                  placeholder={`Message ${activeConversation.name}...`}
                  className="flex-1 bg-slate-100 dark:bg-slate-800 rounded-2xl px-3.5 py-2 text-xs text-slate-800 dark:text-slate-200 placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-sky-500 border border-transparent dark:border-slate-700"
                />
                <button
                  onClick={handleSend}
                  disabled={!messageInput.trim()}
                  className="p-2.5 rounded-2xl bg-sky-500 hover:bg-sky-600 disabled:opacity-50 text-white shadow-xs transition-transform active:scale-95"
                >
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex items-center justify-center p-8 text-center text-xs text-slate-400 dark:text-slate-500">
            Select a conversation to start chatting.
          </div>
        )}
      </div>
    </div>
  );
};
