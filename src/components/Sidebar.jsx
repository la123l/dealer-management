import React from 'react';

const Sidebar = ({ activeView, onChangeView }) => {
  return (
    <aside className="sidebar">
      <div className="sidebar-logo">Dealer Auto Center</div>
      <nav className="sidebar-nav">
        <button
          className={activeView === 'dashboard' ? 'nav-link active' : 'nav-link'}
          onClick={() => onChangeView('dashboard')}
        >
          Dashboard
        </button>
        <button
          className={activeView === 'profile' ? 'nav-link active' : 'nav-link'}
          onClick={() => onChangeView('profile')}
        >
          Dealer Profile
        </button>
      </nav>
      <div className="sidebar-footer">
        <p className="sidebar-caption">Front End Task · React</p>
      </div>
    </aside>
  );
};

export default Sidebar;
