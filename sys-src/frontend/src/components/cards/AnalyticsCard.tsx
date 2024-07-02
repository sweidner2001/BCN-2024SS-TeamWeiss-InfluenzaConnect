import React from 'react';

interface AnalyticsCardProps {
  title: string;
  value: any;
}

const AnalyticsCard: React.FC<AnalyticsCardProps> = ({ title, value }) => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg flex flex-col justify-between">
      <h2 className="text-xl font-bold mb-4">{title}</h2>
      <p className="text-2xl">{value}</p>
    </div>
  );
};

export default AnalyticsCard;
