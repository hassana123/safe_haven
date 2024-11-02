import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Lightbulb, Mic } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const affirmations = [
  {
    id: 1,
    title: 'Build Your Strength',
    instruction: 'Say this with me',
    affirmation: 'I am resilient, and each day, I grow stronger.',
    encouragement: "You've got this!",
    intro: 'Hey there,\nI want you to remember that you are incredibly resilient. Each day is a new opportunity to grow stronger.',
    backgroundColor: 'bg-pink-50',
    watermarkColor: 'text-pink-300',
  },
  {
    id: 2,
    title: 'Embracing Your Self-Worth',
    instruction: 'Repeat after me',
    affirmation: 'My past does not define my worth or my future.',
    encouragement: "Let that sink in—your worth is so much more than what you've been through.",
    intro: 'You are not defined by your past, and you absolutely deserve happiness and respect.',
    backgroundColor: 'bg-purple-50',
    watermarkColor: 'text-purple-300',
  },
  {
    id: 3,
    title: 'Finding Peace Within',
    instruction: "Let's say it together",
    affirmation: 'I have the power to find peace within myself.',
    encouragement: "Believe it, because it's true!",
    intro: 'Finding peace within yourself is so important. You have the power to choose healing over pain.',
    backgroundColor: 'bg-blue-50',
    watermarkColor: 'text-blue-300',
  },
  {
    id: 4,
    title: 'Taking Small Steps Forward',
    instruction: 'Join me in saying',
    affirmation: 'Every small step forward is a victory.',
    encouragement: 'Each moment of courage brings you closer to the joy you deserve.',
    intro: 'Every step you take, no matter how small, is a victory worth celebrating.',
    backgroundColor: 'bg-yellow-50',
    watermarkColor: 'text-yellow-300',
  }
];

const Affirmations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const navigate = useNavigate();

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

  const paginate = (newDirection) => {
    setDirection(newDirection);
    setCurrentIndex((prevIndex) => {
      let nextIndex = prevIndex + newDirection;
      if (nextIndex < 0) nextIndex = affirmations.length - 1;
      if (nextIndex >= affirmations.length) nextIndex = 0;
      return nextIndex;
    });
  };

  const handleReadAloud = () => {
    const utterance = new SpeechSynthesisUtterance(affirmations[currentIndex].affirmation);
    utterance.rate = 0.5; // Calm reading pace
    utterance.pitch = 1; // Normal pitch
    utterance.volume = 1; // Full volume
    utterance.lang = 'en-US'; // Language setting
    speechSynthesis.speak(utterance);
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="flex items-center p-4 border-b">
        <button
          onClick={() => window.history.back()}
          className="p-2 hover:bg-gray-100 rounded-full"
          aria-label="Go back"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <h1 className="ml-3 text-xl font-semibold">Affirmations & Positive Self-Talk</h1>
      </header>

      <div className="relative h-[calc(100vh-4rem)] overflow-hidden flex justify-center">
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
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={1}
            onDragEnd={(e, { offset }) => {
              if (Math.abs(offset.x) > 100) {
                paginate(offset.x > 0 ? -1 : 1);
              }
            }}
            className="absolute w-full max-w-md"
          >
            <div className="p-6 h-full">
              <p className="text-gray-700 text-sm mb-6 whitespace-pre-line">
                {affirmations[currentIndex].intro}
              </p>

              <div
                onClick={handleReadAloud}
                className={`rounded-lg p-6 h-[60vh] space-y-4 relative cursor-pointer ${affirmations[currentIndex].backgroundColor}`}
              >
                <div className="flex items-center gap-2 mb-2">
                  <Mic onClick={handleReadAloud}  className="w-10 h-5 cursor-pointer text-gray-700" />
                  <span className="text-sm text-gray-700">Listen and Say with me</span>
                </div>

                <div className="space-y-10">
                  <h2 className="text-2xl font-semibold text-gray-900 mt-20">{affirmations[currentIndex].title}</h2>
                  <p className="text-sm text-gray-600">{affirmations[currentIndex].instruction}</p>
                  <p className="text-lg font-medium text-gray-800">{affirmations[currentIndex].affirmation}</p>
                  <p className="text-sm text-gray-500 italic">{affirmations[currentIndex].encouragement}</p>
                </div>

                {/* Watermark */}
                <div className={`absolute bottom-4 right-4 opacity-20 ${affirmations[currentIndex].watermarkColor}`}>
                  <Lightbulb className="w-16 h-16" />
                </div>
              </div>
            </div>
            <div className="float-right mr-7">
              <div className="text-sm text-gray-500">
                <p className="scale-125 inline-block font-bold"> {currentIndex + 1}</p> / {affirmations.length}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Affirmations;
