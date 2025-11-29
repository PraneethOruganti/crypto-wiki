import { createFileRoute } from '@tanstack/react-router';
import MarkdownRenderer from '../../components/MarkdownRenderer';
import { useEffect, useState } from 'react';

import defn1 from '../../data/defn1.md?raw';
import defn2 from '../../data/defn2.md?raw';

export const Route = createFileRoute('/wiki/$defId')({
  component: RouteComponent,
});

function RouteComponent() {
  const { defId } = Route.useParams();
  const [content, setContent] = useState<string>('');
  const validSlug = defId === '1' || defId === '2';

  useEffect(() => {
    if (validSlug) setContent(defId === '2' ? defn2 : defn1);
  }, [defId]);

  if (!validSlug) {
    return <div>No such definition found</div>;
  }

  return (
    <div className="p-4">
      <p className="font-bold text-decoration: underline">Definition #{defId}</p>
      <div className="min-h-screen">
        <MarkdownRenderer content={content}></MarkdownRenderer>
      </div>
    </div>
  );
}
