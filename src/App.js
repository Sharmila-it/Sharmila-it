import React, { useState, useEffect } from 'react';
import axios from 'axios';

const App = () => {
  const [employees, setEmployees] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('https://reqres.in/api/users?page=2');
        setEmployees(response.data.data);
      } catch (error) {
        console.error('Error fetching employees:', error);
      }
    };

    fetchEmployees();
  }, []);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const filteredEmployees = employees.filter((employee) =>
    employee.first_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <input
        type="text"
        placeholder="Search by first name"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {filteredEmployees.map((employee) => (
        <div key={employee.id}>
          <img src={employee.avatar} alt={employee.first_name} />
          <p>{employee.first_name}</p>
        </div>
      ))}
    </div>
  );
};

export default App;
