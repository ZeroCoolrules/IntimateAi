import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, ShoppingBag, Heart, X, ChevronDown, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { base44 } from '@/api/base44Client';

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedManufacturer, setSelectedManufacturer] = useState('');
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 24;

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const cat = params.get('category');
    if (cat) setSelectedCategory(cat);
    const mfr = params.get('manufacturer');
    if (mfr) setSelectedManufacturer(mfr);
  }, []);

  useEffect(() => {
    setLoading(true);
    base44.entities.Product.list('-current_inventory', 5000).then(data => {
      setProducts(data);
      const cats = [...new Set(data.map(p => p.category).filter(Boolean))].sort();
      setCategories(cats);
      setLoading(false);
    });
  }, []);

  const toggleFavorite = (id) => {
    setFavorites(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const filteredProducts = products
    .filter(p => {
      const matchesSearch = !searchQuery || p.title?.toLowerCase().includes(searchQuery.toLowerCase()) || p.manufacturer?.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
      const matchesManufacturer = !selectedManufacturer || p.manufacturer === selectedManufacturer;
      return matchesSearch && matchesCategory && matchesManufacturer;
    })
    .sort((a, b) => {
      if (sortBy === 'price-asc') return (a.msrp || 0) - (b.msrp || 0);
      if (sortBy === 'price-desc') return (b.msrp || 0) - (a.msrp || 0);
      if (sortBy === 'inventory') return (b.current_inventory || 0) - (a.current_inventory || 0);
      return 0;
    });

  const paginated = filteredProducts.slice(0, page * PAGE_SIZE);

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Our Shop
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            {products.length > 0 ? `${products.length.toLocaleString()} products available` : 'Premium products selected for your pleasure and wellness'}
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => { setSearchQuery(e.target.value); setPage(1); }}
              className="pl-12 h-12 rounded-full border-gray-200 focus:border-rose-300"
            />
          </div>
          <Select value={selectedCategory} onValueChange={v => { setSelectedCategory(v); setPage(1); }}>
            <SelectTrigger className="w-full sm:w-52 h-12 rounded-full">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{cat}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full sm:w-48 h-12 rounded-full">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Featured</SelectItem>
              <SelectItem value="price-asc">Lowest Price</SelectItem>
              <SelectItem value="price-desc">Highest Price</SelectItem>
              <SelectItem value="inventory">Most In Stock</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {selectedManufacturer && (
          <div className="flex items-center gap-2 mb-6">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-700 text-sm">
              <Building2 className="w-3.5 h-3.5" />
              Brand: {selectedManufacturer}
              <button onClick={() => { setSelectedManufacturer(''); setPage(1); }} className="hover:text-rose-900">
                <X className="w-3.5 h-3.5" />
              </button>
            </span>
          </div>
        )}
        <p className="text-gray-500 mb-6 text-sm">
          {loading ? 'Loading...' : `${filteredProducts.length} product${filteredProducts.length !== 1 ? 's' : ''} found`}
        </p>

        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-rose-200 border-t-rose-500 rounded-full animate-spin" />
          </div>
        ) : (
          <>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence mode="popLayout">
                {paginated.map((product, index) => (
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
                        <div className="w-full h-56 bg-gradient-to-br from-rose-100 to-purple-100 flex items-center justify-center">
                          <ShoppingBag className="w-12 h-12 text-rose-300" />
                        </div>
                      )}

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

                      {product.category && (
                        <div className="absolute top-3 left-3">
                          <Badge className="bg-white/90 text-gray-700 text-xs">{product.category}</Badge>
                        </div>
                      )}

                      <div className="absolute inset-x-3 bottom-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button className="w-full bg-white/95 text-gray-900 hover:bg-rose-500 hover:text-white rounded-full shadow-lg text-sm h-9">
                          <ShoppingBag className="w-3 h-3 mr-1.5" />
                          Add to Cart
                        </Button>
                      </div>
                    </div>

                    <div className="px-1">
                      {product.manufacturer && (
                        <p className="text-xs text-gray-400 uppercase tracking-wide mb-1">{product.manufacturer}</p>
                      )}
                      <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2 group-hover:text-rose-600 transition-colors leading-snug">
                        {product.title}
                      </h3>
                      <div className="flex items-center gap-2">
                        {product.msrp ? (
                          <span className="text-base font-bold text-gray-900">
                            ${parseFloat(product.msrp).toFixed(2)}
                          </span>
                        ) : null}
                      </div>
                      {product.current_inventory !== undefined && (
                        <p className="text-xs text-gray-400 mt-0.5">{product.current_inventory} in stock</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {paginated.length < filteredProducts.length && (
              <div className="text-center mt-10">
                <Button
                  variant="outline"
                  onClick={() => setPage(p => p + 1)}
                  className="rounded-full px-8"
                >
                  Load More ({filteredProducts.length - paginated.length} remaining)
                </Button>
              </div>
            )}

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg mb-4">No products found</p>
                <Button variant="outline" onClick={() => { setSearchQuery(''); setSelectedCategory('all'); setSelectedManufacturer(''); setPage(1); }}>
                  Clear filters
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}