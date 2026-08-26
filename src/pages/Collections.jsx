import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Flame, Sparkles, Moon, Sun, Package, Tag, Building2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const collectionMeta = {
  "Vibrators": { icon: Sparkles, color: "from-rose-500 to-pink-600", description: "Powerful vibrating pleasure devices" },
  "Enhancers": { icon: Flame, color: "from-orange-500 to-red-600", description: "Enhancing gels, balms & stimulants" },
  "Edibles": { icon: Heart, color: "from-pink-500 to-rose-600", description: "Tasty treats for playful moments" },
  "Games": { icon: Sun, color: "from-yellow-500 to-orange-500", description: "Fun games to spice up your night" },
  "Toy Accessories": { icon: Package, color: "from-purple-500 to-indigo-600", description: "Accessories and care products" },
  "Consulting": { icon: Moon, color: "from-blue-500 to-cyan-600", description: "Expert guidance & consulting" },
};

const defaultMeta = { icon: Tag, color: "from-gray-700 to-gray-900", description: "Explore this collection" };
const brandMeta = { icon: Building2, color: "from-slate-600 to-slate-800", description: "Products from this brand" };

const PALETTE = [
  "from-rose-500 to-pink-600",
  "from-orange-500 to-red-600",
  "from-pink-500 to-rose-600",
  "from-yellow-500 to-orange-500",
  "from-purple-500 to-indigo-600",
  "from-blue-500 to-cyan-600",
  "from-green-500 to-emerald-600",
  "from-teal-500 to-cyan-600",
  "from-fuchsia-500 to-purple-600",
  "from-amber-500 to-orange-600",
];
const colorFor = (name) => PALETTE[(name || "").length % PALETTE.length];

// Paginate through ALL products (the SDK caps each call, so we page by
// created_date cursor and dedupe to survive timestamp collisions from bulk imports).
const loadAllProducts = async (onProgress) => {
  const PAGE = 500;
  const all = [];
  const seen = new Set();
  let lastDate = null;
  for (let i = 0; i < 50; i++) {
    const batch = lastDate === null
      ? await base44.entities.Product.list('-created_date', PAGE)
      : await base44.entities.Product.filter({ created_date: { $lte: lastDate } }, '-created_date', PAGE);
    const fresh = batch.filter(p => !seen.has(p.id));
    fresh.forEach(p => seen.add(p.id));
    all.push(...fresh);
    onProgress?.(all.length);
    if (batch.length < PAGE) break;
    if (fresh.length === 0) break;
    lastDate = batch[batch.length - 1].created_date;
  }
  return all;
};

const buildGroups = (products, field) => {
  const groups = {};
  products.forEach(p => {
    const key = p[field];
    if (!key) return;
    if (!groups[key]) groups[key] = { name: key, count: 0, image: null };
    groups[key].count++;
    if (!groups[key].image && p.image_1) groups[key].image = p.image_1;
  });
  return Object.values(groups).sort((a, b) => b.count - a.count);
};

export default function Collections() {
  const [mode, setMode] = useState('category');
  const [products, setProducts] = useState([]);
  const [loaded, setLoaded] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAllProducts(setLoaded).then(all => {
      setProducts(all);
      setLoading(false);
    });
  }, []);

  const total = products.length;
  const groups = mode === 'category' ? buildGroups(products, 'category') : buildGroups(products, 'manufacturer');

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            {loading ? 'Loading your catalog…' : `Browse all ${total.toLocaleString()} products organized by ${mode === 'category' ? 'category' : 'brand'}`}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Organization toggle */}
        <div className="flex justify-center mb-10">
          <div className="inline-flex bg-white rounded-full shadow-sm border border-gray-100 p-1">
            <button
              onClick={() => setMode('category')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${mode === 'category' ? 'bg-rose-500 text-white shadow' : 'text-gray-600 hover:text-rose-600'}`}
            >
              <Tag className="w-4 h-4" />
              By Category
            </button>
            <button
              onClick={() => setMode('brand')}
              className={`flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-medium transition-all ${mode === 'brand' ? 'bg-rose-500 text-white shadow' : 'text-gray-600 hover:text-rose-600'}`}
            >
              <Building2 className="w-4 h-4" />
              By Brand
            </button>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col items-center py-20 gap-4">
            <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
            <p className="text-gray-500 text-sm">{loaded.toLocaleString()} products loaded…</p>
          </div>
        ) : groups.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg">No collections found</p>
          </div>
        ) : (
          <>
            <p className="text-gray-500 mb-6 text-sm">
              {groups.length} {mode === 'category' ? 'categories' : 'brands'} · {total.toLocaleString()} products
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {groups.map((group, index) => {
                const meta = mode === 'category'
                  ? (collectionMeta[group.name] || { ...defaultMeta, color: colorFor(group.name) })
                  : { ...brandMeta, color: colorFor(group.name) };
                const Icon = meta.icon;
                const linkTo = mode === 'category'
                  ? `/Shop?category=${encodeURIComponent(group.name)}`
                  : `/Shop?manufacturer=${encodeURIComponent(group.name)}`;
                return (
                  <motion.div
                    key={group.name}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: Math.min(index * 0.04, 0.4) }}
                    whileHover={{ y: -10 }}
                  >
                    <Link to={linkTo}>
                      <div className="group relative h-80 rounded-3xl overflow-hidden shadow-lg cursor-pointer">
                        {group.image ? (
                          <img
                            src={group.image}
                            alt={group.name}
                            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            onError={e => { e.target.style.display = 'none'; }}
                          />
                        ) : (
                          <div className={`absolute inset-0 bg-gradient-to-br ${meta.color}`} />
                        )}
                        <div className={`absolute inset-0 bg-gradient-to-t ${meta.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
                        <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                          <div className="flex justify-between items-start">
                            <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                              <Icon className="w-7 h-7" />
                            </div>
                            <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                              {group.count.toLocaleString()} products
                            </span>
                          </div>
                          <div>
                            <h3 className="text-2xl font-bold mb-2 line-clamp-2">{group.name}</h3>
                            <p className="text-white/80 mb-4">{meta.description}</p>
                            <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                              Explore Collection
                              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </>
        )}
      </div>
    </div>
  );
}