import React, { useEffect, useState } from 'react';
import Header from './Header';
import AttendanceTable from './AttendanceTable';
import SearchFilterBar from './SearchFilterBar';
import axios from '../utils/api'; // assumes you have a preconfigured Axios instance

const Dashboard = () => {
  const [time, setTime] = useState(new Date());
  const [stats, setStats] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [announcements, setAnnouncements] = useState([]);
  const [users, setUsers] = useState([]);
  const [attendance, setAttendance] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsRes, tasksRes, annRes, usersRes, attendanceRes] = await Promise.all([
          axios.get('/dashboard/stats'),
          axios.get('/dashboard/tasks'),
          axios.get('/dashboard/announcements'),
          axios.get('/dashboard/users'),
          axios.get('/dashboard/attendance'),
        ]);

        setStats(statsRes.data);
        setTasks(tasksRes.data);
        setAnnouncements(annRes.data);
        setUsers(usersRes.data);
        setAttendance(attendanceRes.data);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      }
    };

    fetchDashboardData();
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
              {stats.map((stat) => (
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
                {tasks.map((item) => (
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
                {announcements.map((item, idx) => (
                  <li key={idx}>
                    <p className="font-semibold">{item.title}</p>
                    <p className="text-sm text-gray-600">{item.description}</p>
                  </li>
                ))}
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
                {users.map((user) => (
                  <tr key={user.id}>
                    <td className="px-6 py-4">{user.id}</td>
                    <td className="px-6 py-4">{user.name}</td>
                    <td className="px-6 py-4">{user.email}</td>
                    <td className="px-6 py-4">{user.role}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {/* Attendance */}
          <section className="mt-8 bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold mb-4">Attendance</h3>
            <SearchFilterBar />
            <div className="mt-4">
              <AttendanceTable records={attendance} />
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
