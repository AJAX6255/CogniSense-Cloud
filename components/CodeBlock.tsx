
import React from 'react';

interface CodeBlockProps {
  title: string;
  code: string;
  language: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ title, code, language }) => {
  return (
    <div className="bg-[#282c34] rounded-lg shadow-lg overflow-hidden my-4">
      <div className="flex justify-between items-center px-4 py-2 bg-gray-700">
        <span className="text-gray-300 text-sm font-semibold">{title}</span>
        <span className="px-2 py-1 bg-gray-600 text-gray-200 text-xs rounded font-mono">{language}</span>
      </div>
      <pre className="p-4 text-sm overflow-x-auto">
        <code className={`language-${language} text-white`}>
          {code}
        </code>
      </pre>
    </div>
  );
};

export default CodeBlock;
