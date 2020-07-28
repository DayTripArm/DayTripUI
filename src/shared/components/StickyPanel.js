import React from 'react';

const StickyPanel = ({ children, className = '' }) => (
  <div className={`sticky-panel bg-white ${className}`}>{children}</div>
);

export default StickyPanel;
