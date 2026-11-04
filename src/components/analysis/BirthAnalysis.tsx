import React, { useState } from 'react';
import { calculateFourPillars, AnalysisResult } from '../../lib/fourPillarsLogic';
import { FIVE_ELEMENTS } from '../../data/elementsData';

const BirthAnalysis: React.FC = () => {
  const [birthDate, setBirthDate] = useState('');
  const [birthHour, setBirthHour] = useState<string>('');
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleCalculate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!birthDate) return;
    
    const date = new Date(birthDate);
    const hour = birthHour ? parseInt(birthHour, 10) : undefined;
    setResult(calculateFourPillars(date, hour));
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      color: '#333' 
    }}>
      <h2 style={{ textAlign: 'center' }}>生年月日分析</h2>
      
      <form onSubmit={handleCalculate} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '15px', 
        marginBottom: '30px',
        padding: '20px',
        backgroundColor: '#fefefe',
        border: '1px solid #ddd',
        borderRadius: '8px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>生年月日</label>
          <input 
            type="date" 
            value={birthDate} 
            onChange={(e) => setBirthDate(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            required
          />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem' }}>出生時刻 (任意)</label>
          <input 
            type="number" 
            min="0" max="23" 
            value={birthHour} 
            onChange={(e) => setBirthHour(e.target.value)} 
            style={{ width: '100%', padding: '8px', boxSizing: 'border-box' }}
            placeholder="例: 14"
          />
        </div>
        <button 
          type="submit" 
          style={{ 
            padding: '12px', 
            backgroundColor: '#333', 
            color: '#fff', 
            border: 'none', 
            borderRadius: '4px', 
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          分析を実行
        </button>
      </form>

      {result && (
        <div style={{ animation: 'fadeIn 0.5s' }}>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(4, 1fr)', 
            gap: '10px', 
            marginBottom: '30px',
            textAlign: 'center'
          }}>
            {Object.entries(result.pillars).map(([key, pillar]) => (
              pillar ? (
                <div key={key} style={{ 
                  padding: '10px', 
                  border: '1px solid #ddd', 
                  borderRadius: '4px',
                  backgroundColor: '#fff'
                }}>
                  <div style={{ fontSize: '0.7rem', color: '#666' }}>{key === 'year' ? '年柱' : key === 'month' ? '月柱' : key === 'day' ? '日柱' : '時柱'}</div>
                  <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: pillar.stem.color }}>{pillar.name}</div>
                </div>
              ) : <div key={key} />
            ))}
          </div>

          <h3 style={{ textAlign: 'center', fontSize: '1rem', marginBottom: '15px' }}>五行バランス</h3>
          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            gap: '10px', 
            marginBottom: '30px' 
          }}>
            {Object.entries(result.balance).map(([el, count]) => {
              return (
                <div key={el} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '30px', fontWeight: 'bold' }}>{el}</div>
                  <div style={{ 
                    flex: 1, 
                    backgroundColor: '#eee', 
                    height: '20px', 
                    borderRadius: '10px', 
                    overflow: 'hidden' 
                  }}>
                    <div style={{ 
                      width: `${(count / 8) * 100}%`, 
                      backgroundColor: FIVE_ELEMENTS[el].color, 
                      height: '100%', 
                      transition: 'width 0.5s ease-out' 
                    }} />
                  </div>
                  <div style={{ width: '30px', textAlign: 'right', fontSize: '0.8rem' }}>{count}</div>
                </div>
              );
            })}
          </div>

          <div style={{ 
            fontSize: '0.8rem', 
            color: '#888', 
            textAlign: 'center', 
            fontStyle: 'italic',
            borderTop: '1px solid #eee',
            paddingTop: '10px'
          }}>
            ※本計算は簡易的な近似方式を用いています。厳密な節気（立春等）の判定は行っていません。
          </div>
        </div>
      )}
    </div>
  );
};

export default BirthAnalysis;
