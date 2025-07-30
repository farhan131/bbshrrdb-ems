import React, { useState, useEffect } from 'react';
import Header from './Header';
import MetricsCard from './MetricsCard';
import AttendanceCharts from './AttendanceCharts';
import AttendanceTable from './AttendanceTable';
import SearchFilterBar from './SearchFilterBar';



const EmployeeLeave = () => {
  const [attendanceData, setAttendanceData] = useState([]);
const [leaveBalances] = useState({ annual: 20, sick: 10, casual: 5 });
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [filteredAttendance, setFilteredAttendance] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const generateDummyData = () => {
      const data = [];
      const today = new Date();
      for (let i = 0; i < 90; i++) {
        const date = new Date(today);
        date.setDate(today.getDate() - i);
        const dateString = date.toISOString().split('T')[0];
        const dayOfWeek = date.toLocaleString('en-US', { weekday: 'long' });

        let status = 'Present', clockIn = '-', clockOut = '-', duration = '-', notes = '';

        if (date.getDay() === 0 || date.getDay() === 6) {
          status = 'Weekend';
        } else {
          const r = Math.random();
          if (r < 0.05) { status = 'Absent'; notes = 'Sick Leave'; }
          else if (r < 0.10) { status = 'On Leave'; notes = 'Annual Leave'; }
          else if (r < 0.12) { status = 'On Leave'; notes = 'Casual Leave'; }
          else if (r < 0.15) {
            status = 'Late'; clockIn = '09:15 AM'; clockOut = '05:00 PM'; duration = '7h 45m'; notes = 'Traffic delay';
          } else {
            const inHr = 8 + Math.floor(Math.random() * 2);
            const inMin = Math.floor(Math.random() * 10);
            const outHr = 17 + Math.floor(Math.random() * 2);
            const outMin = Math.floor(Math.random() * 10);

            clockIn = `${String(inHr).padStart(2, '0')}:${String(inMin).padStart(2, '0')} AM`;
            clockOut = `${String(outHr).padStart(2, '0')}:${String(outMin).padStart(2, '0')} PM`;

            const inTime = new Date(`2000-01-01T${inHr}:${inMin}:00`);
            const outTime = new Date(`2000-01-01T${outHr}:${outMin}:00`);
            const diff = outTime - inTime;
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const mins = Math.round((diff % (1000 * 60 * 60)) / (1000 * 60));
            duration = `${hours}h ${mins}m`;
          }
        }

        data.push({ date: dateString, day: dayOfWeek, status, clockIn, clockOut, duration, notes });
      }

      setAttendanceData(data);
      setFilteredAttendance(data);
      setTimeout(() => setLoading(false), 1000); // simulate loader
    };

    generateDummyData();
  }, []);

  useEffect(() => {
    let filtered = attendanceData;
    if (filterStatus !== 'All') filtered = filtered.filter(r => r.status === filterStatus);
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = filtered.filter(r =>
        r.date.includes(term) ||
        r.day.toLowerCase().includes(term) ||
        r.status.toLowerCase().includes(term) ||
        r.notes?.toLowerCase().includes(term)
      );
    }
    setFilteredAttendance(filtered);
  }, [searchTerm, filterStatus, attendanceData]);

  const summary = {
    present: attendanceData.filter(r => r.status === 'Present').length,
    absent: attendanceData.filter(r => r.status === 'Absent').length,
    leave: attendanceData.filter(r => r.status === 'On Leave').length,
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6 font-sans">
      <Header name="John Doe" />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-8">
        <MetricsCard title="Total Present" value={summary.present} color="green" />
        <MetricsCard title="Total Absent + Leave" value={summary.absent + summary.leave} color="red" />
        <MetricsCard
          title="Leave Balances"
          customContent={
            <ul className="text-sm text-left mt-2 space-y-1">
              {Object.entries(leaveBalances).map(([type, val]) => (
                <li key={type} className="flex justify-between">
                  <span className="capitalize">{type}:</span>
                  <span className="font-semibold">{val} days</span>
                </li>
              ))}
            </ul>
          }
          color="purple"
        />
      </div>

      <AttendanceCharts data={attendanceData} />

      <div className="mt-10 bg-white rounded-xl shadow p-6">
        <SearchFilterBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          filterStatus={filterStatus}
          setFilterStatus={setFilterStatus}
        />
        <AttendanceTable data={filteredAttendance} loading={loading} />
      </div>

      <footer className="text-center mt-10 text-sm text-gray-500">
        &copy; 2025 Employee Management System. All rights reserved.
      </footer>
    </div>
  );
};

export default EmployeeLeave;
