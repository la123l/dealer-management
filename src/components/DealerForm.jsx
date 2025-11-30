
import React, { useEffect, useState } from 'react';
import DealerPreviewCard from './DealerPreviewCard.jsx';

const initialFormState = {
  name: '',
  address: '',
  email: '',
  phone: '',
  operatingHours: '',
  city: '',
  status: 'Active',
};

const validate = (values) => {
  const errors = {};

  if (!values.name.trim()) errors.name = 'Dealer name is required';
  if (!values.address.trim()) errors.address = 'Address is required';
  if (!values.city.trim()) errors.city = 'City is required';

  if (!values.email.trim()) {
    errors.email = 'Email is required';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = 'Invalid email format';
  }

  if (!values.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!/^\d{7,15}$/.test(values.phone)) {
    errors.phone = 'Phone must be 7–15 digits';
  }

  return errors;
};

const DealerForm = ({ initialData, mode = 'create', onSubmit }) => {
  const [values, setValues] = useState(initialFormState);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submittedDealer, setSubmittedDealer] = useState(null);
  const [countryCode, setCountryCode] = useState('+91');

  useEffect(() => {
    if (initialData) {
      let parsed = initialData.phone || '';
      let code = '+91';
      let local = parsed;

      const m = parsed.match(/^(\+\d{1,3})\s*(.*)$/);
      if (m) {
        code = m[1];
        local = m[2];
      }

      setCountryCode(code);

      setValues({
        name: initialData.name || '',
        address: initialData.address || '',
        email: initialData.email || '',
        phone: local || '',
        operatingHours: initialData.operatingHours || '',
        city: initialData.city || '',
        status: initialData.status || 'Active',
        id: initialData.id,
      });

      setSubmittedDealer(null);
    } else {
      setValues(initialFormState);
      setCountryCode('+91');
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleBlur = (e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate(values);
    setErrors(validationErrors);
    setTouched({
      name: true,
      address: true,
      email: true,
      phone: true,
      operatingHours: true,
      city: true,
    });

    if (Object.keys(validationErrors).length > 0) return;

    const dealerPayload = {
      id: values.id,
      name: values.name.trim(),
      address: values.address.trim(),
      email: values.email.trim(),
      phone: `${countryCode} ${values.phone.trim()}`,
      operatingHours: values.operatingHours.trim(),
      city: values.city.trim(),
      status: values.status,
    };

    onSubmit(dealerPayload);
    setSubmittedDealer(dealerPayload);

    if (mode === 'create') {
      setValues(initialFormState);
      setTouched({});
      setCountryCode('+91');
    }
  };

  const currentErrors = validate(values);

  return (
    <div className="dealer-form-layout">
      <form className="dealer-form" onSubmit={handleSubmit} noValidate>
        <h2>{mode === 'create' ? 'Create Dealer Profile' : 'Edit Dealer'}</h2>

        <div className="form-grid">
          <div className="form-field">
            <label htmlFor="name">Dealer Name</label>
            <input
              id="name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Dealer name"
            />
            {touched.name && currentErrors.name && (
              <p className="field-error">{currentErrors.name}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="city">City</label>
            <input
              id="city"
              name="city"
              value={values.city}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="City"
            />
            {touched.city && currentErrors.city && (
              <p className="field-error">{currentErrors.city}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              list="email-suggestions"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="dealer@example.com"
              autoComplete="off"
            />
            <datalist id="email-suggestions">
              <option value="@gmail.com" />
              <option value="@yahoo.com" />
              <option value="@outlook.com" />
              <option value="@hotmail.com" />
              <option value="@rediffmail.com" />
            </datalist>

            {touched.email && currentErrors.email && (
              <p className="field-error">{currentErrors.email}</p>
            )}

            {touched.email && !currentErrors.email && values.email && (
              <p className="field-success">Email looks good ✅</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="phone">Phone</label>
            <div className="phone-group">
              <select
                className="phone-code-select"
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
              >
                <option value="+91">+91</option>
                <option value="+1">+1</option>
                <option value="+44">+44</option>
                <option value="+971">+971</option>
                <option value="+61">+61</option>
              </select>


              <input
                id="phone"
                name="phone"
                className="phone-input"
                value={values.phone}
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/\D/g, '');
                  setValues((prev) => ({ ...prev, phone: digitsOnly }));
                }}
                onBlur={handleBlur}
                placeholder="9876543210"
              />
            </div>
            {touched.phone && currentErrors.phone && (
              <p className="field-error">{currentErrors.phone}</p>
            )}
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="address">Address</label>
            <textarea
              id="address"
              name="address"
              rows="2"
              value={values.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Street, City, State"
            />
            {touched.address && currentErrors.address && (
              <p className="field-error">{currentErrors.address}</p>
            )}
          </div>

          <div className="form-field form-field-full">
            <label htmlFor="operatingHours">Operating Hours</label>
            <input
              id="operatingHours"
              name="operatingHours"
              value={values.operatingHours}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Mon-Sat, 9:00 AM - 7:00 PM"
            />
            {touched.operatingHours && currentErrors.operatingHours && (
              <p className="field-error">{currentErrors.operatingHours}</p>
            )}
          </div>

          <div className="form-field">
            <label htmlFor="status">Status</label>
            <select
              id="status"
              name="status"
              value={values.status}
              onChange={handleChange}
            >
              <option value="Active">Active</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-footer">
          <button type="submit" className="btn-primary">
            {mode === 'create' ? 'Create Dealer' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="dealer-preview">
        <h3>Preview</h3>
        {submittedDealer ? (
          <DealerPreviewCard dealer={submittedDealer} />
        ) : (
          <p className="preview-placeholder">
            Fill in the form and submit to see a styled dealer profile preview here.
          </p>
        )}
      </div>
    </div>
  );
};

export default DealerForm;
