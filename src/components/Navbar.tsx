import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Briefcase } from 'lucide-react';
import { Market } from './Market';

const Navbar: React.FC = () => {
  const links = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/contact', label: 'Contact' },

  ];

  return (
    <nav className='fixed top-0 w-full bg-white/95 backdrop-blur-sm z-50 shadow-sm'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between h-16 py-1'>
          <div className='flex items-center justify-between'>
            <Link to='/' className='flex items-center space-x-2'>
              <Briefcase className='h-8 w-8 text-blue-600' />
              <span className='text-xl font-bold text-gray-900'>
                FinancePort
              </span>
            </Link>
          </div>

          <div className='flex flex-col md:flex-row md:items-center md:space-x-8 mt-1 md:mt-0'>
            <Market />

            <div className='hidden md:flex items-center space-x-6'>
              {links.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className='relative px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 transition-colors'
                >
                  {link.path === location.pathname && (
                    <motion.div
                      layoutId='navbar-indicator'
                      className='absolute inset-x-0 -bottom-[1px] h-0.5 bg-blue-600'
                      initial={false}
                      transition={{
                        type: 'spring',
                        stiffness: 350,
                        damping: 30,
                      }}
                    />
                  )}
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
