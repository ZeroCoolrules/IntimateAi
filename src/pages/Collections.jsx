import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Flame, Sparkles, Moon, Sun, Package } from 'lucide-react';
import { base44 } from '@/api/base44Client';

const collectionMeta = {
  "Vibrators": { icon: Sparkles, color: "from-rose-500 to-pink-600", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop", description: "Powerful vibrating pleasure devices" },
  "Enhancers": { icon: Flame, color: "from-orange-500 to-red-600", image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop", description: "Enhancing gels, balms & stimulants" },
  "Edibles": { icon: Heart, color: "from-pink-500 to-rose-600", image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop", description: "Tasty treats for playful moments" },
  "Games": { icon: Sun, color: "from-yellow-500 to-orange-500", image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop", description: "Fun games to spice up your night" },
  "Toy Accessories": { icon: Package, color: "from-purple-500 to-indigo-600", image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop", description: "Accessories and care products" },
  "Consulting": { icon: Moon, color: "from-blue-500 to-cyan-600", image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop", description: "Expert guidance & consulting" },
};

const defaultMeta = { icon: Sparkles, color: "from-gray-700 to-gray-900", image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop", description: "Explore this collection" };

export default function Collections() {
  const [categoryCounts, setCategoryCounts] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    base44.entities.Product.list('-created_date', 500).then(products => {
      const counts = {};
      products.forEach(p => {
        if (p.category) {
          counts[p.category] = (counts[p.category] || 0) + 1;
        }
      });
      setCategoryCounts(counts);
      setLoading(false);
    });
  }, []);

  const categories = Object.entries(categoryCounts).sort((a, b) => b[1] - a[1]);

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
            Browse our full product catalog by category
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map(([category, count], index) => {
              const meta = collectionMeta[category] || defaultMeta;
              const Icon = meta.icon;
              return (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.07 }}
                  whileHover={{ y: -10 }}
                >
                  <Link to={`/Shop?category=${encodeURIComponent(category)}`}>
                    <div className="group relative h-80 rounded-3xl overflow-hidden shadow-lg cursor-pointer">
                      <img
                        src={meta.image}
                        alt={category}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                      <div className={`absolute inset-0 bg-gradient-to-t ${meta.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
                      <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                        <div className="flex justify-between items-start">
                          <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                            <Icon className="w-7 h-7" />
                          </div>
                          <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                            {count} products
                          </span>
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold mb-2">{category}</h3>
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
        )}
      </div>
    </div>
  );
}