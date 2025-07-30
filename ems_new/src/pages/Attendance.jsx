import React, { useState, useEffect, useMemo } from 'react';
import { BarChart, Bar, PieChart, Pie, XAxis, YAxis, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';

// Main Attendance component for the Employee Attendance Dashboard
const Attendance = () => {
  // State to hold the employee's attendance data
  const [attendanceData, setAttendanceData] = useState([]);

  // State to hold the employee's leave balances
  // eslint-disable-next-line no-unused-vars
  const [leaveBalances, setLeaveBalances] = useState({
    annual: 20,
    sick: 10,
    casual: 5,
  });
  // State for the search term entered by the user
  const [searchTerm, setSearchTerm] = useState('');
  // State for the data displayed in the table after filtering
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  // State for the selected filter status (e.g., 'All', 'Present', 'Absent')
  const [filterStatus, setFilterStatus] = useState('All');

  // State for selected month and year for filtering the table
  // Wrap 'today' initialization in useMemo to prevent unnecessary re-renders
  const today = useMemo(() => new Date(), []);
  const [selectedMonth, setSelectedMonth] = useState(today.getMonth() + 1); // Month is 0-indexed
  const [selectedYear, setSelectedYear] = useState(today.getFullYear());

  // Dummy data generation for demonstration purposes
  useEffect(() => {
    const generateDummyData = () => {
      const data = [];
      // eslint-disable-next-line no-unused-vars
      const currentYear = today.getFullYear(); // Suppress 'currentYear' unused variable warning
      // Generate records for the last 12 months for better chart representation
      for (let i = 0; i < 365; i++) { // Generate data for roughly a year
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

        let status, clockIn, clockOut, duration, notes;

        // Simulate weekends
        if (date.getDay() === 0 || date.getDay() === 6) { // Sunday or Saturday
          status = 'Weekend';
          clockIn = '-';
          clockOut = '-';
          duration = '-';
          notes = '';
        } else {
          // Simulate absences and late arrivals
          const randomAbsence = Math.random();
          if (randomAbsence < 0.05) { // 5% chance of Sick Leave
            status = 'Absent';
            clockIn = '-';
            clockOut = '-';
            duration = '-';
            notes = 'Sick Leave';
          } else if (randomAbsence < 0.10) { // 5% chance of Annual Leave
            status = 'On Leave';
            clockIn = '-';
            clockOut = '-';
            duration = '-';
            notes = 'Annual Leave';
          } else if (randomAbsence < 0.12) { // 2% chance of Casual Leave
            status = 'On Leave';
            clockIn = '-';
            clockOut = '-';
            duration = '-';
            notes = 'Casual Leave';
          } else if (randomAbsence < 0.15) { // 3% chance of Late arrival
            status = 'Late';
            clockIn = '09:15 AM';
            clockOut = '05:00 PM';
            duration = '7h 45m';
            notes = 'Traffic delay';
          } else { // Regular present days
            status = 'Present';
            // Set fixed clock-in and clock-out times as requested
            clockIn = '08:07 AM';
            clockOut = '05:01 PM'; // 17:01 PM is 05:01 PM

            // Calculate duration for present days based on fixed times
            const inTime = new Date(`2000/01/01 ${clockIn}`);
            const outTime = new Date(`2000/01/01 ${clockOut}`);
            const diffMs = outTime - inTime;
            const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
            const diffMins = Math.round((diffMs % (1000 * 60 * 60)) / (1000 * 60));
            duration = `${diffHrs}h ${diffMins}m`;
            notes = '';
          }
        }

        data.push({
          date: dateString,
          day: dayOfWeek,
          status,
          clockIn,
          clockOut,
          duration,
          notes,
        });
      }
      setAttendanceData(data);
    };

    generateDummyData();
  }, [today]); // 'today' is now a stable reference due to useMemo

  // Effect to filter attendance data whenever searchTerm, filterStatus, selectedMonth, or selectedYear changes
  useEffect(() => {
    let currentFilteredData = attendanceData;

    // Apply month and year filter first
    currentFilteredData = currentFilteredData.filter(record => {
      const recordDate = new Date(record.date);
      return recordDate.getMonth() + 1 === parseInt(selectedMonth) &&
             recordDate.getFullYear() === parseInt(selectedYear);
    });

    // Apply status filter
    if (filterStatus !== 'All') {
      currentFilteredData = currentFilteredData.filter(record => record.status === filterStatus);
    }

    // Apply search term filter
    if (searchTerm) {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      currentFilteredData = currentFilteredData.filter(record =>
        record.date.toLowerCase().includes(lowerCaseSearchTerm) ||
        record.day.toLowerCase().includes(lowerCaseSearchTerm) ||
        record.status.toLowerCase().includes(lowerCaseSearchTerm) ||
        record.notes.toLowerCase().includes(lowerCaseSearchTerm)
      );
    }

    setFilteredAttendance(currentFilteredData);
  }, [searchTerm, filterStatus, selectedMonth, selectedYear, attendanceData]);

  // Calculate total present and absent days from attendance data (for overall metrics, not filtered)
  const totalPresent = attendanceData.filter(record => record.status === 'Present').length;
  const totalAbsent = attendanceData.filter(record => record.status === 'Absent').length;
  const totalOnLeave = attendanceData.filter(record => record.status === 'On Leave').length;

  // Prepare data for Monthly Attendance Overview Chart (using all attendanceData for overall trend)
  const monthlyChartData = useMemo(() => {
    const monthlyData = attendanceData.reduce((acc, record) => {
      const month = new Date(record.date).toLocaleString('en-US', { month: 'short', year: '2-digit' });
      if (!acc[month]) {
        acc[month] = { name: month, Present: 0, Absent: 0, 'On Leave': 0 };
      }
      if (record.status === 'Present') {
        acc[month].Present += 1;
      } else if (record.status === 'Absent') {
        acc[month].Absent += 1;
      } else if (record.status === 'On Leave') {
        acc[month]['On Leave'] += 1;
      }
      return acc;
    }, {});
    // Sort by month (e.g., Jul 24, Aug 24)
    return Object.values(monthlyData).sort((a, b) => {
      const dateA = new Date(`01 ${a.name}`);
      const dateB = new Date(`01 ${b.name}`);
      return dateA - dateB;
    });
  }, [attendanceData]);

  // Prepare data for Leave Type Distribution Chart (using all attendanceData for overall trend)
  const leaveDistributionData = useMemo(() => {
    const leaveTypeCounts = attendanceData.reduce((acc, record) => {
      if (record.status === 'Absent' || record.status === 'On Leave') {
        const leaveType = record.notes;
        if (leaveType) {
          acc[leaveType] = (acc[leaveType] || 0) + 1;
        }
      }
      return acc;
    }, {});
    return Object.keys(leaveTypeCounts).map(key => ({
      name: key,
      value: leaveTypeCounts[key],
    }));
  }, [attendanceData]);

  // Colors for the pie chart segments
  const PIE_COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7300', '#00C49F', '#FFBB28'];

  // Options for month and year dropdowns
  const monthOptions = Array.from({ length: 12 }, (_, i) => ({
    value: i + 1,
    label: new Date(0, i).toLocaleString('en-US', { month: 'long' }),
  }));

  const yearOptions = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = currentYear - 2; i <= currentYear + 1; i++) { // Show current year, 2 past, 1 future
      years.push(i);
    }
    return years;
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 font-inter">
      {/* Dashboard Header */}
      <header className="bg-white shadow-lg rounded-xl p-6 mb-8 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Employee Attendance Dashboard</h1>
        <p className="text-lg text-gray-600">Welcome, <span className="font-semibold text-blue-600">John Doe</span>!</p>
        <p className="text-sm text-gray-500 mt-1">Your attendance and leave summary at a glance.</p>
      </header>

      {/* Key Metrics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-3 gap-6 mb-8 max-w-5xl mx-auto">
        {/* Total Days Present */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-l-4 border-green-500 hover:scale-105 transition">
          <p className="text-sm text-gray-500">Total Days Present</p>
          <p className="text-4xl font-extrabold text-green-600 mt-2">{totalPresent}</p>
        </div>

        {/* Total Days Absent */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-l-4 border-red-500 hover:scale-105 transition">
          <p className="text-sm text-gray-500">Total Days Absent</p>
          <p className="text-4xl font-extrabold text-red-600 mt-2">{totalAbsent + totalOnLeave}</p>
        </div>

        {/* Annual Leave */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-l-4 border-blue-500 hover:scale-105 transition">
          <p className="text-sm text-gray-500">Annual Leave Remaining</p>
          <p className="text-4xl font-extrabold text-blue-600 mt-2">{leaveBalances.annual} days</p>
        </div>

        {/* Sick Leave */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-l-4 border-yellow-500 hover:scale-105 transition">
          <p className="text-sm text-gray-500">Sick Leave Remaining</p>
          <p className="text-4xl font-extrabold text-yellow-600 mt-2">{leaveBalances.sick} days</p>
        </div>

        {/* Casual Leave */}
        <div className="bg-white rounded-xl shadow-md p-6 text-center border-l-4 border-purple-500 hover:scale-105 transition">
          <p className="text-sm text-gray-500">Casual Leave Remaining</p>
          <p className="text-4xl font-extrabold text-purple-600 mt-2">{leaveBalances.casual} days</p>
        </div>

        {/* Leave Balances Summary */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-indigo-500 hover:scale-105 transition">
          <p className="text-sm font-medium text-gray-500 mb-3 text-center">Total Leave Balances</p>
          <ul className="text-gray-700 text-left space-y-1 text-base">
            <li className="flex justify-between">
              <span>Annual:</span>
              <span className="font-bold">{leaveBalances.annual} days</span>
            </li>
            <li className="flex justify-between">
              <span>Sick:</span>
              <span className="font-bold">{leaveBalances.sick} days</span>
            </li>
            <li className="flex justify-between">
              <span>Casual:</span>
              <span className="font-bold">{leaveBalances.casual} days</span>
            </li>
          </ul>
        </div>
      </section>


      {/* Graphs Section */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8 max-w-4xl mx-auto">
        {/* Monthly Attendance Overview Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Monthly Attendance Overview</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyChartData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="Present" stackId="a" fill="#4CAF50" name="Present" radius={[10, 10, 0, 0]} />
              <Bar dataKey="Absent" stackId="a" fill="#F44336" name="Absent" radius={[10, 10, 0, 0]} />
              <Bar dataKey="On Leave" stackId="a" fill="#FFC107" name="On Leave" radius={[10, 10, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Leave Type Distribution Chart */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Leave Type Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={leaveDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {
                  leaveDistributionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />
                  ))
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </section>

      {/* Attendance Records Section */}
      <section className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Attendance Records</h2>

        {/* Search and Filter Bar with Month/Year Selectors */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          {/* Search Input */}
          <input
            type="text"
            placeholder="Search by date, status, or notes..."
            className="flex-grow p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* Month Filter Dropdown */}
          <select
            className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {monthOptions.map(month => (
              <option key={month.value} value={month.value}>{month.label}</option>
            ))}
          </select>
          {/* Year Filter Dropdown */}
          <select
            className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
          >
            {yearOptions.map(year => (
              <option key={year} value={year}>{year}</option>
            ))}
          </select>
          {/* Status Filter Dropdown */}
          <select
            className="p-3 border border-gray-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 shadow-sm"
            value={filterStatus}
            onChange={(e) => setFilterStatus(e.target.value)}
          >
            <option value="All">All Statuses</option>
            <option value="Present">Present</option>
            <option value="Absent">Absent</option>
            <option value="On Leave">On Leave</option>
            <option value="Late">Late</option>
            <option value="Weekend">Weekend</option>
          </select>
        </div>

        {/* Attendance Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200 shadow-md">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Day</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock In</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Clock Out</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Duration</th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Notes/Reason</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredAttendance.length > 0 ? (
                filteredAttendance.map((record, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition-colors duration-150">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{record.date}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.day}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full
                        ${record.status === 'Present' ? 'bg-green-100 text-green-800' : ''}
                        ${record.status === 'Absent' ? 'bg-red-100 text-red-800' : ''}
                        ${record.status === 'On Leave' ? 'bg-yellow-100 text-yellow-800' : ''}
                        ${record.status === 'Late' ? 'bg-orange-100 text-orange-800' : ''}
                        ${record.status === 'Weekend' ? 'bg-gray-100 text-gray-600' : ''}
                      `}>
                        {record.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.clockIn}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.clockOut}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.duration}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700">{record.notes || '-'}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                    No attendance records found for the selected month/year or search/filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>

      {/* Footer or additional information */}
      <footer className="text-center text-gray-500 text-sm mt-8 pb-4">
        <p>&copy; 2025 Employee Management System. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default Attendance;
