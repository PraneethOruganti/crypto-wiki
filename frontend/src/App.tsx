/* eslint-disable @typescript-eslint/no-explicit-any */
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import { useEffect, useState } from 'react';

function App() {
  const [input, setInput] = useState<string>('');
  const [savedFormulas, setSavedFormulas] = useState<string[]>([]);

  // fetch definitions from backend on component mount
  useEffect(() => {
    fetch('http://localhost:3000/definitions')
      .then((res) => res.json())
      .then((data) => setSavedFormulas(data.map((d: any) => d.bodyLatex)));
  }, []);

  // save new formula
  const saveFormula = async () => {
    await fetch('http://localhost:3000/definitions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ bodyLatex: input }),
    });

    setInput('');

    // reload after save
    const updated = await fetch('http://localhost:3000/definitions').then((res) => res.json());
    setSavedFormulas(updated.map((d: any) => d.bodyLatex));
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border-2 mr-2"
          placeholder="Enter LaTeX"
        />
        <button onClick={saveFormula} className="px-4 py-2 bg-blue-500 text-white rounded">
          Save Formula
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Preview:</h2>
        <MathJaxContext>
          {/* <MathJax>{`\\(${input}\\)`}</MathJax> */}
          <MathJax>{input}</MathJax>
        </MathJaxContext>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold">Saved Formulas:</h2>
        <MathJaxContext>
          {savedFormulas.map((formula, index) => (
            <div key={index} className="mt-2">
              <MathJax>{formula}</MathJax>
            </div>
          ))}
        </MathJaxContext>
      </div>
    </div>
  );
}

export default App;
