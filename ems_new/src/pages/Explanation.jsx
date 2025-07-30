import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react'; // Removed unused imports: Info, User, MessageSquare

// Mock data for non-compliance explanations
const mockExplanations = [
  {
    id: 'exp1',
    employeeName: 'John Doe',
    date: '2025-01-10',
    reason: 'Non Compliance',
    details: 'Failed to adhere to company policy regarding data privacy.',
    secretary: 'Alice Smith'
  },
  {
    id: 'exp2',
    employeeName: 'Jane Smith',
    date: '2025-01-15',
    reason: 'Late Coming',
    details: 'Arrived 30 minutes late for a critical team meeting without prior notification.',
    secretary: 'Bob Johnson'
  },
  {
    id: 'exp3',
    employeeName: 'Peter Jones',
    date: '2025-01-20',
    reason: 'Bad Attitude',
    details: 'Displayed unprofessional behavior during a client presentation.',
    secretary: 'Alice Smith'
  },
  {
    id: 'exp4',
    employeeName: 'Alice Brown',
    date: '2025-01-25',
    reason: 'Other',
    details: 'Misused company resources for personal gain.',
    secretary: 'Charlie Green'
  },
  {
    id: 'exp5',
    employeeName: 'Michael White',
    date: '2025-02-01',
    reason: 'Non Compliance',
    details: 'Did not complete mandatory security training by the deadline.',
    secretary: 'Bob Johnson'
  },
  {
    id: 'exp6',
    employeeName: 'Sarah Davis',
    date: '2025-02-05',
    reason: 'Late Coming',
    details: 'Consistently late for work over the past week.',
    secretary: 'Alice Smith'
  },
  {
    id: 'exp7',
    employeeName: 'David Wilson',
    date: '2025-02-10',
    reason: 'Bad Attitude',
    details: 'Engaged in disruptive arguments with colleagues.',
    secretary: 'Charlie Green'
  },
  {
    id: 'exp8',
    employeeName: 'Emily Clark',
    date: '2025-02-15',
    reason: 'Other',
    details: 'Unauthorized disclosure of confidential company information.',
    secretary: 'Bob Johnson'
  },
  {
    id: 'exp9',
    employeeName: 'Chris Taylor',
    date: '2025-03-01',
    reason: 'Non Compliance',
    details: 'Failed to submit expense reports within the stipulated timeframe.',
    secretary: 'Alice Smith'
  },
  {
    id: 'exp10',
    employeeName: 'Olivia Martinez',
    date: '2025-03-05',
    reason: 'Late Coming',
    details: 'Late for shift start multiple times this month.',
    secretary: 'Charlie Green'
  },
];

function Explanation() { // Renamed component from NonComplianceExplanation to Explanation
  const [explanations] = useState(mockExplanations);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = useMemo(() => {
    const uniqueReasons = [...new Set(mockExplanations.map(exp => exp.reason))];
    return ['', ...uniqueReasons]; // Add 'All Reasons' option
  }, []);

  const filteredExplanations = useMemo(() => {
    return explanations.filter(explanation => {
      const matchesSearch =
        explanation.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        explanation.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        explanation.secretary.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesReason = selectedReason === '' || explanation.reason === selectedReason;

      return matchesSearch && matchesReason;
    });
  }, [explanations, searchTerm, selectedReason]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter"> {/* Changed background to light gray */}
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
        <header className="bg-white shadow-lg rounded-xl p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Non-Compliance Explanations</h1>
          <p className="text-lg text-gray-600">View explanations received from employees regarding non-compliance issues.</p>
        </header>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Explanations</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by employee name, details, or secretary..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
            </div>

            {/* Reason Filter */}
            <div>
              <label htmlFor="reason-filter" className="block text-sm font-medium text-gray-700 mb-1">
                Filter by Reason
              </label>
              <select
                id="reason-filter"
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 transition duration-200 bg-white appearance-none"
                value={selectedReason}
                onChange={(e) => setSelectedReason(e.target.value)}
              >
                {reasons.map(reason => (
                  <option key={reason} value={reason}>{reason === '' ? 'All Reasons' : reason}</option>
                ))}
              </select>
            </div>
          </div>
          {/* Display active filters */}
          {(searchTerm || selectedReason) && (
            <div className="mt-4 text-sm text-gray-600">
              Active Filters:
              {searchTerm && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">Search: "{searchTerm}"</span>}
              {selectedReason && <span className="ml-2 px-2 py-1 bg-gray-100 rounded-full">Reason: {selectedReason}</span>}
            </div>
          )}
        </div>

        {/* Explanations Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b border-gray-200">
            All Explanations
          </h2>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Secretary
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredExplanations.length > 0 ? (
                  filteredExplanations.map((explanation) => (
                    <tr key={explanation.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {explanation.employeeName}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(explanation.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {explanation.reason}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500 max-w-xs truncate">
                        {explanation.details}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {explanation.secretary}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="px-6 py-4 whitespace-nowrap text-center text-sm text-gray-500">
                      No explanations found matching your criteria.
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

export default Explanation; // Renamed export
