import React, { useState, useMemo } from 'react';
import { Search, ListTodo, CheckCircle, Hourglass, XCircle } from 'lucide-react'; // Removed Calendar icon
import { useNavigate } from 'react-router-dom';

// Mock data for tasks - UPDATED to include startDate, duration, and assignedFrom
const mockTasks = [
  { id: 't1', name: 'Develop User Authentication Module', assignedFrom: 'Alice', startDate: '2025-01-18', dueDate: '2025-01-20', duration: '3 days', status: 'In Progress' },
  { id: 't2', name: 'Design Database Schema for Products', assignedFrom: 'Bob', startDate: '2025-02-10', dueDate: '2025-02-15', duration: '5 days', status: 'Completed' },
  { id: 't3', name: 'Implement Payment Gateway Integration', assignedFrom: 'Alice', startDate: '2025-03-20', dueDate: '2025-03-25', duration: '6 days', status: 'Pending' },
  { id: 't4', name: 'Write API Documentation', assignedFrom: 'Charlie', startDate: '2025-04-05', dueDate: '2025-04-10', duration: '5 days', status: 'Incomplete' },
  { id: 't5', name: 'Conduct Code Review for Frontend', assignedFrom: 'David', startDate: '2025-05-20', dueDate: '2025-05-22', duration: '3 days', status: 'In Progress' },
  { id: 't6', name: 'Prepare Q3 Performance Report', assignedFrom: 'Eve', startDate: '2025-06-25', dueDate: '2025-06-30', duration: '6 days', status: 'Pending' },
  { id: 't7', name: 'Fix Production Bug #123', assignedFrom: 'Alice', startDate: '2025-07-10', dueDate: '2025-07-12', duration: '3 days', status: 'Completed' },
  { id: 't8', name: 'Setup CI/CD Pipeline', assignedFrom: 'Frank', startDate: '2025-08-28', dueDate: '2025-09-01', duration: '5 days', status: 'Pending' },
  { id: 't9', name: 'Onboard New Employee John', assignedFrom: 'Grace', startDate: '2025-09-15', dueDate: '2025-09-18', duration: '4 days', status: 'Completed' },
  { id: 't10', name: 'Research New UI Frameworks', assignedFrom: 'Heidi', startDate: '2025-10-25', dueDate: '2025-10-28', duration: '4 days', status: 'In Progress' },
  { id: 't11', name: 'Update Project Dependencies', assignedFrom: 'Alice', startDate: '2025-11-14', dueDate: '2025-11-16', duration: '3 days', status: 'Incomplete' },
];

