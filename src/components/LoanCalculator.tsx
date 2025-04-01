
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { IndianRupee, ArrowRight, Download, Mail, Info, Calculator } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import LoanSummary from './LoanSummary';
import AmortizationChart from './AmortizationChart';
import EMIBreakdownChart from './EMIBreakdownChart';
import { generatePDF } from '@/utils/pdfGenerator';
import EmailModal from './EmailModal';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(value);
};

interface CalculatorResult {
  emi: number;
  totalInterest: number;
  totalAmount: number;
  principal: number;
  tenure: number;
  interestRate: number;
}

const LoanCalculator = () => {
  const [principalAmount, setPrincipalAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(12);
  const [loanTenure, setLoanTenure] = useState(60); // months
  const [loanType, setLoanType] = useState('business');
  const [isProcessing, setIsProcessing] = useState(false);
  const [showEmailModal, setShowEmailModal] = useState(false);
  const [result, setResult] = useState<CalculatorResult>({
    emi: 0,
    totalInterest: 0,
    totalAmount: 0,
    principal: principalAmount,
    tenure: loanTenure,
    interestRate: interestRate
  });

  const { toast } = useToast();

  useEffect(() => {
    calculateLoan();
  }, [principalAmount, interestRate, loanTenure]);

  const calculateLoan = () => {
    // Monthly interest rate
    const monthlyRate = interestRate / 100 / 12;
    
    // Calculate EMI
    const emi = principalAmount * monthlyRate * Math.pow(1 + monthlyRate, loanTenure) / 
                (Math.pow(1 + monthlyRate, loanTenure) - 1);
    
    // Calculate total payment
    const totalAmount = emi * loanTenure;
    
    // Calculate total interest
    const totalInterest = totalAmount - principalAmount;
    
    setResult({
      emi,
      totalInterest,
      totalAmount,
      principal: principalAmount,
      tenure: loanTenure,
      interestRate
    });
  };

  const handlePrincipalChange = (value: number) => {
    setPrincipalAmount(value);
  };

  const handleInterestRateChange = (value: number) => {
    setInterestRate(value);
  };

  const handleTenureChange = (value: number) => {
    setLoanTenure(value);
  };

  const handlePrincipalInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value.replace(/[^0-9]/g, ''));
    if (!isNaN(value)) {
      setPrincipalAmount(Math.min(10000000, Math.max(10000, value)));
    }
  };

  const handleInterestInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setInterestRate(Math.min(30, Math.max(1, value)));
    }
  };

  const handleTenureInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (!isNaN(value)) {
      setLoanTenure(Math.min(360, Math.max(3, value)));
    }
  };

  const handleDownload = async () => {
    setIsProcessing(true);
    try {
      await generatePDF(result);
      toast({
        title: "Success!",
        description: "Your PDF has been downloaded.",
        variant: "default",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate PDF. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleEmailOpen = () => {
    setShowEmailModal(true);
  };

  return (
    <div className="calc-container">
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">Business Loan EMI Calculator</h1>
        <p className="text-lg text-gray-600 max-w-3xl mx-auto">
          Plan your business finances with precision. Calculate monthly EMIs, interest costs, and visualize your loan repayment journey.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <Card className="lg:col-span-5 card-shadow animate-fade-in">
          <CardContent className="p-6">
            <Tabs defaultValue={loanType} onValueChange={(value) => setLoanType(value)}>
              <TabsList className="grid grid-cols-1 mb-6 bg-cream">
                <TabsTrigger value="business" className="text-lg">
                  <Calculator className="w-4 h-4 mr-2" />
                  Business Loan
                </TabsTrigger>
              </TabsList>

              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="loan-amount" className="text-base font-medium">Loan Amount</Label>
                    <div className="flex items-center bg-primary/5 px-3 py-1 rounded-full">
                      <IndianRupee className="w-4 h-4 text-primary mr-1" />
                      <Input 
                        id="loan-amount-input"
                        type="text" 
                        value={principalAmount.toLocaleString('en-IN')}
                        onChange={handlePrincipalInput}
                        className="w-24 border-none bg-transparent p-0 focus:outline-none focus:ring-0 text-right"
                      />
                    </div>
                  </div>
                  <Slider
                    id="loan-amount"
                    min={10000}
                    max={10000000}
                    step={10000}
                    value={[principalAmount]}
                    onValueChange={(values) => handlePrincipalChange(values[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>₹10K</span>
                    <span>₹1Cr</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="interest-rate" className="text-base font-medium">Interest Rate (% p.a)</Label>
                    <div className="flex items-center bg-primary/5 px-3 py-1 rounded-full">
                      <Input 
                        id="interest-rate-input"
                        type="number" 
                        value={interestRate}
                        onChange={handleInterestInput}
                        className="w-16 border-none bg-transparent p-0 focus:outline-none focus:ring-0 text-right"
                      />
                      <span className="ml-1">%</span>
                    </div>
                  </div>
                  <Slider
                    id="interest-rate"
                    min={1}
                    max={30}
                    step={0.1}
                    value={[interestRate]}
                    onValueChange={(values) => handleInterestRateChange(values[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>1%</span>
                    <span>30%</span>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center justify-between mb-1">
                    <Label htmlFor="loan-tenure" className="text-base font-medium">Loan Tenure (months)</Label>
                    <div className="flex items-center bg-primary/5 px-3 py-1 rounded-full">
                      <Input 
                        id="tenure-input"
                        type="number" 
                        value={loanTenure}
                        onChange={handleTenureInput}
                        className="w-16 border-none bg-transparent p-0 focus:outline-none focus:ring-0 text-right"
                      />
                      <span className="ml-1">months</span>
                    </div>
                  </div>
                  <Slider
                    id="loan-tenure"
                    min={3}
                    max={360}
                    step={1}
                    value={[loanTenure]}
                    onValueChange={(values) => handleTenureChange(values[0])}
                    className="py-4"
                  />
                  <div className="flex justify-between text-xs text-gray-500">
                    <span>3 months</span>
                    <span>30 years</span>
                  </div>
                </div>

                <div className="pt-4">
                  <LoanSummary result={result} />
                </div>

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Button 
                    onClick={handleDownload} 
                    disabled={isProcessing}
                    className="flex-1 bg-accent hover:bg-accent/90 text-charcoal"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download PDF
                  </Button>
                  <Button 
                    onClick={handleEmailOpen} 
                    variant="outline" 
                    className="flex-1 border-primary text-primary hover:bg-primary hover:text-white"
                  >
                    <Mail className="w-4 h-4 mr-2" />
                    Email Results
                  </Button>
                </div>
              </div>
            </Tabs>
          </CardContent>
        </Card>

        <div className="lg:col-span-7 space-y-6 animate-slide-up">
          <Card className="card-shadow">
            <CardContent className="p-6">
              <h3 className="text-xl font-semibold mb-4">Loan Analysis</h3>
              <Tabs defaultValue="breakdown">
                <TabsList className="grid grid-cols-2 mb-6">
                  <TabsTrigger value="breakdown">Payment Breakdown</TabsTrigger>
                  <TabsTrigger value="schedule">Amortization Schedule</TabsTrigger>
                </TabsList>
                
                <TabsContent value="breakdown">
                  <EMIBreakdownChart 
                    principal={result.principal} 
                    totalInterest={result.totalInterest} 
                  />
                </TabsContent>
                
                <TabsContent value="schedule">
                  <AmortizationChart
                    principal={result.principal}
                    interestRate={result.interestRate}
                    tenure={result.tenure}
                  />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>

          <Card className="card-shadow">
            <CardContent className="p-6">
              <div className="flex items-start mb-4">
                <div className="mr-3 bg-primary/10 p-2 rounded-full">
                  <Info className="w-5 h-5 text-primary" />
                </div>
                <h3 className="text-xl font-semibold">Monthly EMI</h3>
              </div>
              <div className="flex items-center justify-between mb-6 bg-primary/5 p-4 rounded-lg">
                <div>
                  <p className="text-sm text-gray-500 mb-1">Your Monthly EMI</p>
                  <p className="text-3xl font-bold text-primary">
                    {formatCurrency(result.emi)}
                  </p>
                </div>
                <ArrowRight className="w-6 h-6 text-primary" />
                <div>
                  <p className="text-sm text-gray-500 mb-1">Total Payment</p>
                  <p className="text-2xl font-bold">
                    {formatCurrency(result.totalAmount)}
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-4 bg-secondary/10 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Principal Amount</p>
                  <p className="text-xl font-semibold">{formatCurrency(result.principal)}</p>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg">
                  <p className="text-sm text-gray-600 mb-1">Total Interest</p>
                  <p className="text-xl font-semibold">{formatCurrency(result.totalInterest)}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {showEmailModal && (
        <EmailModal 
          isOpen={showEmailModal}
          onClose={() => setShowEmailModal(false)}
          calculationData={result}
        />
      )}
    </div>
  );
};

export default LoanCalculator;
