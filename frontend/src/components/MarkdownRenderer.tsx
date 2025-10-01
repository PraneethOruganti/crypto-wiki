import ReactMarkdown from 'react-markdown';
import { MathJax, MathJaxContext } from 'better-react-mathjax';
import RemarkMathPlugin from 'remark-math';

interface MarkdownRendererProps {
  content: string;
}

function MarkdownRenderer({ content }: MarkdownRendererProps) {
  return (
    <MathJaxContext>
      <ReactMarkdown
        components={{
          // Block math
          math: ({ value }) => <MathJax dynamic>{`\\[${value}\\]`}</MathJax>,
          // Inline math
          inlineMath: ({ value }) => <MathJax dynamic>{`\\(${value}\\)`}</MathJax>,
        }}
        remarkPlugins={[RemarkMathPlugin]}
      ></ReactMarkdown>
    </MathJaxContext>
  );
}

export default MarkdownRenderer;
