import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputText, setInputText] = useState('');
  const [generatedText, setGeneratedText] = useState('');

  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // This function will call the back-end API and update the generatedText state
  const handleGenerateResponse = async () => {
    try {
      const response = await fetch('http://localhost:5000/generate-response', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: inputText }),
      });

      const data = await response.json();
      setGeneratedText(data.generatedResponse);
    } catch (error) {
      console.error('Error generating response:', error);
    }
  };

  return (
    <div className="App">
      <h1>Text Response Generator</h1>
      <div className="input-container">
        <label htmlFor="input-text">Enter your text:</label>
        <textarea
          id="input-text"
          value={inputText}
          onChange={handleInputChange}
          rows={5}
          cols={50}
        ></textarea>
      </div>
      <button onClick={handleGenerateResponse}>Generate Response</button>
      <div className="output-container">
        <h2>Generated Response:</h2>
        <p>{generatedText}</p>
      </div>
    </div>
  );
}

export default App;
