import React, { useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plug, Copy, Check, Bot, MessageSquare, MousePointer2, Code2, RefreshCw, ShieldCheck } from 'lucide-react';

const CLIENTS = [
  {
    key: 'claude',
    label: 'Claude',
    icon: MessageSquare,
    steps: [
      'Open the profile menu (top-right) and choose Settings.',
      'Go to Connectors and click "Add custom connector".',
      'Give it a name (e.g. "Cupid\'s Adult Toys") and paste the server URL above.',
      'Click Add. Claude opens this app\'s consent page — sign in with your account and approve.',
    ],
  },
  {
    key: 'chatgpt',
    label: 'ChatGPT',
    icon: Bot,
    steps: [
      'Open Apps and enable Developer mode (acknowledge the risk ChatGPT warns about).',
      'Click "Create app", name it, and paste the server URL above.',
      'Click Create, then enable the app from the chat composer before you prompt it.',
      'ChatGPT opens this app\'s consent page — sign in with your account and approve.',
    ],
  },
  {
    key: 'cursor',
    label: 'Cursor',
    icon: MousePointer2,
    steps: [
      'Open Settings → Tools & Integrations and click "New MCP Server".',
      'This opens your mcp.json — add an entry whose "url" is the server URL above.',
      'Save the file and toggle the new server on.',
      'Cursor opens this app\'s consent page — sign in with your account and approve.',
    ],
  },
  {
    key: 'custom',
    label: 'Custom',
    icon: Code2,
    steps: [
      'Copy the server URL above.',
      'Add it as a streamable HTTP MCP server in your client — a name and the URL is all most clients need.',
      'Reload the client so it picks up the new server.',
      'When prompted, approve access on this app\'s consent page (sign in with your account).',
    ],
  },
];

export default function Connect() {
  const serverUrl = useMemo(() => new URL('/api/mcp', window.location.origin).toString(), []);
  const [active, setActive] = useState('claude');
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(serverUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (_) { /* clipboard unavailable */ }
  };

  const client = CLIENTS.find(c => c.key === active);
  const ActiveIcon = client.icon;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 py-16 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center mx-auto mb-5"
          >
            <Plug className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl font-bold text-white mb-3"
          >
            Connect your AI assistant
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Point Claude, ChatGPT, Cursor, or any MCP-compatible client at this app so it can browse products, manage your cart, and more — acting as you.
          </motion.p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 -mt-10">
        {/* Server URL */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-8"
        >
          <p className="text-sm font-medium text-gray-500 mb-2">MCP server URL</p>
          <div className="flex items-center gap-3">
            <code className="flex-1 px-4 py-3 bg-gray-50 rounded-xl text-sm text-gray-800 overflow-x-auto whitespace-nowrap">
              {serverUrl}
            </code>
            <button
              onClick={copy}
              className="shrink-0 inline-flex items-center gap-2 px-4 py-3 rounded-xl bg-rose-500 text-white text-sm font-medium hover:bg-rose-600 transition-colors"
            >
              {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              {copied ? 'Copied' : 'Copy'}
            </button>
          </div>
          <div className="mt-4 flex items-start gap-2 text-xs text-gray-500">
            <ShieldCheck className="w-4 h-4 text-green-500 shrink-0 mt-0.5" />
            <span>Access is OAuth — each assistant signs in with <strong>your</strong> account and asks you to approve on this app's consent page, so it only ever acts as you.</span>
          </div>
        </motion.div>

        {/* Client tabs */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
          {CLIENTS.map(c => {
            const Icon = c.icon;
            const isActive = c.key === active;
            return (
              <button
                key={c.key}
                onClick={() => setActive(c.key)}
                className={`flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-rose-500 text-white shadow'
                    : 'bg-white text-gray-600 border border-gray-100 hover:border-rose-200 hover:text-rose-600'
                }`}
              >
                <Icon className="w-4 h-4" />
                {c.label}
              </button>
            );
          })}
        </div>

        {/* Steps */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6"
          >
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center">
                <ActiveIcon className="w-5 h-5 text-white" />
              </div>
              <h2 className="text-lg font-bold text-gray-900">Set up {client.label}</h2>
            </div>
            <ol className="space-y-4">
              {client.steps.map((step, i) => (
                <li key={i} className="flex gap-3">
                  <span className="shrink-0 w-7 h-7 rounded-full bg-rose-50 text-rose-600 text-sm font-semibold flex items-center justify-center">
                    {i + 1}
                  </span>
                  <p className="text-gray-700 text-sm leading-relaxed pt-0.5">{step}</p>
                </li>
              ))}
            </ol>
          </motion.div>
        </AnimatePresence>

        {/* Refresh note */}
        <div className="mt-6 flex items-start gap-3 p-4 rounded-xl bg-amber-50 border border-amber-100">
          <RefreshCw className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
          <p className="text-sm text-amber-800">
            Assistants cache the tool list. If we ship changes to this app, refresh or reconnect the connector so it picks up the latest tools.
          </p>
        </div>
      </div>
    </div>
  );
}