import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { BookOpen, ArrowRight, Heart, Brain, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

const articles = [
  {
    icon: Heart,
    title: "Intimate Self-Knowledge",
    description: "Discover how exploring your own body can transform your life.",
    category: "Wellness"
  },
  {
    icon: Brain,
    title: "Sexual & Mental Health",
    description: "The connection between pleasure and mental health: what science says.",
    category: "Education"
  },
  {
    icon: Sparkles,
    title: "Couples Communication",
    description: "How to talk about desires and fantasies with your partner.",
    category: "Relationships"
  }
];

export default function WellnessSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-purple-50/50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              Education & Wellness
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Knowledge is{' '}
              <span className="bg-gradient-to-r from-purple-500 to-rose-500 bg-clip-text text-transparent">
                Power
              </span>
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              We believe that intimate wellness goes beyond products. Our educational section offers carefully crafted content for your self-discovery journey.
            </p>

            <div className="space-y-4 mb-8">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 rounded-xl bg-white border border-gray-100 hover:border-purple-200 hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-100 to-rose-100 flex items-center justify-center flex-shrink-0">
                    <article.icon className="w-6 h-6 text-purple-600" />
                  </div>
                  <div>
                    <span className="text-xs text-purple-600 font-medium">{article.category}</span>
                    <h3 className="font-semibold text-gray-900">{article.title}</h3>
                    <p className="text-sm text-gray-500">{article.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <Link to={createPageUrl('Wellness')}>
              <Button className="bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-600 text-white rounded-full px-8">
                <BookOpen className="w-4 h-4 mr-2" />
                Explore Content
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=700&fit=crop"
                alt="Educação sexual"
                className="w-full h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-purple-900/60 via-transparent to-transparent" />
              
              <div className="absolute bottom-6 left-6 right-6">
                <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-rose-400 flex items-center justify-center">
                      <BookOpen className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-900">+50 Articles</p>
                      <p className="text-sm text-gray-500">Exclusive content</p>
                    </div>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2">
                    <div className="bg-gradient-to-r from-purple-500 to-rose-500 h-2 rounded-full" style={{ width: '75%' }} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}