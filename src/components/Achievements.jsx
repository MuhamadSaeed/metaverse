import React from 'react';

const Achievements = ({ translations, firstTime }) => {
  return (
    <div className="achievements">
      <p><span className="icon">⭐️</span> طالبة متميزة</p>
      <p><span className="icon">🎯</span> {translations} ترجمات</p>
      {firstTime && (
        <p><span className="icon">🏅</span> أول درس</p>
      )}
    </div>
  );
};

export default Achievements;
