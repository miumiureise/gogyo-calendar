import React, { useState } from 'react';
import { getKanjiForDate, getDaysInMonth } from '../../lib/calendarLogic';

const CalendarView: React.FC = () => {
  const [viewDate, setViewDate] = useState(new Date());
  const year = viewDate.getFullYear();
  const month = viewDate.getMonth();

  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = new Date(year, month, 1).getDay();

  const handlePrevMonth = () => setViewDate(new Date(year, month - 1, 1));
  const handleNextMonth = () => setViewDate(new Date(year, month + 1, 1));

  return (
    <div style={{ 
      padding: '10px', 
      fontFamily: 'sans-serif', 
      maxWidth: '500px', 
      margin: '0 auto',
      color: '#333' 
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        marginBottom: '20px' 
      }}>
        <button onClick={handlePrevMonth}>前月</button>
        <h2 style={{ margin: 0 }}>{year}年 {month + 1}月</h2>
        <button onClick={handleNextMonth}>次月</button>
      </div>

      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(7, 1fr)', 
        gap: '5px',
        textAlign: 'center'
      }}>
        {['日', '月', '火', '水', '木', '金', '土'].map(day => (
          <div key={day} style={{ fontWeight: 'bold', padding: '5px 0' }}>{day}</div>
        ))}
        
        {/* 空白セル */}
        {Array.from({ length: firstDayOfMonth }).map((_, i) => (
          <div key={`empty-${i}`} />
        ))}

        {/* 日付セル */}
        {Array.from({ length: daysInMonth }).map((_, i) => {
          const date = new Date(year, month, i + 1);
          const kanji = getKanjiForDate(date);
          const isToday = new Date().toDateString() === date.toDateString();

          return (
            <div key={i} style={{ 
              border: '1px solid #ddd', 
              padding: '5px', 
              minHeight: '60px',
              backgroundColor: isToday ? '#fffde7' : '#fff',
              borderRadius: '4px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: '0.8rem'
            }}>
              <div style={{ fontWeight: 'bold', marginBottom: '2px' }}>{i + 1}</div>
              <div style={{ 
                color: kanji.stem.color, 
                fontWeight: 'bold',
                fontSize: '1rem' 
              }}>
                {kanji.full}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CalendarView;
