import React, { useState } from 'react';

const TextInput: React.FC = () => {
  const [text, setText] = useState<string>('');

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setText(event.target.value);
  };

  return (
    <div className="p-4">
      <label htmlFor="input" className="block text-gray-700 mb-2">Enter text:</label>
      <input 
        id="input"
        type="text"
        value={text}
        onChange={handleChange}
        className="border border-gray-300 rounded p-2 w-full"
      />
      <p className="mt-2 text-gray-600">You typed: {text}</p>
    </div>
  );
};

export default TextInput;