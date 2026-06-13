import React from 'react';
import { motion } from 'framer-motion';
import { Heart, Shield, Sparkles, Users, Award, Truck } from 'lucide-react';

const values = [
  {
    icon: Heart,
    title: "Wellness First",
    description: "We believe that pleasure and intimate health are an essential part of a full and happy life."
  },
  {
    icon: Shield,
    title: "Absolute Privacy",
    description: "Your privacy is sacred. We implement the highest standards of security and discretion."
  },
  {
    icon: Sparkles,
    title: "Premium Quality",
    description: "We select only certified, safe products from globally recognized brands."
  },
  {
    icon: Users,
    title: "Inclusion & Respect",
    description: "We celebrate diversity and offer products for all people and preferences."
  }
];

const stats = [
  { number: "50K+", label: "Satisfied Customers" },
  { number: "4,600+", label: "Premium Products" },
  { number: "4.9", label: "Average Rating" },
  { number: "99%", label: "On-Time Delivery" }
];

export default function About() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white">
      {/* Header */}
      <div className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-6"
          >
            About IntimacyAI
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
          >
            Revolutionizing intimate wellness through technology, quality, and respect
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Story Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid lg:grid-cols-2 gap-12 items-center mb-20"
        >
          <div>
            <span className="inline-block px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-4">
              Our Story
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
              Born to{' '}
              <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Transform
              </span>
            </h2>
            <div className="space-y-4 text-gray-600 leading-relaxed">
              <p>
                IntimacyAI was born from the realization that the intimate wellness market needed a more modern, respectful, and technology-driven approach.
              </p>
              <p>
                We combine advanced artificial intelligence with a carefully curated product selection to deliver a personalized and discreet experience for every customer.
              </p>
              <p>
                Our mission is to break taboos and promote a healthy relationship with pleasure and intimacy — always with respect, safety, and quality.
              </p>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?w=600&h=500&fit=crop"
              alt="Our team"
              className="rounded-3xl shadow-2xl"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl p-6 shadow-xl"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <p className="font-bold text-gray-900">Since 2020</p>
                  <p className="text-sm text-gray-500">Transforming lives</p>
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Values */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <span className="inline-block px-4 py-2 rounded-full bg-purple-50 text-purple-600 text-sm font-medium mb-4">
              Our Values
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900">
              What{' '}
              <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
                Defines Us
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100 hover:border-rose-200 transition-all"
              >
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center mb-4">
                  <value.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-gradient-to-r from-rose-500 via-pink-500 to-purple-500 rounded-3xl p-8 lg:p-12"
        >
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <p className="text-4xl lg:text-5xl font-bold text-white mb-2">{stat.number}</p>
                <p className="text-white/80 text-sm">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Commitment */}
        <div className="mt-20 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-rose-100 mb-6">
              <Truck className="w-8 h-8 text-rose-600" />
            </div>
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">
              Our Commitment to You
            </h2>
            <p className="text-lg text-gray-600 leading-relaxed">
              Every product is shipped with the utmost care and discretion. We work tirelessly to ensure your experience with us is always positive — from product selection to delivery at your door.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
}