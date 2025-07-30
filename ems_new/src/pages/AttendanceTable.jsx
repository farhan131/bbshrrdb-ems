import React from 'react';

const AttendanceTable = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow mt-8">
      <h3 className="text-lg font-semibold mb-4">Attendance Records</h3>
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          <tr>
            <td className="px-6 py-4">2025-06-01</td>
            <td className="px-6 py-4 text-green-600">Present</td>
          </tr>
          <tr>
            <td className="px-6 py-4">2025-06-02</td>
            <td className="px-6 py-4 text-red-600">Absent</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default AttendanceTable;
