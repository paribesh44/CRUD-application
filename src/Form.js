// Form.js

import React, { useState } from 'react';
import './Form.css'; // Import the CSS file for Form component

const Form = ({ addEntry }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phoneNumber: '',
    dob: '',
    address: {
      city: '',
      district: '',
      province: 'Province 1',
      country: 'Nepal'
    },
    profilePicture: null
  });

  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('address.')) {
      const [parent, child] = name.split('.');
      setFormData(prevData => ({
        ...prevData,
        address: {
          ...prevData.address,
          [child]: value
        }
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value
      }));
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'image/png') {
      setFormData(prevData => ({
        ...prevData,
        profilePicture: file
      }));
    } else {
      setErrors(prevErrors => ({
        ...prevErrors,
        profilePicture: 'Please upload a PNG file'
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, email, phoneNumber } = formData;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{7,}$/;

    let errors = {};

    if (!name || !email || !phoneNumber) {
      errors = {
        ...errors,
        name: !name ? 'Name is required' : '',
        email: !email ? 'Email is required' : '',
        phoneNumber: !phoneNumber ? 'Phone number is required' : ''
      };
    }

    if (email && !emailRegex.test(email)) {
      errors.email = 'Invalid email format';
    }

    if (phoneNumber && !phoneRegex.test(phoneNumber)) {
      errors.phoneNumber = 'Phone number must be at least 7 digits';
    }

    setErrors(errors);

    if (Object.keys(errors).length === 0) {
      addEntry(formData);
      setFormData({
        name: '',
        email: '',
        phoneNumber: '',
        dob: '',
        address: {
          city: '',
          district: '',
          province: 'Province 1',
          country: 'Nepal'
        },
        profilePicture: null
      });
      setIsValid(true);
      setTimeout(() => setIsValid(false), 3000); // Reset validation message after 3 seconds
    } else {
      setIsValid(false);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Entry</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} />
          {errors.name && <span className="error-message">{errors.name}</span>}
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} />
          {errors.phoneNumber && <span className="error-message">{errors.phoneNumber}</span>}
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="dob" value={formData.dob} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" name="address.city" value={formData.address.city} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>District</label>
          <input type="text" name="address.district" value={formData.address.district} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Province</label>
          <select name="address.province" value={formData.address.province} onChange={handleChange}>
            <option value="Province 1">Province 1</option>
            <option value="Province 2">Province 2</option>
            <option value="Province 3">Province 3</option>
            <option value="Province 4">Province 4</option>
            <option value="Province 5">Province 5</option>
            <option value="Province 6">Province 6</option>
            <option value="Province 7">Province 7</option>
          </select>
        </div>
        <div className="form-group">
          <label>Country</label>
          <select name="address.country" value={formData.address.country} onChange={handleChange}>
            <option value="Nepal">Nepal</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="India">India</option>
          </select>
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="file" accept=".png" onChange={handleFileChange} />
          {errors.profilePicture && <span className="error-message">{errors.profilePicture}</span>}
        </div>
        <button type="submit" className="submit-button">Submit</button>
        {isValid && <span className="success-message">Form submitted successfully!</span>}
      </form>
    </div>
  );
};

export default Form;
