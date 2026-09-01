import { useState } from 'react';
import { cn } from 'drupal-canvas';

// Token grammars. Each language is compiled into one alternation with named
// groups, so a single pass decides which class every match belongs to.
const GRAMMAR = {
  jsx: [
    ['com', /\/\/[^\n]*/],
    ['str', /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"|`(?:[^`\\]|\\.)*`/],
    [
      'kw',
      /\b(?:import|from|export|default|const|let|var|function|return|if|else|null|true|false|new|typeof|await|async|Boolean|Array|Number|String|Math|JSON|Intl)\b/,
    ],
    ['tag', /<\/?[A-Za-z][\w.]*|\/>/],
    ['num', /\b\d+(?:\.\d+)?\b/],
  ],
  yaml: [
    ['com', /#[^\n]*/],
    ['key', /^\s*[\w$-]+(?=:)/],
    ['str', /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/],
    ['kw', /\b(?:true|false|null)\b/],
    ['num', /(?<=\s)\d+(?:\.\d+)?\b/],
  ],
  json: [
    ['key', /"(?:[^"\\]|\\.)*"(?=\s*:)/],
    ['str', /"(?:[^"\\]|\\.)*"/],
    ['kw', /\b(?:true|false|null)\b/],
    ['num', /-?\b\d+(?:\.\d+)?\b/],
  ],
  css: [
    ['com', /\/\*[\s\S]*?\*\//],
    ['key', /^\s*[-\w]+(?=\s*:)/],
    ['str', /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/],
    ['num', /-?\b\d+(?:\.\d+)?(?:px|rem|em|%|vh|vw|s|ms)?\b/],
  ],
  bash: [
    ['com', /#[^\n]*/],
    ['str', /'(?:[^'\\]|\\.)*'|"(?:[^"\\]|\\.)*"/],
    ['kw', /\b(?:npm|npx|node|cd|run|git|export)\b/],
  ],
};

const COMPILED = Object.fromEntries(
  Object.entries(GRAMMAR).map(([lang, rules]) => [
    lang,
    new RegExp(rules.map(([n, r]) => `(?<${n}>${r.source})`).join('|'), 'g'),
  ]),
);

const TOKEN_CLASS = {
  com: 'text-gray-400 italic',
  str: 'text-amber-300',
  kw: 'text-violet-300 font-medium',
  tag: 'text-rose-300',
  num: 'text-blue-300',
  key: 'text-primary-700 font-medium',
};

// Highlight line by line so a span can never straddle a newline, which keeps
// the rendered markup valid even for inputs this grammar does not fully model.
const tokenize = (line, rx) => {
  if (!rx) {
    return [{ text: line }];
  }

  const out = [];
  let last = 0;
  let m;
  rx.lastIndex = 0;

  while ((m = rx.exec(line)) !== null) {
    if (m[0] === '') {
      rx.lastIndex += 1;
      continue;
    }
    if (m.index > last) {
      out.push({ text: line.slice(last, m.index) });
    }
    const cls = Object.keys(m.groups).find((g) => m.groups[g] !== undefined);
    out.push({ text: m[0], cls });
    last = m.index + m[0].length;
  }

  if (last < line.length) {
    out.push({ text: line.slice(last) });
  }
  return out;
};

const heights = {
  none: '',
  medium: 'max-h-96 overflow-y-auto',
  tall: 'max-h-[36rem] overflow-y-auto',
};

const CodeBlock = ({
  code,
  language = 'jsx',
  filename,
  showLineNumbers = true,
  maxHeight = 'tall',
  className,
}) => {
  const [copied, setCopied] = useState(false);

  if (!code) {
    return null;
  }

  const rx = COMPILED[language];
  const lines = code.replace(/\n$/, '').split('\n');
  const gutter = String(lines.length).length;

  const copy = () => {
    if (!navigator.clipboard?.writeText) {
      return;
    }
    navigator.clipboard.writeText(code).then(
      () => {
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
      },
      () => setCopied(false),
    );
  };

  return (
    <figure
      className={cn(
        'w-full overflow-hidden rounded-md border border-gray-200 bg-white',
        className,
      )}
    >
      <figcaption className="flex items-center gap-3 border-b border-gray-200 bg-gray-50 px-3 py-2">
        <span className="font-mono text-xs text-gray-600">
          {filename || language}
        </span>
        <button
          type="button"
          onClick={copy}
          className="ml-auto rounded border border-gray-300 px-2 py-1 font-mono text-xs text-gray-700 hover:border-primary-500 hover:text-primary-700"
        >
          {copied ? 'Copied' : 'Copy'}
        </button>
      </figcaption>

      <pre
        className={cn(
          'overflow-x-auto bg-white py-2 font-mono text-xs leading-6',
          heights[maxHeight],
        )}
      >
        <code>
          {lines.map((line, i) => (
            <span key={i} className="block px-3 whitespace-pre">
              {showLineNumbers && (
                <span
                  aria-hidden="true"
                  className="mr-4 inline-block shrink-0 text-right text-gray-400 tabular-nums select-none"
                  style={{ width: `${gutter}ch` }}
                >
                  {i + 1}
                </span>
              )}
              {tokenize(line, rx).map((t, j) =>
                t.cls ? (
                  <span key={j} className={TOKEN_CLASS[t.cls]}>
                    {t.text}
                  </span>
                ) : (
                  t.text
                ),
              )}
            </span>
          ))}
        </code>
      </pre>
    </figure>
  );
};

export default CodeBlock;
