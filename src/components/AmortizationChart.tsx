
import React, { useMemo } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, 
  Tooltip, ResponsiveContainer, Legend, Area, AreaChart, 
  ComposedChart, Bar
} from 'recharts';

interface AmortizationChartProps {
  principal: number;
  interestRate: number;
  tenure: number;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const AmortizationChart: React.FC<AmortizationChartProps> = ({ principal, interestRate, tenure }) => {
  const amortizationData = useMemo(() => {
    const monthlyRate = interestRate / 100 / 12;
    const emi = principal * monthlyRate * Math.pow(1 + monthlyRate, tenure) / 
                (Math.pow(1 + monthlyRate, tenure) - 1);
    
    let remainingPrincipal = principal;
    const data = [];
    
    // Create data points for every year (or partial year at the end)
    const yearIntervals = Math.ceil(tenure / 12);
    const interval = Math.ceil(tenure / yearIntervals);
    
    for (let i = 0; i <= tenure; i += interval) {
      if (i === 0) {
        data.push({
          month: i,
          remainingPrincipal: principal,
          principalPaid: 0,
          interestPaid: 0,
        });
        continue;
      }
      
      let principalPaid = 0;
      let interestPaid = 0;
      
      // Calculate for each month in this interval
      for (let j = i - interval + 1; j <= i && j <= tenure; j++) {
        const interest = remainingPrincipal * monthlyRate;
        const principalForMonth = emi - interest;
        
        principalPaid += principalForMonth;
        interestPaid += interest;
        remainingPrincipal -= principalForMonth;
      }
      
      // Make sure we don't show negative values due to floating point errors
      remainingPrincipal = Math.max(0, remainingPrincipal);
      
      data.push({
        month: Math.min(i, tenure),
        remainingPrincipal: remainingPrincipal,
        principalPaid,
        interestPaid,
      });
    }
    
    return data;
  }, [principal, interestRate, tenure]);

  const formatXAxis = (value: number) => {
    if (tenure > 60) {
      return `Year ${Math.floor(value/12)}`;
    }
    return `Month ${value}`;
  };

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white p-4 border border-gray-200 shadow-lg rounded-lg">
          <p className="font-medium text-gray-900">{tenure > 60 ? `Year ${Math.floor(label/12)}` : `Month ${label}`}</p>
          <p className="text-sm text-primary font-medium">
            Remaining Principal: {formatCurrency(payload[0].value)}
          </p>
          {payload[1] && (
            <p className="text-sm text-secondary font-medium">
              Principal Paid: {formatCurrency(payload[1].value)}
            </p>
          )}
          {payload[2] && (
            <p className="text-sm text-accent font-medium">
              Interest Paid: {formatCurrency(payload[2].value)}
            </p>
          )}
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-[400px]">
      <h3 className="text-lg font-semibold mb-6">Loan Amortization Schedule</h3>
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart 
          data={amortizationData}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
          <XAxis 
            dataKey="month" 
            tickFormatter={formatXAxis} 
            minTickGap={20}
            tick={{ fontSize: 12 }}
          />
          <YAxis 
            tickFormatter={(value) => {
              if (value >= 10000000) return `₹${(value/10000000).toFixed(1)}Cr`;
              if (value >= 100000) return `₹${(value/100000).toFixed(1)}L`;
              if (value >= 1000) return `₹${(value/1000).toFixed(1)}K`;
              return `₹${value}`;
            }}
            tick={{ fontSize: 12 }}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend />
          <Area
            type="monotone"
            dataKey="remainingPrincipal"
            name="Remaining Principal"
            stroke="#245e4f"
            fill="#245e4f"
            fillOpacity={0.1}
            activeDot={{ r: 8 }}
            stackId={1}
          />
          <Bar 
            dataKey="principalPaid" 
            name="Principal Paid" 
            fill="#7ac9a7" 
            barSize={20}
            stackId={2}
          />
          <Bar 
            dataKey="interestPaid" 
            name="Interest Paid" 
            fill="#e9c46a" 
            barSize={20}
            stackId={2}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AmortizationChart;
