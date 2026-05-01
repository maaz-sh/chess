import React from 'react';

interface StatusBarProps {
  status: string;
}

const StatusBar: React.FC<StatusBarProps> = ({ status }) => {
  return (
    <div className="status-bar">
      <span>{status}</span>
    </div>
  );
};

export default StatusBar;
