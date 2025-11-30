import React, { useMemo, useState } from 'react';
import { useDealers } from '../state/DealerContext.jsx';
import DealerModal from './DealerModal.jsx';
import DealerForm from './DealerForm.jsx';
import Pagination from './Pagination.jsx';
import Loader from './Loader.jsx';
import ErrorMessage from './ErrorMessage.jsx';

const pageSize = 5;

const DealerList = () => {
  const { dealers, loading, error, updateDealer } = useDealers();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(1);
  const [selectedDealer, setSelectedDealer] = useState(null);
  const [modalMode, setModalMode] = useState('view');

  const filteredDealers = useMemo(() => {
    let result = [...dealers];

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter(
        (d) =>
          d.name.toLowerCase().includes(q) ||
          d.city.toLowerCase().includes(q) ||
          d.email.toLowerCase().includes(q)
      );
    }

    if (statusFilter !== 'all') {
      result = result.filter((d) => d.status === statusFilter);
    }

    result.sort((a, b) => {
      const dir = sortDir === 'asc' ? 1 : -1;
      let v1 = a[sortBy];
      let v2 = b[sortBy];
      if (typeof v1 === 'string') v1 = v1.toLowerCase();
      if (typeof v2 === 'string') v2 = v2.toLowerCase();
      if (v1 < v2) return -1 * dir;
      if (v1 > v2) return 1 * dir;
      return 0;
    });

    return result;
  }, [dealers, search, statusFilter, sortBy, sortDir]);

  const totalPages = Math.max(1, Math.ceil(filteredDealers.length / pageSize));
  const currentPage = Math.min(page, totalPages);
  const paginatedDealers = filteredDealers.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handleSort = (field) => {
    if (field === sortBy) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortBy(field);
      setSortDir('asc');
    }
  };

  const openModal = (dealer, mode = 'view') => {
    setSelectedDealer(dealer);
    setModalMode(mode);
  };

  const closeModal = () => {
    setSelectedDealer(null);
  };

  const handleDealerUpdate = (updated) => {
    updateDealer(updated);
    // closeModal();
  };

  if (loading) return <Loader />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <section className="card">
      <div className="card-header">
        <h2>Dealers</h2>
        <p>Search, filter, and manage your dealer network.</p>
      </div>

      <div className="filters-row">
        <input
          type="text"
          placeholder="Search by name, city, or email..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
        />
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            setPage(1);
          }}
        >
          <option value="all">All Status</option>
          <option value="Active">Active</option>
          <option value="Inactive">Inactive</option>
        </select>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="name">Sort by Name</option>
          <option value="city">Sort by City</option>
          <option value="status">Sort by Status</option>
        </select>
        <button
          className="btn-outline"
          onClick={() => setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'))}
        >
          {sortDir === 'asc' ? 'Asc' : 'Desc'}
        </button>
      </div>

      <div className="table-wrapper">
        <table className="dealer-table">
          <thead>
            <tr>
              <th onClick={() => handleSort('name')}>
                Dealer Name {sortBy === 'name' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th onClick={() => handleSort('city')}>
                City {sortBy === 'city' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th>Email</th>
              <th>Phone</th>
              <th onClick={() => handleSort('status')}>
                Status {sortBy === 'status' ? (sortDir === 'asc' ? '▲' : '▼') : ''}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {paginatedDealers.length === 0 && (
              <tr>
                <td colSpan="6" className="empty-state">
                  No dealers match your criteria.
                </td>
              </tr>
            )}
            {paginatedDealers.map((dealer) => (
              <tr key={dealer.id}>
                <td>{dealer.name}</td>
                <td>{dealer.city}</td>
                <td>{dealer.email}</td>
                <td>{dealer.phone}</td>
                <td>
                  <span className={`status-pill status-${dealer.status.toLowerCase()}`}>
                    {dealer.status}
                  </span>
                </td>
                <td className="table-actions">
                  <button className="btn-link" onClick={() => openModal(dealer, 'view')}>
                    View
                  </button>
                  <button className="btn-link" onClick={() => openModal(dealer, 'edit')}>
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Pagination
        page={currentPage}
        totalPages={totalPages}
        onPageChange={setPage}
      />

      <DealerModal
        isOpen={!!selectedDealer}
        title={
          modalMode === 'view'
            ? selectedDealer?.name
            : `Edit: ${selectedDealer?.name || ''}`
        }
        onClose={closeModal}
      >
        {modalMode === 'view' && selectedDealer && (
          <div className="dealer-details">
            <p><strong>Dealer Name:</strong> {selectedDealer.name}</p>
            <p><strong>Address:</strong> {selectedDealer.address}</p>
            <p><strong>City:</strong> {selectedDealer.city}</p>
            <p><strong>Email:</strong> {selectedDealer.email}</p>
            <p><strong>Phone:</strong> {selectedDealer.phone}</p>
            <p><strong>Operating Hours:</strong> {selectedDealer.operatingHours}</p>
            <p><strong>Status:</strong> {selectedDealer.status}</p>
          </div>
        )}

        {modalMode === 'edit' && selectedDealer && (
          <DealerForm
            initialData={selectedDealer}
            mode="edit"
            onSubmit={handleDealerUpdate}
          />
        )}
      </DealerModal>
    </section>
  );
};

export default DealerList;
