import React from 'react';
import HeroSection from '@/components/home/HeroSection';
import HowItWorks from '@/components/home/HowItWorks';
import FeaturedCategories from '@/components/home/FeaturedCategories';
import DiscretionBanner from '@/components/home/DiscretionBanner';
import BestSellers from '@/components/home/BestSellers';
import WellnessSection from '@/components/home/WellnessSection';
import StaggerTestimonials from '@/components/testimonials/StaggerTestimonials';
import SubscriptionSection from '@/components/home/SubscriptionSection';
import FAQSection from '@/components/home/FAQSection';
import FinalCTA from '@/components/home/FinalCTA';

export default function Home() {
  return (
    <div className="min-h-screen">
      <HeroSection />
      <HowItWorks />
      <FeaturedCategories />
      <DiscretionBanner />
      <BestSellers />
      <WellnessSection />
      
      {/* Testimonials Section */}
      <section className="py-16 bg-gradient-to-b from-white to-rose-50/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-8">
          <span className="inline-block px-4 py-2 rounded-full bg-rose-50 text-rose-600 text-sm font-medium mb-4">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            O Que Nossos{' '}
            <span className="bg-gradient-to-r from-rose-500 to-purple-500 bg-clip-text text-transparent">
              Clientes Dizem
            </span>
          </h2>
        </div>
        <StaggerTestimonials />
      </section>
      
      <SubscriptionSection />
      <FAQSection />
      <FinalCTA />
    </div>
  );
}