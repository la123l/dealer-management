import React from 'react';

const Header = () => {
  return (
    <header className="header">
      <div>
        <h1 className="header-title">Dealer Management Dashboard</h1>
        <p className="header-subtitle">Manage dealers, profiles, and operations in one place.</p>
      </div>
      <div className="header-user">
        <span className="user-avatar">LK</span>
        <span className="user-name">Lakhan (Candidate)</span>
      </div>
    </header>
  );
};

export default Header;
