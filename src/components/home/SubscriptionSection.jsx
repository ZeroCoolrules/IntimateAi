import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion } from 'framer-motion';
import { Gift, Sparkles, Check, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    name: "Discovery",
    price: 19.99,
    description: "Ideal for beginners",
    features: [
      "1 surprise product per month",
      "Lubricant samples",
      "Usage guide included",
      "Premium packaging"
    ],
    popular: false
  },
  {
    name: "Pleasure",
    price: 35.99,
    description: "Our most popular",
    features: [
      "2-3 surprise products per month",
      "Selected premium products",
      "Access to exclusive content",
      "Discount on one-time purchases",
      "Birthday gift"
    ],
    popular: true
  },
  {
    name: "Luxury",
    price: 59.99,
    description: "Complete experience",
    features: [
      "3-5 premium products per month",
      "International brands",
      "Consultation with sexologist",
      "Free shipping on all orders",
      "Exclusive welcome kit"
    ],
    popular: false
  }
];

export default function SubscriptionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-rose-50/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-4">
            <Gift className="w-4 h-4" />
            Subscription Club
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Monthly Surprises{' '}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              at Your Door
            </span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Receive curated products every month and explore new experiences with personalized curation
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-3xl p-6 lg:p-8 ${
                plan.popular 
                  ? 'bg-gradient-to-br from-rose-500 to-purple-600 text-white shadow-2xl scale-105' 
                  : 'bg-white border border-gray-200'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold">
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-6">
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>$</span>
                  <span className={`text-4xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {plan.price.toFixed(2)}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>/mo</span>
                </div>
              </div>

              <ul className="space-y-3 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 ${plan.popular ? 'text-white' : 'text-rose-500'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Link to={createPageUrl('Subscriptions')}>
                <Button 
                  className={`w-full rounded-full ${
                    plan.popular 
                      ? 'bg-white text-rose-600 hover:bg-gray-100' 
                      : 'bg-gradient-to-r from-rose-500 to-purple-500 text-white hover:from-rose-600 hover:to-purple-600'
                  }`}
                >
                  Subscribe Now
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}