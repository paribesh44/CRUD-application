import React, { useState } from 'react';
import './Table.css'; // Import the CSS file for Table component

const Table = ({ entries, onDelete, onEdit }) => {
  const [editedEntryId, setEditedEntryId] = useState(null);
  const [editedEntry, setEditedEntry] = useState(null);

  const handleEdit = (entry) => {
    setEditedEntryId(entry.id);
    setEditedEntry({ ...entry });
  };

  const handleInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedEntry(prevState => ({
      ...prevState,
      [fieldName]: value
    }));
  };

  const handleAddressInputChange = (e, fieldName) => {
    const { value } = e.target;
    setEditedEntry(prevState => ({
      ...prevState,
      address: {
        ...prevState.address,
        [fieldName]: value
      }
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setEditedEntry(prevState => ({
      ...prevState,
      profilePicture: file
    }));
  };

  const handleSave = () => {
    onEdit(editedEntry);
    setEditedEntryId(null);
    setEditedEntry(null);
  };

  const handleCancel = () => {
    setEditedEntryId(null);
    setEditedEntry(null);
  };

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>DOB</th>
            <th>City</th>
            <th>District</th>
            <th>Province</th>
            <th>Country</th>
            <th>Profile Picture</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map((entry, index) => (
            <tr key={entry.id}>
              <td>{editedEntryId === entry.id ?
                <input type="text" name="name" value={editedEntry.name} onChange={(e) => handleInputChange(e, "name")} style={{ width: '100px' }} /> :
                entry.name}
              </td>
              <td>{editedEntryId === entry.id ?
                <input type="text" name="email" value={editedEntry.email} onChange={(e) => handleInputChange(e, "email")} style={{ width: '100px' }} /> :
                entry.email}
              </td>
              <td>{editedEntryId === entry.id ?
                <input type="text" name="phoneNumber" value={editedEntry.phoneNumber} onChange={(e) => handleInputChange(e, "phoneNumber")} style={{ width: '100px' }} /> :
                entry.phoneNumber}
              </td>
              <td>{editedEntryId === entry.id ?
                <input type="text" name="dob" value={editedEntry.dob} onChange={(e) => handleInputChange(e, "dob")} style={{ width: '100px' }} /> :
                entry.dob}
              </td>
              <td>{editedEntryId === entry.id ?
                <input type="text" name="city" value={editedEntry.address.city} onChange={(e) => handleAddressInputChange(e, "city")} style={{ width: '100px' }} /> :
                entry.address.city}
              </td>
              <td>{editedEntryId === entry.id ?
                <input type="text" name="district" value={editedEntry.address.district} onChange={(e) => handleAddressInputChange(e, "district")} style={{ width: '100px' }} /> :
                entry.address.district}
              </td>
              <td>{editedEntryId === entry.id ?
                <input type="text" name="province" value={editedEntry.address.province} onChange={(e) => handleAddressInputChange(e, "province")} style={{ width: '100px' }} /> :
                entry.address.province}
              </td>
              <td>{editedEntryId === entry.id ?
                <input type="text" name="country" value={editedEntry.address.country} onChange={(e) => handleAddressInputChange(e, "country")} style={{ width: '100px' }} /> :
                entry.address.country}
              </td>
              <td>
                {editedEntryId === entry.id ?
                  <input type="file" accept=".png" onChange={handleFileChange} /> :
                  entry.profilePicture && <img src={URL.createObjectURL(entry.profilePicture)} alt="Profile" style={{ width: '50px', height: '50px' }} />
                }
              </td>
              <td>
                {editedEntryId === entry.id ?
                  <>
                    <button onClick={handleSave}>Save</button>
                    <button onClick={handleCancel}>Cancel</button>
                  </> :
                  <button onClick={() => handleEdit(entry)}>Edit</button>
                }
                <button onClick={() => onDelete(entry.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
