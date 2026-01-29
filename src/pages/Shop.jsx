import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Star, ShoppingBag, Heart, X, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Checkbox } from '@/components/ui/checkbox';

const products = [
  {
    id: 1,
    name: "Vibrador Premium Silicone",
    price: 299.90,
    originalPrice: 399.90,
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop",
    category: "solo",
    experienceLevel: "beginner",
    tags: ["silicone", "recarregável", "à prova d'água"]
  },
  {
    id: 2,
    name: "Kit Massagem Sensual Completo",
    price: 189.90,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop",
    category: "couples",
    experienceLevel: "beginner",
    tags: ["óleo", "velas", "penas"]
  },
  {
    id: 3,
    name: "Óleo de Massagem Premium",
    price: 89.90,
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    category: "massage",
    experienceLevel: "beginner",
    tags: ["aromático", "hidratante", "comestível"]
  },
  {
    id: 4,
    name: "Conjunto Lingerie Luxo",
    price: 249.90,
    originalPrice: 329.90,
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    category: "lingerie",
    experienceLevel: "intermediate",
    tags: ["renda", "seda", "bordado"]
  },
  {
    id: 5,
    name: "Gel Estimulante Premium",
    price: 69.90,
    rating: 4.6,
    reviews: 423,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=500&fit=crop",
    category: "wellness",
    experienceLevel: "beginner",
    tags: ["aquece", "formiga", "natural"]
  },
  {
    id: 6,
    name: "Anel Vibratório Recarregável",
    price: 159.90,
    rating: 4.8,
    reviews: 278,
    image: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=500&fit=crop",
    category: "couples",
    experienceLevel: "intermediate",
    tags: ["silicone", "recarregável", "10 modos"]
  },
  {
    id: 7,
    name: "Kit BDSM Iniciante",
    price: 199.90,
    rating: 4.5,
    reviews: 145,
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=500&fit=crop",
    category: "accessories",
    experienceLevel: "intermediate",
    tags: ["couro", "algemas", "venda"]
  },
  {
    id: 8,
    name: "Lubrificante à Base de Água",
    price: 49.90,
    rating: 4.9,
    reviews: 567,
    image: "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&h=500&fit=crop",
    category: "wellness",
    experienceLevel: "beginner",
    tags: ["hipoalergênico", "sem fragrância", "longa duração"]
  }
];

const categories = [
  { value: "all", label: "Todas" },
  { value: "solo", label: "Solo" },
  { value: "couples", label: "Casais" },
  { value: "wellness", label: "Bem-estar" },
  { value: "massage", label: "Massagem" },
  { value: "lingerie", label: "Lingerie" },
  { value: "accessories", label: "Acessórios" }
];

const experienceLevels = [
  { value: "beginner", label: "Iniciante" },
  { value: "intermediate", label: "Intermediário" },
  { value: "advanced", label: "Avançado" }
];

