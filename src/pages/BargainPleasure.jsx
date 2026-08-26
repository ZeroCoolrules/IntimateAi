import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Tag, ShoppingBag, Heart, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { base44 } from '@/api/base44Client';

export default function BargainPleasure() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  useEffect(() => {
    base44.entities.Product.filter({ msrp: { $lte: 29.99 } }, 'msrp', 5000).then(data => {
      setProducts(data);
      setLoading(false);
    });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filtered = products.filter(p =>
    !searchQuery ||
    p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const paginated = filtered.slice(0, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50/40 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-orange-500 via-rose-500 to-pink-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6"
          >
            <Tag className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            🔥 Bargain Pleasure
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            All products $29.99 or less — now 25% off MSRP!
          </motion.p>
          {!loading && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 inline-block px-5 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white font-semibold"
            >
              {products.length} deals available
            </motion.div>
          )}
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Search */}
        <div className="relative max-w-md mb-8">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search bargains..."
            value={searchQuery}
            onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
            className="pl-12 h-12 rounded-full border-gray-200 focus:border-orange-300"
          />
        </div>

        <p className="text-gray-500 mb-6 text-sm">
          {loading ? 'Loading deals...' : `${filtered.length} deal${filtered.length !== 1 ? 's' : ''} found`}
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {paginated.map((product, index) => {
                  const msrp = parseFloat(product.msrp);
                  const salePrice = msrp * 0.75;
                  return (
                    <motion.div
                      key={product.id}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      transition={{ delay: Math.min(index * 0.02, 0.3) }}
                      whileHover={{ y: -5 }}
                      className="group"
                    >
                      <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-3">
                        {product.image_1 ? (
                          <img
                            src={product.image_1}
                            alt={product.title}
                            className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
                            onError={e => { e.target.src = 'https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=400&fit=crop'; }}
                          />
                        ) : (
                          <div className="w-full h-56 bg-gradient-to-br from-orange-100 to-rose-100 flex items-center justify-center">
                            <ShoppingBag className="w-12 h-12 text-orange-300" />
                          </div>
                        )}

                        {/* Sale badge */}
                        <div className="absolute top-3 left-3">
                          <span className="px-2 py-1 rounded-full bg-orange-500 text-white text-xs font-bold">
                            25% OFF
                          </span>
                        </div>

                        <button
                          onClick={() => toggleFavorite(product.id)}
                          className={`absolute top-3 right-3 w-9 h-9 rounded-full flex items-center justify-center transition-all duration-300 ${
                            favorites.includes(product.id)
                              ? 'bg-rose-500 text-white'
                              : 'bg-white/90 text-gray-600 hover:bg-rose-500 hover:text-white'
                          }`}
                        >
                          <Heart className={`w-4 h-4 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                        </button>

                        <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <Button className="w-full bg-white/95 text-gray-900 hover:bg-orange-500 hover:text-white rounded-full shadow-lg text-sm h-9">
                            <ShoppingBag className="w-3 h-3 mr-1.5" />
                            Add to Cart
                          </Button>
                        </div>
                      </div>

                      <div className="px-1">
                        {product.manufacturer && (
                          <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.manufacturer}</p>
                        )}
                        <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-orange-600 transition-colors leading-snug">
                          {product.title}
                        </h3>
                        <div className="flex items-center gap-2">
                          <span className="text-base font-bold text-orange-600">
                            ${salePrice.toFixed(2)}
                          </span>
                          <span className="text-xs text-gray-400 line-through">
                            ${msrp.toFixed(2)}
                          </span>
                        </div>
                        {product.current_inventory !== undefined && (
                          <p className="text-xs text-gray-400 mt-0.5">{product.current_inventory} in stock</p>
                        )}
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </div>

            {paginated.length < filtered.length && (
              <div className="text-center mt-10">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  className="rounded-full px-8 border-orange-300 text-orange-600 hover:bg-orange-50"
                >
                  Load More ({filtered.length - paginated.length} remaining)
                </Button>
              </div>
            )}

            {filtered.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">No deals found matching your search.</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}