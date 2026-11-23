import React, { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';
import tokens from '../tokens.json';

const meta: Meta = {
  title: 'React/ChatMessage/Design Tokens',
};

export default meta;
type Story = StoryObj;

// A token has "$type"; anything else is a group (component, element or variant)
type TokenTree = { [key: string]: TokenTree | Token };
type Token = { $type: string; $extensions: { 'nl.nldesignsystem.css-property-syntax': string } };

const isToken = (node: TokenTree | Token): node is Token => '$type' in node;

// tokens.json without metadata: each token becomes {}, as in the NLDS docs
const emptyTokens = (node: TokenTree): TokenTree =>
  Object.fromEntries(
    Object.entries(node).map(([key, value]) => [key, isToken(value) ? {} : emptyTokens(value)]),
  ) as TokenTree;

// All tokens as CSS custom properties, e.g. "--mijn-chat-message-body-padding-block-end: <length>;"
const cssLines = (node: TokenTree, prefix: string): string[] =>
  Object.entries(node).flatMap(([key, value]) =>
    isToken(value)
      ? [`  /* --${prefix}-${key}: ${value.$extensions['nl.nldesignsystem.css-property-syntax']}; */`]
      : cssLines(value, `${prefix}-${key}`),
  );

const tokensJson = JSON.stringify(emptyTokens(tokens as TokenTree), null, 2);
const cssTemplate = `.your-theme {\n${Object.entries(tokens as TokenTree)
  .flatMap(([prefix, tree]) => cssLines(tree as TokenTree, prefix))
  .join('\n')}\n}`;

const CopyButton = ({ text, label }: { text: string; label: string }) => {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    await navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button className="copy-button" type="button" onClick={copy}>
      {copied ? 'Copied!' : label}
    </button>
  );
};

export const Tokens: Story = {
  parameters: {
    controls: { disable: true },
    maxInlineSize: '860px',
  },
  render: () => (
    <>
      <style>{`
        .tokens-section {
          display: flex;
          flex-direction: column;
          font-family: sans-serif;
          row-gap: 2rem;
        }
        .tokens-section h2 {
          font-size: 1.25rem;
          margin-block: 0;
        }
        .tokens-section p {
          line-height: 1.6;
          margin-block: 0;
        }
        .tokens-section pre {
          background-color: #f4f4f4;
          border-radius: 4px;
          font-size: 0.875rem;
          margin-block: 0;
          overflow-x: auto;
          padding: 1rem;
        }
        .copy-button {
          align-self: flex-start;
          background: #fff;
          border: 1px solid #ccc;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.875rem;
          padding: 0.4rem 0.8rem;
        }
        .copy-button:hover {
          background: #f0f0f0;
        }
      `}</style>

      <div className="tokens-section">
        <div>
          <h2>Design tokens JSON</h2>
          <p>
            Copy the JSON template below to reuse this component. Replace each empty <code>{'{}'}</code> with{' '}
            <code>{'{ "$value": "#123456", "$description": "my design choice" }'}</code>. Use{' '}
            <a href="https://amzn.github.io/style-dictionary/#/" target="_blank" rel="noreferrer">
              Style Dictionary
            </a>{' '}
            to translate your JSON tokens to CSS.
          </p>
          <p>
            The paragraphs are NL Design System candidate components. Theme them with their own{' '}
            <code>--nl-paragraph-*</code> tokens.
          </p>
        </div>
        <CopyButton text={tokensJson} label="Copy JSON" />
        <pre>{tokensJson}</pre>

        <div>
          <h2>CSS template</h2>
          <p>If you want to get started quickly without JSON tokens, use this CSS template directly in your project.</p>
        </div>
        <CopyButton text={cssTemplate} label="Copy CSS" />
        <pre>{cssTemplate}</pre>
      </div>
    </>
  ),
};
