import React from 'react';
import 'app/styles/index.css';
import MainPage from '../pages/Main/ui/MainPage';

function App() {
  return (
    <div style={{ display: 'grid', placeItems: 'center', minWidth: 320, minHeight: '100vh', alignItems: 'flex-start' }}>
      <MainPage />
    </div>
  );
}

export default App;