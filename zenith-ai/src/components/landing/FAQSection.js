import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, HelpCircle } from 'lucide-react';

const faqData = [
  {
    question: "What is Zenith AI?",
    answer: "Zenith AI is a free mental wellness ecosystem designed to be a soft companion on your journey. It uses AI-powered therapy, mood tracking, journaling, and personalization to help you heal, track, and grow."
  },
  {
    question: "Is Zenith AI really free?",
    answer: "Yes, Zenith AI is committed to providing core mental wellness tools for free. Optional premium features may be introduced in the future, but the fundamental platform will remain accessible."
  },
  {
    question: "How does MindMate AI work?",
    answer: "MindMate is an AI therapist that uses advanced natural language processing to engage in supportive conversations. It's designed to listen, offer reflections, and guide you through evidence-based techniques. It is not a replacement for human therapy but a supportive tool."
  },
  {
    question: "How is my data stored and protected?",
    answer: "You have control over your data. You can choose to store data locally in your browser (cookies/localStorage) or opt-in for secure cloud storage for cross-device access. We prioritize your privacy and use encryption for cloud-stored data."
  },
  {
    question: "Can I use Zenith AI offline?",
    answer: "Yes, core features like journaling and mood tracking can work offline using local browser storage. If you use cloud sync, your data will sync when you're back online."
  }
];

const AccordionItem = ({ question, answer, isOpen, onClick }) => {
  return (
    <div className="border-b border-zenith-lavender">
      <button
        onClick={onClick}
        className="flex justify-between items-center w-full py-5 px-6 text-left text-lg font-body text-zenith-gray-700 hover:bg-zenith-beige/30 focus:outline-none"
        aria-expanded={isOpen}
      >
        <span>{question}</span>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronDown size={24} className={`transform transition-transform duration-300 ${isOpen ? 'text-zenith-blue' : 'text-zenith-gray-500'}`} />
        </motion.div>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="py-5 px-6 text-md font-body text-zenith-gray-600 bg-zenith-beige/20">
              {answer}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const handleToggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 px-4 md:px-8 bg-zenith-gray-50">
      <div className="container mx-auto max-w-3xl">
        <div className="text-center mb-12">
          <HelpCircle size={48} className="mx-auto text-zenith-pink mb-4" />
          <h2 className="text-3xl md:text-4xl font-display text-zenith-gray-800">Frequently Asked Questions</h2>
        </div>
        <div className="bg-white rounded-xl shadow-xl overflow-hidden">
          {faqData.map((faq, index) => (
            <AccordionItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={openIndex === index}
              onClick={() => handleToggle(index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
