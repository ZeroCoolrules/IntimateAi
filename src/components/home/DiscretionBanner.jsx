import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Package, Lock, CreditCard } from 'lucide-react';

const features = [
  {
    icon: Package,
    title: "Embalagem Neutra",
    description: "Caixas sem identificação, impossível saber o conteúdo"
  },
  {
    icon: CreditCard,
    title: "Cobrança Discreta",
    description: "Aparece como 'INTIMACY COMMERCE' na fatura"
  },
  {
    icon: Lock,
    title: "Dados Protegidos",
    description: "Criptografia de ponta e privacidade total"
  },
  {
    icon: ShieldCheck,
    title: "100% Confidencial",
    description: "Suas informações nunca são compartilhadas"
  }
];

export default function DiscretionBanner() {
  return (
    <section className="py-16 bg-gradient-to-r from-gray-900 via-purple-900 to-rose-900 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, white 1px, transparent 0)`,
          backgroundSize: '40px 40px'
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Sua Privacidade é Nossa{' '}
            <span className="bg-gradient-to-r from-rose-400 to-pink-400 bg-clip-text text-transparent">
              Prioridade
            </span>
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Entendemos a importância da discrição. Cada detalhe foi pensado para garantir sua total privacidade.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/10 hover:border-rose-400/50 transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-400 to-pink-500 flex items-center justify-center mb-4">
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-gray-300 text-sm">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}