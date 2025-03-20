import React from 'react';
import Navbar from './components/Navbar';
import TextInput from './components/TextInput';

const App: React.FC = () => {
  return (
    <div className="App">
      <Navbar />
      <div className="container mx-auto mt-8">
        <TextInput />
      </div>
    </div>
  );
};

export default App;