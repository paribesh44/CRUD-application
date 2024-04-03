import React, { useState, useEffect } from 'react';
import './Profiles.css'; // Import the CSS file for Profiles component

const Profiles = ({ entries }) => {
  const [sortedEntries, setSortedEntries] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Sort entries by name whenever entries prop changes
    const sorted = [...entries].sort((a, b) => a.name.localeCompare(b.name));
    setSortedEntries(sorted);
  }, [entries]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Filter entries based on search term
  const filteredEntries = sortedEntries.filter(entry =>
    entry.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="profiles-container">
      <h2 className="profiles-heading">Profiles</h2>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search by name..."
          value={searchTerm}
          onChange={handleSearch}
        />
      </div>
      <ul className="profile-list">
        {filteredEntries.map((entry, index) => (
          <li key={index} className="profile-item">
            {entry.profilePicture && (
              <img src={URL.createObjectURL(entry.profilePicture)} alt="Profile" />
            )}
            <div>
              <p><strong>Name:</strong> {entry.name}</p>
              <p><strong>Email:</strong> {entry.email}</p>
              <p><strong>Phone Number:</strong> {entry.phoneNumber}</p>
              <p><strong>DOB:</strong> {entry.dob}</p>
              <p><strong>Address:</strong></p>
              <p>{entry.address.city}, {entry.address.district}, {entry.address.province}, {entry.address.country}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profiles;
