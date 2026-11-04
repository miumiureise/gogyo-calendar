import React from 'react'
import { Routes, Route, Link } from 'react-router-dom'
import CalendarView from './components/calendar/CalendarView'
import ElementChart from './components/elements/ElementChart'
import GuidePage from './pages/GuidePage'
import BirthAnalysis from './components/analysis/BirthAnalysis'

const Home = () => (
  <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'sans-serif', maxWidth: '600px', margin: '0 auto' }}>
    <h1 style={{ color: '#333', borderBottom: '2px solid #333', paddingBottom: '10px' }}>陰陽五行カレンダー</h1>
    <p>伝統的な十干十二支に基づいた暦アプリ</p>
    
    <nav style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      gap: '15px', 
      margin: '30px 0',
      padding: '0 20px'
    }}>
      <Link to="/calendar" style={navStyle}>📅 カレンダー</Link>
      <Link to="/analysis" style={navStyle}>📊 五行相関図</Link>
      <Link to="/birth" style={navStyle}>✨ 生年月日分析</Link>
      <Link to="/guide" style={navStyle}>📖 解説ページ</Link>
    </nav>
    
    <div style={{ 
      marginTop: '40px', 
      padding: '20px', 
      backgroundColor: '#f9f9f9', 
      borderRadius: '8px', 
      fontSize: '0.9rem', 
      color: '#666',
      border: '1px solid #eee'
    }}>
      <p>本アプリは静的Webサイトとして構築されており、サーバーへ個人情報を送信することはありません。</p>
    </div>
  </div>
)

const navStyle: React.CSSProperties = {
  padding: '15px',
  backgroundColor: '#fff',
  border: '1px solid #ddd',
  borderRadius: '8px',
  textDecoration: 'none',
  color: '#333',
  fontWeight: 'bold',
  boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
  transition: 'all 0.2s'
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/calendar" element={<CalendarView />} />
      <Route path="/analysis" element={<ElementChart />} />
      <Route path="/birth" element={<BirthAnalysis />} />
      <Route path="/guide" element={<GuidePage />} />
    </Routes>
  )
}

export default App
