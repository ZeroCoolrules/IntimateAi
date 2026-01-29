import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight, Heart, Flame, Sparkles, Moon, Sun } from 'lucide-react';

const collections = [
  {
    id: 1,
    name: "Romantic Night",
    description: "Products for an unforgettable night together",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=800&h=600&fit=crop",
    icon: Heart,
    color: "from-rose-500 to-pink-600",
    products: 24
  },
  {
    id: 2,
    name: "Self-Discovery",
    description: "Discover your body and desires",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=800&h=600&fit=crop",
    icon: Sparkles,
    color: "from-purple-500 to-indigo-600",
    products: 18
  },
  {
    id: 3,
    name: "Sensory Adventure",
    description: "Explore new limits of pleasure",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=800&h=600&fit=crop",
    icon: Flame,
    color: "from-orange-500 to-red-600",
    products: 32
  },
  {
    id: 4,
    name: "Relaxation",
    description: "Massage and wellness for body and mind",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=800&h=600&fit=crop",
    icon: Moon,
    color: "from-blue-500 to-cyan-600",
    products: 15
  },
  {
    id: 5,
    name: "First Time",
    description: "Ideal products for beginners",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=800&h=600&fit=crop",
    icon: Sun,
    color: "from-yellow-500 to-orange-500",
    products: 20
  },
  {
    id: 6,
    name: "Premium Selection",
    description: "The best in quality and sophistication",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=800&h=600&fit=crop",
    icon: Sparkles,
    color: "from-gray-800 to-gray-900",
    products: 12
  }
];

export default function Collections() {
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
            Special Collections
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Carefully curated products for every moment
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {collections.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -10 }}
            >
              <Link to={`${createPageUrl('Shop')}?collection=${collection.id}`}>
                <div className="group relative h-80 rounded-3xl overflow-hidden shadow-lg cursor-pointer">
                  <img
                    src={collection.image}
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${collection.color} opacity-70 group-hover:opacity-80 transition-opacity duration-300`} />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-between text-white">
                    <div className="flex justify-between items-start">
                      <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
                        <collection.icon className="w-7 h-7" />
                      </div>
                      <span className="px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-sm">
                        {collection.products} produtos
                      </span>
                    </div>
                    
                    <div>
                      <h3 className="text-2xl font-bold mb-2">{collection.name}</h3>
                      <p className="text-white/80 mb-4">{collection.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore Collection
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}