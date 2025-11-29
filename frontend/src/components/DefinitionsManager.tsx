import { useEffect, useState } from 'react';
import type { Definition } from '../types/definition';
import DefinitionCard from './DefinitionCard';
import MarkdownRenderer from './MarkdownRenderer';

function DefinitionsManager() {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<string>('');
  const [input, setInput] = useState<string>('');
  const [savedDefs, setSavedDefs] = useState<Definition[]>([]);
  const [editingDef, setEditingDef] = useState<Definition | null>(null);
  const [macros, setMacros] = useState<Record<string, string>>({});
  const [macroKey, setMacroKey] = useState<string>('');
  const [macroValue, setMacroValue] = useState<string>('');

  // fetch definitions from backend on component mount
  useEffect(() => {
    fetch('http://localhost:3000/definitions')
      .then((res) => res.json())
      .then((data) => setSavedDefs(data.data))
      .catch((error) => console.error('Failed to fetch definitions', error));
  }, []);

  // Add or update a macro
  const handleAddMacro = () => {
    if (macroKey.trim()) {
      setMacros((prev) => ({
        ...prev,
        [macroKey]: macroValue,
      }));
      setMacroKey('');
      setMacroValue('');
    }
  };

  // Remove a macro
  const handleRemoveMacro = (key: string) => {
    setMacros((prev) => {
      const updated = { ...prev };
      delete updated[key];
      return updated;
    });
  };

  // save new definition
  const saveDef = async () => {
    try {
      const response = await fetch('http://localhost:3000/definitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, category, bodyLatex: input }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      setTitle('');
      setCategory('');
      setInput('');
      setMacros({});

      // reload after save
      const updated = await fetch('http://localhost:3000/definitions').then((res) => res.json());
      setSavedDefs(updated);
    } catch (error) {
      console.error('Failed to save definition', error);
    }
  };

  const handleEdit = (def: Definition) => {
    setTitle(def.title);
    setInput(def.bodyLatex);
    setCategory(def.category || ' ');
    setEditingDef(def);
  };

  const handleUpdate = async () => {
    if (!editingDef) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/definitions/${editingDef.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title,
          category,
          bodyLatex: input,
        }),
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }

      const updatedDef = await response.json();

      // Update definition currently being edited
      setSavedDefs((prevDefs) =>
        prevDefs.map((def) => (def.id === editingDef.id ? updatedDef : def))
      );

      // clear input forms
      setTitle('');
      setCategory('');
      setInput('');
      setMacros({});
      setEditingDef(null);
    } catch (error) {
      console.error('Failed to update definition', error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/definitions/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error(`Server responded with ${response.status}`);
      }
    } catch (error) {
      console.error('Failed to delete definition', error);
    }
  };

  return (
    <div className="p-4">
      {/* Macro Editor Section */}
      <div className="mt-4 p-3 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Macros</h3>
        <div className="flex gap-2 mb-2">
          <input
            value={macroKey}
            onChange={(e) => setMacroKey(e.target.value)}
            placeholder="Macro name (e.g., \secp)"
            className="border p-2 flex-1"
          />
          <input
            value={macroValue}
            onChange={(e) => setMacroValue(e.target.value)}
            placeholder="Macro value (e.g., \lambda)"
            className="border p-2 flex-1"
          />
          <button
            onClick={handleAddMacro}
            className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-700"
          >
            Add
          </button>
        </div>

        {/* Display added macros */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(macros).map(([key, value]) => (
            <div key={key} className="bg-white p-2 rounded border flex items-center gap-2">
              <span className="font-mono text-sm">
                {key} → {value}
              </span>
              <button
                onClick={() => handleRemoveMacro(key)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                ×
              </button>
            </div>
          ))}
        </div>
      </div>
      <div className="mb-4">
        <input
          value={title}
          placeholder="Definition title"
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          className="border p-2 w-full mb-2"
        />
        <input
          value={category}
          placeholder="Category (optional)"
          type="text"
          onChange={(e) => setCategory(e.target.value)}
          className="border p-2 w-full mb-2"
        />

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="p-2 border-2 mr-2 w-full h-32 resize-y"
          placeholder="Enter Markdown and LaTeX content here..."
        />

        <button
          onClick={editingDef ? handleUpdate : saveDef}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 active:bg-blue-800 mt-2"
        >
          Save Definition
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-xl font-bold">Preview:</h2>
        <MarkdownRenderer content={input} macros={macros}></MarkdownRenderer>
      </div>

      {savedDefs &&
        savedDefs.map((def, index) => (
          <DefinitionCard index={index} def={def} onEdit={handleEdit} onDelete={handleDelete} />
        ))}
    </div>
  );
}

export default DefinitionsManager;
