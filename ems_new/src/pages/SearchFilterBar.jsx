import React from 'react';

const SearchFilterBar = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow mb-6 flex items-center space-x-4">
      <input
        type="text"
        placeholder="Search..."
        className="flex-1 p-2 border border-gray-300 rounded"
      />
      <select className="p-2 border border-gray-300 rounded">
        <option value="">Filter by Status</option>
        <option value="present">Present</option>
        <option value="absent">Absent</option>
      </select>
    </div>
  );
};

export default SearchFilterBar;
