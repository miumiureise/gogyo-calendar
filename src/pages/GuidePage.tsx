import React from 'react';
import { EXPLANATIONS } from '../data/elementsData';
import { Link } from 'react-router-dom';

const GuidePage: React.FC = () => {
  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'sans-serif', 
      maxWidth: '600px', 
      margin: '0 auto',
      lineHeight: '1.6',
      color: '#333'
    }}>
      <h1 style={{ textAlign: 'center', borderBottom: '2px solid #333', paddingBottom: '10px' }}>陰陽五行 解説</h1>
      
      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#555', borderLeft: '5px solid #ccc', paddingLeft: '10px' }}>陰陽とは</h2>
        <p>{EXPLANATIONS.yinYang}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#555', borderLeft: '5px solid #ccc', paddingLeft: '10px' }}>五行とは</h2>
        <p>{EXPLANATIONS.elements}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#555', borderLeft: '5px solid #ccc', paddingLeft: '10px' }}>十干と十二支</h2>
        <p><strong>十干:</strong> {EXPLANATIONS.tenStems}</p>
        <p><strong>十二支:</strong> {EXPLANATIONS.twelveBranches}</p>
      </section>

      <section style={{ marginBottom: '30px' }}>
        <h2 style={{ color: '#555', borderLeft: '5px solid #ccc', paddingLeft: '10px' }}>相生と相剋</h2>
        <p><strong>相生:</strong> {EXPLANATIONS.generative}</p>
        <p><strong>相剋:</strong> {EXPLANATIONS.controlling}</p>
      </section>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <Link to="/" style={{ 
          textDecoration: 'none', 
          color: '#666', 
          fontWeight: 'bold',
          padding: '10px 20px',
          border: '1px solid #ddd',
          borderRadius: '5px'
        }}>
          ホームへ戻る
        </Link>
      </div}
    </div>
  );
};

export default GuidePage;
