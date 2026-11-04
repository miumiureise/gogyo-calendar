import React, { useState } from 'react';
import { FIVE_ELEMENTS, GENERATIVE_CYCLE, CONTROLLING_CYCLE } from '../../data/elementsData';

const ElementChart: React.FC = () => {
  const [selectedElement, setSelectedElement] = useState<string | null>(null);
  const [mode, setMode] = useState<'generative' | 'controlling'>('generative');

  const elements = Object.keys(FIVE_ELEMENTS);
  const centerX = 200;
  const centerY = 200;
  const radius = 120;

  // 五行の座標計算
  const coords: Record<string, { x: number; y: number }> = {};
  elements.forEach((el, i) => {
    const angle = (i * 72 - 90) * (Math.PI / 180);
    coords[el] = {
      x: centerX + radius * Math.cos(angle),
      y: centerY + radius * Math.sin(angle),
    };
  });

  const activeCycle = mode === 'generative' ? GENERATIVE_CYCLE : CONTROLLING_CYCLE;

  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '20px',
      fontFamily: 'sans-serif'
    }}>
      <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => setMode('generative')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: mode === 'generative' ? '#4CAF50' : '#ddd',
            color: mode === 'generative' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          相生 (助ける)
        </button>
        <button 
          onClick={() => setMode('controlling')}
          style={{ 
            padding: '8px 16px', 
            backgroundColor: mode === 'controlling' ? '#F44336' : '#ddd',
            color: mode === 'controlling' ? '#fff' : '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          相剋 (抑える)
        </button>
      </div>

      <svg width="400" height="400" viewBox="0 0 400 400" style={{ maxWidth: '100%', height: 'auto' }}>
        {/* 関係線 */}
        {activeCycle.map((link, i) => {
          const start = coords[link.from];
          const end = coords[link.to];
          return (
            <line 
              key={i}
              x1={start.x} y1={start.y} x2={end.x} y2={end.y}
              stroke={mode === 'generative' ? '#4CAF50' : '#F44336'}
              strokeWidth="3"
              markerEnd="url(#arrowhead)"
              strokeOpacity="0.6"
            />
          );
        })}

        {/* 矢印定義 */}
        <defs>
          <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
            <polygon points="0 0, 10 3.5, 0 7" fill="currentColor" />
          </marker>
        </defs>

        {/* 五行ノード */}
        {elements.map(el => (
          <g 
            key={el} 
            onClick={() => setSelectedElement(el)} 
            style={{ cursor: 'pointer' }}
          >
            <circle 
              cx={coords[el].x} cy={coords[el].y} r="30" 
              fill={FIVE_ELEMENTS[el].color} 
              stroke={selectedElement === el ? '#333' : 'transparent'}
              strokeWidth="4"
            />
            <text 
              x={coords[el].x} y={coords[el].y} 
              textAnchor="middle" 
              dominantBaseline="central" 
              fill="#fff" 
              fontSize="20" 
              fontWeight="bold"
              style={{ textShadow: '1px 1px 2px rgba(0,0,0,0.5)' }}
            >
              {el}
            </text>
          </g>
        ))}
      </svg>

      {selectedElement && (
        <div style={{ 
          marginTop: '20px', 
          padding: '15px', 
          border: '1px solid #ddd', 
          borderRadius: '8px', 
          backgroundColor: '#f9f9f9',
          maxWidth: '340px',
          textAlign: 'center'
        }}>
          <h3 style={{ margin: '0 0 10px 0', color: FIVE_ELEMENTS[selectedElement].color }}>
            {selectedElement}
          </h3>
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.5' }}>
            {FIVE_ELEMENTS[selectedElement].description}
          </p>
        </div>
      )}
    </div>
  );
};

export default ElementChart;
