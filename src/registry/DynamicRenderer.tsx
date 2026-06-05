import React from 'react';
import type { ComponentInstance } from '../types/conversation';
import { componentRegistry } from './ComponentRegistry';

interface DynamicRendererProps {
  components: ComponentInstance[];
}

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({ components }) => {
  if (!components || components.length === 0) return null;

  return (
    <div className="dynamic-components-container" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {components.map(instance => {
        const Component = componentRegistry[instance.type];
        if (!Component) {
          console.warn(`Dynamic component of type '${instance.type}' is not registered.`);
          return null;
        }

        return (
          <div
            key={instance.id}
            className="animate-slide-up"
            style={{
              animation: 'slideUp 0.5s ease both'
            }}
          >
            <Component {...instance.props} />
          </div>
        );
      })}
    </div>
  );
};
