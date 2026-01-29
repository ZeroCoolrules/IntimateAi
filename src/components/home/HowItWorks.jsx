import React from 'react';
import { motion } from 'framer-motion';
import { MessageSquare, Sparkles, Package, Heart } from 'lucide-react';

const steps = [
  {
    icon: MessageSquare,
    title: "Converse com a IA",
    description: "Responda perguntas simples e privadas sobre suas preferências e nível de conforto.",
    color: "from-rose-400 to-pink-500"
  },
  {
    icon: Sparkles,
    title: "Receba Recomendações",
    description: "Nossa IA analisa suas respostas e sugere produtos perfeitos para você.",
    color: "from-pink-400 to-purple-500"
  },
  {
    icon: Package,
    title: "Entrega Discreta",
    description: "Seus produtos chegam em embalagem neutra, sem nenhuma identificação.",
    color: "from-purple-400 to-indigo-500"
  },
  {
    icon: Heart,
    title: "Aproveite",
    description: "Descubra novas dimensões de prazer e bem-estar com total segurança.",
    color: "from-indigo-400 to-rose-500"
  }
];

export default function HowItWorks() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="inline-block px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-4">
            Como Funciona
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Sua Jornada de{' '}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Descoberta
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Em apenas 4 passos simples, você encontra produtos perfeitos para suas necessidades
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className="relative group"
            >
              {/* Connection Line */}
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-rose-200 to-purple-200" />
              )}
              
              <div className="relative bg-gradient-to-br from-gray-50 to-white rounded-2xl p-6 border border-gray-100 hover:border-rose-200 transition-all duration-300 hover:shadow-xl">
                {/* Step Number */}
                <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-white border-2 border-rose-200 flex items-center justify-center text-sm font-bold text-rose-500 shadow-sm">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center mb-5 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                  <step.icon className="w-8 h-8 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-3">{step.title}</h3>
                <p className="text-gray-600 leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}