import React from 'react';

const StatCard = ({ title, value, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-cyan-400 border-black',
    green: 'bg-lime-400 border-black',
    yellow: 'bg-yellow-400 border-black',
    red: 'bg-red-400 border-black',
    blue: 'bg-blue-400 border-black',
  };

  const bgClasses = {
    primary: 'bg-cyan-200',
    green: 'bg-lime-200',
    yellow: 'bg-yellow-200',
    red: 'bg-red-200',
    blue: 'bg-blue-200',
  };

  return (
    <div className={`${bgClasses[color]} border-4 border-black shadow-neo-lg p-6 hover:translate-x-2 hover:translate-y-2 hover:shadow-neo transition-all`}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold text-gray-900 uppercase tracking-wide">{title}</p>
          <p className="text-4xl font-black text-gray-900 mt-2">{value}</p>
        </div>
        {Icon && (
          <div className={`p-4 border-4 ${colorClasses[color]} shadow-neo`}>
            <Icon className="h-10 w-10 stroke-[3]" />
          </div>
        )}
      </div>
    </div>
  );
};

export default StatCard;
