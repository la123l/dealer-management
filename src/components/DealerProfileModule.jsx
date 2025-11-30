import React from 'react';
import DealerForm from './DealerForm.jsx';
import { useDealers } from '../state/DealerContext.jsx';

const DealerProfileModule = () => {
  const { addDealer } = useDealers();

  const handleCreateDealer = (dealerPayload) => {
    addDealer(dealerPayload);
  };

  return (
    <section className="card">
      <div className="card-header">
        <h2>Dealer Profile</h2>
        <p>Create a new dealer profile with validation and preview.</p>
      </div>
      <DealerForm mode="create" onSubmit={handleCreateDealer} />
    </section>
  );
};

export default DealerProfileModule;
