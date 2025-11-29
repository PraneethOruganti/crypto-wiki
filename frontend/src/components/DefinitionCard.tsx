import type { Definition } from '../types/definition';
import MarkdownRenderer from './MarkdownRenderer';

interface DefinitionProps {
  index: number;
  def: Definition;
  onEdit: (def: Definition) => void;
  onDelete: (id: number) => void;
}

function DefinitionCard({ def, index, onEdit, onDelete }: DefinitionProps) {
  return (
    <div key={index} className="mt-4 p-4 rounded border">
      <h3 className="font-bold">{def.title}</h3>
      <p className="italic text-sm text-gray-500"></p>
      <MarkdownRenderer content={def.bodyLatex} />
      <div className="mt-2 flex gap-2">
        <button onClick={() => onEdit(def)} className="text-blue-600 hover:underline">
          Edit
        </button>
        <button onClick={() => onDelete(def.id)} className="text-red-600 hover:underline">
          Delete
        </button>
      </div>
    </div>
  );
}

export default DefinitionCard;
