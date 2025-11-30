import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

const DealerContext = createContext(null);

export const DealerProvider = ({ children }) => {
  const [dealers, setDealers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDealers = async () => {
      try {
        setLoading(true);
        setError(null);
        const res = await fetch('/dealers.json');
        if (!res.ok) {
          throw new Error(`Failed to fetch dealers: ${res.status}`);
        }
        const data = await res.json();
        setDealers(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Unexpected error');
      } finally {
        setLoading(false);
      }
    };

    fetchDealers();
  }, []);

  const addDealer = useCallback((dealer) => {
    setDealers((prev) => {
      const nextId = prev.length ? Math.max(...prev.map((d) => d.id)) + 1 : 1;
      return [...prev, { ...dealer, id: nextId }];
    });
  }, []);

  const updateDealer = useCallback((updatedDealer) => {
    setDealers((prev) =>
      prev.map((dealer) => (dealer.id === updatedDealer.id ? updatedDealer : dealer))
    );
  }, []);

  const value = {
    dealers,
    loading,
    error,
    addDealer,
    updateDealer,
  };

  return <DealerContext.Provider value={value}>{children}</DealerContext.Provider>;
};

export const useDealers = () => {
  const ctx = useContext(DealerContext);
  if (!ctx) {
    throw new Error('useDealers must be used within a DealerProvider');
  }
  return ctx;
};
