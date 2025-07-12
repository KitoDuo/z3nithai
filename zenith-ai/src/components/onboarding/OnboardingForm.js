import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, CheckCircle, User, Gift, Heart, Users, Database, Sparkles } from 'lucide-react';

// Placeholder Step Components (will be created next)
const NameStep = ({ setData, nextStep, formData }) => (
  <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
    <label htmlFor="name" className="block text-xl font-display text-zenith-gray-700 mb-3">What should we call you?</label>
    <input
      type="text"
      id="name"
      value={formData.name || ''}
      onChange={(e) => setData('name', e.target.value)}
      placeholder="Enter your name or nickname"
      className="w-full p-3 border border-zenith-lavender rounded-lg focus:ring-2 focus:ring-zenith-blue focus:border-transparent"
    />
    <button onClick={nextStep} disabled={!formData.name} className="mt-6 bg-zenith-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 flex items-center">
      Next <ArrowRight size={20} className="ml-2" />
    </button>
  </motion.div>
);

const AgeStep = ({ setData, nextStep, prevStep, formData }) => (
  <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 50 }} transition={{ duration: 0.5 }}>
    <label htmlFor="age" className="block text-xl font-display text-zenith-gray-700 mb-3">How young are you?</label>
    <input
      type="number"
      id="age"
      value={formData.age || ''}
      onChange={(e) => setData('age', e.target.value)}
      placeholder="Enter your age"
      className="w-full p-3 border border-zenith-lavender rounded-lg focus:ring-2 focus:ring-zenith-blue focus:border-transparent"
    />
    <div className="mt-6 flex justify-between">
      <button onClick={prevStep} className="text-zenith-gray-600 px-6 py-3 rounded-lg hover:bg-zenith-gray-100 transition">Back</button>
      <button onClick={nextStep} disabled={!formData.age} className="bg-zenith-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition disabled:opacity-50 flex items-center">
        Next <ArrowRight size={20} className="ml-2" />
      </button>
    </div>
  </motion.div>
);

// More step components will be defined similarly...
// For brevity, I'll define them in separate files or directly in OnboardingPage.js if they are simple.

const steps = [
  { id: 'name', icon: <User size={24}/>, title: "Your Name" },
  { id: 'age', icon: <Gift size={24}/>, title: "Your Age" },
  // Add other steps here: Gender, Hobbies, Emotional Struggles, Data Preference
  { id: 'gender', icon: <Users size={24}/>, title: "Your Gender" },
  { id: 'hobbies', icon: <Sparkles size={24}/>, title: "Interests" },
  { id: 'struggles', icon: <Heart size={24}/>, title: "Concerns" },
  { id: 'storage', icon: <Database size={24}/>, title: "Data Preference" },
  { id: 'complete', icon: <CheckCircle size={24}/>, title: "Welcome!" },
];

