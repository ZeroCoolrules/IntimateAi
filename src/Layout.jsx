import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, ShoppingBag, User, Heart, Search, 
  Bot, Home, Package, BookOpen, Gift, Mail, Info,
  ChevronDown, Sparkles, Shield, Instagram, Facebook, Twitter
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const navigation = [
  { name: 'Home', page: 'Home', icon: Home },
  { name: 'Loja', page: 'Shop', icon: Package },
  { name: 'AI Assistant', page: 'AIAssistant', icon: Bot },
  { name: 'Coleções', page: 'Collections', icon: Sparkles },
  { name: 'Bem-estar', page: 'Wellness', icon: BookOpen },
  { name: 'Assinaturas', page: 'Subscriptions', icon: Gift },
];

const footerLinks = {
  shop: [
    { name: 'All Products', page: 'Shop' },
    { name: 'Best Sellers', page: 'Shop' },
    { name: 'New Arrivals', page: 'Shop' },
    { name: 'Sales', page: 'Shop' },
  ],
  about: [
    { name: 'About Us', page: 'About' },
    { name: 'Contact', page: 'Contact' },
    { name: 'Blog', page: 'Wellness' },
  ],
  support: [
    { name: 'FAQ', page: 'Home' },
    { name: 'Returns & Exchanges', page: 'Contact' },
    { name: 'Privacy Policy', page: 'About' },
  ],
};

export default function Layout({ children, currentPageName }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  const isHomePage = currentPageName === 'Home';

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header 
        className="fixed top-0 left-0 right-0 z-50 bg-white/30 backdrop-blur-sm shadow-sm transition-all duration-300"
      >
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link to={createPageUrl('Home')} className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center">
                <Heart className="w-5 h-5 text-white" fill="white" />
              </div>
              <span className="text-xl font-bold text-gray-900">
                IntimacyAI
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.page}
                  to={createPageUrl(item.page)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                    currentPageName === item.page
                      ? 'bg-rose-500 text-white'
                      : 'text-gray-900 hover:bg-rose-50 hover:text-rose-600'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-2">
              <Link to={createPageUrl('Cart')}>
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full relative text-gray-900 hover:bg-rose-50"
                >
                  <ShoppingBag className="w-5 h-5" />
                  <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-rose-500 text-white text-xs flex items-center justify-center">
                    2
                  </span>
                </Button>
              </Link>

              <Link to={createPageUrl('About')} className="hidden sm:block">
                <Button 
                  variant="ghost" 
                  size="icon"
                  className="rounded-full text-gray-900 hover:bg-rose-50"
                >
                  <User className="w-5 h-5" />
                </Button>
              </Link>

              {/* Mobile Menu Button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden rounded-full text-gray-900"
                onClick={() => setMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </Button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 z-50 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed right-0 top-0 bottom-0 w-80 bg-white z-50 lg:hidden shadow-2xl"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center gap-2">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center">
                      <Heart className="w-5 h-5 text-white" fill="white" />
                    </div>
                    <span className="text-xl font-bold text-gray-900">IntimacyAI</span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(false)}
                    className="rounded-full"
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>

                <nav className="space-y-2">
                  {navigation.map((item) => (
                    <Link
                      key={item.page}
                      to={createPageUrl(item.page)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                        currentPageName === item.page
                          ? 'bg-rose-50 text-rose-600'
                          : 'text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      <item.icon className="w-5 h-5" />
                      {item.name}
                    </Link>
                  ))}
                </nav>

                <div className="border-t mt-6 pt-6 space-y-2">
                  <Link to={createPageUrl('About')}>
                    <Button variant="ghost" className="w-full justify-start rounded-xl">
                      <Info className="w-5 h-5 mr-3" />
                      Sobre Nós
                    </Button>
                  </Link>
                  <Link to={createPageUrl('Contact')}>
                    <Button variant="ghost" className="w-full justify-start rounded-xl">
                      <Mail className="w-5 h-5 mr-3" />
                      Contato
                    </Button>
                  </Link>
                </div>

                <div className="absolute bottom-6 left-6 right-6">
                  <Link to={createPageUrl('AIAssistant')}>
                    <Button className="w-full bg-gradient-to-r from-rose-500 to-purple-500 rounded-full">
                      <Bot className="w-5 h-5 mr-2" />
                      Usar Assistente AI
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className={`flex-1 ${isHomePage ? '' : 'pt-20'}`}>
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose-500 to-purple-500 flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" fill="white" />
                </div>
                <span className="text-xl font-bold">IntimacyAI</span>
              </div>
              <p className="text-gray-400 text-sm mb-4">
                Revolutionizing intimate wellness through technology, quality, and respect.
              </p>
              <div className="flex gap-4">
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                  <Instagram className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                  <Facebook className="w-5 h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-rose-400 transition-colors">
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Shop Links */}
            <div>
              <h3 className="font-semibold mb-4">Shop</h3>
              <ul className="space-y-2">
                {footerLinks.shop.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={createPageUrl(link.page)}
                      className="text-gray-400 hover:text-rose-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* About Links */}
            <div>
              <h3 className="font-semibold mb-4">Company</h3>
              <ul className="space-y-2">
                {footerLinks.about.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={createPageUrl(link.page)}
                      className="text-gray-400 hover:text-rose-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold mb-4">Support</h3>
              <ul className="space-y-2">
                {footerLinks.support.map((link, index) => (
                  <li key={index}>
                    <Link 
                      to={createPageUrl(link.page)}
                      className="text-gray-400 hover:text-rose-400 transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Trust Badges */}
          <div className="border-t border-gray-800 mt-12 pt-8">
            <div className="flex flex-wrap justify-center gap-6 mb-8">
              <div className="flex items-center gap-2 text-gray-400">
                <Shield className="w-5 h-5 text-green-500" />
                <span className="text-sm">Secure Payment</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Package className="w-5 h-5 text-rose-500" />
                <span className="text-sm">Discreet Packaging</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <Heart className="w-5 h-5 text-pink-500" />
                <span className="text-sm">Premium Products</span>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="border-t border-gray-800 pt-8 text-center text-gray-500 text-sm">
            <p>© 2024 IntimacyAI. All rights reserved.</p>
            <p className="mt-2">
              Must be 18+ years old to access this site. Products for adults only.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}