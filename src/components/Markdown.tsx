'use client';

import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import rehypeHighlight from 'rehype-highlight';
import rehypeSlug from 'rehype-slug';
import '@/styles/markdown.css';

interface MarkdownProps {
  content: string;
}

export function Markdown({ content }: MarkdownProps) {
  return (
    <div className="markdown">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[rehypeRaw, rehypeHighlight, rehypeSlug]}
        components={{
          h1: ({ children }) => <h1 className="scroll-m-20 text-4xl font-bold mb-4">{children}</h1>,
          h2: ({ children }) => (
            <h2 className="scroll-m-20 text-3xl font-bold mt-8 mb-4">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="scroll-m-20 text-2xl font-bold mt-6 mb-3">{children}</h3>
          ),
          p: ({ children, node }) => {
            // Check if the paragraph contains a code block
            if (
              node?.children[0]?.type === 'element' &&
              (node.children[0].tagName === 'pre' || node.children[0].tagName === 'code')
            ) {
              return <>{children}</>;
            }
            return <p className="leading-7 mb-4">{children}</p>;
          },
          ul: ({ children }) => <ul className="list-disc ml-6 mb-4">{children}</ul>,
          ol: ({ children }) => <ol className="list-decimal ml-6 mb-4">{children}</ol>,
          li: ({ children }) => <li className="mb-2">{children}</li>,
          pre: ({ children }) => (
            <pre className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 overflow-x-auto my-4">
              {children}
            </pre>
          ),
          code: ({
            inline,
            className,
            children,
            ...props
          }: { inline?: boolean } & React.HTMLProps<HTMLElement>) => {
            const match = /language-(\w+)/.exec(className || '');
            return inline ? (
              <code className="bg-gray-100 dark:bg-gray-800 rounded px-1" {...props}>
                {children}
              </code>
            ) : (
              <code className={match ? `language-${match[1]}` : ''} {...props}>
                {children}
              </code>
            );
          },
          blockquote: ({ children }) => (
            <blockquote className="border-l-4 border-gray-200 dark:border-gray-700 pl-4 italic my-4">
              {children}
            </blockquote>
          ),
          a: ({ href, children }) => (
            <a href={href} className="text-blue-500 hover:text-blue-600 hover:underline">
              {children}
            </a>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
