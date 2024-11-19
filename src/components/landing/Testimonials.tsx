import React from 'react';
import { motion } from 'framer-motion';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: "Sarah M.",
    role: "PPODS User",
    content: "This platform helped me understand online dating safety in a way that works for me. The sign language support is amazing!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop"
  },
  {
    name: "David R.",
    role: "Community Member",
    content: "The voice commands and screen reader compatibility made learning about online safety accessible and engaging.",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop"
  },
  {
    name: "Emily L.",
    role: "Advocacy Group Leader",
    content: "PPODS has transformed how we teach online dating safety to our community members.",
    image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop"
  }
];

export const Testimonials: React.FC = () => {
  return (
    <div className="py-16 bg-gradient-to-r from-primary-50 to-secondary-50 
                    dark:from-accent-800 dark:to-secondary-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-accent-500 dark:text-white">
            Success Stories
          </h2>
          <p className="mt-4 text-lg text-accent-600 dark:text-gray-300">
            Hear from our community members about their experiences
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm p-6 rounded-xl 
                       shadow-lg border border-primary-100 dark:border-primary-900"
            >
              <div className="flex items-center gap-4 mb-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h3 className="font-semibold text-accent-500 dark:text-white">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-accent-600 dark:text-gray-300">
                    {testimonial.role}
                  </p>
                </div>
              </div>
              <div className="relative">
                <Quote className="absolute -top-2 -left-2 w-8 h-8 text-primary-200 dark:text-primary-800 opacity-50" />
                <p className="text-accent-600 dark:text-gray-300 relative z-10 pl-6">
                  "{testimonial.content}"
                </p>
              </div>
              <div className="flex gap-1 mt-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-current text-secondary-500" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};