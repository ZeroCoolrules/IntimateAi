import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronDown, Layers } from 'lucide-react';

export default function CategorySideMenu({ hierarchy, parentParam, childParam, parentLabel }) {
  const [expanded, setExpanded] = useState(() => new Set(hierarchy[0] ? [hierarchy[0].name] : []));

  const toggle = (name) => setExpanded(prev => {
    const next = new Set(prev);
    if (next.has(name)) next.delete(name); else next.add(name);
    return next;
  });

  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="px-4 py-3 border-b border-gray-100 flex items-center gap-2">
        <Layers className="w-4 h-4 text-rose-500" />
        <h2 className="font-semibold text-gray-900 text-sm">Browse by {parentLabel}</h2>
      </div>
      <div className="max-h-[70vh] overflow-auto divide-y divide-gray-50">
        {hierarchy.map(parent => {
          const isOpen = expanded.has(parent.name);
          return (
            <div key={parent.name}>
              <div className="flex items-center">
                <Link
                  to={`/Shop?${parentParam}=${encodeURIComponent(parent.name)}`}
                  className="flex-1 px-4 py-2.5 text-sm text-gray-700 hover:bg-rose-50 hover:text-rose-700 flex items-center justify-between"
                >
                  <span className="truncate">{parent.name}</span>
                  <span className="text-xs text-gray-400 ml-2 shrink-0">{parent.count.toLocaleString()}</span>
                </Link>
                <button
                  onClick={() => toggle(parent.name)}
                  className="px-3 py-2.5 text-gray-400 hover:text-rose-600"
                  aria-label={`Expand ${parent.name}`}
                >
                  <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                </button>
              </div>
              {isOpen && parent.children.length > 0 && (
                <div className="bg-gray-50/60 pb-1">
                  {parent.children.map(child => (
                    <Link
                      key={child.name}
                      to={`/Shop?${parentParam}=${encodeURIComponent(parent.name)}&${childParam}=${encodeURIComponent(child.name)}`}
                      className="block pl-10 pr-4 py-2 text-xs text-gray-600 hover:bg-rose-50 hover:text-rose-700"
                    >
                      <span className="flex items-center justify-between">
                        <span className="truncate">{child.name}</span>
                        <span className="text-gray-400 ml-2 shrink-0">{child.count.toLocaleString()}</span>
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}