function Tasks() {
  const [tasks] = useState(mockTasks);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedYear, setSelectedYear] = useState(''); // State for year filter
  const [selectedMonth, setSelectedMonth] = useState(''); // State for month filter
  const navigate = useNavigate();

  // Get current year and month for initial calendar filter options
  // Changed years to start from 2025 and go for 10 years onwards
  const currentYear = new Date().getFullYear();
  const startYearForFilter = Math.max(2025, currentYear); // Ensure filter starts from 2025 or current year if it's past 2025
  const years = Array.from({ length: 10 }, (_, i) => startYearForFilter + i);
  const months = [
    { value: '', label: 'All Months' },
    { value: '01', label: 'January' }, { value: '02', label: 'February' },
    { value: '03', label: 'March' }, { value: '04', label: 'April' },
    { value: '05', label: 'May' }, { value: '06', label: 'June' },
    { value: '07', label: 'July' }, { value: '08', label: 'August' },
    { value: '09', label: 'September' }, { value: '10', label: 'October' },
    { value: '11', label: 'November' }, { value: '12', label: 'December' },
  ];

  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const taskStartDate = new Date(task.startDate);
      const taskStartYear = taskStartDate.getFullYear().toString();
      const taskStartMonth = (taskStartDate.getMonth() + 1).toString().padStart(2, '0'); // Month is 0-indexed

      const matchesSearch =
        task.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.assignedFrom.toLowerCase().includes(searchTerm.toLowerCase()) ||
        task.status.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesYear = selectedYear === '' || taskStartYear === selectedYear;
      const matchesMonth = selectedMonth === '' || taskStartMonth === selectedMonth;

      return matchesSearch && matchesYear && matchesMonth;
    });
  }, [tasks, searchTerm, selectedYear, selectedMonth]);

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'Completed').length;
  const inProgressTasks = tasks.filter(t => t.status === 'In Progress').length;
  const pendingTasks = tasks.filter(t => t.status === 'Pending').length;
  const incompleteTasks = tasks.filter(t => t.status === 'Incomplete').length;

  const handleTaskClick = (taskId) => {
    navigate(`/tasks/${taskId}`);
  };

  // Function to check if a task is overdue (due date is today or in the past)
  const isOverdue = (dueDate) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize today's date to start of day
    const taskDueDate = new Date(dueDate);
    taskDueDate.setHours(0, 0, 0, 0); // Normalize task due date to start of day

    const timeDifference = taskDueDate.getTime() - today.getTime();
    const daysRemaining = Math.ceil(timeDifference / (1000 * 60 * 60 * 24)); // Calculate days remaining, ceil to count partial days

    return daysRemaining <= -1; // Task is overdue if remaining days is -1 or less
  };

  // Get the display label for the selected month
  const getMonthLabel = (monthValue) => {
    const month = months.find(m => m.value === monthValue);
    return month ? month.label : 'All Months';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-100 p-4 font-inter">
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
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Task Management</h1>
          <p className="text-lg text-gray-600">View and manage all assigned tasks.</p>
        </header>

        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-10">
          <SummaryCard label="Total Tasks" count={totalTasks} icon={<ListTodo className="text-purple-400 w-12 h-12" />} color="purple" />
          <SummaryCard label="Completed" count={completedTasks} icon={<CheckCircle className="text-green-400 w-12 h-12" />} color="green" />
          <SummaryCard label="In Progress" count={inProgressTasks} icon={<Hourglass className="text-yellow-400 w-12 h-12" />} color="yellow" />
          <SummaryCard label="Pending" count={pendingTasks} icon={<ListTodo className="text-blue-400 w-12 h-12" />} color="blue" />
          <SummaryCard label="Incomplete" count={incompleteTasks} icon={<XCircle className="text-red-400 w-12 h-12" />} color="red" />
        </div>

        {/* Filter */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Tasks</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
            {/* Search Bar */}
            <div className="relative md:col-span-1">
              <input
                type="text"
                placeholder="Search by task name, assignee, or status..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Yearly Calendar Filter */}
            <div className="md:col-span-1">
              <label htmlFor="year-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Start Year
              </label>
              <select
                id="year-filter"
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-white appearance-none"
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
            <div className="md:col-span-1">
              <label htmlFor="month-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Start Month
              </label>
              <select
                id="month-filter"
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition duration-200 bg-white appearance-none"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              >
                {months.map(month => (
                  <option key={month.value} value={month.value}>{month.label}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Display active filters */}
          {(searchTerm || selectedYear || selectedMonth) && (
            <div className="mt-4 text-sm text-gray-600">
              Active Filters:
              {searchTerm && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">Search: "{searchTerm}"</span>}
              {selectedYear && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">Year: {selectedYear}</span>}
              {selectedMonth && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">Month: {getMonthLabel(selectedMonth)}</span>}
            </div>
          )}
        </div>

        {/* Task Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b border-gray-200">
            All Tasks
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Task Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned from</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Start Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Due Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredTasks.length > 0 ? (
                  filteredTasks.map((task) => {
                    const isTaskOverdue = isOverdue(task.dueDate);
                    return (
                      <tr key={task.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                        <td className={`px-6 py-4 whitespace-nowrap text-sm font-medium ${isTaskOverdue ? 'text-red-600' : 'text-gray-900'}`}>
                          <button
                            onClick={() => handleTaskClick(task.id)}
                            className={`focus:outline-none ${isTaskOverdue ? 'cursor-not-allowed' : 'text-blue-600 hover:underline'}`}
                            disabled={isTaskOverdue}
                          >
                            {task.name}
                          </button>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{task.assignedFrom}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(task.startDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(task.dueDate).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {task.duration}
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                      No tasks found matching your criteria.
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

// Helper component for summary cards
function SummaryCard({ label, count, icon, color }) {
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 flex items-center justify-between transform transition duration-300 hover:scale-105 hover:shadow-xl">
      <div className="flex flex-col">
        <span className="text-sm font-medium text-gray-500">{label}</span>
        <span className={`text-3xl font-bold text-${color}-700`}>{count}</span>
      </div>
      {icon}
    </div>
  );
}

export default Tasks;
