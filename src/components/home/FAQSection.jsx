import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqs = [
  {
    question: "What is the product packaging like?",
    answer: "All products are shipped in neutral packaging, with no external identification. The box has no logos or descriptions indicating the contents. Your privacy is our priority."
  },
  {
    question: "What name appears on the card statement?",
    answer: "The charge appears as 'INTIMACY COMMERCE' or 'IC COMMERCE' on your statement, discreetly and without reference to the type of product purchased."
  },
  {
    question: "Are the products safe?",
    answer: "Yes! We only work with certified products made with body-safe materials. All undergo rigorous quality control and have FDA certification when applicable."
  },
  {
    question: "Can I return a product?",
    answer: "Sealed products can be returned within 7 days of receipt. For hygiene reasons, opened products are not accepted for return, except in case of manufacturing defects."
  },
  {
    question: "How does the AI Assistant work?",
    answer: "Our assistant uses artificial intelligence to understand your preferences and experience level through simple, discreet questions. Based on your answers, we recommend personalized products for you."
  },
  {
    question: "How long does delivery take?",
    answer: "Delivery time varies from 2 to 7 business days, depending on your location. We offer express delivery options for major cities."
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
            Frequently Asked
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Questions
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