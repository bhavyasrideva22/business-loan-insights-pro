
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

interface EMIBreakdownChartProps {
  principal: number;
  totalInterest: number;
}

const COLORS = ['#245e4f', '#e9c46a'];

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const EMIBreakdownChart: React.FC<EMIBreakdownChartProps> = ({ principal, totalInterest }) => {
  const data = [
    { name: 'Principal', value: principal },
    { name: 'Interest', value: totalInterest },
  ];

  const totalAmount = principal + totalInterest;
  const principalPercentage = ((principal / totalAmount) * 100).toFixed(1);
  const interestPercentage = ((totalInterest / totalAmount) * 100).toFixed(1);

  // Custom tooltip content
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900">{payload[0].name}</p>
          <p className="text-lg font-semibold text-primary">{formatCurrency(payload[0].value)}</p>
          <p className="text-sm text-gray-600">
            {(payload[0].name === 'Principal' ? principalPercentage : interestPercentage)}% of total
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
      <div className="flex flex-col md:flex-row md:items-center justify-between mb-6">
        <h3 className="text-lg font-semibold">Payment Breakdown</h3>
        <div className="flex items-center mt-2 md:mt-0">
          <div className="flex items-center mr-4">
            <div className="w-3 h-3 rounded-full bg-[#245e4f] mr-2"></div>
            <span className="text-sm">Principal ({principalPercentage}%)</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 rounded-full bg-[#e9c46a] mr-2"></div>
            <span className="text-sm">Interest ({interestPercentage}%)</span>
          </div>
        </div>
      </div>
      
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={130}
            fill="#8884d8"
            dataKey="value"
            animationDuration={1000}
            animationBegin={200}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      
      <div className="grid grid-cols-2 gap-4 mt-4">
        <div className="text-center p-3 bg-primary/5 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
          <p className="text-xl font-semibold text-primary">{formatCurrency(principal)}</p>
        </div>
        <div className="text-center p-3 bg-accent/10 rounded-lg">
          <p className="text-sm text-gray-600 mb-1">Total Interest</p>
          <p className="text-xl font-semibold text-accent-foreground">{formatCurrency(totalInterest)}</p>
        </div>
      </div>
    </div>
  );
};

export default EMIBreakdownChart;
