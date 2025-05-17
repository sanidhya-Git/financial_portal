import { motion } from 'framer-motion';
import { ArrowRight, Shield, LineChart, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';
import Services from './Services';
import Testimonials from './Testimonials';
import SuccessStories from './SuccessStories';

const Home = () => {
  const [statsRef, statsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-screen flex items-center">
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920"
            alt="Financial District"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center text-white"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Building Wealth Through
              <br />
              Strategic Financial Planning
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-gray-200">
              Your trusted partner in achieving financial freedom and securing your future
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link
                to="/services"
                className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
              >
                Explore Our Services
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center px-6 py-3 bg-white hover:bg-gray-100 text-gray-900 rounded-lg transition-colors"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section
        ref={statsRef}
        className="py-20 bg-white"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {statsInView && (
              <>
                <div className="text-center">
                  <Shield className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CountUp
                    end={1}
                    prefix="₹"
                    suffix="Cr+"
                    duration={2.5}
                    className="text-4xl font-bold text-gray-900"
                  />
                  <p className="mt-2 text-gray-600">Assets Under Management</p>
                </div>
                <div className="text-center">
                  <Users className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CountUp
                    end={100}
                    suffix="+"
                    duration={2.5}
                    className="text-4xl font-bold text-gray-900"
                  />
                  <p className="mt-2 text-gray-600">Happy Clients</p>
                </div>
                <div className="text-center">
                  <LineChart className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                  <CountUp
                    end={16}
                    suffix="%"
                    duration={2.5}
                    decimals={1}
                    className="text-4xl font-bold text-gray-900"
                  />
                  <p className="mt-2 text-gray-600">Average Annual Returns</p>
                  {/* <p className="mt-2 text-gray-600">subject to market risk</p> */}
                </div>
              </>
            )}
          </div>
        </div>
      </section>
      <Services/>
      <Testimonials/>
      <SuccessStories/>
    </div>
  );
};

export default Home;