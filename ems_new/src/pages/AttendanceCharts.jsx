import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from 'recharts';

const COLORS = ['#4ade80', '#f87171', '#facc15']; // green, red, yellow

const AttendanceCharts = ({ data }) => {
  // Summarize attendance by status
  const summary = {
    Present: 0,
    Absent: 0,
    'On Leave': 0,
  };

  data.forEach((entry) => {
    if (summary[entry.status] !== undefined) {
      summary[entry.status]++;
    }
  });

  const pieData = Object.entries(summary).map(([name, value]) => ({
    name,
    value,
  }));

  const dailyData = data.slice(0, 30).reverse(); // last 30 days

  return (
    <div className="bg-white rounded-xl shadow p-6 mt-10 grid grid-cols-1 lg:grid-cols-2 gap-10">
      <div>
        <h3 className="text-lg font-semibold mb-4">Attendance Last 30 Days</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={dailyData}>
            <XAxis dataKey="date" tick={{ fontSize: 10 }} />
            <YAxis />
            <Tooltip />
            <Bar dataKey="status" fill="#3b82f6" isAnimationActive={false}>
              {
                dailyData.map((entry, index) => {
                  let fill = '#3b82f6';
                  if (entry.status === 'Absent') fill = '#f87171';
                  else if (entry.status === 'On Leave') fill = '#facc15';
                  else if (entry.status === 'Present') fill = '#4ade80';
                  return <Cell key={`cell-${index}`} fill={fill} />;
                })
              }
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Overall Attendance Summary</h3>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              outerRadius={100}
              label
            >
              {pieData.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Legend />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AttendanceCharts;
