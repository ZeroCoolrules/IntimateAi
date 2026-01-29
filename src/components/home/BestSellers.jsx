import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Star, ShoppingBag, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const bestSellers = [
  {
    id: 1,
    name: "Premium Silicone Vibrator",
    price: 59.99,
    originalPrice: 79.99,
    rating: 4.9,
    reviews: 234,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697bbb6a77b3a2dc011c4f24/afe7bbec9_pexels-shvetsa-5187355.jpg",
    tag: "Best Seller"
  },
  {
    id: 2,
    name: "Sensual Massage Kit",
    price: 37.99,
    rating: 4.8,
    reviews: 156,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697bbb6a77b3a2dc011c4f24/f5a45b82d_pexels-shvetsa-5187496.jpg",
    tag: "Complete Kit"
  },
  {
    id: 3,
    name: "Premium Massage Oil",
    price: 17.99,
    rating: 4.7,
    reviews: 312,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697bbb6a77b3a2dc011c4f24/810c46402_pexels-shvetsa-5187488.jpg",
    tag: "Top Rated"
  },
  {
    id: 4,
    name: "Luxury Lingerie Set",
    price: 49.99,
    originalPrice: 65.99,
    rating: 4.9,
    reviews: 189,
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697bbb6a77b3a2dc011c4f24/883b749f1_pexels-shvetsa-5187564.jpg",
    tag: "Sale"
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
              Featured
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              Best{' '}
              <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Sellers
              </span>
            </h2>
          </div>
          <Link to={createPageUrl('Shop')}>
            <Button variant="outline" className="mt-4 sm:mt-0 border-rose-200 text-rose-600 hover:bg-rose-50 rounded-full">
              View All
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
                    Add to Cart
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
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${product.originalPrice.toFixed(2)}
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