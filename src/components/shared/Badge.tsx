import React from 'react';
import './Badge.css';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'error' | 'info' | 'new';
  size?: 'sm' | 'md';
  hasDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'default',
  size = 'md',
  hasDot = false
}) => {
  return (
    <span className={`badge badge-${variant} badge-${size}`}>
      {hasDot && <span className="badge-dot" />}
      {children}
    </span>
  );
};
export default Badge;
