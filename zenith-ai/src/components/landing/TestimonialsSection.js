import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, UserCircle } from 'lucide-react';

const testimonialsData = [
  {
    id: 1,
    quote: "Zenith AI has truly been a gentle companion on my mental wellness journey. MindMate listens without judgment.",
    name: "Alex P.",
    role: "User since 2023",
    avatar: null, // Placeholder for avatar image
  },
  {
    id: 2,
    quote: "The mood tracker and journal have helped me understand myself better. It's so beautifully designed!",
    name: "Sarah K.",
    role: "Wellness Advocate",
    avatar: null,
  },
  {
    id: 3,
    quote: "I love the calming atmosphere and the cute characters. It makes mental health feel less daunting.",
    name: "John B.",
    role: "Student",
    avatar: null,
  },
];

const TestimonialsSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonialsData.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + testimonialsData.length) % testimonialsData.length);
  };

  useEffect(() => {
    const timer = setTimeout(nextTestimonial, 5000); // Auto-scroll every 5 seconds
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const currentItem = testimonialsData[currentIndex];

  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };
  const [direction, setDirection] = useState(0);


  return (
    <section className="py-16 px-4 md:px-8 bg-zenith-beige">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-display text-zenith-gray-800 mb-12">Loved by Users</h2>
        <div className="relative h-80 md:h-72 overflow-hidden max-w-3xl mx-auto">
          <AnimatePresence initial={false} custom={direction}>
            <motion.div
              key={currentIndex}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{
                x: { type: "spring", stiffness: 300, damping: 30 },
                opacity: { duration: 0.2 }
              }}
              className="absolute w-full h-full flex flex-col items-center justify-center p-6 bg-white rounded-xl shadow-xl"
            >
              <p className="text-lg md:text-xl font-body text-zenith-gray-700 mb-6 italic">"{currentItem.quote}"</p>
              <div className="flex items-center">
                {currentItem.avatar ? (
                  <img src={currentItem.avatar} alt={currentItem.name} className="w-12 h-12 rounded-full mr-4" />
                ) : (
                  <UserCircle size={48} className="text-zenith-blue mr-3" />
                )}
                <div>
                  <p className="font-semibold text-zenith-gray-800">{currentItem.name}</p>
                  <p className="text-sm text-zenith-gray-500">{currentItem.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => { setDirection(-1); prevTestimonial(); }}
            className="p-2 bg-zenith-blue text-white rounded-full hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-zenith-blue focus:ring-opacity-50"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={() => { setDirection(1); nextTestimonial(); }}
            className="p-2 bg-zenith-blue text-white rounded-full hover:bg-opacity-80 transition-colors focus:outline-none focus:ring-2 focus:ring-zenith-blue focus:ring-opacity-50"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
