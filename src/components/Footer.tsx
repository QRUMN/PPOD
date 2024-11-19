import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Mail, Twitter, Facebook, Instagram } from 'lucide-react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  const links = {
    resources: [
      { name: 'Safety Tips', href: '/safety-tips' },
      { name: 'Learning Center', href: '/learn' },
      { name: 'Community Guidelines', href: '/guidelines' },
      { name: 'Support', href: '/support' },
    ],
    legal: [
      { name: 'Privacy Policy', href: '/privacy' },
      { name: 'Terms of Service', href: '/terms' },
      { name: 'Cookie Policy', href: '/cookies' },
      { name: 'Accessibility', href: '/accessibility' },
    ],
    social: [
      { name: 'Twitter', href: '#', icon: Twitter },
      { name: 'Facebook', href: '#', icon: Facebook },
      { name: 'Instagram', href: '#', icon: Instagram },
      { name: 'Email', href: 'mailto:contact@ppods.org', icon: Mail },
    ],
  };

  return (
    <footer className="bg-white dark:bg-accent-900 border-t border-primary-100 dark:border-accent-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Shield className="w-8 h-8 text-secondary-500" />
              <span className="text-2xl font-bold text-accent-500 dark:text-white">PPODS</span>
            </div>
            <p className="text-sm text-accent-600 dark:text-gray-300">
              Empowering safe online dating experiences through education and practice.
            </p>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-accent-500 dark:text-white uppercase tracking-wider mb-4">
              Resources
            </h3>
            <ul className="space-y-2">
              {links.resources.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-accent-600 dark:text-gray-300 hover:text-primary-500 
                             dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="text-sm font-semibold text-accent-500 dark:text-white uppercase tracking-wider mb-4">
              Legal
            </h3>
            <ul className="space-y-2">
              {links.legal.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-accent-600 dark:text-gray-300 hover:text-primary-500 
                             dark:hover:text-primary-400 transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-sm font-semibold text-accent-500 dark:text-white uppercase tracking-wider mb-4">
              Connect With Us
            </h3>
            <div className="flex space-x-4">
              {links.social.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-accent-600 dark:text-gray-300 hover:text-primary-500 
                           dark:hover:text-primary-400 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{item.name}</span>
                  <item.icon className="w-6 h-6" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-primary-100 dark:border-accent-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-accent-600 dark:text-gray-300">
              © {currentYear} PPODS. All rights reserved.
            </p>
            <div className="flex items-center gap-2 text-sm text-accent-600 dark:text-gray-300">
              <span>Made with</span>
              <Heart className="w-4 h-4 text-secondary-500" />
              <span>for accessibility</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};