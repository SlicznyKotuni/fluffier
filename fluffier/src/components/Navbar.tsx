import React from 'react';

const Navbar: React.FC = () => {
  return (
    <nav className="bg-blue-500 text-white p-4">
      <ul className="flex space-x-4">
        <li><a href="#home" className="hover:underline">Home</a></li>
        <li><a href="#about" className="hover:underline">About</a></li>
        <li><a href="#contact" className="hover:underline">Contact</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;