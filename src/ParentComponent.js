import React from 'react';
import './Table.css'; // Import the CSS file for Table component

const TableRow = ({ entry, onDelete, onEdit, editedEntry, setEditedEntry }) => {
  const handleEdit = () => {
    setEditedEntry({ ...entry });
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedEntry(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = () => {
    onEdit(editedEntry);
    setEditedEntry(null);
  };

  const handleCancel = () => {
    setEditedEntry(null);
  };

  return (
    <tr>
      <td>{editedEntry ? <input type="text" name="name" value={editedEntry.name} onChange={handleInputChange} /> : entry.name}</td>
      {/* Repeat the same for other columns */}
      <td>
        {editedEntry ? (
          <>
            <button onClick={handleSave}>Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </>
        ) : (
          <button onClick={handleEdit}>Edit</button>
        )}
        <button onClick={() => onDelete(entry.id)}>Delete</button>
      </td>
    </tr>
  );
};

const Table = ({ entries, onDelete, onEdit }) => {
  const [editedEntry, setEditedEntry] = React.useState(null);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            {/* Add headers for other columns */}
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {entries.map(entry => (
            <TableRow 
              key={entry.id} 
              entry={entry} 
              onDelete={onDelete} 
              onEdit={onEdit} 
              editedEntry={editedEntry} 
              setEditedEntry={setEditedEntry} 
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
