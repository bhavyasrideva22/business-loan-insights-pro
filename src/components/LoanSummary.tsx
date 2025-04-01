
import React from 'react';

interface LoanSummaryProps {
  result: {
    emi: number;
    totalInterest: number;
    totalAmount: number;
    principal: number;
    tenure: number;
    interestRate: number;
  };
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

const LoanSummary: React.FC<LoanSummaryProps> = ({ result }) => {
  return (
    <div className="bg-gradient-subtle rounded-lg p-5 text-white">
      <h3 className="text-lg font-semibold mb-4">Loan Summary</h3>
      
      <div className="space-y-3">
        <div>
          <p className="text-sm opacity-80">Monthly EMI</p>
          <p className="text-2xl font-bold">{formatCurrency(result.emi)}</p>
        </div>
        
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div>
            <p className="text-sm opacity-80">Principal</p>
            <p className="text-base font-medium">{formatCurrency(result.principal)}</p>
          </div>
          
          <div>
            <p className="text-sm opacity-80">Total Interest</p>
            <p className="text-base font-medium">{formatCurrency(result.totalInterest)}</p>
          </div>
          
          <div>
            <p className="text-sm opacity-80">Total Amount</p>
            <p className="text-base font-medium">{formatCurrency(result.totalAmount)}</p>
          </div>
          
          <div>
            <p className="text-sm opacity-80">Tenure</p>
            <p className="text-base font-medium">{result.tenure} months</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoanSummary;
