import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bestSellers = [
  {
    id: 1,
    name: "Vibrador Premium Silicone",
    price: 299.90,
    originalPrice: 399.90,
    rating: 4.9,
    reviews: 234,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=500&fit=crop",
    tag: "Mais Vendido"
  },
  {
    id: 2,
    name: "Kit Massagem Sensual",
    price: 189.90,
    rating: 4.8,
    reviews: 156,
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=400&h=500&fit=crop",
    tag: "Kit Completo"
  },
  {
    id: 3,
    name: "Óleo de Massagem Premium",
    price: 89.90,
    rating: 4.7,
    reviews: 312,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=500&fit=crop",
    tag: "Top Avaliado"
  },
  {
    id: 4,
    name: "Conjunto Lingerie Luxo",
    price: 249.90,
    originalPrice: 329.90,
    rating: 4.9,
    reviews: 189,
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=400&h=500&fit=crop",
    tag: "Promoção"
  }
];

export default function BestSellers() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-12"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-4">
              Destaques
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Mais{' '}
              <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Vendidos
              </span>
            </h2>
          </div>
          <Link to={createPageUrl('Shop')}>
            <Button variant="outline" className="mt-4 sm:mt-0 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-full">
              Ver Todos
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {bestSellers.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group"
            >
              <div className="relative rounded-2xl overflow-hidden bg-gray-100 mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-72 object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full bg-gradient-to-r from-rose-500 to-pink-500 text-white text-xs font-medium">
                    {product.tag}
                  </span>
                </div>
                <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-white text-gray-900 hover:bg-rose-50 rounded-full">
                    <ShoppingBag className="w-4 h-4 mr-2" />
                    Adicionar
                  </Button>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium text-gray-900">{product.rating}</span>
                <span className="text-sm text-gray-500">({product.reviews})</span>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2 group-hover:text-rose-600 transition-colors">
                {product.name}
              </h3>

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
        </div>
      </div>
    </section>
  );
}