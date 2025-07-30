import React, { useState } from 'react';

// Main component for the Deliverables Form, renamed to AddDeliverablesAD
const AddDeliverablesAD = () => {
  // State to hold the form data
  const [formData, setFormData] = useState({
    deliverableName: '',
    startDate: '', // Added Start Date
    dueDate: '',
    status: 'Not Started',
    officer: '', // Renamed from assignedTo to officer
    district: '', // Added District
    description: '',
    priority: 'Medium',
  });

  // Sample data for Officer and District dropdowns
  // Structured to support cascading: districts map to arrays of officers
  const allOfficerOptions = {
    '': [{ value: '', label: 'Select Officer' }], // Default for no district selected
    'Karachi': [
      { value: 'John Doe', label: 'John Doe' },
      { value: 'Jane Smith', label: 'Jane Smith' },
      { value: 'Ali Khan', label: 'Ali Khan' },
    ],
    'Lahore': [
      { value: 'Peter Jones', label: 'Peter Jones' },
      { value: 'Fatima Ahmed', label: 'Fatima Ahmed' },
    ],
    'Islamabad': [
      { value: 'Usman Tariq', label: 'Usman Tariq' },
      { value: 'Sara Bilal', label: 'Sara Bilal' },
    ],
    'Peshawar': [
      { value: 'Zainab Khan', label: 'Zainab Khan' },
      { value: 'Imran Ali', label: 'Imran Ali' },
    ],
  };

  const districtOptions = [
    { value: '', label: 'Select District' },
    { value: 'Karachi', label: 'Karachi' },
    { value: 'Lahore', label: 'Lahore' },
    { value: 'Islamabad', label: 'Islamabad' },
    { value: 'Peshawar', label: 'Peshawar' },
  ];

  // Handle input changes and update the form data state
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => {
      // If the district changes, reset the officer field
      if (name === 'district') {
        return {
          ...prevData,
          [name]: value,
          officer: '', // Reset officer when district changes
        };
      }
      return {
        ...prevData,
        [name]: value,
      };
    });
  };

  // Get filtered officer options based on selected district
  const filteredOfficerOptions = allOfficerOptions[formData.district] || [{ value: '', label: 'Select Officer' }];


  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    console.log('Form Data Submitted:', formData);
    // In a real application, you would send this data to an API or process it further.
    alert('Deliverable submitted! Check console for data.'); // Using alert for demonstration, replace with a custom modal in production.
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4 font-sans"> {/* Changed to flex-col */}
      {/* Page Header */}
      <header className="bg-white shadow-lg rounded-xl p-6 mb-8 w-full max-w-3xl text-center"> {/* Adjusted max-w to match form */}
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Complete New Deliverable</h1>
        <p className="text-lg text-gray-600">Fill out the form to add a new deliverable to the system.</p>
      </header>

      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-3xl border border-gray-200">
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Deliverables Form</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Grid container for two fields per row */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Deliverable Name */}
            <div>
              <label htmlFor="deliverableName" className="block text-sm font-medium text-gray-700 mb-1">
                Deliverable Name
              </label>
              <input
                type="text"
                id="deliverableName"
                name="deliverableName"
                value={formData.deliverableName}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                placeholder="e.g., Project Proposal"
                required
              />
            </div>

            {/* Start Date */}
            <div>
              <label htmlFor="startDate" className="block text-sm font-medium text-gray-700 mb-1">
                Start Date
              </label>
              <input
                type="date"
                id="startDate"
                name="startDate"
                value={formData.startDate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Due Date */}
            <div>
              <label htmlFor="dueDate" className="block text-sm font-medium text-gray-700 mb-1">
                Due Date
              </label>
              <input
                type="date"
                id="dueDate"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              />
            </div>

            {/* Status Dropdown */}
            <div>
              <label htmlFor="status" className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
                <option value="On Hold">On Hold</option>
              </select>
            </div>

            {/* District Dropdown */}
            <div>
              <label htmlFor="district" className="block text-sm font-medium text-gray-700 mb-1">
                District
              </label>
              <select
                id="district"
                name="district"
                value={formData.district}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
              >
                {districtOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Officer Dropdown (cascading) */}
            <div>
              <label htmlFor="officer" className="block text-sm font-medium text-gray-700 mb-1">
                Officer
              </label>
              <select
                id="officer"
                name="officer"
                value={formData.officer}
                onChange={handleChange}
                className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                required
                disabled={!formData.district} // Disable if no district is selected
              >
                {filteredOfficerOptions.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description Textarea - Full width */}
          <div className="md:col-span-2">
            <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows="4"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Provide a detailed description of the deliverable..."
            ></textarea>
          </div>

          {/* Priority Dropdown */}
          <div>
            <label htmlFor="priority" className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              id="priority"
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              required
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center mt-6">
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-6 border border-transparent shadow-sm text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-150 ease-in-out"
            >
              Submit Deliverable
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddDeliverablesAD;
