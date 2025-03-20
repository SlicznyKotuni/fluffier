import { useState } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isJumping, setIsJumping] = useState(false);

  const handleHover = () => {
    const audio = new Audio("https://www.fesliyanstudios.com/play-mp3/387"); // Purring sound
    audio.play();
  };

  const handleClick = () => {
    setIsJumping(true);
    setTimeout(() => setIsJumping(false), 1000);
  };

  const handleDrag = (event: any, info: any) => {
    setPosition({ x: info.point.x, y: info.point.y });
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <motion.div
        className="relative w-40 h-40 bg-gray-300 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
        style={{ x: position.x, y: position.y }}
        onHoverStart={handleHover}
        onTap={handleClick}
        drag
        dragConstraints={{ top: 0, left: 0, right: 300, bottom: 300 }}
        onDrag={handleDrag}
        animate={isJumping ? { scale: [1, 1.2, 1], rotate: [0, 360] } : {}}
        transition={{ duration: 0.5 }}
      >
        {/* Ears */}
        <div className="absolute top-0 left-6 w-8 h-8 bg-gray-300 rounded-t-full transform rotate-45"></div>
        <div className="absolute top-0 right-6 w-8 h-8 bg-gray-300 rounded-t-full transform -rotate-45"></div>

        {/* Face */}
        <div className="absolute w-24 h-24 bg-white rounded-full flex items-center justify-center">
          {/* Eyes */}
          <div className="w-4 h-4 bg-black rounded-full mx-2"></div>
          <div className="w-4 h-4 bg-black rounded-full mx-2"></div>

          {/* Whiskers */}
          <div className="absolute left-0 top-8 w-12 h-1 bg-gray-400"></div>
          <div className="absolute right-0 top-8 w-12 h-1 bg-gray-400"></div>
        </div>

        {/* Tail */}
        <div className="absolute bottom-0 right-0 w-16 h-4 bg-gray-300 rounded-full"></div>
      </motion.div>
    </div>
  );
};

export default Home;