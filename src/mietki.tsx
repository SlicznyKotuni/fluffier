import React, { useState, useEffect, useRef } from 'react';

const Cat = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isJumping, setIsJumping] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const [initialPosition, setInitialPosition] = useState({ x: 0, y: 0 });
  const catRef = useRef<HTMLDivElement>(null);
  const longPressTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (catRef.current) {
      const rect = catRef.current.getBoundingClientRect();
      const centerX = window.innerWidth / 2 - rect.width / 2;
      const centerY = window.innerHeight / 2 - rect.height / 2;
      setInitialPosition({ x: centerX, y: centerY });
      setPosition({ x: centerX, y: centerY });
    }
  }, []);

  const handleMouseMove = (e: MouseEvent) => {
    if (isDragging && catRef.current) {
      const deltaX = e.clientX - dragStart.x;
      const deltaY = e.clientY - dragStart.y;
      setPosition({ x: initialPosition.x + deltaX, y: initialPosition.y + deltaY });
    }
  };

  const handleMouseUp = () => {
    if (longPressTimeout.current) {
      clearTimeout(longPressTimeout.current);
    }
    if (isDragging) {
      setIsDragging(false);
      if (catRef.current) {
        const rect = catRef.current.getBoundingClientRect();
        setInitialPosition({ x: position.x, y: position.y });
      }
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    longPressTimeout.current = setTimeout(() => {
      setIsDragging(true);
      if (catRef.current) {
        const rect = catRef.current.getBoundingClientRect();
        setDragStart({ x: e.clientX, y: e.clientY });
        setInitialPosition({ x: position.x, y: position.y });
      }
    }, 500);
  };

  const handleClick = () => {
    if (!isDragging) {
      setIsJumping(true);
      const randomX = (Math.random() - 0.5) * window.innerWidth * 0.4;
      const randomY = (Math.random() - 0.5) * window.innerHeight * 0.2;
      const randomRotation = (Math.random() - 0.5) * 180;
      setPosition(prev => ({
        x: prev.x + randomX,
        y: prev.y + randomY,
      }));
      if (catRef.current) {
        catRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(${randomRotation}deg)`;
      }
      setTimeout(() => {
        setIsJumping(false);
        if (catRef.current) {
          catRef.current.style.transform = `translate(${position.x}px, ${position.y}px) rotate(0deg)`;
        }
      }, 500);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragStart, initialPosition, position]);

  return (
    <div
      ref={catRef}
      className={`absolute cursor-grab w-48 h-48 flex items-center justify-center transition-transform duration-500 ease-out ${isJumping ? 'animate-bounce' : ''} drop-shadow-md`}
      style={{ left: position.x, top: position.y, transform: `translate(0px, 0px)` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      {isHovered && <div className="absolute -top-10 text-gray-500 text-sm">Purr...</div>}
      {/* Head */}
      <div className="relative w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center"> 
        {/* Ears */}
        <div className="absolute -top-4 left-4 w-6 h-6 bg-gray-200 rounded-t-lg transform rotate-[-30deg]" />
        <div className="absolute -top-4 right-4 w-6 h-6 bg-gray-200 rounded-t-lg transform rotate-[30deg]" />
        {/* Eyes */}
        <div className="absolute top-10 left-8 w-3 h-3 bg-gray-600 rounded-full" />
        <div className="absolute top-10 right-8 w-3 h-3 bg-gray-600 rounded-full" />
        {/* Whiskers */}
        <div className="absolute top-14 left-2 w-6 h-px bg-gray-500 transform rotate-5" />
        <div className="absolute top-16 left-2 w-6 h-px bg-gray-500" />
        <div className="absolute top-18 left-2 w-6 h-px bg-gray-500 transform rotate-[-5deg]" />
        <div className="absolute top-14 right-2 w-6 h-px bg-gray-500 transform rotate-[-5deg]" />
        <div className="absolute top-16 right-2 w-6 h-px bg-gray-500" />
        <div className="absolute top-18 right-2 w-6 h-px bg-gray-500 transform rotate-5" />
      </div>
      {/* Body */}
      <div className="absolute top-16 bg-gray-200 w-24 h-36 rounded-full" />
      {/* Tail */}
      <div
        className={`absolute -right-6 bottom-10 w-5 h-24 bg-gray-200 rounded-full transform rotate-45 origin-top-left transition-transform ${isHovered ? 'animate-wiggle' : ''}`}
      >
        <style>
          {
            `
            @keyframes wiggle {
              0% { transform: rotate(40deg); }
              50% { transform: rotate(50deg); }
              100% { transform: rotate(40deg); }
            }
            .animate-wiggle {
              animation: wiggle 0.3s infinite;
            }
            `
          }
        </style>
      </div>
    </div>
  );
};

export default Cat;