import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, Clock, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    value: "contact@intimacyai.com",
    description: "Response within 24 hours"
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (800) 555-0199",
    description: "Mon–Fri, 9am to 6pm"
  },
  {
    icon: MapPin,
    title: "Address",
    value: "United States",
    description: "Office only"
  }
];

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <MessageCircle className="w-8 h-8 text-white" />
          </motion.div>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4"
          >
            Contact Us
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-lg text-white/90 max-w-2xl mx-auto"
          >
            We're here to help. Reach out to us discreetly and confidentially.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Contact Info */}
          <div className="lg:col-span-1 space-y-6">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-purple-500 flex items-center justify-center flex-shrink-0">
                    <info.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900">{info.title}</h3>
                    <p className="text-rose-600 font-medium">{info.value}</p>
                    <p className="text-sm text-gray-500">{info.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}

            {/* Hours */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-rose-50 to-purple-50 rounded-2xl p-6"
            >
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-5 h-5 text-rose-600" />
                <h3 className="font-semibold text-gray-900">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Monday to Friday</span>
                  <span className="font-medium text-gray-900">9am – 6pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Saturday</span>
                  <span className="font-medium text-gray-900">9am – 1pm</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Sunday</span>
                  <span className="font-medium text-gray-500">Closed</span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <div className="bg-white rounded-3xl p-8 shadow-xl border border-gray-100">
              {!submitted ? (
                <>
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">Send a Message</h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid sm:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                        <Input
                          placeholder="Your name"
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="rounded-xl"
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <Input
                          type="email"
                          placeholder="you@email.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="rounded-xl"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Subject</label>
                      <Select
                        value={formData.subject}
                        onValueChange={(value) => setFormData({ ...formData, subject: value })}
                      >
                        <SelectTrigger className="rounded-xl">
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order">Order inquiry</SelectItem>
                          <SelectItem value="product">Product information</SelectItem>
                          <SelectItem value="return">Return or exchange</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                      <Textarea
                        placeholder="How can we help?"
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="rounded-xl min-h-[150px]"
                        required
                      />
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 rounded-full py-6"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </form>

                  <p className="text-center text-sm text-gray-500 mt-6">
                    Your message is confidential. We respond within 24 business hours.
                  </p>
                </>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
                    <CheckCircle className="w-10 h-10 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Message Sent!</h3>
                  <p className="text-gray-600 mb-6">
                    Thank you for reaching out. We'll get back to you shortly.
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="rounded-full"
                  >
                    Send Another Message
                  </Button>
                </motion.div>
              )}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}