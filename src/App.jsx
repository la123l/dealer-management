import React, { useState } from 'react';
import Layout from './components/Layout.jsx';
import DealerList from './components/DealerList.jsx';
import DealerProfileModule from './components/DealerProfileModule.jsx';

const App = () => {
  const [activeView, setActiveView] = useState('dashboard');

  const renderContent = () => {
    switch (activeView) {
      case 'profile':
        return <DealerProfileModule />;
      case 'dashboard':
      default:
        return <DealerList />;
    }
  };

  return (
    <Layout activeView={activeView} onChangeView={setActiveView}>
      {renderContent()}
    </Layout>
  );
};

export default App;
