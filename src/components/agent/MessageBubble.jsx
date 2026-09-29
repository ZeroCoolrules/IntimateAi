import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { CheckCircle2, Loader2, XCircle, ChevronDown, Wrench } from 'lucide-react';

const statusInfo = (status) => {
  switch (status) {
    case 'pending':
    case 'running':
    case 'in_progress':
      return { icon: Loader2, spin: true, text: 'Working…', color: 'text-blue-500' };
    case 'success':
    case 'completed':
      return { icon: CheckCircle2, spin: false, text: 'Done', color: 'text-green-500' };
    case 'failed':
    case 'error':
      return { icon: XCircle, spin: false, text: 'Failed', color: 'text-rose-500' };
    default:
      return { icon: Wrench, spin: false, text: status, color: 'text-gray-400' };
  }
};

function FunctionDisplay({ toolCall }) {
  const [expanded, setExpanded] = useState(false);
  const proj = toolCall.display_projection || {};
  const status = toolCall.status;
  const info = statusInfo(status);
  let parsedResults = null;
  try {
    parsedResults = typeof toolCall.results === 'string' ? JSON.parse(toolCall.results) : toolCall.results;
  } catch {
    parsedResults = toolCall.results;
  }
  const failed = ['failed', 'error'].includes(status)
    || /error|failed/i.test(JSON.stringify(toolCall.results || ''))
    || (parsedResults && parsedResults.success === false);

  if (proj.hide_details && proj.details_redacted) {
    const label = ['pending', 'running', 'in_progress'].includes(status)
      ? proj.active_label
      : (failed ? proj.error_label : proj.label);
    return (
      <div className="mt-2 flex items-center gap-2 text-xs text-gray-500">
        <info.icon className={`w-3.5 h-3.5 ${info.spin ? 'animate-spin' : ''} ${failed ? 'text-rose-500' : info.color}`} />
        <span>{label}</span>
      </div>
    );
  }

  let argsPretty = toolCall.arguments_string || '';
  try { argsPretty = JSON.stringify(JSON.parse(toolCall.arguments_string), null, 2); } catch { /* keep raw */ }

  return (
    <div className="mt-2 border border-gray-100 rounded-lg bg-gray-50 text-xs">
      <button onClick={() => setExpanded(!expanded)} className="flex items-center gap-2 w-full px-3 py-2">
        <info.icon className={`w-3.5 h-3.5 ${info.spin ? 'animate-spin' : ''} ${failed ? 'text-rose-500' : info.color}`} />
        <span className="font-medium text-gray-700">{toolCall.name}</span>
        <span className={failed ? 'text-rose-500' : 'text-gray-400'}>· {failed ? 'failed' : info.text}</span>
        <ChevronDown className={`w-3.5 h-3.5 ml-auto transition-transform ${expanded ? 'rotate-180' : ''}`} />
      </button>
      {expanded && (
        <div className="px-3 pb-3 space-y-2">
          {toolCall.arguments_string && (
            <div>
              <p className="font-medium text-gray-500 mb-1">Parameters:</p>
              <pre className="bg-white rounded p-2 overflow-auto whitespace-pre-wrap break-words">{argsPretty}</pre>
            </div>
          )}
          {toolCall.results != null && (
            <div>
              <p className="font-medium text-gray-500 mb-1">Result:</p>
              <pre className="bg-white rounded p-2 overflow-auto whitespace-pre-wrap break-words">{JSON.stringify(parsedResults, null, 2)}</pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default function MessageBubble({ message }) {
  const isUser = message.role === 'user';
  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] rounded-2xl px-4 py-3 ${isUser ? 'bg-rose-500 text-white' : 'bg-white border border-gray-100 text-gray-800 shadow-sm'}`}>
        {message.content && (isUser
          ? <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          : <ReactMarkdown className="text-sm prose prose-sm max-w-none prose-p:my-1 prose-li:my-0 prose-headings:my-2">{message.content}</ReactMarkdown>
        )}
        {message.tool_calls?.map((tc, i) => <FunctionDisplay key={i} toolCall={tc} />)}
      </div>
    </div>
  );
}