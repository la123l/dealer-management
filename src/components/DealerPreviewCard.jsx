import React from 'react';

const DealerPreviewCard = ({ dealer }) => {
  if (!dealer) return null;

  return (
    <article className="preview-card">
      <header className="preview-card-header">
        <div>
          <h4>{dealer.name}</h4>
          <p className="preview-city">{dealer.city}</p>
        </div>
        <span className={`status-pill status-${dealer.status.toLowerCase()}`}>
          {dealer.status}
        </span>
      </header>
      <p className="preview-address">{dealer.address}</p>
      <dl className="preview-meta">
        <div>
          <dt>Email</dt>
          <dd>{dealer.email}</dd>
        </div>
        <div>
          <dt>Phone</dt>
          <dd>{dealer.phone}</dd>
        </div>
        <div>
          <dt>Operating Hours</dt>
          <dd>{dealer.operatingHours}</dd>
        </div>
      </dl>
    </article>
  );
};

export default DealerPreviewCard;
