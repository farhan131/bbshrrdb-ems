import React from 'react';

const colorMap = {
  green: 'bg-green-100 text-green-800',
  red: 'bg-red-100 text-red-800',
  blue: 'bg-blue-100 text-blue-800',
  purple: 'bg-purple-100 text-purple-800',
  yellow: 'bg-yellow-100 text-yellow-800',
};

const MetricsCard = ({ title, value, color = 'blue', customContent = null }) => {
  return (
    <div className={`rounded-xl shadow p-5 bg-white border-l-4 ${colorMap[color] || colorMap.blue}`}>
      <h4 className="text-md font-semibold text-gray-700 mb-2">{title}</h4>
      {customContent ? (
        customContent
      ) : (
        <p className="text-2xl font-bold">{value}</p>
      )}
    </div>
  );
};

export default MetricsCard;
