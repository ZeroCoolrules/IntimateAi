import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const SQRT_5000 = Math.sqrt(5000);

const testimonials = [
  {
    tempId: 0,
    testimonial: "IntimacyAI completely changed my relationship with myself. I found products I never imagined.",
    by: "Marina, 28",
    imgSrc: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 1,
    testimonial: "Discreet, elegant and with perfect recommendations. The AI assistant understood exactly what I needed.",
    by: "Carla, 34",
    imgSrc: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 2,
    testimonial: "My partner and I discovered a new dimension of our relationship thanks to the AI suggestions.",
    by: "Richard, 31",
    imgSrc: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 3,
    testimonial: "The discreet packaging and respectful service made me a loyal customer. Highly recommend!",
    by: "Julia, 29",
    imgSrc: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 4,
    testimonial: "Finally a store that understands intimate wellness is health. Exceptional quality products.",
    by: "Patricia, 42",
    imgSrc: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 5,
    testimonial: "The AI assistant helped me overcome my initial shyness. Super comfortable process!",
    by: "Fernanda, 26",
    imgSrc: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 6,
    testimonial: "Fast delivery, high quality product and incredible support. Always 5 stars!",
    by: "Lucas, 35",
    imgSrc: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face"
  },
  {
    tempId: 7,
    testimonial: "The education section taught me so much. Shopping here is a self-discovery experience.",
    by: "Amanda, 33",
    imgSrc: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=150&h=150&fit=crop&crop=face"
  }
];

const TestimonialCard = ({ position, testimonial, handleMove, cardSize }) => {
  const isCenter = position === 0;

  return (
    <div
      onClick={() => handleMove(position)}
      className={cn(
        "absolute left-1/2 top-1/2 cursor-pointer border-2 p-6 sm:p-8 transition-all duration-500 ease-in-out rounded-2xl",
        isCenter 
          ? "z-10 bg-gradient-to-br from-rose-400 to-pink-500 text-white border-rose-300" 
          : "z-0 bg-white/90 backdrop-blur-sm text-gray-800 border-rose-100 hover:border-rose-300"
      )}
      style={{
        width: cardSize,
        height: cardSize,
        transform: `
          translate(-50%, -50%) 
          translateX(${(cardSize / 1.5) * position}px)
          translateY(${isCenter ? -65 : position % 2 ? 15 : -15}px)
          rotate(${isCenter ? 0 : position % 2 ? 2.5 : -2.5}deg)
          scale(${isCenter ? 1 : 0.9})
        `,
        boxShadow: isCenter 
          ? "0px 20px 40px -10px rgba(244, 63, 94, 0.4)" 
          : "0px 10px 30px -10px rgba(0,0,0,0.1)"
      }}
    >
      <img
        src={testimonial.imgSrc}
        alt={testimonial.by.split(',')[0]}
        className="mb-4 h-14 w-14 rounded-full object-cover object-center ring-4 ring-white/30"
      />
      <h3 className={cn(
        "text-sm sm:text-base font-medium leading-relaxed",
        isCenter ? "text-white" : "text-gray-700"
      )}>
        "{testimonial.testimonial}"
      </h3>
      <p className={cn(
        "absolute bottom-6 left-6 right-6 text-sm font-semibold",
        isCenter ? "text-white/90" : "text-rose-500"
      )}>
        {testimonial.by}
      </p>
    </div>
  );
};

export default function StaggerTestimonials() {
  const [cardSize, setCardSize] = useState(320);
  const [testimonialsList, setTestimonialsList] = useState(testimonials);

  const handleMove = (steps) => {
    const newList = [...testimonialsList];
    if (steps > 0) {
      for (let i = steps; i > 0; i--) {
        const item = newList.shift();
        if (!item) return;
        newList.push({ ...item, tempId: Math.random() });
      }
    } else {
      for (let i = steps; i < 0; i++) {
        const item = newList.pop();
        if (!item) return;
        newList.unshift({ ...item, tempId: Math.random() });
      }
    }
    setTestimonialsList(newList);
  };

  useEffect(() => {
    const updateSize = () => {
      const { matches } = window.matchMedia("(min-width: 640px)");
      setCardSize(matches ? 320 : 260);
    };

    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gradient-to-b from-rose-50/50 to-white" style={{ height: 550 }}>
      {testimonialsList.map((testimonial, index) => {
        const position = testimonialsList.length % 2
          ? index - (testimonialsList.length + 1) / 2
          : index - testimonialsList.length / 2;
        return (
          <TestimonialCard
            key={testimonial.tempId}
            testimonial={testimonial}
            handleMove={handleMove}
            position={position}
            cardSize={cardSize}
          />
        );
      })}
      <div className="absolute bottom-6 left-1/2 flex -translate-x-1/2 gap-3">
        <button
          onClick={() => handleMove(-1)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 shadow-lg"
          aria-label="Previous"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={() => handleMove(1)}
          className="flex h-12 w-12 items-center justify-center rounded-full bg-white border-2 border-rose-200 text-rose-500 hover:bg-rose-500 hover:text-white hover:border-rose-500 transition-all duration-300 shadow-lg"
          aria-label="Next"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}