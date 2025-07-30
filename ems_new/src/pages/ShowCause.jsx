import React, { useState, useMemo } from 'react';
import { Search } from 'lucide-react';

// Mock data for show cause notices
const mockShowCauseNotices = [
  {
    id: 'sc1',
    employeeName: 'John Doe',
    dateIssued: '2025-01-05',
    reason: 'Late Coming',
    details: 'Repeated instances of late arrival without proper justification. This is a very long detail to test text wrapping and column width adjustments, ensuring that the content flows nicely within the allocated space without causing horizontal overflow.',
    issuedBy: 'Secretary Alice Smith',
    dueDateForResponse: '2025-01-12'
  },
  {
    id: 'sc2',
    employeeName: 'Jane Smith',
    dateIssued: '2025-01-10',
    reason: 'Non Compliance',
    details: 'Failure to submit weekly progress reports as per company guidelines, leading to delays in project tracking and stakeholder communication and requiring multiple lines to display fully.',
    issuedBy: 'Secretary Bob Johnson',
    dueDateForResponse: '2025-01-17'
  },
  {
    id: 'sc3',
    employeeName: 'Peter Jones',
    dateIssued: '2025-01-18',
    reason: 'Bad Attitude',
    details: 'Unprofessional conduct during team meetings and disrespectful communication with colleagues, causing a negative impact on team morale and requiring disciplinary action.',
    issuedBy: 'Secretary Alice Smith',
    dueDateForResponse: '2025-01-25'
  },
  {
    id: 'sc4',
    employeeName: 'Alice Brown',
    dateIssued: '2025-01-22',
    reason: 'Other',
    details: 'Unauthorized use of company property for personal business, specifically using the company vehicle for non-work related trips without prior approval, which is a serious violation.',
    issuedBy: 'Secretary Charlie Green',
    dueDateForResponse: '2025-01-29'
  },
  {
    id: 'sc5',
    employeeName: 'Michael White',
    dateIssued: '2025-02-01',
    reason: 'Late Coming',
    details: 'Consistent tardiness for morning shifts over the last two weeks, impacting daily stand-ups and team productivity, and causing inconvenience to other team members who rely on his timely presence.',
    issuedBy: 'Secretary Bob Johnson',
    dueDateForResponse: '2025-02-08'
  },
  {
    id: 'sc6',
    employeeName: 'Sarah Davis',
    dateIssued: '2025-02-08',
    reason: 'Non Compliance',
    details: 'Did not complete mandatory annual compliance training, posing a significant risk to regulatory adherence and the company\'s legal standing, despite multiple reminders.',
    issuedBy: 'Secretary Alice Smith',
    dueDateForResponse: '2025-02-15'
  },
  {
    id: 'sc7',
    employeeName: 'David Wilson',
    dateIssued: '2025-02-14',
    reason: 'Bad Attitude',
    details: 'Aggressive behavior towards a junior staff member during a feedback session, creating a hostile work environment and violating the company\'s code of conduct regarding respectful interactions.',
    issuedBy: 'Secretary Charlie Green',
    dueDateForResponse: '2025-02-21'
  },
  {
    id: 'sc8',
    employeeName: 'Emily Clark',
    dateIssued: '2025-02-20',
    reason: 'Other',
    details: 'Breach of company confidentiality agreement by discussing sensitive project details with external parties, which could lead to severe consequences for the company\'s intellectual property.',
    issuedBy: 'Secretary Bob Johnson',
    dueDateForResponse: '2025-02-27'
  },
  {
    id: 'sc9',
    employeeName: 'Chris Taylor',
    dateIssued: '2025-03-01',
    reason: 'Late Coming',
    details: 'Frequent late submissions of project milestones, causing delays in subsequent development phases and affecting overall project timelines and client satisfaction.',
    issuedBy: 'Secretary Alice Smith',
    dueDateForResponse: '2025-03-08'
  },
  {
    id: 'sc10',
    employeeName: 'Olivia Martinez',
    dateIssued: '2025-03-05',
    reason: 'Non Compliance',
    details: 'Non-adherence to safety protocols in the laboratory, specifically neglecting to wear required protective gear and failing to follow experimental procedures, endangering herself and others.',
    issuedBy: 'Secretary Charlie Green',
    dueDateForResponse: '2025-03-12'
  },
];

function ShowCause() {
  const [showCauseNotices] = useState(mockShowCauseNotices);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReason, setSelectedReason] = useState('');

  const reasons = useMemo(() => {
    const uniqueReasons = [...new Set(mockShowCauseNotices.map(notice => notice.reason))];
    return ['', ...uniqueReasons]; // Add 'All Reasons' option
  }, []);

  const filteredShowCauseNotices = useMemo(() => {
    return showCauseNotices.filter(notice => {
      const matchesSearch =
        notice.employeeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
        notice.issuedBy.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesReason = selectedReason === '' || notice.reason === selectedReason;

      return matchesSearch && matchesReason;
    });
  }, [showCauseNotices, searchTerm, selectedReason]);

  return (
    <div className="min-h-screen bg-gray-100 p-4 font-inter">
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
        /* Custom table styling to ensure text wrapping and prevent horizontal scrollbar where possible */
        .table-fixed-layout {
          table-layout: fixed; /* Ensures fixed column widths */
          width: 100%; /* Occupy full width of parent */
        }
        .table-fixed-layout th,
        .table-fixed-layout td {
          word-wrap: break-word; /* Ensures long words break and wrap */
          overflow-wrap: break-word; /* Modern equivalent */
        }
        `}
      </style>

      <div className="max-w-4xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Page Header */}
        <header className="bg-white shadow-lg rounded-xl p-6 mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">Show Cause Notices</h1>
          <p className="text-lg text-gray-600">View show cause notices issued to employees by their superiors.</p>
        </header>

        {/* Filters Section */}
        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Filter Notices</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end">
            {/* Search Bar */}
            <div className="relative">
              <input
                type="text"
                placeholder="Search by employee name, details, or issuer..."
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200"
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
                className="w-full pl-3 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition duration-200 bg-white appearance-none"
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

        {/* Show Cause Notices Table */}
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          <h2 className="text-2xl font-semibold text-gray-800 p-6 border-b border-gray-200">
            All Show Cause Notices
          </h2>
          {/* Added overflow-x-auto back for small screen responsiveness, but table-fixed-layout should reduce its need */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 table-fixed-layout"> {/* Added table-fixed-layout */}
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Employee Name
                  </th>
                  <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date Issued
                  </th>
                  <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Reason
                  </th>
                  {/* Adjusted width for Details column to give it more space */}
                  <th scope="col" className="w-2/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Details
                  </th>
                  <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Issued By
                  </th>
                  <th scope="col" className="w-1/6 px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Due Date for Response
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredShowCauseNotices.length > 0 ? (
                  filteredShowCauseNotices.map((notice) => (
                    <tr key={notice.id} className="hover:bg-gray-50 transition duration-150 ease-in-out">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">
                        {notice.employeeName}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(notice.dateIssued).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {notice.reason}
                      </td>
                      {/* Details cell will now wrap text due to table-fixed-layout and word-wrap */}
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {notice.details}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {notice.issuedBy}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">
                        {new Date(notice.dueDateForResponse).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="px-6 py-4 text-center text-sm text-gray-500">
                      No show cause notices found matching your criteria.
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

export default ShowCause;
