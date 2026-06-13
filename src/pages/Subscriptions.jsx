import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Gift, Check, Sparkles, Star, ArrowRight, Heart, Package, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

const plans = [
  {
    id: 'discovery',
    name: "Discovery",
    price: 19.99,
    description: "Ideal for beginners who want to explore",
    features: [
      "1 surprise product per month",
      "Lubricant samples",
      "Usage guide included",
      "Premium discreet packaging",
      "Cancel anytime"
    ],
    color: "from-rose-400 to-pink-500",
    popular: false
  },
  {
    id: 'pleasure',
    name: "Pleasure",
    price: 35.99,
    description: "Our most popular plan",
    features: [
      "2–3 surprise products per month",
      "Selected premium products",
      "Access to exclusive content",
      "15% off individual purchases",
      "Special birthday gift",
      "Priority support"
    ],
    color: "from-purple-500 to-indigo-600",
    popular: true
  },
  {
    id: 'luxury',
    name: "Luxury",
    price: 59.99,
    description: "Complete and exclusive experience",
    features: [
      "3–5 premium products per month",
      "Exclusive international brands",
      "Monthly sexologist consultation",
      "Free shipping on all orders",
      "Luxurious welcome kit",
      "Early access to new arrivals",
      "Personal concierge"
    ],
    color: "from-gray-800 to-gray-900",
    popular: false
  }
];

const benefits = [
  {
    icon: Gift,
    title: "Monthly Surprises",
    description: "Products specially selected for you"
  },
  {
    icon: Shield,
    title: "Discreet Packaging",
    description: "No one will know what's inside"
  },
  {
    icon: Heart,
    title: "Personalized Curation",
    description: "Based on your preferences"
  },
  {
    icon: Package,
    title: "Cancel Anytime",
    description: "No commitment or fees"
  }
];

export default function Subscriptions() {
  const [billingCycle, setBillingCycle] = useState('monthly');

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm mb-6"
          >
            <Gift className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Subscription Club
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            Receive curated products every month and discover new experiences
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className="bg-gray-100 p-1 rounded-full inline-flex">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'monthly'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                billingCycle === 'annual'
                  ? 'bg-white shadow-sm text-gray-900'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Annual (2 months free)
            </button>
          </div>
        </div>

        {/* Plans */}
        <div className="grid md:grid-cols-3 gap-8 mb-20">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5 }}
              className={`relative rounded-3xl p-8 ${
                plan.popular
                  ? 'bg-gradient-to-br from-purple-500 to-indigo-600 text-white shadow-2xl scale-105 z-10'
                  : 'bg-white border border-gray-200 shadow-lg'
              }`}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                  <span className="inline-flex items-center gap-1 px-4 py-1.5 rounded-full bg-yellow-400 text-yellow-900 text-xs font-bold shadow-lg">
                    <Star className="w-3 h-3 fill-current" />
                    MOST POPULAR
                  </span>
                </div>
              )}

              <div className="text-center mb-8">
                <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-4 ${
                  plan.popular ? 'bg-white/20' : `bg-gradient-to-br ${plan.color}`
                }`}>
                  <Gift className="w-8 h-8 text-white" />
                </div>
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                  {plan.name}
                </h3>
                <p className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>
                  {plan.description}
                </p>
              </div>

              <div className="text-center mb-8">
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>$</span>
                  <span className={`text-5xl font-bold ${plan.popular ? 'text-white' : 'text-gray-900'}`}>
                    {billingCycle === 'annual'
                      ? (plan.price * 0.83).toFixed(2)
                      : plan.price.toFixed(2)}
                  </span>
                  <span className={`text-sm ${plan.popular ? 'text-white/80' : 'text-gray-500'}`}>/mo</span>
                </div>
                {billingCycle === 'annual' && (
                  <p className={`text-sm mt-2 ${plan.popular ? 'text-white/70' : 'text-gray-400'}`}>
                    Billed annually
                  </p>
                )}
              </div>

              <ul className="space-y-4 mb-8">
                {plan.features.map((feature, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <Check className={`w-5 h-5 flex-shrink-0 mt-0.5 ${plan.popular ? 'text-white' : 'text-rose-500'}`} />
                    <span className={`text-sm ${plan.popular ? 'text-white/90' : 'text-gray-600'}`}>
                      {feature}
                    </span>
                  </li>
                ))}
              </ul>

              <Button
                className={`w-full rounded-full py-6 ${
                  plan.popular
                    ? 'bg-white text-purple-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-rose-500 to-purple-500 text-white hover:from-rose-600 hover:to-purple-600'
                }`}
              >
                Subscribe Now
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </motion.div>
          ))}
        </div>

        {/* Benefits */}
        <div className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-3xl p-8 lg:p-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 text-center mb-12">
            Why Subscribe?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-br from-rose-400 to-purple-500 mb-4">
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}