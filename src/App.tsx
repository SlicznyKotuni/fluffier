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
      const randomX = (Math.random() - 0.5) * window.innerWidth * 0.5;
      const randomY = (Math.random() - 0.5) * window.innerHeight * 0.3;
      const randomRotation = (Math.random() - 0.5) * 360;
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
      className={`absolute cursor-grab w-40 h-40 flex items-center justify-center transition-transform duration-500 ease-out ${isJumping ? 'animate-bounce' : ''}`}
      style={{ left: position.x, top: position.y, transform: `translate(0px, 0px)` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
      onClick={handleClick}
    >
      {isHovered && <div className="absolute -top-10 text-gray-600">Purr...</div>}
      <div className="relative w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
        {/* Ears */}
        <div className="absolute -top-5 left-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-gray-300 transform rotate-[-20deg]" />
        <div className="absolute -top-5 right-2 w-0 h-0 border-l-[10px] border-r-[10px] border-b-[15px] border-l-transparent border-r-transparent border-b-gray-300 transform rotate-[20deg]" />
        {/* Eyes */}
        <div className="absolute top-6 left-4 w-3 h-3 bg-gray-700 rounded-full" />
        <div className="absolute top-6 right-4 w-3 h-3 bg-gray-700 rounded-full" />
        {/* Whiskers */}
        <div className="absolute top-10 left-0 w-6 h-px bg-gray-600 transform rotate-10" />
        <div className="absolute top-11 left-0 w-6 h-px bg-gray-600" />
        <div className="absolute top-12 left-0 w-6 h-px bg-gray-600 transform rotate-[-10deg]" />
        <div className="absolute top-10 right-0 w-6 h-px bg-gray-600 transform rotate-[-10deg]" />
        <div className="absolute top-11 right-0 w-6 h-px bg-gray-600" />
        <div className="absolute top-12 right-0 w-6 h-px bg-gray-600 transform rotate-10" />
      </div>
      {/* Body */}
      <div className="absolute top-16 bg-gray-300 w-20 h-32 rounded-t-full rounded-b-3xl" />
      {/* Tail */}
      <div className={`absolute -right-4 bottom-10 w-4 h-20 bg-gray-300 rounded-full transform rotate-45 origin-top-left transition-transform ${isHovered ? 'animate-wiggle' : ''}`}>
        <style>
          {
            `
            @keyframes wiggle {
              0% { transform: rotate(45deg); }
              50% { transform: rotate(55deg); }
              100% { transform: rotate(45deg); }
            }
            .animate-wiggle {
              animation: wiggle 0.5s infinite;
            }
            `
          }
        </style>
      </div>
    </div>
  );
};

export default Cat;
