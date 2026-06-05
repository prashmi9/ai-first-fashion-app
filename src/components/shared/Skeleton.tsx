import React from 'react';
import './Skeleton.css';

interface SkeletonProps {
  variant?: 'text' | 'card' | 'image' | 'circle';
  width?: string | number;
  height?: string | number;
  className?: string;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  variant = 'text',
  width,
  height,
  className = ''
}) => {
  const style: React.CSSProperties = {
    width: width !== undefined ? width : undefined,
    height: height !== undefined ? height : undefined
  };

  return <div className={`skeleton skeleton-${variant} ${className}`} style={style} />;
};
export default Skeleton;
