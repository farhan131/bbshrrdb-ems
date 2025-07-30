import React, { useState, useMemo } from 'react';
import { Search, Calendar, Award, Clock, CheckCircle } from 'lucide-react';

// Mock data for trainings
const mockTrainings = [
  { id: '1', name: 'React Basics', date: '2024-01-15', duration: '3 days', status: 'Completed' },
  { id: '2', name: 'Advanced CSS Techniques', date: '2024-02-20', duration: '2 days', status: 'In Progress' },
  { id: '3', name: 'Node.js Fundamentals', date: '2024-03-10', duration: '4 days', status: 'Scheduled' },
  { id: '4', name: 'Database Design with SQL', date: '2024-04-05', duration: '5 days', status: 'Completed' },
  { id: '5', name: 'Cloud Computing Essentials', date: '2024-05-12', duration: '3 days', status: 'Scheduled' },
  { id: '6', name: 'DevOps Practices', date: '2024-06-18', duration: '4 days', status: 'In Progress' },
  { id: '7', name: 'Cybersecurity Awareness', date: '2024-07-22', duration: '1 day', status: 'Completed' },
  { id: '8', name: 'Project Management Agile', date: '2024-08-01', duration: '3 days', status: 'Scheduled' },
  { id: '9', name: 'Machine Learning Intro', date: '2024-09-09', duration: '6 days', status: 'Completed' },
  { id: '10', 'name': 'Data Visualization with D3.js', date: '2024-10-14', duration: '3 days', status: 'Scheduled' },
  { id: '11', name: 'Mobile App Development (Flutter)', date: '2025-01-25', duration: '5 days', status: 'Scheduled' },
  { id: '12', name: 'UI/UX Design Principles', date: '2025-02-28', duration: '2 days', status: 'In Progress' },
  { id: '13', name: 'Advanced Python Programming', date: '2025-03-05', duration: '4 days', status: 'Completed' },
  { id: '14', name: 'Cloud Security Best Practices', date: '2025-04-10', duration: '3 days', status: 'Scheduled' },
  { id: '15', name: 'Microservices Architecture', date: '2025-05-15', duration: '5 days', status: 'Completed' },
];

// Main Trainings component for the Training Dashboard
function Trainings() {
  const [trainings] = useState(mockTrainings); // Removed setTrainings as it's not currently used
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState('');
  const [selectedMonth, setSelectedMonth] = useState('');

  // Get current year and month for initial calendar filter options
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear - 5 + i); // Last 5 years, current, and next 4
  const months = [
    { value: '', label: 'All Months' },
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' }, { value: '04', label: 'April' },
    { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' },
  ];

  // Memoized filtering logic to avoid re-calculating on every render
  const filteredTrainings = useMemo(() => {
    return trainings.filter(training => {
      const trainingDate = new Date(training.date);
      const trainingYear = trainingDate.getFullYear().toString();
      const trainingMonth = (trainingDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed

      const matchesSearch = training.name.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesYear = selectedYear === '' || trainingYear === selectedYear;
      const matchesMonth = selectedMonth === '' || trainingMonth === selectedMonth;

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [trainings, searchTerm, selectedYear, selectedMonth]);

  // Calculate summary statistics
  const totalTrainings = trainings.length;
  const completedTrainings = trainings.filter(t => t.status === 'Completed').length;
  const inProgressTrainings = trainings.filter(t => t.status === 'In Progress').length;
  const scheduledTrainings = trainings.filter(t => t.status === 'Scheduled').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        `}
      </style>

      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-6xl mx-auto text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Training Management Dashboard</h1>
          <p className="text-lg text-gray-600">Explore and manage all available trainings.</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Total Trainings</span>
              <span className="text-3xl font-bold text-indigo-700">{totalTrainings}</span>
            </div>
            <Award className="text-indigo-400 w-12 h-12" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Completed</span>
              <span className="text-3xl font-bold text-green-600">{completedTrainings}</span>
            </div>
            <CheckCircle className="text-green-400 w-12 h-12" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">In Progress</span>
              <span className="text-3xl font-bold text-yellow-600">{inProgressTrainings}</span>
            </div>
            <Clock className="text-yellow-400 w-12 h-12" />
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-500">Scheduled</span>
              <span className="text-3xl font-bold text-blue-600">{scheduledTrainings}</span>
            </div>
            <Calendar className="text-blue-400 w-12 h-12" />
          </div>
        </div>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Trainings</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by training name..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Yearly Calendar Filter */}
            <div>
              <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Year
              </label>
              <select
                id="year-filter"
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-white appearance-none"
                value={selectedYear}
                onChange={(e) => setSelectedYear(e.target.value)}
              >
                <option value="">All Years</option>
                {years.map(year => (
                  <option key={year} value={year.toString()}>{year}</option>
                ))}
              </select>
            </div>

            {/* Monthly Calendar Filter */}
            <div>
              <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Month
              </label>
              <select
                id="month-filter"
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition duration-200 bg-white appearance-none"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Trainings Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b border-gray-200">
            All Trainings
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Training Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTrainings.length > 0 ? (
                  filteredTrainings.map((training) => (
                    <tr key={training.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {training.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(training.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {training.duration}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                          ${training.status === 'Completed' ? 'bg-green-100 text-green-800' : ''}
                          ${training.status === 'In Progress' ? 'bg-yellow-100 text-yellow-800' : ''}
                          ${training.status === 'Scheduled' ? 'bg-blue-100 text-blue-800' : ''}
                        `}>
                          {training.status}
                        </span>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      No trainings found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Trainings;
