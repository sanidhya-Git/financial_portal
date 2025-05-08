import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { testimonials } from '../data';

const Testimonials = () => {

  // TODO: implement memoization 
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [scrollLeft, setScrollLeft] = useState(0);
  const [containerWidth, setContainerWidth] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      if (containerRef.current) {
        containerRef.current.scrollLeft += 1;
        setScrollLeft(containerRef.current.scrollLeft);
        setContainerWidth(containerRef.current.offsetWidth);

        if (
          containerRef.current.scrollLeft >=
          containerRef.current.scrollWidth / 2
        ) {
          containerRef.current.scrollLeft = 0;
        }
      }
    }, 10); // Controls scroll speed

    return () => clearInterval(interval);
  }, []);

  const getScale = (index: number) => {
    const cardWidth = 320; // Tailwind w-80 = 320px
    const center = scrollLeft + containerWidth / 2;
    const cardCenter = index * (cardWidth + 32) + cardWidth / 2; // 32 = gap-8
    const distance = Math.abs(center - cardCenter);
    return distance < 160 ? 1.05 : 1; // Slight scale for center
  };

  return (
    <div className='min-h-screen py-20 overflow-hidden bg-gray-50'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='text-center mb-16'>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className='text-4xl font-bold text-gray-900 mb-4'
          >
            Client Testimonials
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className='text-xl text-gray-600'
          >
            What our clients say about our services
          </motion.p>
        </div>

        <div
          ref={containerRef}
          className='relative w-full overflow-hidden'
          style={{ scrollBehavior: 'smooth' }}
        >
          <div className='flex space-x-8 w-max'>
            {testimonials.concat(testimonials).map((testimonial, index) => (
              <motion.div
                key={`${testimonial.id}-${index}`}
                animate={{ scale: getScale(index) }}
                transition={{ duration: 0.3 }}
                className='bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow w-80 flex-shrink-0'
              >
                <div className='p-8'>
                  <div className='flex items-center mb-6'>
                    <div className='relative w-16 h-16 rounded-full overflow-hidden mr-4'>
                      <img
                        src={testimonial.image}
                        alt={testimonial.name}
                        className='absolute inset-0 w-full h-full object-cover'
                      />
                    </div>
                    <div>
                      <h3 className='text-lg font-semibold text-gray-900'>
                        {testimonial.name}
                      </h3>
                      <p className='text-gray-600'>{testimonial.role}</p>
                    </div>
                  </div>

                  <div className='flex mb-4'>
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className='w-5 h-5 text-yellow-400 fill-current'
                      />
                    ))}
                  </div>

                  <blockquote className='text-gray-600 italic'>
                    "{testimonial.content}"
                  </blockquote>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials;
