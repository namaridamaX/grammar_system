import React, { useState } from "react";
import Tooltip from './Tooltip';

const GrammarChecker: React.FC = () => {
  const [text, setText] = useState("");
  const [results, setResults] = useState<string[]>([]);
  const [highlightedText, setHighlightedText] = useState<JSX.Element | null>(
    null
  );
  const [tooltip, setTooltip] = useState<{ text: string; position: {top: number; left: number}} | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(event.target.value);
  };

  const handleCheck = async () => {
    const responce = await fetch("http://localhost:5000/api/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ text }),
    });

    const data = await responce.json();
    highlightErrors(data.errors);
  };
  const highlightErrors = (
    errors: Array<{ message: string; start: number; end: number }>
  ) => {
    let lastIndex = 0;
    const segments: JSX.Element[] = [];

    for (const error of errors) {
      const { start, end, message } = error;
      const beforeError = text.slice(lastIndex, start);
      const errorText = text.slice(start, end);

      if (beforeError) {
        segments.push(<span key={lastIndex}>{beforeError}</span>);
      }

      segments.push(
        <span
          key={start}
          style={{ backgroundColor: "yellow", fontWeight: "bold" }}
          onMouseEnter={(e) => {
            const rect = e.currentTarget.getBoundingClientRect();
            setTooltip({ text:message, position: { top: rect.top - 30, left: rect.left}});
          }}
          onMouseLeave={() => setTooltip(null)}
        >
          {errorText}
        </span>
      );

      lastIndex = end;
    }

    if (lastIndex < text.length) {
      segments.push(<span key={lastIndex}>{text.slice(lastIndex)}</span>);
    }
    setHighlightedText(<p>{segments}</p>);
  };

  return (
    <div className="container">
      <h1>英文法添削システム</h1>
      <textarea
        value={text}
        onChange={handleChange}
        rows={10}
        cols={50}
        placeholder="ここに英文をコピぺしてください"
      />
      <button onClick={handleCheck}>チェックする</button>
      <div className="result">{highlightedText}</div>
      {tooltip && <Tooltip text={tooltip.text} position={tooltip.position} />}
    </div>
  );
};

export default GrammarChecker;