export default function Shop() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLevels, setSelectedLevels] = useState([]);
  const [sortBy, setSortBy] = useState('featured');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const category = params.get('category');
    if (category) {
      setSelectedCategory(category);
    }
  }, []);

  const toggleFavorite = (productId) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const toggleLevel = (level) => {
    setSelectedLevels(prev =>
      prev.includes(level)
        ? prev.filter(l => l !== level)
        : [...prev, level]
    );
  };

  const filteredProducts = products
    .filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesLevel = selectedLevels.length === 0 || selectedLevels.includes(product.experienceLevel);
      return matchesSearch && matchesCategory && matchesLevel;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'price-asc': return a.price - b.price;
        case 'price-desc': return b.price - a.price;
        case 'rating': return b.rating - a.rating;
        default: return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Nossa Loja
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Produtos premium selecionados para seu prazer e bem-estar
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Bar */}
        <div className="flex flex-col lg:flex-row gap-4 mb-8">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              placeholder="Buscar produtos..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 rounded-full border-gray-200 focus:border-rose-300"
            />
          </div>

          {/* Category Select */}
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-full lg:w-48 h-12 rounded-full">
              <SelectValue placeholder="Categoria" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* Sort Select */}
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-full lg:w-48 h-12 rounded-full">
              <SelectValue placeholder="Ordenar" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="featured">Destaque</SelectItem>
              <SelectItem value="price-asc">Menor Preço</SelectItem>
              <SelectItem value="price-desc">Maior Preço</SelectItem>
              <SelectItem value="rating">Melhor Avaliação</SelectItem>
            </SelectContent>
          </Select>

          {/* Mobile Filters */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="lg:hidden rounded-full h-12">
                <Filter className="w-4 h-4 mr-2" />
                Filtros
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-80">
              <SheetHeader>
                <SheetTitle>Filtros</SheetTitle>
              </SheetHeader>
              <div className="py-6 space-y-6">
                <div>
                  <h3 className="font-semibold mb-4">Nível de Experiência</h3>
                  <div className="space-y-3">
                    {experienceLevels.map(level => (
                      <label key={level.value} className="flex items-center gap-3 cursor-pointer">
                        <Checkbox
                          checked={selectedLevels.includes(level.value)}
                          onCheckedChange={() => toggleLevel(level.value)}
                        />
                        <span>{level.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Filters Sidebar + Products Grid */}
        <div className="flex gap-8">
          {/* Desktop Filters */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <div className="sticky top-24 bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
              <h3 className="font-semibold text-gray-900 mb-4">Nível de Experiência</h3>
              <div className="space-y-3">
                {experienceLevels.map(level => (
                  <label key={level.value} className="flex items-center gap-3 cursor-pointer group">
                    <Checkbox
                      checked={selectedLevels.includes(level.value)}
                      onCheckedChange={() => toggleLevel(level.value)}
                    />
                    <span className="text-gray-600 group-hover:text-rose-600 transition-colors">
                      {level.label}
                    </span>
                  </label>
                ))}
              </div>

              {selectedLevels.length > 0 && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedLevels([])}
                  className="mt-4 text-rose-600 hover:text-rose-700"
                >
                  <X className="w-4 h-4 mr-1" />
                  Limpar filtros
                </Button>
              )}
            </div>
          </div>

          {/* Products Grid */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                {filteredProducts.length} produto{filteredProducts.length !== 1 ? 's' : ''} encontrado{filteredProducts.length !== 1 ? 's' : ''}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {filteredProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                    className="group"
                  >
                    <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      
                      {/* Favorite Button */}
                      <button
                        onClick={() => toggleFavorite(product.id)}
                        className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                          favorites.includes(product.id)
                            ? 'bg-rose-500 text-white'
                            : 'bg-white/90 text-gray-600 hover:bg-rose-500 hover:text-white'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${favorites.includes(product.id) ? 'fill-current' : ''}`} />
                      </button>

                      {/* Discount Badge */}
                      {product.originalPrice && (
                        <div className="absolute top-4 left-4">
                          <Badge className="bg-rose-500 text-white">
                            -{Math.round((1 - product.price / product.originalPrice) * 100)}%
                          </Badge>
                        </div>
                      )}

                      {/* Quick Add */}
                      <div className="absolute inset-x-4 bottom-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <Button className="w-full bg-white/95 text-gray-900 hover:bg-rose-500 hover:text-white rounded-full shadow-lg">
                          <ShoppingBag className="w-4 h-4 mr-2" />
                          Adicionar
                        </Button>
                      </div>
                    </div>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-1 mb-2">
                      {product.tags.slice(0, 2).map((tag, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs bg-rose-50 text-rose-600 border-0">
                          {tag}
                        </Badge>
                      ))}
                    </div>

                    {/* Rating */}
                    <div className="flex items-center gap-1 mb-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                      <span className="text-sm text-gray-500">({product.reviews})</span>
                    </div>

                    {/* Name */}
                    <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                      {product.name}
                    </h3>

                    {/* Price */}
                    <div className="flex items-center gap-2">
                      <span className="text-lg font-bold text-gray-900">
                        R$ {product.price.toFixed(2).replace('.', ',')}
                      </span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-400 line-through">
                          R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-16">
                <p className="text-gray-500 text-lg">Nenhum produto encontrado</p>
                <Button
                  variant="outline"
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('all');
                    setSelectedLevels([]);
                  }}
                  className="mt-4"
                >
                  Limpar filtros
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}