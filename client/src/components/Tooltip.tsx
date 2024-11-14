import React from 'react';
import './Tooltip.css';

interface TooltipProps {
  text: string;
  position: { top: number; left: number };
}

const Tooltip: React.FC<TooltipProps> = ({ text, position }) => {
  return (
    <div
    className="tooltip"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <p>{text}</p>
    </div>
  );
};

export default Tooltip;