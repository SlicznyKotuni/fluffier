import { useState, useEffect } from 'react';
import { useSpring, animated } from 'react-spring';
import useSound from 'use-sound';

const CuteCatPage = () => {
  const [isJumping, setIsJumping] = useState(false);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isPurring, setIsPurring] = useState(false);
  const [pettingCount, setPettingCount] = useState(0);
  const [lastInteraction, setLastInteraction] = useState('');

  // Animation for jumping
  const jumpAnimation = useSpring({
    transform: isJumping ? 'translateY(-30px)' : 'translateY(0px)',
    config: { tension: 300, friction: 10 },
  });

  // Animation for spinning
  const spinAnimation = useSpring({
    transform: isSpinning ? 'rotate(360deg)' : 'rotate(0deg)',
    config: { duration: 1000 },
  });

  // Animation for purring (subtle scale effect)
  const purrAnimation = useSpring({
    transform: isPurring ? 'scale(1.05)' : 'scale(1)',
    config: { tension: 300, friction: 10, duration: 500 },
  });

  // Combine animations
  const combinedAnimation = {
    ...jumpAnimation,
    ...spinAnimation,
    ...purrAnimation,
  };

  // Purr sound effect (mock implementation since we can't actually play sounds)
  const [playPurr, { stop: stopPurr }] = [
    () => {
      setIsPurring(true);
      setLastInteraction('Purring... 😺');
      // In a real implementation, this would play the sound
    },
    {
      stop: () => {
        setIsPurring(false);
      },
    },
  ];

  // Handle cat petting
  const handlePetCat = () => {
    const newCount = pettingCount + 1;
    setPettingCount(newCount);
    
    // Different reactions based on petting count
    if (newCount % 3 === 0) {
      setIsJumping(true);
      setLastInteraction('Jumped with joy! 🐱');
      setTimeout(() => setIsJumping(false), 500);
    } else if (newCount % 2 === 0) {
      setIsSpinning(true);
      setLastInteraction('Spinning around! 😸');
      setTimeout(() => setIsSpinning(false), 1000);
    } else {
      playPurr();
      setTimeout(() => stopPurr(), 2000);
    }
  };

  // Cat ear wiggle on hover
  const [isEarWiggling, setIsEarWiggling] = useState(false);
  const leftEarAnimation = useSpring({
    transform: isEarWiggling ? 'rotate(-15deg)' : 'rotate(0deg)',
    config: { tension: 300, friction: 10 },
  });
  const rightEarAnimation = useSpring({
    transform: isEarWiggling ? 'rotate(15deg)' : 'rotate(0deg)',
    config: { tension: 300, friction: 10 },
  });

  return (
    <div className="min-h-screen bg-pink-50 flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-pink-600 mb-8">Mięciutki Kotunio</h1>
      
      <div 
        className="relative cursor-pointer transition-all duration-300"
        onClick={handlePetCat}
        onMouseEnter={() => setIsEarWiggling(true)}
        onMouseLeave={() => setIsEarWiggling(false)}
      >
        <animated.div style={combinedAnimation} className="relative">
          {/* Cat body */}
          <div className="w-64 h-48 bg-gray-200 rounded-3xl bg-gradient-to-b from-gray-100 to-gray-300 shadow-lg relative">
            {/* Cat face */}
            <div className="absolute w-48 h-40 bg-gray-100 rounded-full top-4 left-8 flex flex-col items-center justify-center">
              {/* Eyes */}
              <div className="flex space-x-12 mb-2">
                <div className="relative">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-8 bg-black rounded-full relative">
                      <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1"></div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
                    <div className="w-4 h-8 bg-black rounded-full relative">
                      <div className="absolute w-1 h-1 bg-white rounded-full top-1 left-1"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Nose */}
              <div className="w-4 h-3 bg-pink-300 rounded-full mb-1"></div>
              
              {/* Mouth */}
              <div className="w-8 h-2 flex justify-center">
                <div className="w-4 h-2 border-b-2 border-gray-500 rounded-b-lg"></div>
              </div>
              
              {/* Whiskers */}
              <div className="absolute w-full flex justify-between px-2 top-20">
                <div className="flex flex-col space-y-2">
                  <div className="w-10 h-px bg-gray-400"></div>
                  <div className="w-10 h-px bg-gray-400"></div>
                  <div className="w-10 h-px bg-gray-400"></div>
                </div>
                <div className="flex flex-col space-y-2">
                  <div className="w-10 h-px bg-gray-400"></div>
                  <div className="w-10 h-px bg-gray-400"></div>
                  <div className="w-10 h-px bg-gray-400"></div>
                </div>
              </div>
            </div>
            
            {/* Ears */}
            <animated.div 
              style={leftEarAnimation} 
              className="absolute w-12 h-16 bg-gray-200 rounded-tl-3xl -top-8 left-12 transform origin-bottom-right"
            >
              <div className="w-8 h-10 bg-pink-200 rounded-tl-3xl ml-1 mt-1"></div>
            </animated.div>
            
            <animated.div 
              style={rightEarAnimation} 
              className="absolute w-12 h-16 bg-gray-200 rounded-tr-3xl -top-8 right-12 transform origin-bottom-left"
            >
              <div className="w-8 h-10 bg-pink-200 rounded-tr-3xl ml-3 mt-1"></div>
            </animated.div>
            
            {/* Paws */}
            <div className="absolute -bottom-4 left-10 flex space-x-20">
              <div className="w-10 h-6 bg-gray-200 rounded-b-full"></div>
              <div className="w-10 h-6 bg-gray-200 rounded-b-full"></div>
            </div>
            
            {/* Tail */}
            <div className="absolute -right-16 top-16 w-20 h-6 bg-gray-200 rounded-r-full transform rotate-12"></div>
          </div>
        </animated.div>
      </div>
      
      <div className="mt-8 text-center">
        <p className="text-lg text-pink-500 font-medium mb-2">{lastInteraction || "Dotknij kotka! 🐱"}</p>
        <p className="text-sm text-gray-600">Liczba pieszczot: {pettingCount}</p>
      </div>
      
      <div className="mt-8 bg-white p-6 rounded-lg shadow-md max-w-md">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Jak bawić się z kotkiem:</h2>
        <ul className="list-disc pl-5 space-y-2 text-gray-700">
          <li>Kliknij na kotka, aby go pogłaskać</li>
          <li>Najedź myszką, aby zobaczyć jak rusza uszkami</li>
          <li>Głaszcz wielokrotnie, aby zobaczyć różne reakcje</li>
          <li>Kotunio będzie mruczeć, skakać i frygać!</li>
        </ul>
      </div>
    </div>
  );
};

export default CuteCatPage;