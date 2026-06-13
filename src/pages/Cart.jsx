import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '@/utils';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Trash2, Plus, Minus, ArrowRight, ShieldCheck, Truck, Tag, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const initialCartItems = [
  {
    id: 1,
    name: "Premium Silicone Vibrator",
    price: 59.99,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=200&h=200&fit=crop"
  },
  {
    id: 2,
    name: "Premium Massage Oil",
    price: 17.99,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=200&h=200&fit=crop"
  }
];

export default function Cart() {
  const [cartItems, setCartItems] = useState(initialCartItems);
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState(null);

  const updateQuantity = (id, delta) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const applyCoupon = () => {
    if (couponCode.toLowerCase() === 'intimacy10') {
      setAppliedCoupon({ code: 'INTIMACY10', discount: 10 });
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const discount = appliedCoupon ? subtotal * (appliedCoupon.discount / 100) : 0;
  const shipping = subtotal > 50 ? 0 : 5.99;
  const total = subtotal - discount + shipping;

  return (
    <div className="min-h-screen bg-gradient-to-b from-rose-50/30 to-white py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-4 mb-8"
        >
          <Link to={createPageUrl('Shop')}>
            <Button variant="ghost" className="rounded-full">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Continue Shopping
            </Button>
          </Link>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white rounded-3xl p-6 shadow-lg"
            >
              <div className="flex items-center gap-3 mb-6">
                <ShoppingBag className="w-6 h-6 text-rose-500" />
                <h1 className="text-2xl font-bold text-gray-900">Your Cart</h1>
                <span className="ml-auto px-3 py-1 rounded-full bg-rose-100 text-rose-600 text-sm font-medium">
                  {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
              </div>

              {cartItems.length > 0 ? (
                <div className="space-y-4">
                  <AnimatePresence>
                    {cartItems.map((item) => (
                      <motion.div
                        key={item.id}
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="flex gap-4 p-4 rounded-2xl bg-gray-50 hover:bg-rose-50/50 transition-colors"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-24 h-24 rounded-xl object-cover"
                        />
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">{item.name}</h3>
                          <p className="text-rose-600 font-bold">
                            ${item.price.toFixed(2)}
                          </p>
                          <div className="flex items-center justify-between mt-3">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => updateQuantity(item.id, -1)}
                                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                              <span className="w-8 text-center font-medium">{item.quantity}</span>
                              <button
                                onClick={() => updateQuantity(item.id, 1)}
                                className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center hover:border-rose-300 transition-colors"
                              >
                                <Plus className="w-4 h-4" />
                              </button>
                            </div>
                            <button
                              onClick={() => removeItem(item.id)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="text-center py-12">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-6">Your cart is empty</p>
                  <Link to={createPageUrl('Shop')}>
                    <Button className="bg-gradient-to-r from-rose-500 to-purple-500 rounded-full">
                      Explore Products
                    </Button>
                  </Link>
                </div>
              )}
            </motion.div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white rounded-3xl p-6 shadow-lg sticky top-24"
            >
              <h2 className="text-xl font-bold text-gray-900 mb-6">Order Summary</h2>

              {/* Coupon */}
              <div className="mb-6">
                <div className="flex gap-2">
                  <Input
                    placeholder="Promo code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    className="rounded-full"
                  />
                  <Button
                    variant="outline"
                    onClick={applyCoupon}
                    className="rounded-full"
                    disabled={!couponCode}
                  >
                    <Tag className="w-4 h-4" />
                  </Button>
                </div>
                {appliedCoupon && (
                  <p className="text-green-600 text-sm mt-2 flex items-center gap-1">
                    <Tag className="w-3 h-3" />
                    Coupon {appliedCoupon.code} applied!
                  </p>
                )}
              </div>

              {/* Summary */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                {appliedCoupon && (
                  <div className="flex justify-between text-green-600">
                    <span>Discount ({appliedCoupon.discount}%)</span>
                    <span>- ${discount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between text-gray-600">
                  <span>Shipping</span>
                  <span className={shipping === 0 ? 'text-green-600' : ''}>
                    {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t pt-3">
                  <div className="flex justify-between text-lg font-bold text-gray-900">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Checkout Button */}
              <Button
                className="w-full bg-gradient-to-r from-rose-500 to-purple-500 hover:from-rose-600 hover:to-purple-600 rounded-full py-6"
                disabled={cartItems.length === 0}
              >
                Checkout
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>

              {/* Trust Badges */}
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <ShieldCheck className="w-5 h-5 text-green-600" />
                  <span>100% secure payment</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <Truck className="w-5 h-5 text-rose-500" />
                  <span>Discreet packaging guaranteed</span>
                </div>
              </div>

              {shipping > 0 && (
                <p className="text-center text-sm text-gray-500 mt-4">
                  Free shipping on orders over $50
                </p>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}