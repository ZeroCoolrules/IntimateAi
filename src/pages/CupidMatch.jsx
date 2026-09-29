import React, { useState, useEffect, useRef } from 'react';
import { Heart, Send, Plus, MessageCircle, Sparkles } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import MessageBubble from '@/components/agent/MessageBubble';

const AGENT_NAME = 'cupid_match';

export default function CupidMatch() {
  const [conversations, setConversations] = useState([]);
  const [activeId, setActiveId] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [loadingList, setLoadingList] = useState(true);
  const scrollRef = useRef(null);

  const loadList = async () => {
    try {
      const list = await base44.agents.listConversations({ agent_name: AGENT_NAME });
      setConversations(list || []);
    } catch {
      setConversations([]);
    }
    setLoadingList(false);
  };

  useEffect(() => { loadList(); }, []);

  useEffect(() => {
    if (!activeId) return;
    const unsubscribe = base44.agents.subscribeToConversation(activeId, (data) => {
      setMessages(data.messages || []);
      setBusy(false);
    });
    return () => unsubscribe();
  }, [activeId]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages]);

  const startNew = async () => {
    try {
      const conv = await base44.agents.createConversation({
        agent_name: AGENT_NAME,
        metadata: { name: 'Cupid Match', description: 'Comfort-level interview' },
      });
      setActiveId(conv.id);
      setMessages([]);
      await loadList();
    } catch (e) {
      setBusy(false);
    }
  };

  const openConv = async (conv) => {
    try {
      const full = await base44.agents.getConversation(conv.id);
      setActiveId(conv.id);
      setMessages(full.messages || []);
    } catch { /* ignore */ }
  };

  const send = async () => {
    if (!input.trim() || !activeId || busy) return;
    const text = input.trim();
    setInput('');
    setBusy(true);
    setMessages(prev => [...prev, { role: 'user', content: text }]);
    try {
      const conv = await base44.agents.getConversation(activeId);
      await base44.agents.addMessage(conv, { role: 'user', content: text });
    } catch {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex">
      {/* Conversation list */}
      <aside className="w-72 border-r border-gray-100 bg-white/60 flex flex-col">
        <div className="p-4 border-b border-gray-100">
          <Button onClick={startNew} className="w-full bg-gradient-to-r from-rose-500 to-purple-500 rounded-full">
            <Plus className="w-4 h-4 mr-2" /> New Match Session
          </Button>
        </div>
        <div className="flex-1 overflow-auto p-2 space-y-1">
          {loadingList ? (
            <p className="text-sm text-gray-400 p-3">Loading…</p>
          ) : conversations.length === 0 ? (
            <p className="text-sm text-gray-400 p-3">No sessions yet.</p>
          ) : conversations.map(c => (
            <button
              key={c.id}
              onClick={() => openConv(c)}
              className={`w-full text-left flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm transition-colors ${activeId === c.id ? 'bg-rose-50 text-rose-700' : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <MessageCircle className="w-4 h-4 shrink-0" />
              <span className="truncate">{c.metadata?.name || 'Cupid Match'}</span>
            </button>
          ))}
        </div>
      </aside>

      {/* Chat panel */}
      <div className="flex-1 flex flex-col">
        {!activeId ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center px-6">
            <div className="w-20 h-20 rounded-3xl bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center mb-6">
              <Heart className="w-10 h-10 text-white" fill="white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-3">Cupid's Matchmaker</h1>
            <p className="text-gray-500 max-w-md mb-8">
              Let Cupid interview you about your comfort level and desires, then get personalized picks from our catalog.
            </p>
            <Button onClick={startNew} size="lg" className="rounded-full bg-gradient-to-r from-rose-500 to-purple-500">
              <Sparkles className="w-5 h-5 mr-2" /> Start Interview
            </Button>
          </div>
        ) : (
          <>
            <div className="px-6 py-4 border-b border-gray-100 bg-white/60">
              <h2 className="font-semibold text-gray-900 flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-500" fill="currentColor" /> Cupid Matchmaker
              </h2>
            </div>
            <div ref={scrollRef} className="flex-1 overflow-auto px-4 sm:px-6 py-6 space-y-4 bg-gray-50/40">
              {messages.map((m, i) => <MessageBubble key={i} message={m} />)}
              {busy && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 rounded-full bg-rose-300 animate-bounce" />
                      <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" style={{ animationDelay: '0.1s' }} />
                      <span className="w-2 h-2 rounded-full bg-rose-500 animate-bounce" style={{ animationDelay: '0.2s' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex gap-2 max-w-4xl mx-auto">
                <Input
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && send()}
                  placeholder="Tell Cupid how you're feeling…"
                  className="rounded-full h-12"
                />
                <Button onClick={send} disabled={busy || !input.trim()} size="icon" className="h-12 w-12 rounded-full bg-rose-500 hover:bg-rose-600">
                  <Send className="w-5 h-5" />
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}