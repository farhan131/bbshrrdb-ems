import React, { useEffect, useState } from 'react';
import Header from './Header';
import AttendanceTable from './AttendanceTable';
import SearchFilterBar from './SearchFilterBar';

const Dashboard = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen flex">
      <div className="flex-1 flex flex-col">
        <Header time={time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })} />

        <main className="p-6 flex-1 overflow-y-auto">
          {/* Stats */}
          <section aria-labelledby="stats-heading" className="mb-6">
            <h3 id="stats-heading" className="text-lg font-semibold mb-4">Your Stats</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              {[
                { label: 'Days Worked', value: 125, color: 'text-blue-600', description: 'This Year' },
                { label: 'Leave Balance', value: 15, color: 'text-green-600', description: 'Days Remaining' },
                { label: 'Pending Tasks', value: 8, color: 'text-yellow-600', description: 'Due This Week' },
                { label: 'Team Members', value: 12, color: 'text-purple-600', description: 'In Your Department' },
              ].map((stat) => (
                <div className="bg-white p-6 rounded-lg shadow" key={stat.label}>
                  <h4 className="text-sm text-gray-500">{stat.label}</h4>
                  <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
                  <p className="text-sm text-gray-500">{stat.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Tasks + Announcements */}
          <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="col-span-1 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Upcoming Tasks</h3>
              <ul className="space-y-4">
                {[
                  { task: 'Project Review', due: 'June 07, 2025', status: 'Pending', color: 'text-yellow-500' },
                  { task: 'Team Meeting', due: 'June 08, 2025', status: 'Scheduled', color: 'text-green-500' },
                  { task: 'Report Submission', due: 'June 10, 2025', status: 'Overdue', color: 'text-red-500' },
                ].map((item) => (
                  <li className="flex justify-between items-center" key={item.task}>
                    <div>
                      <p className="font-medium">{item.task}</p>
                      <p className="text-sm text-gray-500">Due: {item.due}</p>
                    </div>
                    <span className={`${item.color} text-sm`}>{item.status}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="col-span-1 md:col-span-2 bg-white p-6 rounded-lg shadow">
              <h3 className="text-lg font-semibold mb-4">Recent Announcements</h3>
              <ul className="space-y-4">
                <li>
                  <p className="font-semibold">Office Closed on July 4th</p>
                  <p className="text-sm text-gray-600">Office will be closed due to Independence Day holiday.</p>
                </li>
                <li>
                  <p className="font-semibold">New Health Benefits Plan</p>
                  <p className="text-sm text-gray-600">Check your email for upcoming health benefits plan.</p>
                </li>
                <li>
                  <p className="font-semibold">Quarterly Town Hall Meeting</p>
                  <p className="text-sm text-gray-600">Scheduled on June 20th at 10 AM in main conference room.</p>
                </li>
              </ul>
            </div>
          </section>

          {/* Users Table */}
          <section className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Users</h3>
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4">1</td>
                  <td className="px-6 py-4">John Doe</td>
                  <td className="px-6 py-4">john@example.com</td>
                  <td className="px-6 py-4">Manager</td>
                </tr>
              </tbody>
            </table>
          </section>

          {/* Attendance */}
          <section className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Attendance</h3>
            <SearchFilterBar />
            <div className="mt-4">
              <AttendanceTable />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
