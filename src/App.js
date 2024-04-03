import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css'; // Import the CSS file for App component
import Form from './Form'; // Import the Form component
import Table from './Table'; // Import the Table component
import Pagination from './Pagination'; // Import the Pagination component
import Profiles from './Profiles'; // Import the Profiles component

// Define the Home component
const Home = ({ addEntry, entries, paginate, totalPages, currentPage, onEdit, onDelete }) => (
  <div>
    <Form addEntry={addEntry} />
    <h2 className="table-heading">List of Entries</h2>
    <Table entries={entries} onEdit={onEdit} onDelete={onDelete} />
    <div className="footer">
      <Link to="/profiles">
        <button className="profile-button">Profiles</button>
      </Link>
      <Pagination currentPage={currentPage} totalPages={totalPages} goToPage={paginate} />
    </div>
  </div>
);

function App() {
  const [entries, setEntries] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [entriesPerPage] = useState(5);

  // Function to add entry
  const addEntry = (entry) => {
    entry.id = Date.now(); // Assigning a unique id to each entry
    setEntries([...entries, entry]);
  };

  // Function to delete entry
  const deleteEntry = (id) => {
    setEntries(entries.filter(entry => entry.id !== id));
  };

  // Function to edit entry
  const editEntry = (editedEntry) => {
    setEntries(entries.map(entry => entry.id === editedEntry.id ? editedEntry : entry));
  };

  // Function to paginate
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Get current entries
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = entries.slice(indexOfFirstEntry, indexOfLastEntry);

  return (
    <Router>
      <div className="container">
        <div className="header">
          <h1>CRUD Application</h1>
        </div>
        <nav>
          <Link to="/" className="home-link">Home</Link>
        </nav>
        <Routes>
          <Route
            path="/"
            element={<Home addEntry={addEntry} entries={currentEntries} paginate={paginate} totalPages={Math.ceil(entries.length / entriesPerPage)} currentPage={currentPage} onEdit={editEntry} onDelete={deleteEntry} />}
          />
          <Route path="/profiles" element={<Profiles entries={entries} />} />
        </Routes>
        <div className="footer">
          <p>© 2024 React Task. All rights reserved.</p>
        </div>
      </div>
    </Router>
  );
}

export default App;
