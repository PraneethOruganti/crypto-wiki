import ReactMarkdown from 'react-markdown';
import remarkMath from 'remark-math';
import rehypeKatex from 'rehype-katex';
import 'katex/dist/katex.min.css';

interface MarkdownRendererProps {
  content: string;
  macros?: Record<string, string>;
}

//
function MarkdownRenderer({ content, macros = {} }: MarkdownRendererProps) {
  return (
    <ReactMarkdown remarkPlugins={[remarkMath]} rehypePlugins={[[rehypeKatex, { macros }]]}>
      {content}
    </ReactMarkdown>
  );
}

export default MarkdownRenderer;
