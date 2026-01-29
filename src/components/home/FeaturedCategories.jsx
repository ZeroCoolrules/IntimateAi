import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    name: "Solo",
    description: "Individual pleasure & self-discovery",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697bbb6a77b3a2dc011c4f24/a21f4e667_pexels-shvetsa-5187376.jpg",
    color: "from-rose-500 to-pink-600",
    slug: "solo"
  },
  {
    name: "Couples",
    description: "Shared experiences for two",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697bbb6a77b3a2dc011c4f24/da8c1197c_pexels-shvetsa-5187503.jpg",
    color: "from-pink-500 to-purple-600",
    slug: "couples"
  },
  {
    name: "Wellness",
    description: "Intimate health & care",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697bbb6a77b3a2dc011c4f24/6db9d1a95_pexels-shvetsa-5187656.jpg",
    color: "from-purple-500 to-indigo-600",
    slug: "wellness"
  },
  {
    name: "Massage",
    description: "Sensual oils & accessories",
    image: "https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/697bbb6a77b3a2dc011c4f24/810c46402_pexels-shvetsa-5187488.jpg",
    color: "from-indigo-500 to-rose-600",
    slug: "massage"
  }
];

export default function FeaturedCategories() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-rose-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-4">
            Categories
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Explore Our{' '}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Collections
            </span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <motion.div
              key={category.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link to={`${createPageUrl('Shop')}?category=${category.slug}`}>
                <div className="group relative h-80 rounded-3xl overflow-hidden cursor-pointer">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${category.color} opacity-60 group-hover:opacity-70 transition-opacity duration-300`} />
                  
                  <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
                    <motion.div
                      initial={{ y: 20, opacity: 0 }}
                      whileInView={{ y: 0, opacity: 1 }}
                      transition={{ delay: index * 0.15 }}
                    >
                      <h3 className="text-2xl font-bold mb-2">{category.name}</h3>
                      <p className="text-white/80 text-sm mb-4">{category.description}</p>
                      <div className="flex items-center gap-2 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        Explore
                        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </motion.div>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}