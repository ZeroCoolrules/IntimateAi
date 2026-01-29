import React from 'react';
import { motion } from 'framer-motion';
import { BookOpen, Heart, Brain, MessageCircle, Shield, Sparkles, Clock, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const articles = [
  {
    id: 1,
    title: "Guia Completo do Autoconhecimento Íntimo",
    excerpt: "Descubra como a exploração do próprio corpo pode transformar sua vida e aumentar seu bem-estar.",
    image: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?w=600&h=400&fit=crop",
    category: "Bem-estar",
    readTime: "8 min",
    icon: Heart
  },
  {
    id: 2,
    title: "Saúde Sexual e Mental: Uma Conexão Poderosa",
    excerpt: "A ciência comprova: prazer e saúde mental estão intimamente conectados. Saiba mais.",
    image: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?w=600&h=400&fit=crop",
    category: "Saúde",
    readTime: "6 min",
    icon: Brain
  },
  {
    id: 3,
    title: "Como Falar Sobre Desejos com Seu Parceiro",
    excerpt: "Comunicação é a chave para uma vida sexual satisfatória. Aprenda técnicas eficazes.",
    image: "https://images.unsplash.com/photo-1516589178581-6cd7833ae3b2?w=600&h=400&fit=crop",
    category: "Relacionamentos",
    readTime: "10 min",
    icon: MessageCircle
  },
  {
    id: 4,
    title: "Segurança em Primeiro Lugar",
    excerpt: "Tudo o que você precisa saber sobre materiais seguros e higiene dos produtos íntimos.",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=400&fit=crop",
    category: "Segurança",
    readTime: "5 min",
    icon: Shield
  },
  {
    id: 5,
    title: "Explorando Fantasias de Forma Saudável",
    excerpt: "Fantasias são naturais e podem enriquecer sua vida íntima. Saiba como explorá-las.",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
    category: "Exploração",
    readTime: "7 min",
    icon: Sparkles
  },
  {
    id: 6,
    title: "O Poder da Intimidade na Longevidade",
    excerpt: "Estudos mostram que uma vida sexual ativa contribui para uma vida mais longa e feliz.",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=600&h=400&fit=crop",
    category: "Ciência",
    readTime: "9 min",
    icon: Heart
  }
];

const categoryColors = {
  "Bem-estar": "bg-rose-100 text-rose-600",
  "Saúde": "bg-green-100 text-green-600",
  "Relacionamentos": "bg-purple-100 text-purple-600",
  "Segurança": "bg-blue-100 text-blue-600",
  "Exploração": "bg-orange-100 text-orange-600",
  "Ciência": "bg-cyan-100 text-cyan-600"
};

export default function Wellness() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-500 via-pink-500 to-rose-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6"
          >
            <BookOpen className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Educação & Bem-estar
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Conteúdos educativos para sua jornada de autoconhecimento e prazer saudável
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Featured Article */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="grid lg:grid-cols-2 gap-8 items-center bg-white rounded-3xl overflow-hidden shadow-xl">
            <div className="relative h-64 lg:h-full">
              <img
                src={articles[0].image}
                alt={articles[0].title}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12">
              <span className={`inline-block px-3 py-1 rounded-full text-sm font-medium mb-4 ${categoryColors[articles[0].category]}`}>
                {articles[0].category}
              </span>
              <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
                {articles[0].title}
              </h2>
              <p className="text-gray-600 mb-6 leading-relaxed">
                {articles[0].excerpt}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-gray-500">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">{articles[0].readTime} de leitura</span>
                </div>
                <Button className="bg-gradient-to-r from-purple-500 to-rose-500 hover:from-purple-600 hover:to-rose-600 rounded-full">
                  Ler Artigo
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.slice(1).map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute top-4 left-4">
                  <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${categoryColors[article.category]}`}>
                    {article.category}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors">
                  {article.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                  {article.excerpt}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Clock className="w-4 h-4" />
                    <span className="text-sm">{article.readTime}</span>
                  </div>
                  <button className="text-purple-600 font-medium text-sm flex items-center gap-1 hover:gap-2 transition-all">
                    Ler mais
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </div>
  );
}