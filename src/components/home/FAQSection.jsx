import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "Como é a embalagem dos produtos?",
    answer: "Todos os produtos são enviados em embalagens neutras, sem nenhuma identificação externa. A caixa não possui logotipos ou descrições que indiquem o conteúdo. Sua privacidade é nossa prioridade."
  },
  {
    question: "Qual o nome que aparece na fatura do cartão?",
    answer: "A cobrança aparece como 'INTIMACY COMMERCE' ou 'IC COMERCIO' na sua fatura, de forma discreta e sem referência ao tipo de produto adquirido."
  },
  {
    question: "Os produtos são seguros?",
    answer: "Sim! Trabalhamos apenas com produtos certificados, feitos com materiais seguros para o corpo humano (body-safe). Todos passam por rigoroso controle de qualidade e possuem certificação da ANVISA quando aplicável."
  },
  {
    question: "Posso devolver um produto?",
    answer: "Produtos lacrados podem ser devolvidos em até 7 dias após o recebimento. Por questões de higiene, produtos abertos não são aceitos para devolução, exceto em caso de defeito de fabricação."
  },
  {
    question: "Como funciona o Assistente AI?",
    answer: "Nosso assistente utiliza inteligência artificial para entender suas preferências e nível de experiência através de perguntas simples e discretas. Com base nas suas respostas, recomendamos produtos personalizados para você."
  },
  {
    question: "Quanto tempo demora a entrega?",
    answer: "O prazo de entrega varia de 2 a 7 dias úteis, dependendo da sua localização. Oferecemos opção de entrega expressa para as principais capitais."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-4">
            <HelpCircle className="w-4 h-4" />
            Dúvidas Frequentes
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Perguntas{' '}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Frequentes
            </span>
          </h2>
        </motion.div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="border border-gray-200 rounded-2xl overflow-hidden hover:border-rose-200 transition-colors"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-gray-50 transition-colors"
              >
                <span className="font-semibold text-gray-900">{faq.question}</span>
                <ChevronDown 
                  className={`w-5 h-5 text-rose-500 transition-transform duration-300 ${
                    openIndex === index ? 'rotate-180' : ''
                  }`} 
                />
              </button>
              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-gray-600 leading-relaxed">
                      {faq.answer}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}