const OnboardingForm = () => {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [formData, setFormData] = useState({});
  const [animationDirection, setAnimationDirection] = useState(1); // 1 for next, -1 for prev

  const handleSetData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const nextStep = () => {
    if (currentStepIndex < steps.length - 1) {
      setAnimationDirection(1);
      setCurrentStepIndex(prev => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStepIndex > 0) {
      setAnimationDirection(-1);
      setCurrentStepIndex(prev => prev - 1);
    }
  };

  const currentProgress = ((currentStepIndex + 1) / steps.length) * 100;

  const renderStepContent = () => {
    const stepId = steps[currentStepIndex].id;
    // In a real app, each step would be a separate component for better organization.
    // For this example, some are inline for brevity.
    switch (stepId) {
      case 'name':
        return <NameStep setData={handleSetData} nextStep={nextStep} formData={formData} />;
      case 'age':
        return <AgeStep setData={handleSetData} nextStep={nextStep} prevStep={prevStep} formData={formData} />;
      // ... cases for other steps
      case 'gender':
        // Simplified GenderStep
        return (
          <motion.div initial={{ opacity: 0, x: animationDirection * -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: animationDirection * 50 }} transition={{ duration: 0.5 }}>
            <label className="block text-xl font-display text-zenith-gray-700 mb-3">How do you identify?</label>
            {['Woman', 'Man', 'Non-binary', 'Prefer to self-describe', 'Prefer not to say'].map(option => (
              <button key={option} onClick={() => { handleSetData('gender', option); nextStep(); }} className={`block w-full text-left p-3 my-2 border rounded-lg hover:bg-zenith-lavender/50 transition ${formData.gender === option ? 'bg-zenith-lavender ring-2 ring-zenith-blue' : 'border-zenith-lavender'}`}>
                {option}
              </button>
            ))}
             <input
              type="text"
              hidden={formData.gender !== 'Prefer to self-describe'}
              value={formData.customGender || ''}
              onChange={(e) => handleSetData('customGender', e.target.value)}
              placeholder="Please specify"
              className={`w-full p-3 mt-2 border border-zenith-lavender rounded-lg focus:ring-2 focus:ring-zenith-blue ${formData.gender === 'Prefer to self-describe' ? 'block' : 'hidden' }`}
            />
            <div className="mt-6 flex justify-between">
              <button onClick={prevStep} className="text-zenith-gray-600 px-6 py-3 rounded-lg hover:bg-zenith-gray-100 transition">Back</button>
               {/* Next button only active if a choice is made OR custom gender is filled */}
            </div>
          </motion.div>
        );
      case 'hobbies':
         const allHobbies = ["Reading", "Music", "Gaming", "Sports", "Art", "Travel", "Cooking", "Nature"];
        return (
            <motion.div initial={{ opacity: 0, x: animationDirection * -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: animationDirection * 50 }} transition={{ duration: 0.5 }}>
                <label className="block text-xl font-display text-zenith-gray-700 mb-3">What are some of your interests?</label>
                <div className="flex flex-wrap gap-2 mb-4">
                    {allHobbies.map(hobby => (
                        <button
                            key={hobby}
                            onClick={() => {
                                const currentHobbies = formData.hobbies || [];
                                const newHobbies = currentHobbies.includes(hobby)
                                    ? currentHobbies.filter(h => h !== hobby)
                                    : [...currentHobbies, hobby];
                                handleSetData('hobbies', newHobbies);
                            }}
                            className={`p-2 px-4 border rounded-full transition ${ (formData.hobbies || []).includes(hobby) ? 'bg-zenith-blue text-white ring-2 ring-zenith-blue' : 'border-zenith-lavender hover:bg-zenith-lavender/50'}`}
                        >
                            {hobby}
                        </button>
                    ))}
                </div>
                <div className="mt-6 flex justify-between">
                    <button onClick={prevStep} className="text-zenith-gray-600 px-6 py-3 rounded-lg hover:bg-zenith-gray-100 transition">Back</button>
                    <button onClick={nextStep} className="bg-zenith-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center">
                        Next <ArrowRight size={20} className="ml-2" />
                    </button>
                </div>
            </motion.div>
        );
      case 'struggles':
        const allStruggles = ["Stress", "Anxiety", "Low Mood", "Sleep Issues", "Motivation", "Relationships"];
        return (
            <motion.div initial={{ opacity: 0, x: animationDirection * -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: animationDirection * 50 }} transition={{ duration: 0.5 }}>
                <label className="block text-xl font-display text-zenith-gray-700 mb-1">Are there any specific areas you'd like to focus on?</label>
                <p className="text-sm text-zenith-gray-500 mb-3">Select any that apply. This helps us personalize your experience.</p>
                <div className="flex flex-wrap gap-2 mb-4">
                    {allStruggles.map(item => (
                        <button
                            key={item}
                            onClick={() => {
                                const current = formData.struggles || [];
                                const newItems = current.includes(item)
                                    ? current.filter(s => s !== item)
                                    : [...current, item];
                                handleSetData('struggles', newItems);
                            }}
                            className={`p-2 px-4 border rounded-full transition ${ (formData.struggles || []).includes(item) ? 'bg-zenith-pink text-white ring-2 ring-zenith-pink' : 'border-zenith-lavender hover:bg-zenith-lavender/50'}`}
                        >
                            {item}
                        </button>
                    ))}
                </div>
                <div className="mt-6 flex justify-between">
                    <button onClick={prevStep} className="text-zenith-gray-600 px-6 py-3 rounded-lg hover:bg-zenith-gray-100 transition">Back</button>
                    <button onClick={nextStep} className="bg-zenith-blue text-white px-8 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition flex items-center">
                        Next <ArrowRight size={20} className="ml-2" />
                    </button>
                </div>
            </motion.div>
        );
      case 'storage':
        return (
          <motion.div initial={{ opacity: 0, x: animationDirection * -50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: animationDirection * 50 }} transition={{ duration: 0.5 }}>
            <label className="block text-xl font-display text-zenith-gray-700 mb-3">How would you like to store your data?</label>
            <p className="text-sm text-zenith-gray-500 mb-4">Your privacy is important. Choose what's best for you.</p>
            <button onClick={() => { handleSetData('storage', 'cookie'); nextStep(); }} className={`block w-full text-left p-4 my-2 border rounded-lg hover:bg-zenith-lavender/50 transition ${formData.storage === 'cookie' ? 'bg-zenith-lavender ring-2 ring-zenith-blue' : 'border-zenith-lavender'}`}>
              <h3 className="font-semibold">Local Browser Storage (Cookies)</h3>
              <p className="text-xs text-zenith-gray-600">Data stays on this device. Private but not synced.</p>
            </button>
            <button onClick={() => { handleSetData('storage', 'cloud'); nextStep(); }} className={`block w-full text-left p-4 my-2 border rounded-lg hover:bg-zenith-lavender/50 transition ${formData.storage === 'cloud' ? 'bg-zenith-lavender ring-2 ring-zenith-blue' : 'border-zenith-lavender'}`}>
              <h3 className="font-semibold">Secure Cloud Storage</h3>
              <p className="text-xs text-zenith-gray-600">Access your data across devices. Securely encrypted.</p>
            </button>
            <div className="mt-6 flex justify-between">
              <button onClick={prevStep} className="text-zenith-gray-600 px-6 py-3 rounded-lg hover:bg-zenith-gray-100 transition">Back</button>
              {/* Next button is implicitly handled by choices */}
            </div>
          </motion.div>
        );
      case 'complete':
        return (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.7, type: 'spring' }} className="text-center">
            <CheckCircle size={64} className="text-zenith-mint mx-auto mb-6" />
            <h2 className="text-3xl font-display text-zenith-gray-800 mb-4">Welcome aboard, {formData.name || "friend"}!</h2>
            <p className="text-lg font-body text-zenith-gray-600">Let’s make space for your mind.</p>
            <p className="text-sm font-body text-zenith-gray-500 mt-4">Your choices: Age: {formData.age}, Gender: {formData.gender === 'Prefer to self-describe' ? formData.customGender : formData.gender}, Hobbies: {(formData.hobbies || []).join(', ') || 'Not specified'}, Concerns: {(formData.struggles || []).join(', ') || 'Not specified'}, Storage: {formData.storage}</p>
            <Link to="/dashboard" className="mt-8 inline-block bg-zenith-pink text-white px-10 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition shadow-lg">
              Go to Dashboard
            </Link>
          </motion.div>
        );
      default:
        return <div>Unknown step</div>;
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto p-6 md:p-10 bg-white rounded-xl shadow-2xl">
      {/* Progress Bar and Icons */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
                <div key={step.id} className={`flex flex-col items-center ${index <= currentStepIndex ? 'text-zenith-blue' : 'text-zenith-gray-300'}`}>
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 ${index <= currentStepIndex ? 'bg-zenith-blue text-white border-zenith-blue' : 'border-zenith-gray-300'}`}>
                        {step.icon}
                    </div>
                    <span className={`mt-1 text-xs ${index <= currentStepIndex ? 'font-semibold' : ''}`}>{step.title}</span>
                </div>
            ))}
        </div>
        <div className="w-full bg-zenith-lavender rounded-full h-2.5">
          <motion.div
            className="bg-zenith-blue h-2.5 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${currentProgress}%` }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          />
        </div>
      </div>

      <AnimatePresence mode="wait" custom={animationDirection}>
        <motion.div
          key={currentStepIndex}
          custom={animationDirection}
          initial={{ opacity: 0, x: animationDirection * -50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: animationDirection * 50 }}
          transition={{ duration: 0.4, ease: 'easeInOut' }}
        >
          {renderStepContent()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default OnboardingForm;
