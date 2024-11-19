import React from 'react';
import { Link } from 'react-router-dom';
import { Shield, Heart, MessageSquare, Users, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { Footer } from './Footer';
import { AccessibilityBar } from './landing/AccessibilityBar';
import { Testimonials } from './landing/Testimonials';
import { ImpactStats } from './landing/ImpactStats';

export const LandingPage: React.FC = () => {
  const features = [
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Safe Learning Environment",
      description: "Practice online dating interactions in a controlled, educational setting"
    },
    {
      icon: <Heart className="w-6 h-6" />,
      title: "Real-World Scenarios",
      description: "Experience authentic situations with guided support and feedback"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Interactive Learning",
      description: "Engage with AI-powered conversations to build confidence"
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Community Support",
      description: "Connect with others and share experiences in a safe space"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-primary-50 via-white to-secondary-50 
                    dark:from-accent-900 dark:via-accent-800 dark:to-secondary-900">
      <AccessibilityBar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-6xl font-bold text-accent-500 dark:text-white mb-6"
          >
            Learn to Date Online
            <span className="text-secondary-500 dark:text-primary-400"> Safely</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-xl text-accent-600 dark:text-gray-300 mb-10 max-w-2xl mx-auto"
          >
            Practice safe online dating interactions in a supportive environment designed for people with disabilities.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            <Link
              to="/signup"
              className="inline-flex items-center justify-center px-6 py-3 border border-transparent 
                       text-base font-medium rounded-lg text-white bg-secondary-500 
                       hover:bg-secondary-600 transition-colors shadow-lg hover:shadow-xl"
            >
              Get Started Free
              <ChevronRight className="ml-2 w-5 h-5" />
            </Link>
            <Link
              to="/login"
              className="inline-flex items-center justify-center px-6 py-3 
                       border border-primary-300 dark:border-primary-700 
                       text-base font-medium rounded-lg text-primary-700 
                       dark:text-primary-300 bg-white dark:bg-accent-800 
                       hover:bg-primary-50 dark:hover:bg-accent-700 
                       transition-colors shadow-lg hover:shadow-xl"
            >
              Sign In
            </Link>
          </motion.div>
        </div>

        {/* Features Grid */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 * index }}
                className="bg-white/80 dark:bg-accent-800/80 backdrop-blur-sm p-6 rounded-xl 
                         shadow-lg hover:shadow-xl transition-all border border-primary-100 
                         dark:border-primary-900"
              >
                <div className="w-12 h-12 bg-primary-100 dark:bg-primary-900/50 rounded-lg 
                            flex items-center justify-center text-secondary-500 
                            dark:text-primary-400 mb-4"
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-accent-500 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-accent-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Impact Stats */}
        <ImpactStats />

        {/* Testimonials */}
        <Testimonials />

        {/* Trust Section */}
        <div className="bg-gradient-to-r from-primary-50 to-secondary-50 
                      dark:from-accent-800 dark:to-secondary-900 py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="max-w-3xl mx-auto"
            >
              <h2 className="text-3xl font-bold text-accent-500 dark:text-white mb-6">
                Trusted by Organizations Worldwide
              </h2>
              <p className="text-lg text-accent-600 dark:text-gray-300 mb-8">
                Join thousands of users who are learning to navigate online relationships safely and confidently.
              </p>
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=400&fit=crop"
                alt="People using PPODS"
                className="rounded-xl shadow-lg border-4 border-white dark:border-accent-700"
              />
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};