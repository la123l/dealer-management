import React from 'react';
import Sidebar from './Sidebar.jsx';
import Header from './Header.jsx';

const Layout = ({ children, activeView, onChangeView }) => {
  return (
    <div className="app-shell">
      <Sidebar activeView={activeView} onChangeView={onChangeView} />
      <div className="app-main">
        <Header />
        <main className="app-content">{children}</main>
      </div>
    </div>
  );
};

export default Layout;
